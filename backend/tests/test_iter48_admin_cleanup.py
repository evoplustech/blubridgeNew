"""iter48: admin verification + cleanup for QA records created by Playwright."""
import os
import pytest
import requests
from dotenv import dotenv_values

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://blubridge-setup.preview.emergentagent.com').rstrip('/')
_env = dotenv_values('/app/backend/.env')
ADMIN_USERNAME = _env.get('ADMIN_USERNAME')
ADMIN_PASSWORD = _env.get('ADMIN_PASSWORD')


@pytest.fixture(scope="module")
def admin_session():
    s = requests.Session()
    r = s.get(f"{BASE_URL}/api/admin/session", timeout=15)
    assert r.status_code == 200, f"session init failed: {r.status_code}"
    csrf = r.json().get('csrfToken') or r.json().get('csrf_token') or r.headers.get('X-CSRF-Token')
    assert csrf, f"no csrf token in {r.json()}"
    login = s.post(
        f"{BASE_URL}/api/admin/login",
        json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD},
        headers={"X-CSRF-Token": csrf, "Content-Type": "application/json"},
        timeout=15,
    )
    assert login.status_code == 200, f"login failed: {login.status_code} {login.text[:200]}"
    # refresh csrf after login (session may rotate)
    r2 = s.get(f"{BASE_URL}/api/admin/session", timeout=15)
    csrf2 = r2.json().get('csrfToken') or r2.json().get('csrf_token') or csrf
    s.headers.update({"X-CSRF-Token": csrf2})
    yield s
    try:
        s.post(f"{BASE_URL}/api/admin/logout", headers={"X-CSRF-Token": csrf2}, timeout=10)
    except Exception:
        pass


def _find_career_app(session, email):
    r = session.get(f"{BASE_URL}/api/job-applications", timeout=20)
    assert r.status_code == 200, f"list failed: {r.status_code} {r.text[:200]}"
    data = r.json()
    items = data if isinstance(data, list) else data.get('items') or data.get('data') or []
    for it in items:
        if (it.get('email') or '').lower() == email.lower():
            return it
    return None


def test_career_qa_record_exists_and_resume_downloads(admin_session):
    email = "qa.careers.delete@example.com"
    app = _find_career_app(admin_session, email)
    assert app is not None, f"QA career app with email {email} not found"
    app_id = app.get('id') or app.get('_id')
    assert app_id, f"no id on record: {app}"
    print(f"Found career app id={app_id}")
    # resume download
    r = admin_session.get(f"{BASE_URL}/api/admin/resume/{app_id}", timeout=20)
    assert r.status_code == 200, f"resume download failed: {r.status_code} {r.text[:200]}"
    assert len(r.content) > 100, f"resume too small: {len(r.content)}"
    assert r.content[:5] == b"%PDF-", f"not a PDF: {r.content[:20]!r}"
    print(f"Resume ok {len(r.content)} bytes")


def test_delete_career_qa_record(admin_session):
    email = "qa.careers.delete@example.com"
    app = _find_career_app(admin_session, email)
    if app is None:
        pytest.skip("no QA record to delete (already cleaned up)")
    app_id = app.get('id') or app.get('_id')
    r = admin_session.delete(
        f"{BASE_URL}/api/admin/submission/{app_id}",
        params={"form_type": "career"},
        timeout=20,
    )
    assert r.status_code in (200, 204), f"delete failed: {r.status_code} {r.text[:200]}"
    # verify gone
    app2 = _find_career_app(admin_session, email)
    assert app2 is None, f"record still present after delete: {app2}"
    # resume should 404
    r2 = admin_session.get(f"{BASE_URL}/api/admin/resume/{app_id}", timeout=10)
    assert r2.status_code in (404, 410), f"resume still accessible: {r2.status_code}"
    print("Career QA record and resume cleaned up")
