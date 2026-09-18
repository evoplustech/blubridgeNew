"""Comprehensive backend tests for Get In Touch feature (public + admin).

Covers:
- POST /api/contact-enquiries success + persistence (snake_case, no legacy fields)
- Validation (blank/whitespace, invalid email, message > 1000, exactly 1000)
- Trimming
- Duplicate within 1 minute (409)
- Admin: login, list, search, detail (status -> viewed), delete (404 on 2nd), export CSV, dashboard stats
- Unauthenticated rejection on admin endpoints
- Regression: /api/contacts/submit + admin submissions/contact
"""
import os
import io
import csv
import time
import uuid
import requests
import pytest
from pymongo import MongoClient

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    BASE_URL = open("/app/frontend/.env").read().split("REACT_APP_BACKEND_URL=")[1].split("\n")[0].strip().rstrip("/")

API = f"{BASE_URL}/api"
ENQ = f"{API}/contact-enquiries"

# Mongo direct (for persistence assertion)
MONGO_URL = None
DB_NAME = None
for line in open("/app/backend/.env").read().splitlines():
    if line.startswith("MONGO_URL="):
        MONGO_URL = line.split("=", 1)[1].strip().strip('"')
    elif line.startswith("DB_NAME="):
        DB_NAME = line.split("=", 1)[1].strip().strip('"')

_mongo = MongoClient(MONGO_URL) if MONGO_URL else None
_db = _mongo[DB_NAME] if _mongo else None


def _payload(**overrides):
    p = {
        "firstName": "QA",
        "lastName": "Tester",
        "email": f"qa.full.{uuid.uuid4().hex[:8]}@example.com",
        "role": "Engineer",
        "message": "Automated backend test enquiry.",
        "marketingConsent": False,
    }
    p.update(overrides)
    return p


def _sleep_rate_limit():
    """Sleep between POSTs to avoid 429 rate limiting (aggressive limiter)."""
    time.sleep(15)


def _post_with_retry(url, json_payload, expected_ok=(200, 409, 422)):
    """POST retrying once on 429."""
    r = requests.post(url, json=json_payload, timeout=30)
    if r.status_code == 429:
        time.sleep(30)
        r = requests.post(url, json=json_payload, timeout=30)
    return r


# ---------- Public POST /api/contact-enquiries ----------
class TestContactEnquiriesPublic:
    def test_valid_submission_persistence_snake_case(self):
        payload = _payload(firstName="Asha", email=f"qa.persist.{uuid.uuid4().hex[:8]}@Example.COM")
        r = requests.post(ENQ, json=payload, timeout=30)
        assert r.status_code == 200, r.text
        body = r.json()
        assert "id" in body and isinstance(body["id"], str)
        # Verify Mongo doc
        doc = _db.contact_enquiries.find_one({"id": body["id"]})
        assert doc is not None, "doc not persisted"
        expected_keys = {"id","first_name","last_name","company_email","role","project_details","marketing_consent","status","created_at","updated_at"}
        assert expected_keys.issubset(set(doc.keys())), f"missing keys: {expected_keys - set(doc.keys())}"
        # No legacy fields
        for legacy in ("phone", "company", "enquiry_type", "enquiryType"):
            assert legacy not in doc, f"unexpected legacy field {legacy}"
        assert doc["first_name"] == "Asha"
        assert doc["company_email"] == payload["email"].lower()
        assert doc["status"] == "new"

    def test_trims_whitespace(self):
        payload = _payload(firstName="  Asha  ", lastName="  Rao  ", email=f"qa.trim.{uuid.uuid4().hex[:8]}@example.com")
        r = requests.post(ENQ, json=payload, timeout=30)
        assert r.status_code == 200, r.text
        doc = _db.contact_enquiries.find_one({"id": r.json()["id"]})
        assert doc["first_name"] == "Asha"
        assert doc["last_name"] == "Rao"

    def test_whitespace_only_first_name_422(self):
        _sleep_rate_limit()
        r = requests.post(ENQ, json=_payload(firstName="   "), timeout=30)
        assert r.status_code == 422, r.text

    def test_whitespace_only_last_name_422(self):
        _sleep_rate_limit()
        r = requests.post(ENQ, json=_payload(lastName="   "), timeout=30)
        assert r.status_code == 422, r.text

    def test_whitespace_only_role_422(self):
        _sleep_rate_limit()
        r = requests.post(ENQ, json=_payload(role="   "), timeout=30)
        assert r.status_code == 422, r.text

    def test_missing_role_422(self):
        _sleep_rate_limit()
        p = _payload(); p.pop("role")
        r = _post_with_retry(ENQ, p)
        assert r.status_code == 422, r.text

    def test_invalid_email_422(self):
        _sleep_rate_limit()
        r = _post_with_retry(ENQ, _payload(email="not-an-email"))
        assert r.status_code == 422, r.text

    def test_message_1001_chars_422(self):
        _sleep_rate_limit()
        r = requests.post(ENQ, json=_payload(message="x" * 1001), timeout=30)
        if r.status_code == 429:
            time.sleep(30)
            r = requests.post(ENQ, json=_payload(message="x" * 1001), timeout=30)
        assert r.status_code == 422, r.text

    def test_message_exactly_1000_chars_200(self):
        _sleep_rate_limit()
        r = requests.post(ENQ, json=_payload(email=f"qa.max.{uuid.uuid4().hex[:8]}@example.com", message="y" * 1000), timeout=30)
        if r.status_code == 429:
            time.sleep(30)
            r = requests.post(ENQ, json=_payload(email=f"qa.max.{uuid.uuid4().hex[:8]}@example.com", message="y" * 1000), timeout=30)
        assert r.status_code == 200, r.text

    def test_duplicate_within_1_minute_409(self):
        _sleep_rate_limit()
        payload = _payload(email=f"qa.dup.{uuid.uuid4().hex[:8]}@example.com")
        r1 = requests.post(ENQ, json=payload, timeout=30)
        assert r1.status_code == 200, r1.text
        r2 = requests.post(ENQ, json=payload, timeout=30)
        assert r2.status_code == 409, r2.text


# ---------- Admin ----------
@pytest.fixture(scope="module")
def admin_token():
    r = requests.post(f"{API}/admin/login", json={"username": "admin", "password": "admin"}, timeout=30)
    assert r.status_code == 200, r.text
    tok = r.json().get("token")
    assert tok
    return tok


@pytest.fixture(scope="module")
def admin_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


@pytest.fixture(scope="module")
def seed_enquiry():
    """Create a fresh enquiry for admin tests."""
    time.sleep(6)
    payload = _payload(firstName="AdminSeed", lastName="RowX", email=f"qa.adm.{uuid.uuid4().hex[:8]}@example.com", role="Director")
    r = requests.post(ENQ, json=payload, timeout=30)
    assert r.status_code == 200, r.text
    return {"id": r.json()["id"], "payload": payload}


class TestAdminGetInTouch:
    def test_unauthenticated_list_rejected(self):
        r = requests.get(f"{API}/admin/submissions/get-in-touch", timeout=30)
        assert r.status_code in (401, 403, 405), r.status_code

    def test_unauthenticated_detail_rejected(self):
        r = requests.get(f"{API}/admin/submission/anything?form_type=get_in_touch", timeout=30)
        assert r.status_code in (401, 403, 405)

    def test_unauthenticated_delete_rejected(self):
        r = requests.delete(f"{API}/admin/submission/anything?form_type=get_in_touch", timeout=30)
        assert r.status_code in (401, 403, 405)

    def test_unauthenticated_export_rejected(self):
        r = requests.get(f"{API}/admin/export/get_in_touch", timeout=30)
        assert r.status_code in (401, 403, 405)

    def test_list_paginated(self, admin_headers, seed_enquiry):
        r = requests.get(f"{API}/admin/submissions/get-in-touch?limit=10&page=1", headers=admin_headers, timeout=30)
        assert r.status_code == 200, r.text
        body = r.json()
        for k in ("data", "total", "page", "limit", "totalPages"):
            assert k in body
        assert isinstance(body["data"], list)
        assert body["page"] == 1 and body["limit"] == 10

    def test_search_filter(self, admin_headers, seed_enquiry):
        # Search by unique first_name
        r = requests.get(f"{API}/admin/submissions/get-in-touch?search=AdminSeed", headers=admin_headers, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()["data"]
        assert any(d["id"] == seed_enquiry["id"] for d in data)

    def test_detail_marks_viewed(self, admin_headers, seed_enquiry):
        sid = seed_enquiry["id"]
        r = requests.get(f"{API}/admin/submission/{sid}?form_type=get_in_touch", headers=admin_headers, timeout=30)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["id"] == sid
        assert body["status"] == "viewed"
        # Persistence
        doc = _db.contact_enquiries.find_one({"id": sid})
        assert doc["status"] == "viewed"

    def test_export_csv(self, admin_headers):
        r = requests.get(f"{API}/admin/export/get_in_touch", headers=admin_headers, timeout=30)
        assert r.status_code == 200, r.text
        text = r.text
        reader = csv.reader(io.StringIO(text))
        rows = list(reader)
        assert rows, "empty CSV"
        header = rows[0]
        expected = ["First Name","Last Name","Company Email","Role","Project Details","Marketing Consent","Status","Created At"]
        assert header == expected, f"header mismatch: {header}"

    def test_dashboard_stats_includes_git(self, admin_headers):
        r = requests.get(f"{API}/admin/dashboard/stats", headers=admin_headers, timeout=30)
        assert r.status_code == 200, r.text
        body = r.json()
        assert "get_in_touch" in body
        assert "total" in body["get_in_touch"]
        assert "new" in body["get_in_touch"]

    def test_delete_then_second_delete_404(self, admin_headers):
        # Create own row to delete
        time.sleep(20)
        payload = _payload(email=f"qa.del.{uuid.uuid4().hex[:8]}@example.com")
        r = _post_with_retry(ENQ, payload)
        assert r.status_code == 200, r.text
        sid = r.json()["id"]
        d1 = requests.delete(f"{API}/admin/submission/{sid}?form_type=get_in_touch", headers=admin_headers, timeout=30)
        assert d1.status_code == 200, d1.text
        d2 = requests.delete(f"{API}/admin/submission/{sid}?form_type=get_in_touch", headers=admin_headers, timeout=30)
        assert d2.status_code == 404, d2.text


# ---------- Regression: /contact page endpoint ----------
class TestContactPageRegression:
    def test_contacts_submit_still_works(self):
        time.sleep(20)
        payload = {
            "type": "contact_us",
            "firstName": "Reg",
            "lastName": "Test",
            "email": f"qa.reg.{uuid.uuid4().hex[:8]}@example.com",
            "phone": "1234567",
            "company": "Acme",
            "message": "Regression test message",
        }
        r = _post_with_retry(f"{API}/contacts/submit", payload)
        assert r.status_code == 200, r.text
        assert "id" in r.json()

    def test_admin_submissions_contact_still_works(self, admin_headers):
        r = requests.get(f"{API}/admin/submissions/contact?limit=5&page=1", headers=admin_headers, timeout=30)
        assert r.status_code == 200, r.text
        body = r.json()
        assert "data" in body and "total" in body
