"""Backend tests for /api/contacts/submit with formVariant=consulting-9."""
import os
import time
import random
import string
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://blubridge-setup.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


def rand_email(tag='c9'):
    suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    return f"test-{tag}-{suffix}@example.com"


def _post_with_form_token(payload):
    session = requests.Session()
    ctx = session.get(f"{API}/form-context", timeout=30)
    assert ctx.status_code == 200, ctx.text
    form_token = ctx.json().get("formToken")
    assert form_token
    time.sleep(1.2)
    return session.post(
        f"{API}/contacts/submit",
        json=payload,
        headers={"Origin": BASE_URL, "X-BB-Form-Token": form_token, "Content-Type": "application/json"},
        timeout=30,
    )


def test_consulting9_submit_no_lastname_success():
    body = {
        "type": "contact_us",
        "formVariant": "consulting-9",
        "firstName": "SoloName",
        "email": rand_email('c9a'),
        "enquiryCategory": "AI Strategy, Generative AI",
        "message": "TEST - please delete - automated consulting-9 submission (no lastName).",
    }
    r = _post_with_form_token(body)
    # Accept 200/201. If 429 rate-limited by prior tests, skip.
    if r.status_code == 429:
        import pytest; pytest.skip("rate limited")
    assert r.status_code in (200, 201), f"unexpected {r.status_code}: {r.text}"


def test_consulting9_invalid_variant_rejected():
    body = {
        "type": "contact_us",
        "formVariant": "consulting-99",
        "firstName": "Bad",
        "lastName": "Variant",
        "email": rand_email('c9bad'),
        "enquiryCategory": "AI Strategy",
        "message": "TEST - please delete - bad variant check.",
    }
    r = _post_with_form_token(body)
    if r.status_code == 429:
        import pytest; pytest.skip("rate limited")
    assert r.status_code in (400, 422), f"expected 400/422 got {r.status_code}: {r.text}"


def test_consulting9_missing_email_rejected():
    body = {
        "type": "contact_us",
        "formVariant": "consulting-9",
        "firstName": "NoEmail",
        "enquiryCategory": "AI Strategy",
        "message": "TEST - please delete",
    }
    r = _post_with_form_token(body)
    if r.status_code == 429:
        import pytest; pytest.skip("rate limited")
    assert r.status_code in (400, 422), f"expected 400/422 got {r.status_code}: {r.text}"
