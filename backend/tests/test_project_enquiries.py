"""Backend tests for /api/project-enquiries + related admin project enquiry endpoints."""

import os
import sys
import time
import uuid

import pytest
import requests
from pydantic import ValidationError
from pymongo import MongoClient

sys.path.append("/app/backend")
from server import ProjectEnquiry


# Module: Environment + helpers for public API and DB verification
BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    with open("/app/frontend/.env", "r", encoding="utf-8") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                break

API = f"{BASE_URL}/api"
PROJECT_EP = f"{API}/project-enquiries"

MONGO_URL = None
DB_NAME = None
with open("/app/backend/.env", "r", encoding="utf-8") as f:
    for line in f:
        if line.startswith("MONGO_URL="):
            MONGO_URL = line.split("=", 1)[1].strip().strip('"')
        elif line.startswith("DB_NAME="):
            DB_NAME = line.split("=", 1)[1].strip().strip('"')

_db = MongoClient(MONGO_URL)[DB_NAME]

BUDGET_RANGES = [
    "Under 10,000",
    "10,000–50,000",
    "50,000–100,000",
    "100,000–500,000",
    "500,000+",
]
BUDGET_CURRENCIES = ["₹", "$", "€"]


def _payload(**overrides):
    payload = {
        "fullName": "TEST_QA Project",
        "email": f"test.qa.pe.{uuid.uuid4().hex[:8]}@example.com",
        "phone": "9876543210",
        "company": "TEST_QA Company",
        "jobTitle": "Engineer",
        "country": "India",
        "city": "Bengaluru",
        "budget": "₹ 10,000–50,000",
        "message": "Interested in a project.",
        "privacyConsent": True,
        "marketingConsent": False,
    }
    payload.update(overrides)
    return payload


def _post_with_retry(url, json_data):
    response = requests.post(url, json=json_data, timeout=30)
    if response.status_code == 429:
        time.sleep(30)
        response = requests.post(url, json=json_data, timeout=30)
    return response


def _pause_public_submit():
    time.sleep(2.6)


@pytest.fixture(scope="module")
def admin_token():
    """Module: admin auth token for protected project enquiry APIs."""
    response = requests.post(
        f"{API}/admin/login",
        json={"username": "admin", "password": "admin"},
        timeout=30,
    )
    assert response.status_code == 200, response.text
    token = response.json().get("token")
    assert token and isinstance(token, str)
    return token


@pytest.fixture(scope="module", autouse=True)
def cleanup_test_records():
    """Module: cleanup test records created by this test module."""
    yield
    _db.project_enquiries.delete_many(
        {
            "$or": [
                {"full_name": {"$regex": r"^TEST_QA"}},
                {"email": {"$regex": r"^test\.qa\.pe\."}},
            ]
        }
    )


# Module: project enquiry submit + model validation for budget combinations
class TestProjectEnquiriesBudget:
    def test_valid_submission_persists_budget_exact_value(self):
        _pause_public_submit()
        payload = _payload(
            email=f"test.qa.pe.persist.{uuid.uuid4().hex[:8]}@Example.COM",
            budget="€ 100,000–500,000",
        )
        response = _post_with_retry(PROJECT_EP, payload)
        assert response.status_code == 200, response.text
        data = response.json()
        assert isinstance(data.get("id"), str)

        doc = _db.project_enquiries.find_one({"id": data["id"]})
        assert doc is not None
        assert doc["email"] == payload["email"].lower()
        assert doc["budget"] == "€ 100,000–500,000"

    @pytest.mark.parametrize(
        "budget_value",
        [
            None,
            "",
            " ",
            "USD 10,000–50,000",
            "₹ invalid",
            "10,000–50,000",
            "€10,000–50,000",
        ],
    )
    def test_invalid_budget_values_rejected_with_422(self, budget_value):
        _pause_public_submit()
        payload = _payload(email=f"test.qa.pe.bad.{uuid.uuid4().hex[:8]}@example.com")
        payload["budget"] = budget_value
        response = _post_with_retry(PROJECT_EP, payload)
        assert response.status_code == 422, response.text

    def test_missing_budget_rejected_with_422(self):
        _pause_public_submit()
        payload = _payload(email=f"test.qa.pe.missing.{uuid.uuid4().hex[:8]}@example.com")
        payload.pop("budget")
        response = _post_with_retry(PROJECT_EP, payload)
        assert response.status_code == 422, response.text

    def test_model_accepts_all_15_currency_range_combinations(self):
        valid_count = 0
        for currency in BUDGET_CURRENCIES:
            for budget_range in BUDGET_RANGES:
                model = ProjectEnquiry.model_validate(
                    _payload(
                        email=f"test.qa.pe.model.{uuid.uuid4().hex[:8]}@example.com",
                        budget=f"{currency} {budget_range}",
                    )
                )
                assert model.budget == f"{currency} {budget_range}"
                valid_count += 1
        assert valid_count == 15

    def test_model_rejects_invalid_budget_string(self):
        with pytest.raises(ValidationError):
            ProjectEnquiry.model_validate(
                _payload(
                    email=f"test.qa.pe.modelbad.{uuid.uuid4().hex[:8]}@example.com",
                    budget="$ 1-2",
                )
            )


# Module: admin project enquiry endpoints (list/detail/delete/export/stats + auth rejection)
class TestAdminProjectEnquiries:
    @pytest.mark.parametrize(
        "method,path",
        [
            ("GET", "/admin/submissions/project-enquiries?page=1&limit=10"),
            ("GET", "/admin/submission/not-real-id?form_type=project_enquiry"),
            ("DELETE", "/admin/submission/not-real-id?form_type=project_enquiry"),
            ("GET", "/admin/export/project_enquiry"),
            ("GET", "/admin/dashboard/stats"),
        ],
    )
    def test_protected_project_admin_endpoints_reject_missing_invalid_tokens(self, method, path):
        no_token = requests.request(method, f"{API}{path}", timeout=30)
        assert no_token.status_code in (401, 405), no_token.text

        bad_token = requests.request(
            method,
            f"{API}{path}",
            headers={"Authorization": "Bearer invalid-token"},
            timeout=30,
        )
        assert bad_token.status_code in (401, 405), bad_token.text

    def test_admin_project_list_includes_budget_field(self, admin_token):
        response = requests.get(
            f"{API}/admin/submissions/project-enquiries?page=1&limit=10",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=30,
        )
        assert response.status_code == 200, response.text
        body = response.json()
        assert "data" in body and isinstance(body["data"], list)
        assert "total" in body and isinstance(body["total"], int)
        if body["data"]:
            assert "budget" in body["data"][0]

    def test_admin_detail_handles_legacy_doc_without_budget(self, admin_token):
        legacy_id = f"TEST_QA_LEGACY_{uuid.uuid4().hex[:8]}"
        now = time.strftime("%Y-%m-%dT%H:%M:%S+00:00")
        _db.project_enquiries.insert_one(
            {
                "id": legacy_id,
                "full_name": "TEST_QA Legacy",
                "email": f"test.qa.pe.legacy.{uuid.uuid4().hex[:8]}@example.com",
                "phone": "9999999999",
                "company": "TEST_QA Legacy Co",
                "job_title": "Analyst",
                "country": None,
                "city": "Berlin",
                "message": "legacy",
                "privacy_consent": True,
                "marketing_consent": False,
                "status": "new",
                "created_at": now,
                "updated_at": now,
            }
        )

        response = requests.get(
            f"{API}/admin/submission/{legacy_id}?form_type=project_enquiry",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=30,
        )
        assert response.status_code == 200, response.text
        data = response.json()
        assert data["id"] == legacy_id
        assert data.get("budget") is None
        assert data["status"] == "viewed"

    def test_admin_delete_project_enquiry_and_verify_removed(self, admin_token):
        _pause_public_submit()
        payload = _payload(
            email=f"test.qa.pe.delete.{uuid.uuid4().hex[:8]}@example.com",
            fullName="TEST_QA Delete",
            budget="$ 50,000–100,000",
        )
        created = _post_with_retry(PROJECT_EP, payload)
        assert created.status_code == 200, created.text
        created_id = created.json()["id"]

        deleted = requests.delete(
            f"{API}/admin/submission/{created_id}?form_type=project_enquiry",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=30,
        )
        assert deleted.status_code == 200, deleted.text
        assert deleted.json().get("success") is True

        detail_after_delete = requests.get(
            f"{API}/admin/submission/{created_id}?form_type=project_enquiry",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=30,
        )
        assert detail_after_delete.status_code == 404, detail_after_delete.text

    def test_admin_exports_include_budget(self, admin_token):
        project_export = requests.get(
            f"{API}/admin/export/project_enquiry",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=30,
        )
        assert project_export.status_code == 200, project_export.text
        assert "Budget" in project_export.text.splitlines()[0]

        all_export = requests.get(
            f"{API}/admin/export/all",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=30,
        )
        assert all_export.status_code == 200, all_export.text
        header = all_export.text.splitlines()[0]
        assert "Budget" in header
        assert "Project Enquiry" in all_export.text

    def test_admin_dashboard_stats_has_project_enquiries(self, admin_token):
        response = requests.get(
            f"{API}/admin/dashboard/stats",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=30,
        )
        assert response.status_code == 200, response.text
        data = response.json()
        assert "project_enquiries" in data
        assert "total" in data["project_enquiries"]
        assert "new" in data["project_enquiries"]
