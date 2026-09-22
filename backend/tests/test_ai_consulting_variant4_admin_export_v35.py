"""AI consulting variant-4 admin/export persistence tests (iteration 35).

# Modules/features covered: admin detail + get_in_touch/all CSV Service Requirements JSON column.
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


def _payload(email: str):
    long_token = "X" * 300
    return {
        "fullName": "TEST Admin Export V35",
        "workEmail": email,
        "company": "TEST Export Co",
        "jobTitle": "QA Analyst",
        "website": "https://example.com",
        "countryCode": "US",
        "country": "United States",
        "phoneCountry": "US",
        "phone": "415 555 2671",
        "contactPermission": True,
        "services": [
            "AI Performance Optimization" if False else "GPU & AI Systems Optimisation",
            "Custom AI & Model Development",
            "Other",
        ],
        "formVariant": "ai-consulting-4",
        "serviceRequirements": {
            "AI Performance Optimization": f"GPU requirement {long_token}",
            "Custom AI & Model Development": "Custom requirement value",
            "Other": "Other requirement value",
        },
        "stage": "Exploring options",
        "timeline": "Within 30 days",
        "budgetType": "project",
        "estimatedBudget": "$25,000–$49,999",
        "budgetStatus": "Budget approved and available",
    }


def test_admin_detail_and_csv_include_service_requirements_json(admin_headers, mongo_db, qa_cleanup):
    email = f"qa.v35.admin.{uuid.uuid4().hex[:8]}@example.com"
    response = requests.post(f"{API}/ai-consulting-enquiries", json=_payload(email), timeout=45)
    assert response.status_code == 201, response.text
    enquiry_id = response.json().get("id")
    assert isinstance(enquiry_id, str) and enquiry_id
    qa_cleanup["ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    db_row = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0, "service_requirements": 1, "form_variant": 1})
    assert db_row is not None
    assert db_row.get("form_variant") == "ai-consulting-4"
    assert isinstance(db_row.get("service_requirements"), dict)
    assert db_row["service_requirements"].get("AI Performance Optimization", "").startswith("GPU requirement")

    detail = requests.get(f"{API}/admin/submission/{enquiry_id}?form_type=get_in_touch", headers=admin_headers, timeout=45)
    assert detail.status_code == 200, detail.text
    body = detail.json()
    assert body.get("id") == enquiry_id
    assert body.get("service_requirements", {}).get("Custom AI & Model Development") == "Custom requirement value"
    assert body.get("service_requirements", {}).get("Other") == "Other requirement value"

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
    assert parsed["Custom AI & Model Development"] == "Custom requirement value"
    assert parsed["Other"] == "Other requirement value"

    all_export = requests.get(f"{API}/admin/export/all", headers=admin_headers, timeout=60)
    assert all_export.status_code == 200, all_export.text
    all_rows = list(csv.reader(io.StringIO(all_export.text)))
    all_headers = all_rows[0]
    assert "Service Requirements" in all_headers
