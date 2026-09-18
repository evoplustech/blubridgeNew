"""Backend tests for /api/contact-enquiries (Get In Touch page)."""
import os
import time
import uuid
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/") or \
           open("/app/frontend/.env").read().split("REACT_APP_BACKEND_URL=")[1].split("\n")[0].strip().rstrip("/")

URL = f"{BASE_URL}/api/contact-enquiries"


def _payload(**overrides):
    p = {
        "firstName": "QA",
        "lastName": "Tester",
        "email": f"qa.api.{uuid.uuid4().hex[:8]}@example.com",
        "phone": "+91 9876543210",
        "company": "BluBridge QA",
        "role": "Tester",
        "enquiryType": "AI & Automation",
        "message": "Automated backend test enquiry.",
        "marketingConsent": False,
    }
    p.update(overrides)
    return p


class TestContactEnquiries:
    def test_valid_submission_returns_200_with_id(self):
        payload = _payload()
        r = requests.post(URL, json=payload, timeout=30)
        assert r.status_code == 200, r.text
        body = r.json()
        assert "message" in body and "id" in body
        assert isinstance(body["id"], str) and len(body["id"]) > 0

    def test_duplicate_within_1_minute_returns_409(self):
        payload = _payload(email=f"qa.dup.{uuid.uuid4().hex[:8]}@example.com")
        r1 = requests.post(URL, json=payload, timeout=30)
        assert r1.status_code == 200, r1.text
        r2 = requests.post(URL, json=payload, timeout=30)
        assert r2.status_code == 409, r2.text

    def test_whitespace_only_first_name_returns_422(self):
        r = requests.post(URL, json=_payload(firstName="   "), timeout=30)
        assert r.status_code == 422, r.text

    def test_invalid_email_returns_422(self):
        r = requests.post(URL, json=_payload(email="not-an-email"), timeout=30)
        assert r.status_code == 422, r.text

    def test_message_over_1500_returns_422(self):
        time.sleep(15)  # avoid rate limiter
        r = requests.post(URL, json=_payload(message="x" * 1501), timeout=30)
        if r.status_code == 429:
            time.sleep(30)
            r = requests.post(URL, json=_payload(message="x" * 1501), timeout=30)
        assert r.status_code == 422, r.text

    def test_get_not_allowed(self):
        r = requests.get(URL, timeout=30)
        # Endpoint only defines POST -> FastAPI returns 405
        assert r.status_code in (405, 401, 403), r.text
