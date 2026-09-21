"""AI consultation enquiry backend regression tests.

# Modules/features covered: public submit validation, persistence mapping, admin list/detail/delete/export, security gates.
"""

import csv
import io
import os
import uuid
from datetime import datetime

import pytest
import requests
from pymongo import MongoClient


BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)

BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


def _read_backend_env(key: str) -> str:
    with open("/app/backend/.env", "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith(f"{key}="):
                return line.split("=", 1)[1].strip().strip('"')
    return ""


@pytest.fixture(scope="module")
def mongo_db():
    mongo_url = _read_backend_env("MONGO_URL")
    db_name = _read_backend_env("DB_NAME")
    if not mongo_url or not db_name:
        pytest.skip("MONGO_URL/DB_NAME missing in backend/.env")
    client = MongoClient(mongo_url)
    db = client[db_name]
    yield db
    client.close()


@pytest.fixture(scope="module")
def admin_headers():
    r = requests.post(
        f"{API}/admin/login",
        json={"username": "admin", "password": "admin"},
        timeout=45,
    )
    assert r.status_code == 200, r.text
    token = r.json().get("token")
    assert token and isinstance(token, str)
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def qa_ids(mongo_db):
    ids = []
    emails = []
    yield ids, emails
    if ids:
        mongo_db.contact_enquiries.delete_many({"id": {"$in": ids}})
    if emails:
        mongo_db.contact_enquiries.delete_many({"company_email": {"$in": emails}})


def _payload(**overrides):
    base = {
        "fullName": "QA IT27 Full Flow",
        "workEmail": f"qa.it27.{uuid.uuid4().hex[:10]}@Example.COM",
        "company": "QA Labs",
        "services": ["Generative AI", "AI integration"],
        "phone": "+91 98765 43210",
        "jobTitle": "Head of Innovation",
        "country": "India",
        "city": "Bengaluru",
        "budget": "₹ 50,000–100,000",
        "description": "Line 1, with comma\nLine 2 — multilingual ₹ € $",
        "privacy": True,
        "marketing": False,
    }
    base.update(overrides)
    return base


def _create_ai(payload):
    return requests.post(f"{API}/ai-consultation-enquiries", json=payload, timeout=45)


class TestAIConsultationPublic:
    def test_post_201_and_field_mapping_roundtrip(self, mongo_db, qa_ids):
        payload = _payload()
        r = _create_ai(payload)
        assert r.status_code == 201, r.text
        body = r.json()
        assert isinstance(body.get("id"), str) and body["id"]
        assert "received" in body.get("message", "").lower()

        qa_ids[0].append(body["id"])
        qa_ids[1].append(payload["workEmail"].lower())

        doc = mongo_db.contact_enquiries.find_one({"id": body["id"]}, {"_id": 0})
        assert doc is not None
        assert doc["full_name"] == payload["fullName"]
        assert doc["company_email"] == payload["workEmail"].lower()
        assert doc["company"] == payload["company"]
        assert doc["phone"] == payload["phone"]
        assert doc["role"] == payload["jobTitle"]
        assert doc["country"] == payload["country"]
        assert doc["city"] == payload["city"]
        assert doc["budget"] == payload["budget"]
        assert doc["services"] == payload["services"]
        assert doc["project_details"] == payload["description"]
        assert doc["privacy_consent"] is True
        assert doc["marketing_consent"] is False
        assert doc["source"] == "/get-in-touch-10"
        assert doc["status"] == "new"
        assert isinstance(doc["created_at"], str) and isinstance(doc["updated_at"], str)

    def test_optional_fields_absent_accepted(self, mongo_db, qa_ids):
        payload = {
            "fullName": "QA IT27 Required Only",
            "workEmail": f"qa.it27.required.{uuid.uuid4().hex[:8]}@example.com",
            "company": "QA Optional Inc",
            "services": ["AI strategy"],
            "privacy": True,
            "marketing": False,
        }
        r = _create_ai(payload)
        assert r.status_code == 201, r.text
        sid = r.json()["id"]
        qa_ids[0].append(sid)
        qa_ids[1].append(payload["workEmail"].lower())

        doc = mongo_db.contact_enquiries.find_one({"id": sid}, {"_id": 0})
        assert doc is not None
        assert doc.get("phone") is None
        assert doc.get("role") is None
        assert doc.get("country") is None
        assert doc.get("city") is None
        assert doc.get("budget") is None
        assert doc.get("project_details") is None

    @pytest.mark.parametrize(
        "overrides",
        [
            {"fullName": "   "},
            {"company": "   "},
            {"workEmail": "bad-email"},
            {"services": []},
            {"services": ["Bad Service"]},
            {"phone": "abc###"},
            {"budget": "INR 50-100k"},
            {"privacy": False},
        ],
    )
    def test_validation_rejects_invalid_payloads(self, overrides):
        payload = _payload(**overrides)
        r = _create_ai(payload)
        assert r.status_code == 422, r.text

    def test_validation_missing_required_fields_422(self):
        payload = _payload()
        payload.pop("privacy")
        r = _create_ai(payload)
        assert r.status_code == 422, r.text

        payload2 = _payload()
        payload2.pop("services")
        r2 = _create_ai(payload2)
        assert r2.status_code == 422, r2.text

    def test_unknown_keys_rejected_422(self):
        payload = _payload(unexpectedKey="boom")
        r = _create_ai(payload)
        assert r.status_code == 422, r.text

    def test_duplicate_same_email_within_60s_returns_409(self, qa_ids):
        email = f"qa.it27.dup.{uuid.uuid4().hex[:8]}@example.com"
        payload = _payload(workEmail=email)
        r1 = _create_ai(payload)
        assert r1.status_code == 201, r1.text
        qa_ids[0].append(r1.json()["id"])
        qa_ids[1].append(email)

        r2 = _create_ai(payload)
        assert r2.status_code == 409, r2.text

    def test_public_allowlist_and_method_restrictions(self):
        # Public POST allowed on exact endpoint.
        ok_payload = _payload(workEmail=f"qa.it27.allow.{uuid.uuid4().hex[:8]}@example.com")
        ok = _create_ai(ok_payload)
        assert ok.status_code == 201, ok.text

        # Unauthenticated non-public subpath must not be publicly writable.
        bad_subpath = requests.post(f"{API}/ai-consultation-enquiries/invalid", json={}, timeout=45)
        assert bad_subpath.status_code in (401, 404, 405)

        # Wrong method on public endpoint should not be publicly accessible.
        wrong_method = requests.get(f"{API}/ai-consultation-enquiries", timeout=45)
        assert wrong_method.status_code in (401, 404, 405)

    def test_existing_contact_and_project_routes_unchanged(self):
        contact_payload = {
            "firstName": "QA",
            "lastName": "RouteCheck",
            "email": f"qa.it27.contact.{uuid.uuid4().hex[:8]}@example.com",
            "role": "Engineer",
            "message": "route regression",
            "marketingConsent": False,
        }
        rc = requests.post(f"{API}/contact-enquiries", json=contact_payload, timeout=45)
        assert rc.status_code == 200, rc.text

        project_payload = {
            "fullName": "QA Project",
            "email": f"qa.it27.project.{uuid.uuid4().hex[:8]}@example.com",
            "phone": "+1 2125551234",
            "company": "QA",
            "jobTitle": "Lead",
            "country": "United States",
            "city": "New York",
            "budget": "$ 10,000–50,000",
            "message": "Project route check",
            "privacyConsent": True,
            "marketingConsent": False,
        }
        rp = requests.post(f"{API}/project-enquiries", json=project_payload, timeout=45)
        assert rp.status_code == 200, rp.text


class TestAIConsultationAdminAndExports:
    def test_admin_list_search_detail_mark_viewed(self, admin_headers):
        email = f"qa.it27.admin.{uuid.uuid4().hex[:8]}@example.com"
        unique_name = f"QA IT27 Admin {uuid.uuid4().hex[:5]}"
        payload = _payload(
            workEmail=email,
            fullName=unique_name,
            company="QA Search Corp",
            services=["AI strategy", "AI integration"],
            budget="€ 100,000–500,000",
            marketing=False,
        )
        create = _create_ai(payload)
        assert create.status_code == 201, create.text
        sid = create.json()["id"]

        list_r = requests.get(
            f"{API}/admin/submissions/get-in-touch?search=QA%20IT27%20Admin&limit=10&page=1",
            headers=admin_headers,
            timeout=45,
        )
        assert list_r.status_code == 200, list_r.text
        data = list_r.json().get("data", [])
        match = next((x for x in data if x.get("id") == sid), None)
        assert match is not None
        assert match.get("full_name") == unique_name
        assert match.get("company_email") == email
        assert match.get("company") == "QA Search Corp"
        assert match.get("role") == payload["jobTitle"]
        assert match.get("services") == payload["services"]
        assert match.get("budget") == payload["budget"]

        detail = requests.get(
            f"{API}/admin/submission/{sid}?form_type=get_in_touch",
            headers=admin_headers,
            timeout=45,
        )
        assert detail.status_code == 200, detail.text
        d = detail.json()
        assert d["id"] == sid
        assert d["status"] == "viewed"
        assert d["privacy_consent"] is True
        assert d["marketing_consent"] is False
        assert d["source"] == "/get-in-touch-10"
        assert isinstance(d["updated_at"], str)

        delete = requests.delete(
            f"{API}/admin/submission/{sid}?form_type=get_in_touch",
            headers=admin_headers,
            timeout=45,
        )
        assert delete.status_code == 200, delete.text

    def test_admin_delete_then_404(self, admin_headers):
        create = _create_ai(_payload(workEmail=f"qa.it27.del.{uuid.uuid4().hex[:8]}@example.com"))
        assert create.status_code == 201, create.text
        sid = create.json()["id"]

        d1 = requests.delete(
            f"{API}/admin/submission/{sid}?form_type=get_in_touch",
            headers=admin_headers,
            timeout=45,
        )
        assert d1.status_code == 200, d1.text

        d2 = requests.delete(
            f"{API}/admin/submission/{sid}?form_type=get_in_touch",
            headers=admin_headers,
            timeout=45,
        )
        assert d2.status_code == 404, d2.text

    def test_admin_export_get_in_touch_contains_new_fields_and_escaped_cells(self, admin_headers):
        dangerous_email = f"qa.it27.csv.{uuid.uuid4().hex[:8]}@example.com"
        dangerous_payload = _payload(
            fullName="=QA Formula Name",
            workEmail=dangerous_email,
            phone="+12345678901",
            company="QA, CSV Corp",
            description="line1,with,commas\nline2",
            services=["AI agents", "AI integration"],
            budget="$ 500,000+",
            marketing=True,
        )
        created = _create_ai(dangerous_payload)
        assert created.status_code == 201, created.text

        r = requests.get(f"{API}/admin/export/get_in_touch", headers=admin_headers, timeout=45)
        assert r.status_code == 200, r.text

        rows = list(csv.reader(io.StringIO(r.text)))
        assert rows, "empty CSV export"
        headers = rows[0]
        for h in [
            "Full Name",
            "Company",
            "Phone",
            "Country",
            "City",
            "Budget",
            "AI Services",
            "Privacy Consent",
            "Source",
            "Updated At",
            "Marketing Consent",
        ]:
            assert h in headers

        email_idx = headers.index("Company Email")
        phone_idx = headers.index("Phone")
        full_name_idx = headers.index("Full Name")
        services_idx = headers.index("AI Services")
        row = next((x for x in rows[1:] if len(x) > email_idx and dangerous_email in x[email_idx]), None)
        assert row is not None, "created QA row missing in get_in_touch CSV"
        assert row[services_idx] == "AI agents; AI integration"
        assert row[phone_idx].startswith("'+")
        assert row[full_name_idx].startswith("'=")

    def test_admin_export_all_contains_consultation_fields(self, admin_headers):
        r = requests.get(f"{API}/admin/export/all", headers=admin_headers, timeout=45)
        assert r.status_code == 200, r.text
        rows = list(csv.reader(io.StringIO(r.text)))
        assert rows, "empty all export"
        headers = rows[0]
        for h in [
            "Budget",
            "Full Name",
            "Country",
            "City",
            "AI Services",
            "Privacy Consent",
            "Marketing Consent",
            "Page Source",
            "Updated At",
        ]:
            assert h in headers

        source_idx = headers.index("Source")
        type_idx = headers.index("Type")
        page_source_idx = headers.index("Page Source")
        has_git_row = any(
            len(rw) > page_source_idx
            and rw[source_idx] == "AI Consultation Enquiry"
            and rw[type_idx] == "get_in_touch"
            and rw[page_source_idx] == "/get-in-touch-10"
            for rw in rows[1:]
        )
        assert has_git_row

    def test_admin_endpoints_protected_unauthenticated(self):
        checks = [
            requests.get(f"{API}/admin/submissions/get-in-touch", timeout=45),
            requests.get(f"{API}/admin/submission/not-real?form_type=get_in_touch", timeout=45),
            requests.delete(f"{API}/admin/submission/not-real?form_type=get_in_touch", timeout=45),
            requests.get(f"{API}/admin/export/get_in_touch", timeout=45),
        ]
        for resp in checks:
            assert resp.status_code in (401, 403, 405)

    def test_old_legacy_record_shape_still_listable(self, admin_headers, mongo_db):
        legacy_id = f"qa-legacy-{uuid.uuid4().hex[:10]}"
        now = datetime.utcnow().isoformat()
        mongo_db.contact_enquiries.insert_one(
            {
                "id": legacy_id,
                "first_name": "Legacy",
                "last_name": "Only",
                "company_email": f"qa.it27.legacy.{uuid.uuid4().hex[:8]}@example.com",
                "role": "Legacy Role",
                "project_details": "legacy record",
                "marketing_consent": False,
                "status": "new",
                "created_at": now,
                "updated_at": now,
            }
        )
        try:
            r = requests.get(
                f"{API}/admin/submissions/get-in-touch?search=Legacy&limit=10&page=1",
                headers=admin_headers,
                timeout=45,
            )
            assert r.status_code == 200, r.text
            rows = r.json().get("data", [])
            row = next((x for x in rows if x.get("id") == legacy_id), None)
            assert row is not None
            assert row.get("first_name") == "Legacy"
            assert row.get("last_name") == "Only"
        finally:
            mongo_db.contact_enquiries.delete_one({"id": legacy_id})