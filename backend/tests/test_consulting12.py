"""Tests for consulting-12 formVariant - production atlas - MINIMAL writes (1 real insert).

Requires fetching /api/form-context first (session cookie + x-bb-form-token header
+ >=0.5s elapsed) due to backend security gateway.
"""
import os
import time
import random
import string
import requests
import pytest

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://blubridge-setup.preview.emergentagent.com').rstrip('/')
ORIGIN = BASE_URL


def _rand():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Origin": ORIGIN, "Referer": ORIGIN + "/consulting-12"})
    r = s.get(f"{BASE_URL}/api/form-context", timeout=30)
    assert r.status_code == 200, f"form-context failed: {r.status_code} {r.text}"
    token = r.json()["formToken"]
    s.headers.update({"X-BB-Form-Token": token, "Content-Type": "application/json"})
    time.sleep(1.2)  # min_age=0.5, be safe
    return s


@pytest.fixture(scope="module")
def test_email():
    return f"test-c12-{_rand()}@example.com"


# ---- consulting-12 contact submit ----

def test_consulting12_submit_no_lastname(session, test_email):
    """POST /api/contacts/submit accepts formVariant consulting-12 without lastName."""
    payload = {
        "type": "contact_us",
        "formVariant": "consulting-12",
        "firstName": "C12Tester",
        "email": test_email,
        "enquiryCategory": "Explore where AI can help my business, Other: pytest smoke",
        "message": "TEST - please delete. Consulting-12 pytest submission.",
    }
    r = session.post(f"{BASE_URL}/api/contacts/submit", json=payload, timeout=30)
    assert r.status_code in (200, 201), f"Expected 200/201, got {r.status_code}: {r.text}"
    data = r.json()
    assert data.get("success") is True or "id" in data or data.get("message")


def test_consulting12_duplicate_returns_409(session, test_email):
    """Second submission within 1 minute returns 409."""
    payload = {
        "type": "contact_us",
        "formVariant": "consulting-12",
        "firstName": "C12Tester",
        "email": test_email,
        "enquiryCategory": "Explore where AI can help my business",
        "message": "TEST - please delete. Duplicate check.",
    }
    r = session.post(f"{BASE_URL}/api/contacts/submit", json=payload, timeout=30)
    assert r.status_code == 409, f"Expected 409 duplicate, got {r.status_code}: {r.text}"


def test_consulting12_missing_firstname_rejected(session):
    """Missing firstName should fail validation (no DB write)."""
    payload = {
        "type": "contact_us",
        "formVariant": "consulting-12",
        "email": f"test-c12-{_rand()}@example.com",
        "enquiryCategory": "Build a new AI solution",
        "message": "TEST - please delete.",
    }
    r = session.post(f"{BASE_URL}/api/contacts/submit", json=payload, timeout=30)
    assert r.status_code in (400, 422), f"Expected 400/422, got {r.status_code}: {r.text}"


def test_consulting12_invalid_formVariant_rejected(session):
    """Unknown formVariant must be rejected by Literal validation."""
    payload = {
        "type": "contact_us",
        "formVariant": "consulting-999",
        "firstName": "x",
        "email": f"test-c12-{_rand()}@example.com",
        "enquiryCategory": "x",
        "message": "TEST - please delete.",
    }
    r = session.post(f"{BASE_URL}/api/contacts/submit", json=payload, timeout=30)
    assert r.status_code in (400, 422), f"Expected 400/422, got {r.status_code}: {r.text}"
