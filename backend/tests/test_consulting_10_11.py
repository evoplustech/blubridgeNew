"""Backend tests for consulting-10 / consulting-11 formVariant submissions."""
import os
import random
import string
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://blubridge-setup.preview.emergentagent.com').rstrip('/')


def _rand(n=8):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=n))


def _submit(variant):
    email = f"test-{variant}-{_rand()}@example.com"
    payload = {
        "type": "contact_us",
        "formVariant": variant,
        "firstName": "Testbot",
        "email": email,
        "enquiryCategory": "Explore where AI can help my business, Other: TEST - please delete",
        "message": f"TEST - please delete. Automated regression test for {variant}.",
    }
    s = requests.Session()
    # Get signed form token (must be at least 0.5s old before submit)
    import time
    ctx = s.get(f"{BASE_URL}/api/form-context", timeout=15)
    assert ctx.status_code == 200, ctx.text
    token = ctx.json()["formToken"]
    time.sleep(1.1)
    headers = {"X-BB-Form-Token": token, "Origin": BASE_URL, "Referer": BASE_URL + "/"}
    r = s.post(f"{BASE_URL}/api/contacts/submit", json=payload, headers=headers, timeout=30)
    return r, email


def test_consulting_10_accepts_no_lastname():
    r, email = _submit('consulting-10')
    assert r.status_code in (200, 201), f"Unexpected {r.status_code}: {r.text}"
    data = r.json()
    assert data.get("success") is True or data.get("id") or "message" in data, data


def test_consulting_11_accepts_no_lastname():
    r, email = _submit('consulting-11')
    assert r.status_code in (200, 201), f"Unexpected {r.status_code}: {r.text}"
    data = r.json()
    assert data.get("success") is True or data.get("id") or "message" in data, data
