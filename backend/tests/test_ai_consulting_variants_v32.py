"""AI consulting v32 regression tests.

# Modules/features covered: /api/ai-consulting-enquiries validation + persistence,
# admin list/detail/export visibility, and duplicate protection.
"""

import csv
import io
import os
import re
import uuid

import pytest
import requests
from pymongo import MongoClient


BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)

BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


def _read_env_file(path: str, key: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith(f"{key}="):
                return line.split("=", 1)[1].strip().strip('"')
    return ""


def _read_admin_creds() -> tuple[str, str]:
    username = "admin"
    password = "admin"
    path = "/app/memory/test_credentials.md"
    if not os.path.exists(path):
        return username, password

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    user_match = re.search(r"Username:\s*([^\n]+)", content)
    pass_match = re.search(r"Password:\s*([^\n]+)", content)
    if user_match:
        username = user_match.group(1).strip()
    if pass_match:
        password = pass_match.group(1).strip()
    return username, password


@pytest.fixture(scope="module")
def mongo_db():
    mongo_url = _read_env_file("/app/backend/.env", "MONGO_URL")
    db_name = _read_env_file("/app/backend/.env", "DB_NAME")
    if not mongo_url or not db_name:
        pytest.skip("MONGO_URL/DB_NAME missing in backend/.env")
    client = MongoClient(mongo_url)
    db = client[db_name]
    yield db
    client.close()


@pytest.fixture(scope="module")
def admin_headers():
    username, password = _read_admin_creds()
    response = requests.post(
        f"{API}/admin/login",
        json={"username": username, "password": password},
        timeout=45,
    )
    assert response.status_code == 200, response.text
    token = response.json().get("token")
    assert isinstance(token, str) and token
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def qa_cleanup(mongo_db):
    created_ids = []
    created_emails = []
    yield {"ids": created_ids, "emails": created_emails}

    if created_ids:
        mongo_db.contact_enquiries.delete_many({"id": {"$in": created_ids}})
    if created_emails:
        mongo_db.contact_enquiries.delete_many({"company_email": {"$in": [e.lower() for e in created_emails]}})
    mongo_db.contact_enquiries.delete_many({"company_email": {"$regex": r"^qa\.aic32\.", "$options": "i"}})


def _payload(**overrides):
    data = {
        "fullName": "QA AIC32 User",
        "workEmail": f"qa.aic32.{uuid.uuid4().hex[:10]}@example.com",
        "company": "QA Systems",
        "jobTitle": "QA Lead",
        "website": "https://www.company.com",
        "countryCode": "IN",
        "country": "India",
        "phoneCountry": "IN",
        "phone": "9876543210",
        "initiativeRole": "Other",
        "otherRole": "Sponsor",
        "contactPermission": True,
        "services": ["Other"],
        "otherRequirement": "Need help with roadmap",
        "requirement": "Need a scoped advisory and delivery approach.",
        "stage": "Exploring options",
        "timeline": "Within 30 days",
        "budgetType": "monthly",
        "estimatedBudget": "$10,000–$24,999 per month",
        "budgetStatus": "Budget approved and available",
    }
    data.update(overrides)
    return data


def _submit(payload: dict):
    return requests.post(f"{API}/ai-consulting-enquiries", json=payload, timeout=45)


class TestAIConsultingVariantsV32:
    def test_submit_201_persisted_and_source_unchanged(self, mongo_db, qa_cleanup):
        payload = _payload()
        response = _submit(payload)
        assert response.status_code == 201, response.text

        body = response.json()
        enquiry_id = body.get("id")
        assert isinstance(enquiry_id, str) and enquiry_id
        assert body.get("message") == "Your AI consulting enquiry has been received."
        qa_cleanup["ids"].append(enquiry_id)
        qa_cleanup["emails"].append(payload["workEmail"])

        doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0})
        assert doc is not None
        assert doc["company_email"] == payload["workEmail"].lower()
        assert doc["country_code"] == "IN"
        assert doc["phone_country"] == "IN"
        assert doc["calling_code"] == "+91"
        assert doc["source"] == "/ai-consulting"
        assert doc["contact_permission"] is True

    def test_conditional_validation_and_public_get_block(self):
        bad_role = _submit(_payload(initiativeRole="Other", otherRole=""))
        assert bad_role.status_code == 422, bad_role.text
        assert any("otherRole" in str(item) for item in bad_role.json().get("detail", []))

        bad_other_service = _submit(_payload(services=["Other"], otherRequirement=""))
        assert bad_other_service.status_code == 422, bad_other_service.text
        assert any("otherRequirement" in str(item) for item in bad_other_service.json().get("detail", []))

        get_blocked = requests.get(f"{API}/ai-consulting-enquiries", timeout=45)
        assert get_blocked.status_code in (401, 404, 405)

    def test_duplicate_email_returns_409(self, qa_cleanup):
        email = f"qa.aic32.dup.{uuid.uuid4().hex[:8]}@example.com"
        payload = _payload(workEmail=email)

        first = _submit(payload)
        assert first.status_code == 201, first.text
        qa_cleanup["ids"].append(first.json()["id"])
        qa_cleanup["emails"].append(email)

        second = _submit(payload)
        assert second.status_code == 409, second.text

    def test_admin_list_detail_and_export_contains_created_record(self, admin_headers, qa_cleanup):
        email = f"qa.aic32.admin.{uuid.uuid4().hex[:8]}@example.com"
        payload = _payload(workEmail=email, initiativeRole="Technical evaluator / recommender", otherRole="")
        created = _submit(payload)
        assert created.status_code == 201, created.text
        enquiry_id = created.json()["id"]
        qa_cleanup["ids"].append(enquiry_id)
        qa_cleanup["emails"].append(email)

        listing = requests.get(
            f"{API}/admin/submissions/get-in-touch?search={email}&page=1&limit=10",
            headers=admin_headers,
            timeout=45,
        )
        assert listing.status_code == 200, listing.text
        rows = listing.json().get("data", [])
        row = next((item for item in rows if item.get("id") == enquiry_id), None)
        assert row is not None
        assert row.get("country_code") == "IN"
        assert row.get("phone_country") == "IN"

        detail = requests.get(
            f"{API}/admin/submission/{enquiry_id}?form_type=get_in_touch",
            headers=admin_headers,
            timeout=45,
        )
        assert detail.status_code == 200, detail.text
        body = detail.json()
        assert body["source"] == "/ai-consulting"
        assert body["company_email"] == email
        assert body["initiative_role"] == payload["initiativeRole"]

        exported = requests.get(f"{API}/admin/export/get_in_touch", headers=admin_headers, timeout=45)
        assert exported.status_code == 200, exported.text
        rows = list(csv.reader(io.StringIO(exported.text)))
        headers = rows[0]
        email_idx = headers.index("Company Email")
        target = next((r for r in rows[1:] if len(r) > email_idx and r[email_idx].lower() == email), None)
        assert target is not None
