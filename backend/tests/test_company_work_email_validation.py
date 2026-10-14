"""Work email (company-domain) validation on the consulting enquiry endpoint.

# Modules/features covered: /api/ai-consulting-enquiries workEmail validation (personal provider blocklist),
# server-side enforcement that cannot be bypassed by posting directly, and a successful company-email submission.
"""

import os
import time
import uuid

import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)

API = f"{BASE_URL.rstrip('/')}/api"
MARKER = "qa.workemail"


def _env(key: str) -> str:
    with open("/app/backend/.env", "r", encoding="utf-8") as handle:
        for line in handle:
            if line.strip().startswith(f"{key}="):
                return line.strip().split("=", 1)[1].strip().strip('"')
    return ""


@pytest.fixture(scope="module")
def mongo_db():
    client = MongoClient(_env("MONGO_URL"))
    try:
        yield client[_env("DB_NAME")]
    finally:
        client.close()


@pytest.fixture(autouse=True, scope="module")
def cleanup(mongo_db):
    yield
    mongo_db.contact_enquiries.delete_many({"company_email": {"$regex": f"^{MARKER}", "$options": "i"}})


def _payload(email: str) -> dict:
    return {
        "fullName": "QA Work Email",
        "workEmail": email,
        "company": "QA Systems",
        "jobTitle": "QA Lead",
        "website": "https://www.company.com",
        "countryCode": "US",
        "country": "United States",
        "phoneCountry": "US",
        "phone": "415 555 2671",
        "contactPermission": True,
        "services": ["AI Consulting & Technical Advisory"],
        "requirement": "Evaluate current AI platform and define implementation plan.",
        "stage": "Exploring options",
        "timeline": "Within 30 days",
        "budgetType": "project",
        "estimatedBudget": "$25,000–$49,999",
        "budgetStatus": "Budget approved and available",
    }


def _submit(email: str):
    session = requests.Session()
    context = session.get(f"{API}/form-context", timeout=30)
    assert context.status_code == 200, context.text
    form_token = context.json()["formToken"]
    time.sleep(1.1)
    return session.post(
        f"{API}/ai-consulting-enquiries",
        json=_payload(email),
        headers={"Origin": BASE_URL.rstrip("/"), "X-BB-Form-Token": form_token},
        timeout=45,
    )


@pytest.mark.parametrize("email", [
    "user@gmail.com", "user@googlemail.com", "user@yahoo.com", "user@yahoo.co.in", "user@hotmail.com",
    "user@outlook.com", "user@live.com", "user@msn.com", "user@icloud.com", "user@me.com", "user@aol.com",
    "user@protonmail.com", "user@proton.me", "user@gmx.com", "user@mail.com", "user@yandex.com",
    "user@zoho.com", "user@rediffmail.com", "USER@GMAIL.COM", "  user@gmail.com  ", "user@mail.gmail.com",
])
def test_personal_email_domains_are_rejected(email):
    response = _submit(email)
    assert response.status_code == 422, response.text
    assert "company email" in response.text.lower()


@pytest.mark.parametrize("email", ["", "   ", "not-an-email", "user@", "@company.com", "user@company"])
def test_invalid_or_empty_email_is_rejected(email):
    assert _submit(email).status_code == 422


@pytest.mark.parametrize("email", [
    f"{MARKER}.{uuid.uuid4().hex[:8]}@company.com",
    f"  {MARKER}.{uuid.uuid4().hex[:8]}@business.in  ",
    f"{MARKER}.{uuid.uuid4().hex[:8]}@some-unknown-startup.xyz",
])
def test_company_email_is_accepted_and_trimmed(email, mongo_db):
    response = _submit(email)
    assert response.status_code == 201, response.text
    stored = mongo_db.contact_enquiries.find_one({"id": response.json()["id"]}, {"_id": 0, "company_email": 1})
    assert stored["company_email"] == email.strip().lower()
