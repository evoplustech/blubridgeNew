"""AI consulting single-page backend regression tests.

# Modules/features covered: /api/ai-consulting-enquiries validation + persistence, admin list/detail/export visibility, legacy endpoint isolation.
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
    contact_ids = []
    contact_emails = []
    project_ids = []
    yield {"contact_ids": contact_ids, "contact_emails": contact_emails, "project_ids": project_ids}

    if contact_ids:
        mongo_db.contact_enquiries.delete_many({"id": {"$in": contact_ids}})
    if contact_emails:
        mongo_db.contact_enquiries.delete_many({"company_email": {"$in": [e.lower() for e in contact_emails]}})
    if project_ids:
        mongo_db.project_enquiries.delete_many({"id": {"$in": project_ids}})

    mongo_db.contact_enquiries.delete_many({"company_email": {"$regex": r"^qa\.aic30\.", "$options": "i"}})


def _payload(**overrides):
    data = {
        "fullName": "QA AIC30 User",
        "workEmail": f"qa.aic30.{uuid.uuid4().hex[:10]}@example.com",
        "company": "QA Systems",
        "jobTitle": "QA Lead",
        "website": "https://www.company.com",
        "countryCode": "US",
        "country": "United States",
        "phoneCountry": "US",
        "phone": "415 555 2671",
        "initiativeRole": "Technical evaluator / recommender",
        "otherRole": "",
        "contactPermission": True,
        "services": ["AI Consulting & Technical Advisory", "Other"],
        "otherRequirement": "Need architecture and delivery support",
        "requirement": "Evaluate current AI platform and define implementation plan.",
        "stage": "Exploring options",
        "timeline": "Within 30 days",
        "budgetType": "project",
        "estimatedBudget": "$25,000–$49,999",
        "budgetStatus": "Budget approved and available",
    }
    data.update(overrides)
    return data


def _submit(payload: dict):
    return requests.post(f"{API}/ai-consulting-enquiries", json=payload, timeout=45)


class TestAIConsultingSinglePageBackend:
    def test_submit_201_and_persisted_mapping(self, mongo_db, qa_cleanup):
        payload = _payload()
        response = _submit(payload)
        assert response.status_code == 201, response.text

        body = response.json()
        enquiry_id = body.get("id")
        assert isinstance(enquiry_id, str) and enquiry_id
        assert body.get("message") == "Your AI consulting enquiry has been received."
        qa_cleanup["contact_ids"].append(enquiry_id)
        qa_cleanup["contact_emails"].append(payload["workEmail"])

        doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0})
        assert doc is not None
        assert doc["company_email"] == payload["workEmail"].lower()
        assert doc["website"] == payload["website"]
        assert doc["initiative_role"] == payload["initiativeRole"]
        assert doc["country_code"] == "US"
        assert doc["phone_country"] == "US"
        assert doc["calling_code"] == "+1"
        assert doc["contact_permission"] is True
        assert doc["privacy_consent"] is True
        assert doc["marketing_consent"] is False
        assert doc["source"] == "/ai-consulting"
        assert doc["phone"].startswith("+1") and " " not in doc["phone"]

    @pytest.mark.parametrize(
        "overrides, field_name",
        [
            ({"fullName": ""}, "fullName"),
            ({"workEmail": ""}, "workEmail"),
            ({"company": ""}, "company"),
            ({"jobTitle": ""}, "jobTitle"),
            ({"countryCode": ""}, "countryCode"),
            ({"phone": ""}, "phone"),
            ({"initiativeRole": ""}, "initiativeRole"),
            ({"contactPermission": False}, "contactPermission"),
        ],
    )
    def test_required_fields_422(self, overrides, field_name):
        response = _submit(_payload(**overrides))
        assert response.status_code == 422, response.text
        detail = response.json().get("detail", [])
        assert any(field_name in str(item) for item in detail)

    def test_other_role_conditional_and_clear_behavior(self, mongo_db, qa_cleanup):
        missing = _submit(_payload(initiativeRole="Other", otherRole=""))
        assert missing.status_code == 422, missing.text
        assert any("otherRole" in str(item) for item in missing.json().get("detail", []))

        with_hidden_value = _submit(
            _payload(
                initiativeRole="Technical evaluator / recommender",
                otherRole="Should be cleared",
            )
        )
        assert with_hidden_value.status_code == 201, with_hidden_value.text
        enquiry_id = with_hidden_value.json()["id"]
        qa_cleanup["contact_ids"].append(enquiry_id)

        doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0, "other_role": 1})
        assert doc.get("other_role") is None

    def test_services_guidance_exclusive_and_other_requirement_conditional(self):
        guidance_mix = _submit(
            _payload(services=["Not sure — I need guidance", "Other"], otherRequirement="x")
        )
        assert guidance_mix.status_code == 422, guidance_mix.text
        assert any("services" in str(item) for item in guidance_mix.json().get("detail", []))

        missing_other = _submit(_payload(services=["Other"], otherRequirement=""))
        assert missing_other.status_code == 422, missing_other.text
        assert any("otherRequirement" in str(item) for item in missing_other.json().get("detail", []))

    def test_budget_type_mismatch_rejected_422(self):
        response = _submit(_payload(budgetType="monthly", estimatedBudget="$25,000–$49,999"))
        assert response.status_code == 422, response.text
        assert any("estimatedBudget" in str(item) for item in response.json().get("detail", []))

    @pytest.mark.parametrize(
        "website",
        [
            "www.company.com",
            "javascript:alert(1)",
        ],
    )
    def test_website_validation_rejects_invalid_urls(self, website):
        response = _submit(_payload(website=website))
        assert response.status_code == 422, response.text
        assert any("website" in str(item) for item in response.json().get("detail", []))

    def test_unknown_field_rejected_422(self):
        response = _submit(_payload(city="Mumbai"))
        assert response.status_code == 422, response.text
        assert any("city" in str(item) for item in response.json().get("detail", []))

    def test_duplicate_email_within_60_seconds_returns_409(self, qa_cleanup):
        email = f"qa.aic30.dup.{uuid.uuid4().hex[:8]}@example.com"
        payload = _payload(workEmail=email)

        first = _submit(payload)
        assert first.status_code == 201, first.text
        qa_cleanup["contact_ids"].append(first.json()["id"])
        qa_cleanup["contact_emails"].append(email)

        second = _submit(payload)
        assert second.status_code == 409, second.text


class TestAdminAndExports:
    def test_admin_list_and_detail_include_new_fields(self, admin_headers, qa_cleanup):
        email = f"qa.aic30.admin.{uuid.uuid4().hex[:8]}@example.com"
        payload = _payload(
            workEmail=email,
            countryCode="IN",
            country="India",
            phoneCountry="IN",
            phone="98765 43210",
            initiativeRole="Other",
            otherRole="Innovation sponsor",
        )
        created = _submit(payload)
        assert created.status_code == 201, created.text
        enquiry_id = created.json()["id"]
        qa_cleanup["contact_ids"].append(enquiry_id)
        qa_cleanup["contact_emails"].append(email)

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
        assert row.get("website") == payload["website"]

        detail = requests.get(
            f"{API}/admin/submission/{enquiry_id}?form_type=get_in_touch",
            headers=admin_headers,
            timeout=45,
        )
        assert detail.status_code == 200, detail.text
        body = detail.json()
        assert body["initiative_role"] == "Other"
        assert body["other_role"] == "Innovation sponsor"
        assert body["contact_permission"] is True
        assert body["privacy_consent"] is True
        assert body["marketing_consent"] is False

    def test_get_in_touch_export_has_new_columns_and_values(self, admin_headers, qa_cleanup):
        email = f"qa.aic30.csv.{uuid.uuid4().hex[:8]}@example.com"
        payload = _payload(
            fullName="=QA AIC30 CSV",
            workEmail=email,
            countryCode="GB",
            country="United Kingdom",
            phoneCountry="GB",
            phone="020 7946 0958",
        )
        created = _submit(payload)
        assert created.status_code == 201, created.text
        qa_cleanup["contact_ids"].append(created.json()["id"])
        qa_cleanup["contact_emails"].append(email)

        exported = requests.get(f"{API}/admin/export/get_in_touch", headers=admin_headers, timeout=45)
        assert exported.status_code == 200, exported.text
        rows = list(csv.reader(io.StringIO(exported.text)))
        headers = rows[0]

        for required in [
            "Company Website",
            "Role In Initiative",
            "Other Role",
            "Country Code",
            "Phone Country",
            "Calling Code",
            "Contact Permission",
            "Privacy Consent",
            "Marketing Consent",
        ]:
            assert required in headers

        email_idx = headers.index("Company Email")
        target = next((r for r in rows[1:] if len(r) > email_idx and r[email_idx].lower() == email), None)
        assert target is not None
        assert target[headers.index("Full Name")].startswith("'=")
        assert target[headers.index("Country Code")] == "GB"
        assert target[headers.index("Phone Country")] == "GB"
        assert target[headers.index("Calling Code")] in ("'+44", "+44")
        assert target[headers.index("Contact Permission")] == "Yes"
        assert target[headers.index("Privacy Consent")] == "Yes"
        assert target[headers.index("Marketing Consent")] == "No"

    def test_combined_export_includes_ai_consulting_row_and_page_source(self, admin_headers):
        response = requests.get(f"{API}/admin/export/all", headers=admin_headers, timeout=45)
        assert response.status_code == 200, response.text
        rows = list(csv.reader(io.StringIO(response.text)))
        headers = rows[0]

        for required in ["Source", "Type", "Page Source", "Country Code", "Contact Permission"]:
            assert required in headers

        source_idx = headers.index("Source")
        type_idx = headers.index("Type")
        page_source_idx = headers.index("Page Source")
        assert any(
            len(row) > page_source_idx
            and row[source_idx] == "AI Consulting Enquiry"
            and row[type_idx] == "get_in_touch"
            and row[page_source_idx] in ("/ai-consulting", "/get-in-touch-10")
            for row in rows[1:]
        )


class TestLegacyIsolation:
    def test_get_in_touch_10_still_accepts_legacy_schema(self, mongo_db, qa_cleanup):
        payload = {
            "fullName": "QA AIC30 Legacy",
            "workEmail": f"qa.aic30.legacy.{uuid.uuid4().hex[:8]}@example.com",
            "company": "Legacy Co",
            "services": ["AI strategy"],
            "phone": "+14155550100",
            "jobTitle": "CTO",
            "country": "United States",
            "city": "New York",
            "budget": "$ 10,000–50,000",
            "description": "Legacy endpoint should remain unchanged",
            "privacy": True,
            "marketing": False,
        }
        response = requests.post(f"{API}/ai-consultation-enquiries", json=payload, timeout=45)
        assert response.status_code == 201, response.text
        enquiry_id = response.json().get("id")
        assert isinstance(enquiry_id, str) and enquiry_id
        qa_cleanup["contact_ids"].append(enquiry_id)
        qa_cleanup["contact_emails"].append(payload["workEmail"])

        doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0, "source": 1})
        assert doc is not None
        assert doc.get("source") == "/get-in-touch-10"

    def test_project_enquiries_create_without_affecting_existing_records(self, mongo_db, qa_cleanup):
        before_count = mongo_db.project_enquiries.count_documents({})
        payload = {
            "fullName": "QA AIC30 Project",
            "email": f"qa.aic30.project.{uuid.uuid4().hex[:8]}@example.com",
            "phone": "+1 415 555 0199",
            "company": "QA Legacy",
            "jobTitle": "Manager",
            "country": "United States",
            "city": "San Francisco",
            "budget": "$ 10,000–50,000",
            "message": "Legacy project endpoint regression",
            "privacyConsent": True,
            "marketingConsent": False,
        }
        created = requests.post(f"{API}/project-enquiries", json=payload, timeout=45)
        assert created.status_code == 200, created.text
        created_id = created.json().get("id")
        assert isinstance(created_id, str) and created_id
        qa_cleanup["project_ids"].append(created_id)

        inserted = mongo_db.project_enquiries.find_one({"id": created_id}, {"_id": 0, "email": 1})
        assert inserted is not None
        assert inserted["email"] == payload["email"].lower()

        mongo_db.project_enquiries.delete_one({"id": created_id})
        after_count = mongo_db.project_enquiries.count_documents({})
        assert after_count == before_count