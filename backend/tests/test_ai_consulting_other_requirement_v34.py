"""AI consulting wizard Other/requirement regression tests (iteration 34).

# Modules/features covered: /api/ai-consulting-enquiries validation+persistence and admin detail/export compatibility.
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
    emails = []
    yield {"contact_ids": contact_ids, "emails": emails}

    if contact_ids:
        mongo_db.contact_enquiries.delete_many({"id": {"$in": contact_ids}})
    if emails:
        mongo_db.contact_enquiries.delete_many({"company_email": {"$in": [e.lower() for e in emails]}})


def _payload(**overrides):
    data = {
        "fullName": "QA AIC34 User",
        "workEmail": f"qa.aic34.{uuid.uuid4().hex[:10]}@example.com",
        "company": "QA Systems",
        "jobTitle": "QA Engineer",
        "website": "https://example.com",
        "countryCode": "US",
        "country": "United States",
        "phoneCountry": "US",
        "phone": "415 555 2671",
        "contactPermission": True,
        "services": ["AI Consulting & Technical Advisory", "Other"],
        "requirement": "Need guidance on architecture and implementation.",
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


def test_other_selected_blank_requirement_rejected_422():
    response = _submit(_payload(requirement=""))
    assert response.status_code == 422, response.text
    detail = response.json().get("detail", [])
    assert any("requirement" in str(item) for item in detail)


def test_other_selected_whitespace_requirement_rejected_422():
    response = _submit(_payload(requirement="    \n   \t"))
    assert response.status_code == 422, response.text
    detail = response.json().get("detail", [])
    assert any("requirement" in str(item) for item in detail)


def test_other_selected_accepts_long_requirement_over_1000_chars(mongo_db, qa_cleanup):
    email = f"qa.aic34.long.{uuid.uuid4().hex[:8]}@example.com"
    long_requirement = "A" * 1201
    response = _submit(_payload(workEmail=email, requirement=long_requirement))
    assert response.status_code == 201, response.text
    enquiry_id = response.json().get("id")
    assert isinstance(enquiry_id, str) and enquiry_id
    qa_cleanup["contact_ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0, "project_details": 1})
    assert doc is not None
    assert doc["project_details"] == long_requirement
    assert len(doc["project_details"]) == 1201


def test_no_other_selected_allows_omitted_requirement_and_persists_empty(mongo_db, qa_cleanup):
    email = f"qa.aic34.noother.{uuid.uuid4().hex[:8]}@example.com"
    payload = _payload(
        workEmail=email,
        services=["AI Consulting & Technical Advisory"],
    )
    payload.pop("requirement", None)

    response = _submit(payload)
    assert response.status_code == 201, response.text
    enquiry_id = response.json().get("id")
    assert isinstance(enquiry_id, str) and enquiry_id
    qa_cleanup["contact_ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    doc = mongo_db.contact_enquiries.find_one(
        {"id": enquiry_id},
        {"_id": 0, "services": 1, "project_details": 1, "other_requirement": 1},
    )
    assert doc is not None
    assert doc["services"] == ["AI Consulting & Technical Advisory"]
    assert doc.get("project_details") == ""
    assert doc.get("other_requirement") is None


def test_no_other_selected_allows_explicit_empty_requirement(mongo_db, qa_cleanup):
    email = f"qa.aic34.noother2.{uuid.uuid4().hex[:8]}@example.com"
    response = _submit(
        _payload(
            workEmail=email,
            services=["Custom AI & Model Development"],
            requirement="",
        )
    )
    assert response.status_code == 201, response.text
    enquiry_id = response.json().get("id")
    assert isinstance(enquiry_id, str) and enquiry_id
    qa_cleanup["contact_ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0, "project_details": 1})
    assert doc is not None
    assert doc.get("project_details") == ""


def test_legacy_other_requirement_preserved_for_export_compatibility(admin_headers, qa_cleanup):
    email = f"qa.aic34.legacy.{uuid.uuid4().hex[:8]}@example.com"
    legacy_value = "Legacy other requirement row should still export"
    response = _submit(
        _payload(
            workEmail=email,
            services=["Other"],
            requirement="Primary requirement description",
            otherRequirement=legacy_value,
        )
    )
    assert response.status_code == 201, response.text
    enquiry_id = response.json().get("id")
    qa_cleanup["contact_ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    detail = requests.get(
        f"{API}/admin/submission/{enquiry_id}?form_type=get_in_touch",
        headers=admin_headers,
        timeout=45,
    )
    assert detail.status_code == 200, detail.text
    body = detail.json()
    assert body.get("project_details") == "Primary requirement description"
    assert body.get("other_requirement") == legacy_value

    export_resp = requests.get(f"{API}/admin/export/get_in_touch", headers=admin_headers, timeout=60)
    assert export_resp.status_code == 200, export_resp.text
    rows = list(csv.reader(io.StringIO(export_resp.text)))
    headers = rows[0]
    email_idx = headers.index("Company Email")
    target = next((r for r in rows[1:] if len(r) > email_idx and r[email_idx].lower() == email.lower()), None)
    assert target is not None
    assert target[headers.index("Project Details")] == "Primary requirement description"
    assert target[headers.index("Other Requirement")] == legacy_value
