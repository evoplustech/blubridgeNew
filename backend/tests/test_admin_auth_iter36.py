"""Admin auth/session security regression checks (iteration 36).

# Modules/features covered: /api/admin/session, /api/admin/login, /api/admin/verify, /api/admin/logout,
# cookie security flags, and stored bcrypt hash format in admin_settings.
"""

import os

import pytest
import requests
from dotenv import dotenv_values
from pymongo import MongoClient


BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)

BASE_URL = BASE_URL.rstrip("/")


@pytest.fixture(scope="module")
def env_data():
    env = dotenv_values("/app/backend/.env")
    username = env.get("ADMIN_USERNAME")
    password = env.get("ADMIN_PASSWORD")
    mongo_url = env.get("MONGO_URL")
    db_name = env.get("DB_NAME")
    if not username or not password:
        pytest.skip("Missing ADMIN_USERNAME/ADMIN_PASSWORD in backend/.env")
    if not mongo_url or not db_name:
        pytest.skip("Missing MONGO_URL/DB_NAME in backend/.env")
    return {
        "username": username,
        "password": password,
        "mongo_url": mongo_url,
        "db_name": db_name,
    }


def test_admin_auth_cookie_session_and_logout(env_data):
    session = requests.Session()

    csrf_resp = session.get(f"{BASE_URL}/api/admin/session", timeout=30)
    assert csrf_resp.status_code == 200, csrf_resp.text
    csrf_token = csrf_resp.json().get("csrfToken")
    assert isinstance(csrf_token, str) and csrf_token

    login_resp = session.post(
        f"{BASE_URL}/api/admin/login",
        json={"username": env_data["username"], "password": env_data["password"]},
        headers={"X-CSRF-Token": csrf_token, "Origin": BASE_URL},
        timeout=30,
    )
    assert login_resp.status_code == 200, login_resp.text

    set_cookie = login_resp.headers.get("set-cookie", "").lower()
    assert "httponly" in set_cookie
    assert "secure" in set_cookie
    assert "samesite=strict" in set_cookie
    assert "path=/" in set_cookie

    verify_resp = session.get(f"{BASE_URL}/api/admin/verify", timeout=30)
    assert verify_resp.status_code == 200, verify_resp.text

    logout_resp = session.post(f"{BASE_URL}/api/admin/logout", headers={"X-CSRF-Token": login_resp.json().get("csrfToken", "")}, timeout=30)
    assert logout_resp.status_code == 200, logout_resp.text

    verify_after = session.get(f"{BASE_URL}/api/admin/verify", timeout=30)
    assert verify_after.status_code == 401, verify_after.text


def test_admin_password_hash_uses_bcrypt_2b(env_data):
    client = MongoClient(env_data["mongo_url"])
    try:
        doc = client[env_data["db_name"]].admin_settings.find_one({"type": "credentials"}, {"_id": 0, "passwordHash": 1})
        assert doc is not None
        encoded = doc.get("passwordHash", "")
        assert isinstance(encoded, str)
        assert encoded.startswith("$2b$")
    finally:
        client.close()
