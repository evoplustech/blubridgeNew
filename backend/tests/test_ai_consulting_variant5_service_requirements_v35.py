"""AI consulting variant-5 backend validation and export tests (iteration 35).

# Modules/features covered: /api/ai-consulting-enquiries marker-5 per-service requirements, admin detail, CSV exports.
"""

import csv
import io
import json
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
    response = requests.post(f"{API}/admin/login", json={"username": username, "password": password}, timeout=45)
    assert response.status_code == 200, response.text
    token = response.json().get("token")
    assert isinstance(token, str) and token
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def qa_cleanup(mongo_db):
    ids = []
    emails = []
    yield {"ids": ids, "emails": emails}
    if ids:
        mongo_db.contact_enquiries.delete_many({"id": {"$in": ids}})
    if emails:
        mongo_db.contact_enquiries.delete_many({"company_email": {"$in": [e.lower() for e in emails]}})


def _payload(**overrides):
    data = {
        "fullName": "TEST V35 Variant5",
        "workEmail": f"qa.v35.v5.{uuid.uuid4().hex[:10]}@example.com",
        "company": "TEST Systems",
        "jobTitle": "QA Engineer",
        "website": "https://example.com",
        "countryCode": "US",
        "country": "United States",
        "phoneCountry": "US",
        "phone": "415 555 2671",
        "contactPermission": True,
        "services": ["AI Consulting & Technical Advisory", "Other"],
        "formVariant": "ai-consulting-5",
        "serviceRequirements": {
            "AI Consulting & Technical Advisory": "Need strategic consulting support",
            "Other": "Need custom service planning",
        },
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


def _locs(response_json: dict):
    return [item.get("loc", []) for item in response_json.get("detail", [])]


def test_variant5_missing_service_requirements_rejected_422():
    response = _submit(_payload(serviceRequirements=None))
    assert response.status_code == 422, response.text
    assert isinstance(response.json().get("detail"), list)


def test_variant5_whitespace_selected_requirement_rejected_422_and_field_loc():
    response = _submit(
        _payload(
            serviceRequirements={
                "AI Consulting & Technical Advisory": " \n \t  ",
                "Other": "valid",
            }
        )
    )
    assert response.status_code == 422, response.text
    locs = _locs(response.json())
    assert any(loc[:2] == ["body", "serviceRequirements"] and loc[-1] == "AI Consulting & Technical Advisory" for loc in locs)


def test_variant5_missing_selected_entry_rejected_422():
    response = _submit(
        _payload(
            services=["AI Consulting & Technical Advisory", "Custom AI & Model Development"],
            serviceRequirements={"AI Consulting & Technical Advisory": "Only one entry provided"},
        )
    )
    assert response.status_code == 422, response.text
    locs = _locs(response.json())
    assert any(loc[:2] == ["body", "serviceRequirements"] and loc[-1] == "Custom AI & Model Development" for loc in locs)


def test_variant5_unselected_and_unknown_keys_rejected_422():
    response = _submit(
        _payload(
            services=["Other"],
            serviceRequirements={
                "Other": "Needed",
                "Unknown Service": "bad key",
            },
        )
    )
    assert response.status_code == 422, response.text
    detail = response.json().get("detail", [])
    assert any("Requirements can only be supplied for selected services." in str(item.get("msg")) for item in detail)


def test_variant5_value_over_5000_rejected_422():
    too_long = "A" * 5001
    response = _submit(
        _payload(
            serviceRequirements={
                "AI Consulting & Technical Advisory": too_long,
                "Other": "Needed",
            }
        )
    )
    assert response.status_code == 422, response.text


def test_variant5_valid_selected_services_persist_and_export(admin_headers, mongo_db, qa_cleanup):
    email = f"qa.v35.v5.export.{uuid.uuid4().hex[:8]}@example.com"
    response = _submit(
        _payload(
            workEmail=email,
            services=[
                "AI Performance Optimization" if False else "GPU & AI Systems Optimisation",
                "Other",
            ],
            serviceRequirements={
                "AI Performance Optimization": "Need optimization and monitoring support",
                "Other": "Need bespoke guidance",
            },
        )
    )
    assert response.status_code == 201, response.text
    enquiry_id = response.json().get("id")
    assert isinstance(enquiry_id, str) and enquiry_id
    qa_cleanup["ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    doc = mongo_db.contact_enquiries.find_one(
        {"id": enquiry_id},
        {"_id": 0, "form_variant": 1, "service_requirements": 1, "project_details": 1},
    )
    assert doc is not None
    assert doc.get("form_variant") == "ai-consulting-5"
    assert doc.get("project_details") == ""
    assert doc.get("service_requirements") == {
        "AI Performance Optimization": "Need optimization and monitoring support",
        "Other": "Need bespoke guidance",
    }

    detail = requests.get(f"{API}/admin/submission/{enquiry_id}?form_type=get_in_touch", headers=admin_headers, timeout=45)
    assert detail.status_code == 200, detail.text
    body = detail.json()
    assert body.get("service_requirements", {}).get("AI Performance Optimization") == "Need optimization and monitoring support"
    assert body.get("service_requirements", {}).get("Other") == "Need bespoke guidance"

    git_export = requests.get(f"{API}/admin/export/get_in_touch", headers=admin_headers, timeout=60)
    assert git_export.status_code == 200, git_export.text
    git_rows = list(csv.reader(io.StringIO(git_export.text)))
    git_headers = git_rows[0]
    assert "Service Requirements" in git_headers
    email_idx = git_headers.index("Company Email")
    target = next((r for r in git_rows[1:] if len(r) > email_idx and r[email_idx].lower() == email.lower()), None)
    assert target is not None
    sr_json = target[git_headers.index("Service Requirements")]
    parsed = json.loads(sr_json)
    assert parsed["AI Performance Optimization"] == "Need optimization and monitoring support"
    assert parsed["Other"] == "Need bespoke guidance"

    all_export = requests.get(f"{API}/admin/export/all", headers=admin_headers, timeout=60)
    assert all_export.status_code == 200, all_export.text
    all_rows = list(csv.reader(io.StringIO(all_export.text)))
    all_headers = all_rows[0]
    assert "Service Requirements" in all_headers


def test_variant4_path_unchanged_still_accepts_per_service_map(mongo_db, qa_cleanup):
    email = f"qa.v35.v5.reg4.{uuid.uuid4().hex[:8]}@example.com"
    response = _submit(
        _payload(
            workEmail=email,
            formVariant="ai-consulting-4",
            serviceRequirements={
                "AI Consulting & Technical Advisory": "Variant4 still works",
                "Other": "Variant4 Other",
            },
        )
    )
    assert response.status_code == 201, response.text
    enquiry_id = response.json().get("id")
    qa_cleanup["ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)
    doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0, "form_variant": 1})
    assert doc is not None
    assert doc.get("form_variant") == "ai-consulting-4"
