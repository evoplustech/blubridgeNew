"""Regression coverage for AI consulting submission fix (iteration 36).

# Modules/features covered: public form-proof transport + duplicate guard + persistence for
# /api/contact-enquiries, /api/ai-consultation-enquiries, /api/ai-consulting-enquiries.
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


@pytest.fixture
def qa_cleanup(mongo_db):
    ids = []
    emails = []
    yield {"ids": ids, "emails": emails}
    if ids:
        mongo_db.contact_enquiries.delete_many({"id": {"$in": ids}})
    if emails:
        mongo_db.contact_enquiries.delete_many({"company_email": {"$in": [e.lower() for e in emails]}})


def _public_post(path: str, payload: dict):
    session = requests.Session()
    context = session.get(f"{API}/form-context", timeout=30)
    assert context.status_code == 200, context.text
    form_token = context.json().get("formToken")
    assert isinstance(form_token, str) and form_token
    time.sleep(1.1)
    response = session.post(
        f"{API}{path}",
        json=payload,
        headers={"Origin": BASE_URL, "X-BB-Form-Token": form_token},
        timeout=45,
    )
    return response


def _payload_contact(email: str):
    return {
        "firstName": "QA",
        "lastName": "Guard",
        "email": email,
        "role": "QA Engineer",
        "message": "Testing contact-enquiries duplicate guard.",
        "marketingConsent": False,
    }


def _payload_consultation(email: str):
    return {
        "fullName": "QA Consultation",
        "workEmail": email,
        "company": "QA Systems",
        "services": ["AI strategy"],
        "phone": "+1 415 555 0199",
        "jobTitle": "QA Lead",
        "country": "United States",
        "city": "San Francisco",
        "budget": "$ 10,000–50,000",
        "description": "Consultation guard regression",
        "privacy": True,
        "marketing": False,
    }


def _payload_consulting(email: str, budget_type: str, estimated_budget: str):
    return {
        "fullName": "QA Consulting",
        "workEmail": email,
        "company": "QA Systems",
        "jobTitle": "Head of AI",
        "website": "https://example.com",
        "countryCode": "US",
        "country": "United States",
        "phoneCountry": "US",
        "phone": "415 555 2671",
        "contactPermission": True,
        "services": ["AI Consulting & Technical Advisory", "Other"],
        "requirement": "Need help with architecture.",
        "stage": "Exploring options",
        "timeline": "Within 30 days",
        "budgetType": budget_type,
        "estimatedBudget": estimated_budget,
        "budgetStatus": "Budget proposed — approval pending",
    }


def test_contact_enquiries_success_and_duplicate_409(mongo_db, qa_cleanup):
    email = f"qa.iter36.contact.{uuid.uuid4().hex[:8]}@example.com"
    payload = _payload_contact(email)

    first = _public_post("/contact-enquiries", payload)
    assert first.status_code == 200, first.text
    enquiry_id = first.json().get("id")
    assert isinstance(enquiry_id, str) and enquiry_id
    qa_cleanup["ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0})
    assert doc is not None
    assert doc["company_email"] == email.lower()
    assert doc["project_details"] == payload["message"]

    second = _public_post("/contact-enquiries", payload)
    assert second.status_code == 409, second.text

    count = mongo_db.contact_enquiries.count_documents({"company_email": email.lower()})
    assert count == 1


def test_ai_consultation_enquiries_success_and_duplicate_409(mongo_db, qa_cleanup):
    email = f"qa.iter36.consultation.{uuid.uuid4().hex[:8]}@example.com"
    payload = _payload_consultation(email)

    first = _public_post("/ai-consultation-enquiries", payload)
    assert first.status_code == 201, first.text
    enquiry_id = first.json().get("id")
    assert isinstance(enquiry_id, str) and enquiry_id
    qa_cleanup["ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0})
    assert doc is not None
    assert doc["company_email"] == email.lower()
    assert doc["source"] == "/get-in-touch-10"

    second = _public_post("/ai-consultation-enquiries", payload)
    assert second.status_code == 409, second.text

    count = mongo_db.contact_enquiries.count_documents({"company_email": email.lower()})
    assert count == 1


def test_ai_consulting_enquiries_project_budget_success(mongo_db, qa_cleanup):
    email = f"qa.iter36.aic.project.{uuid.uuid4().hex[:8]}@example.com"
    payload = _payload_consulting(email, "project", "$25,000–$49,999")

    response = _public_post("/ai-consulting-enquiries", payload)
    assert response.status_code == 201, response.text
    enquiry_id = response.json().get("id")
    assert isinstance(enquiry_id, str) and enquiry_id
    qa_cleanup["ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0})
    assert doc is not None
    assert doc["company_email"] == email.lower()
    assert doc["budget_type"] == "project"
    assert doc["budget"] == "$25,000–$49,999"
    assert doc["budget_status"] == "Budget proposed — approval pending"
    assert doc["project_stage"] == "Exploring options"
    assert doc["start_timeline"] == "Within 30 days"


def test_ai_consulting_enquiries_monthly_budget_success(mongo_db, qa_cleanup):
    email = f"qa.iter36.aic.monthly.{uuid.uuid4().hex[:8]}@example.com"
    payload = _payload_consulting(email, "monthly", "$10,000–$24,999 per month")

    response = _public_post("/ai-consulting-enquiries", payload)
    assert response.status_code == 201, response.text
    enquiry_id = response.json().get("id")
    assert isinstance(enquiry_id, str) and enquiry_id
    qa_cleanup["ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0})
    assert doc is not None
    assert doc["company_email"] == email.lower()
    assert doc["budget_type"] == "monthly"
    assert doc["budget"] == "$10,000–$24,999 per month"


@pytest.mark.parametrize(
    "path,payload",
    [
        ("/contact-enquiries", {"firstName": "A"}),
        ("/ai-consultation-enquiries", {"fullName": "A"}),
        ("/ai-consulting-enquiries", {"fullName": "A"}),
    ],
)
def test_missing_fields_return_4xx_not_500(path, payload):
    response = _public_post(path, payload)
    assert response.status_code in (400, 403, 409, 422), response.text
    assert response.status_code != 500
