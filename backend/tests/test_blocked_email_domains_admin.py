"""Admin-managed blocked email domain list (no redeploy required).

# Modules/features covered: GET/PUT /api/admin/blocked-email-domains, public GET /api/blocked-email-domains,
# seeded defaults, and immediate effect of an admin change on /api/ai-consulting-enquiries validation.
# A short-lived admin session is created directly in Mongo (the admin password is not available to tests)
# and removed afterwards.
"""

import os
import secrets
import sys
import time
import uuid
from datetime import datetime, timedelta, timezone

import pytest
import requests
from dotenv import load_dotenv
from pymongo import MongoClient

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)

API = f"{BASE_URL.rstrip('/')}/api"
sys.path.insert(0, "/app/backend")
load_dotenv("/app/backend/.env")
from security_sessions import ADMIN_COOKIE, SecurityServices, token_hash  # noqa: E402

MARKER = "qa.blockdomain"


@pytest.fixture(scope="module")
def mongo_db():
    client = MongoClient(os.environ["MONGO_URL"])
    try:
        yield client[os.environ["DB_NAME"]]
    finally:
        client.close()


@pytest.fixture(scope="module")
def admin(mongo_db):
    """Temporary admin session + CSRF header for the existing cookie-based auth."""
    account = mongo_db.admin_settings.find_one({"type": "credentials"}, {"_id": 0})
    assert account, "No admin account configured"
    token = secrets.token_urlsafe(32)
    now = datetime.now(timezone.utc)
    mongo_db.admin_sessions.insert_one({
        "id": token_hash(token),
        "user_id": account["auth_id"],
        "auth_version": account["auth_version"],
        "created_at": now,
        "last_seen": now,
        "expires_at": now + timedelta(minutes=20),
    })
    session = requests.Session()
    session.cookies.set(ADMIN_COOKIE, token, domain=BASE_URL.split("//", 1)[1])
    session.headers.update({
        "X-CSRF-Token": SecurityServices(None).csrf_for(token),
        "Origin": BASE_URL.rstrip("/"),
        "Content-Type": "application/json",
    })
    try:
        yield session
    finally:
        mongo_db.admin_sessions.delete_one({"id": token_hash(token)})


@pytest.fixture(autouse=True, scope="module")
def restore_defaults(admin, mongo_db):
    original = admin.get(f"{API}/admin/blocked-email-domains", timeout=30).json()
    yield
    admin.put(f"{API}/admin/blocked-email-domains", json={"domains": original["domains"]}, timeout=30)
    mongo_db.contact_enquiries.delete_many({"company_email": {"$regex": f"^{MARKER}", "$options": "i"}})


def _submit(email: str):
    session = requests.Session()
    context = session.get(f"{API}/form-context", timeout=30)
    form_token = context.json()["formToken"]
    time.sleep(1.1)
    payload = {
        "fullName": "QA Blocklist",
        "workEmail": email,
        "company": "QA Systems",
        "jobTitle": "QA Lead",
        "countryCode": "US",
        "country": "United States",
        "phoneCountry": "US",
        "phone": "415 555 2671",
        "contactPermission": True,
        "services": ["AI Consulting & Technical Advisory"],
        "requirement": "Blocklist regression.",
        "stage": "Exploring options",
        "timeline": "Within 30 days",
        "budgetType": "project",
        "estimatedBudget": "$25,000–$49,999",
        "budgetStatus": "Budget approved and available",
    }
    return session.post(
        f"{API}/ai-consulting-enquiries",
        json=payload,
        headers={"Origin": BASE_URL.rstrip("/"), "X-BB-Form-Token": form_token},
        timeout=45,
    )


def test_public_list_is_seeded_with_provider_defaults():
    domains = requests.get(f"{API}/blocked-email-domains", timeout=30).json()["domains"]
    assert len(domains) > 150
    for provider in ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "proton.me"]:
        assert provider in domains


def test_admin_list_exposes_current_and_default_domains(admin):
    body = admin.get(f"{API}/admin/blocked-email-domains", timeout=30).json()
    assert "gmail.com" in body["domains"]
    assert "gmail.com" in body["defaults"]


def test_admin_requires_authentication():
    assert requests.get(f"{API}/admin/blocked-email-domains", timeout=30).status_code == 401
    assert requests.put(f"{API}/admin/blocked-email-domains", json={"domains": []}, timeout=30).status_code in (401, 403)


def test_rejects_invalid_domain_values(admin):
    for value in ["not a domain", "http://gmail.com", "gmail", "-bad.com", "a" * 300]:
        response = admin.put(f"{API}/admin/blocked-email-domains", json={"domains": [value]}, timeout=30)
        assert response.status_code == 422, f"{value} -> {response.status_code}"


def test_added_domain_blocks_submissions_immediately(admin):
    current = admin.get(f"{API}/admin/blocked-email-domains", timeout=30).json()["domains"]
    new_domain = "qa-blocked-provider.com"
    email = f"{MARKER}.{uuid.uuid4().hex[:8]}@{new_domain}"

    assert _submit(email).status_code == 201  # not blocked yet

    assert admin.put(f"{API}/admin/blocked-email-domains", json={"domains": current + [new_domain]}, timeout=30).status_code == 200
    assert new_domain in requests.get(f"{API}/blocked-email-domains", timeout=30).json()["domains"]

    blocked = _submit(f"{MARKER}.{uuid.uuid4().hex[:8]}@{new_domain}")
    assert blocked.status_code == 422, blocked.text
    assert "company email" in blocked.text.lower()


def test_removed_domain_is_accepted_again(admin):
    current = admin.get(f"{API}/admin/blocked-email-domains", timeout=30).json()["domains"]
    assert "zoho.com" in current
    assert admin.put(
        f"{API}/admin/blocked-email-domains",
        json={"domains": [d for d in current if d != "zoho.com"]},
        timeout=30,
    ).status_code == 200

    allowed = _submit(f"{MARKER}.{uuid.uuid4().hex[:8]}@zoho.com")
    assert allowed.status_code == 201, allowed.text

    # gmail.com is still blocked after the change
    assert _submit(f"{MARKER}.{uuid.uuid4().hex[:8]}@gmail.com").status_code == 422
