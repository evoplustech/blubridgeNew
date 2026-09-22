"""AI consulting base submit regression for canonical options and duplicate guard (iteration 36).

# Modules/features covered: /api/ai-consulting-enquiries POST, one-row persistence, duplicate 409, exact cleanup by created id.
"""

import os
import time
import uuid

import pytest
import requests
from dotenv import dotenv_values
from pymongo import MongoClient


BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)

BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def mongo_db():
    env = dotenv_values("/app/backend/.env")
    mongo_url = env.get("MONGO_URL")
    db_name = env.get("DB_NAME")
    if not mongo_url or not db_name:
        pytest.skip("MONGO_URL/DB_NAME missing in backend/.env")
    client = MongoClient(mongo_url)
    db = client[db_name]
    yield db
    client.close()


def _public_post(path: str, payload: dict, session: requests.Session):
    ctx = session.get(f"{API}/form-context", timeout=30)
    assert ctx.status_code == 200, ctx.text
    token = ctx.json().get("formToken")
    assert isinstance(token, str) and token
    time.sleep(1.1)
    return session.post(
        f"{API}{path}",
        json=payload,
        headers={"Origin": BASE_URL, "X-BB-Form-Token": token},
        timeout=45,
    )


def test_base_submit_persists_once_and_duplicate_409(mongo_db):
    email = f"qa.iter36.base.{uuid.uuid4().hex[:8]}@example.com"
    payload = {
        "fullName": "QA Base Submit",
        "workEmail": email,
        "company": "QA Labs",
        "jobTitle": "QA Engineer",
        "website": "https://qa.example.com",
        "countryCode": "IN",
        "country": "India",
        "phoneCountry": "IN",
        "phone": "9876543210",
        "initiativeRole": "Technical evaluator / recommender",
        "otherRole": "",
        "contactPermission": True,
        "services": ["AI Consulting & Technical Advisory", "Other"],
        "otherRequirement": "Need long-term implementation planning",
        "requirement": "Other scope requires architecture support and delivery planning across multiple teams.",
        "stage": "Requirements defined",
        "timeline": "1–3 months",
        "budgetType": "project",
        "estimatedBudget": "$10,000–$24,999",
        "budgetStatus": "Budget proposed — approval pending",
    }

    session = requests.Session()
    created_id = None
    try:
        first = _public_post("/ai-consulting-enquiries", payload, session)
        assert first.status_code == 201, first.text
        body = first.json()
        created_id = body.get("id")
        assert isinstance(created_id, str) and created_id
        assert body.get("message") == "Your AI consulting enquiry has been received."

        doc = mongo_db.contact_enquiries.find_one({"id": created_id}, {"_id": 0})
        assert doc is not None
        assert doc["company_email"] == email.lower()
        assert doc["project_stage"] == "Requirements defined"
        assert doc["start_timeline"] == "1–3 months"
        assert doc["budget"] == "$10,000–$24,999"
        assert doc["budget_status"] == "Budget proposed — approval pending"

        duplicate = _public_post("/ai-consulting-enquiries", payload, session)
        assert duplicate.status_code == 409, duplicate.text

        count = mongo_db.contact_enquiries.count_documents({"company_email": email.lower()})
        assert count == 1
    finally:
        if created_id:
            mongo_db.contact_enquiries.delete_one({"id": created_id})
