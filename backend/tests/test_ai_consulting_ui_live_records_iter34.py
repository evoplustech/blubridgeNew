"""Iteration 34 live-UI submission record checks.

# Modules/features covered: admin detail API persistence for with/without Other and QA data cleanup.
"""

import os
import re

import pytest
import requests
from pymongo import MongoClient


BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)

BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"

WITH_OTHER_ID = "7f2248d0-d6f3-4282-85f4-b398954aa158"
WITHOUT_OTHER_ID = "b013c90a-d1ba-474e-84dd-2d5acc490061"
WITH_OTHER_EMAIL = "qa.iter34.with.other.eee657cb@example.com"
WITHOUT_OTHER_EMAIL = "qa.iter34.no.other.863b243e@example.com"


def _read_env_file(path: str, key: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith(f"{key}="):
                return line.split("=", 1)[1].strip().strip('"')
    return ""


def _read_admin_creds() -> tuple[str, str]:
    username = "admin"
    password = "admin"
    path = "/app/memory/test_credentials.md"
    if not os.path.exists(path):
        return username, password

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    user_match = re.search(r"Username:\s*([^\n]+)", content)
    pass_match = re.search(r"Password:\s*([^\n]+)", content)
    if user_match:
        username = user_match.group(1).strip()
    if pass_match:
        password = pass_match.group(1).strip()
    return username, password


@pytest.fixture(scope="module")
def mongo_db():
    mongo_url = _read_env_file("/app/backend/.env", "MONGO_URL")
    db_name = _read_env_file("/app/backend/.env", "DB_NAME")
    if not mongo_url or not db_name:
        pytest.skip("MONGO_URL/DB_NAME missing in backend/.env")
    client = MongoClient(mongo_url)
    db = client[db_name]
    yield db
    client.close()


@pytest.fixture(scope="module")
def admin_headers():
    username, password = _read_admin_creds()
    response = requests.post(
        f"{API}/admin/login",
        json={"username": username, "password": password},
        timeout=45,
    )
    assert response.status_code == 200, response.text
    token = response.json().get("token")
    assert isinstance(token, str) and token
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture(scope="module", autouse=True)
def cleanup_generated_records(mongo_db):
    yield
    mongo_db.contact_enquiries.delete_many({"id": {"$in": [WITH_OTHER_ID, WITHOUT_OTHER_ID]}})
    mongo_db.contact_enquiries.delete_many(
        {"company_email": {"$in": [WITH_OTHER_EMAIL.lower(), WITHOUT_OTHER_EMAIL.lower()]}}
    )


def test_admin_detail_persistence_for_with_and_without_other(admin_headers):
    with_other = requests.get(
        f"{API}/admin/submission/{WITH_OTHER_ID}?form_type=get_in_touch",
        headers=admin_headers,
        timeout=45,
    )
    assert with_other.status_code == 200, with_other.text
    with_other_data = with_other.json()
    assert with_other_data.get("company_email", "").lower() == WITH_OTHER_EMAIL
    assert with_other_data.get("project_details") == "Need AI strategy, architecture, and delivery support."
    assert with_other_data.get("other_requirement") in (None, "")
    assert "Other" in with_other_data.get("services", [])

    without_other = requests.get(
        f"{API}/admin/submission/{WITHOUT_OTHER_ID}?form_type=get_in_touch",
        headers=admin_headers,
        timeout=45,
    )
    assert without_other.status_code == 200, without_other.text
    without_other_data = without_other.json()
    assert without_other_data.get("company_email", "").lower() == WITHOUT_OTHER_EMAIL
    assert without_other_data.get("project_details") == ""
    assert without_other_data.get("other_requirement") in (None, "")
    assert "Other" not in without_other_data.get("services", [])
