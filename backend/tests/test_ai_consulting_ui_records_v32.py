"""UI-created AI consulting records verification for iteration 32.

# Modules/features covered: admin protected list/detail/export retrieval for UI submissions and QA cleanup.
"""

import csv
import io
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

UI_EMAILS = [
    "qa.aic32.var2.t1.20260221a@example.com",
    "qa.aic32.var1.t1.20260221a@example.com",
]


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
def cleanup_ui_records(mongo_db):
    yield
    mongo_db.contact_enquiries.delete_many({"company_email": {"$in": [email.lower() for email in UI_EMAILS]}})


def test_admin_list_and_detail_for_ui_created_records(admin_headers):
    found_ids = []

    for email in UI_EMAILS:
        listing = requests.get(
            f"{API}/admin/submissions/get-in-touch?search={email}&page=1&limit=10",
            headers=admin_headers,
            timeout=45,
        )
        assert listing.status_code == 200, listing.text
        rows = listing.json().get("data", [])
        row = next((item for item in rows if item.get("company_email", "").lower() == email.lower()), None)
        assert row is not None
        assert row.get("source") == "/ai-consulting"
        assert row.get("country_code") == "IN"
        assert row.get("phone_country") == "IN"
        found_ids.append(row["id"])

        detail = requests.get(
            f"{API}/admin/submission/{row['id']}?form_type=get_in_touch",
            headers=admin_headers,
            timeout=45,
        )
        assert detail.status_code == 200, detail.text
        body = detail.json()
        assert body.get("company_email", "").lower() == email.lower()
        assert body.get("initiative_role") is not None
        assert body.get("other_role") == "Programme sponsor"
        assert body.get("other_requirement") == "Need custom requirement support"
        assert body.get("contact_permission") is True

    assert len(found_ids) == 2


def test_admin_export_get_in_touch_contains_ui_created_records(admin_headers):
    exported = requests.get(f"{API}/admin/export/get_in_touch", headers=admin_headers, timeout=45)
    assert exported.status_code == 200, exported.text
    rows = list(csv.reader(io.StringIO(exported.text)))
    headers = rows[0]

    required_headers = [
        "Company Email",
        "Country Code",
        "Phone Country",
        "Calling Code",
        "Source",
        "Role In Initiative",
        "Other Role",
        "Other Requirement",
        "Contact Permission",
    ]
    for header in required_headers:
        assert header in headers

    email_idx = headers.index("Company Email")
    for email in UI_EMAILS:
        row = next((r for r in rows[1:] if len(r) > email_idx and r[email_idx].lower() == email.lower()), None)
        assert row is not None
        assert row[headers.index("Country Code")] == "IN"
        assert row[headers.index("Phone Country")] == "IN"
        assert row[headers.index("Calling Code")] in ("'+91", "+91")
        assert row[headers.index("Source")] == "/ai-consulting"
        assert row[headers.index("Other Role")] == "Programme sponsor"
        assert row[headers.index("Contact Permission")] == "Yes"
