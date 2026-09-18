"""Backend tests for POST /api/project-enquiries (Get in Touch V7)."""
import os, time, uuid, requests, pytest
from pymongo import MongoClient

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    BASE_URL = open("/app/frontend/.env").read().split("REACT_APP_BACKEND_URL=")[1].split("\n")[0].strip().rstrip("/")
API = f"{BASE_URL}/api"
EP = f"{API}/project-enquiries"

MONGO_URL = None; DB_NAME = None
for line in open("/app/backend/.env").read().splitlines():
    if line.startswith("MONGO_URL="): MONGO_URL = line.split("=", 1)[1].strip().strip('"')
    elif line.startswith("DB_NAME="): DB_NAME = line.split("=", 1)[1].strip().strip('"')
_db = MongoClient(MONGO_URL)[DB_NAME]


def _payload(**over):
    p = {
        "fullName": "QA Tester",
        "email": f"qa.pe.{uuid.uuid4().hex[:8]}@example.com",
        "phone": "9876543210",
        "company": "Acme Corp",
        "jobTitle": "Engineer",
        "country": "India",
        "city": "Bengaluru",
        "message": "Interested in a project.",
        "privacyConsent": True,
        "marketingConsent": False,
    }
    p.update(over)
    return p


def _post(payload):
    r = requests.post(EP, json=payload, timeout=30)
    if r.status_code == 429:
        time.sleep(30)
        r = requests.post(EP, json=payload, timeout=30)
    return r


def _pause():
    time.sleep(2.5)


class TestProjectEnquiriesValid:
    def test_valid_submission_and_persistence(self):
        p = _payload(email=f"qa.pe.persist.{uuid.uuid4().hex[:8]}@Example.COM")
        r = _post(p)
        assert r.status_code == 200, r.text
        body = r.json()
        assert "id" in body and isinstance(body["id"], str)
        assert "message" in body
        doc = _db.project_enquiries.find_one({"id": body["id"]})
        assert doc, "not persisted"
        expected = {"id","full_name","email","phone","company","job_title","country","city","message","privacy_consent","marketing_consent","status","created_at","updated_at"}
        assert expected.issubset(set(doc.keys())), f"missing: {expected - set(doc.keys())}"
        assert doc["full_name"] == "QA Tester"
        assert doc["email"] == p["email"].lower()
        assert doc["job_title"] == "Engineer"
        assert doc["privacy_consent"] is True
        assert doc["status"] == "new"

    def test_country_and_message_omitted_ok(self):
        _pause()
        p = _payload(email=f"qa.pe.opt.{uuid.uuid4().hex[:8]}@example.com")
        p.pop("country"); p.pop("message")
        r = _post(p)
        assert r.status_code == 200, r.text
        doc = _db.project_enquiries.find_one({"id": r.json()["id"]})
        assert doc["country"] is None
        assert doc["message"] is None


class TestProjectEnquiriesValidation:
    @pytest.mark.parametrize("field", ["fullName", "company", "jobTitle", "city"])
    def test_blank_required_422(self, field):
        _pause()
        r = _post(_payload(**{field: "   "}))
        assert r.status_code == 422, f"{field}: {r.status_code} {r.text}"

    def test_invalid_email_422(self):
        _pause()
        r = _post(_payload(email="not-an-email"))
        assert r.status_code == 422, r.text

    def test_phone_too_short_422(self):
        _pause()
        r = _post(_payload(phone="12"))
        assert r.status_code == 422, r.text

    def test_phone_too_long_422(self):
        _pause()
        r = _post(_payload(phone="1234567890123456"))  # 16 digits
        assert r.status_code == 422, r.text

    def test_privacy_false_422(self):
        _pause()
        r = _post(_payload(privacyConsent=False))
        assert r.status_code == 422, r.text

    def test_privacy_missing_422(self):
        _pause()
        p = _payload(); p.pop("privacyConsent")
        r = _post(p)
        assert r.status_code == 422, r.text

    def test_message_1001_chars_422(self):
        _pause()
        r = _post(_payload(message="x" * 1001))
        assert r.status_code == 422, r.text


class TestProjectEnquiriesDuplicate:
    def test_duplicate_within_1_minute_409(self):
        _pause()
        p = _payload(email=f"qa.pe.dup.{uuid.uuid4().hex[:8]}@example.com")
        r1 = _post(p)
        assert r1.status_code == 200, r1.text
        time.sleep(2.5)
        r2 = _post(p)
        assert r2.status_code == 409, r2.text


class TestRegression:
    def test_contact_enquiries_still_works(self):
        _pause()
        payload = {
            "firstName": "Reg",
            "lastName": "Test",
            "email": f"qa.pe.reg.{uuid.uuid4().hex[:8]}@example.com",
            "role": "Engineer",
            "message": "regression",
            "marketingConsent": False,
        }
        r = requests.post(f"{API}/contact-enquiries", json=payload, timeout=30)
        if r.status_code == 429:
            time.sleep(30)
            r = requests.post(f"{API}/contact-enquiries", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        assert "id" in r.json()
