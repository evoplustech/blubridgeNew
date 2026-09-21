"""AI consulting wizard backend regression tests.

# Modules/features covered: /api/ai-consulting-enquiries validation/mapping, admin list/detail/export security and data integrity.
"""

import csv
import io
import os
import uuid
from datetime import datetime

import pytest
import requests
from pymongo import MongoClient


BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)

BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


def _read_backend_env(key: str) -> str:
    with open("/app/backend/.env", "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith(f"{key}="):
                return line.split("=", 1)[1].strip().strip('"')
    return ""


@pytest.fixture(scope="module")
def mongo_db():
    mongo_url = _read_backend_env("MONGO_URL")
    db_name = _read_backend_env("DB_NAME")
    if not mongo_url or not db_name:
        pytest.skip("MONGO_URL/DB_NAME missing in backend/.env")
    client = MongoClient(mongo_url)
    db = client[db_name]
    yield db
    client.close()


@pytest.fixture(scope="module")
def admin_headers():
    response = requests.post(
        f"{API}/admin/login",
        json={"username": "admin", "password": "admin"},
        timeout=45,
    )
    assert response.status_code == 200, response.text
    token = response.json().get("token")
    assert isinstance(token, str) and token
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def qa_cleanup(mongo_db):
    contact_ids = []
    contact_emails = []
    project_ids = []
    yield {"contact_ids": contact_ids, "contact_emails": contact_emails, "project_ids": project_ids}
    if contact_ids:
        mongo_db.contact_enquiries.delete_many({"id": {"$in": contact_ids}})
    if contact_emails:
        mongo_db.contact_enquiries.delete_many({"company_email": {"$in": contact_emails}})
    if project_ids:
        mongo_db.project_enquiries.delete_many({"id": {"$in": project_ids}})
    mongo_db.contact_enquiries.delete_many({"company_email": {"$regex": r"^qa\.aic29\.", "$options": "i"}})


def _wizard_payload(**overrides):
    payload = {
        "fullName": "QA AIC29 User",
        "workEmail": f"qa.aic29.{uuid.uuid4().hex[:10]}@Example.COM",
        "company": "QA Systems",
        "phone": "+1 212 555 0101",
        "jobTitle": "QA Lead",
        "country": "United States",
        "city": "New York",
        "privacy": True,
        "marketing": False,
        "services": ["Other"],
        "otherRequirement": "Test specification",
        "requirement": "Test requirement",
        "stage": "Exploring options",
        "timeline": "Within 30 days",
        "budgetType": "project",
        "estimatedBudget": "$10,000–$24,999",
        "budgetStatus": "Budget approved and available",
    }
    payload.update(overrides)
    return payload


def _submit_wizard(payload):
    return requests.post(f"{API}/ai-consulting-enquiries", json=payload, timeout=45)


class TestAIConsultingWizardPublic:
    def test_submit_201_and_contact_enquiries_mapping(self, mongo_db, qa_cleanup):
        payload = _wizard_payload()
        response = _submit_wizard(payload)
        assert response.status_code == 201, response.text
        body = response.json()
        assert isinstance(body.get("id"), str) and body["id"]
        assert body.get("message") == "Your AI consulting enquiry has been received."

        qa_cleanup["contact_ids"].append(body["id"])
        qa_cleanup["contact_emails"].append(payload["workEmail"].lower())

        doc = mongo_db.contact_enquiries.find_one({"id": body["id"]}, {"_id": 0})
        assert doc is not None
        assert doc["full_name"] == payload["fullName"]
        assert doc["company_email"] == payload["workEmail"].lower()
        assert doc["company"] == payload["company"]
        assert doc["phone"] == payload["phone"]
        assert doc["role"] == payload["jobTitle"]
        assert doc["country"] == payload["country"]
        assert doc["city"] == payload["city"]
        assert doc["services"] == payload["services"]
        assert doc["other_requirement"] == payload["otherRequirement"]
        assert doc["project_details"] == payload["requirement"]
        assert doc["project_stage"] == payload["stage"]
        assert doc["start_timeline"] == payload["timeline"]
        assert doc["budget_type"] == payload["budgetType"]
        assert doc["budget"] == payload["estimatedBudget"]
        assert doc["budget_status"] == payload["budgetStatus"]
        assert doc["privacy_consent"] is True
        assert doc["marketing_consent"] is False
        assert doc["source"] == "/ai-consulting"
        assert doc["status"] == "new"
        assert isinstance(doc["created_at"], str) and isinstance(doc["updated_at"], str)

    @pytest.mark.parametrize(
        "overrides, field_name",
        [
            ({"otherRequirement": ""}, "otherRequirement"),
            ({"requirement": ""}, "requirement"),
            ({"stage": ""}, "stage"),
            ({"timeline": ""}, "timeline"),
            ({"budgetType": ""}, "budgetType"),
            ({"estimatedBudget": ""}, "estimatedBudget"),
            ({"budgetStatus": ""}, "budgetStatus"),
        ],
    )
    def test_required_and_conditional_fields_422(self, overrides, field_name):
        response = _submit_wizard(_wizard_payload(**overrides))
        assert response.status_code == 422, response.text
        detail = response.json().get("detail", [])
        assert any(field_name in str(item.get("loc", [])) for item in detail)

    def test_budget_type_stale_range_rejected_422(self):
        response = _submit_wizard(
            _wizard_payload(
                budgetType="monthly",
                estimatedBudget="$10,000–$24,999",
            )
        )
        assert response.status_code == 422, response.text
        detail = response.json().get("detail", [])
        assert any("estimatedBudget" in str(item.get("loc", [])) for item in detail)

    @pytest.mark.parametrize(
        "budget_type,budget",
        [
            ("project", "Budget not yet defined"),
            ("monthly", "Budget not yet defined"),
        ],
    )
    def test_budget_not_yet_defined_valid_for_both_types(self, budget_type, budget, qa_cleanup):
        response = _submit_wizard(_wizard_payload(budgetType=budget_type, estimatedBudget=budget))
        assert response.status_code == 201, response.text
        data = response.json()
        qa_cleanup["contact_ids"].append(data["id"])

    @pytest.mark.parametrize(
        "overrides, expected_field",
        [
            ({"phone": "abc###"}, "phone"),
            ({"privacy": False}, "privacy"),
            ({"unknownField": "nope"}, "unknownField"),
        ],
    )
    def test_phone_privacy_unknown_field_validation(self, overrides, expected_field):
        response = _submit_wizard(_wizard_payload(**overrides))
        assert response.status_code == 422, response.text
        detail = response.json().get("detail", [])
        assert any(expected_field in str(item) for item in detail)

    def test_duplicate_email_within_60_seconds_returns_409(self, qa_cleanup):
        email = f"qa.aic29.dup.{uuid.uuid4().hex[:8]}@example.com"
        payload = _wizard_payload(workEmail=email)
        first = _submit_wizard(payload)
        assert first.status_code == 201, first.text
        qa_cleanup["contact_ids"].append(first.json()["id"])
        qa_cleanup["contact_emails"].append(email)

        second = _submit_wizard(payload)
        assert second.status_code == 409, second.text

    def test_public_post_exact_only_and_non_public_methods_blocked(self):
        bad_subpath = requests.post(f"{API}/ai-consulting-enquiries/invalid", json={}, timeout=45)
        assert bad_subpath.status_code in (401, 404, 405)

        get_response = requests.get(f"{API}/ai-consulting-enquiries", timeout=45)
        assert get_response.status_code in (401, 404, 405)


class TestAdminAndLegacyIntegrity:
    def test_admin_list_and_detail_show_wizard_fields(self, admin_headers, qa_cleanup):
        email = f"qa.aic29.admin.{uuid.uuid4().hex[:8]}@example.com"
        payload = _wizard_payload(
            fullName=f"QA AIC29 Admin {uuid.uuid4().hex[:6]}",
            workEmail=email,
            services=["Other"],
            otherRequirement="Admin list check",
            budgetType="monthly",
            estimatedBudget="$25,000–$49,999 per month",
        )
        created = _submit_wizard(payload)
        assert created.status_code == 201, created.text
        enquiry_id = created.json()["id"]
        qa_cleanup["contact_ids"].append(enquiry_id)
        qa_cleanup["contact_emails"].append(email)

        list_response = requests.get(
            f"{API}/admin/submissions/get-in-touch?search={email}&page=1&limit=10",
            headers=admin_headers,
            timeout=45,
        )
        assert list_response.status_code == 200, list_response.text
        data = list_response.json().get("data", [])
        row = next((item for item in data if item.get("id") == enquiry_id), None)
        assert row is not None
        assert row.get("company_email") == email
        assert row.get("budget") == payload["estimatedBudget"]

        detail_response = requests.get(
            f"{API}/admin/submission/{enquiry_id}?form_type=get_in_touch",
            headers=admin_headers,
            timeout=45,
        )
        assert detail_response.status_code == 200, detail_response.text
        detail = detail_response.json()
        assert detail["status"] == "viewed"
        assert detail["other_requirement"] == payload["otherRequirement"]
        assert detail["project_stage"] == payload["stage"]
        assert detail["start_timeline"] == payload["timeline"]
        assert detail["budget_type"] == payload["budgetType"]
        assert detail["budget_status"] == payload["budgetStatus"]
        assert detail["source"] == "/ai-consulting"

    def test_protected_admin_routes_require_valid_token(self):
        no_auth = requests.get(f"{API}/admin/submissions/get-in-touch?page=1&limit=10", timeout=45)
        bad_auth = requests.get(
            f"{API}/admin/submission/not-real-id?form_type=get_in_touch",
            headers={"Authorization": "Bearer bad-token"},
            timeout=45,
        )
        export_no_auth = requests.get(f"{API}/admin/export/get_in_touch", timeout=45)
        delete_no_auth = requests.delete(f"{API}/admin/submission/not-real-id?form_type=get_in_touch", timeout=45)
        assert no_auth.status_code in (401, 403, 405)
        assert bad_auth.status_code in (401, 403, 405)
        assert export_no_auth.status_code in (401, 403, 405)
        assert delete_no_auth.status_code in (401, 403, 405)

    def test_get_in_touch_csv_has_all_wizard_columns_and_values(self, admin_headers, qa_cleanup):
        email = f"qa.aic29.csv.{uuid.uuid4().hex[:8]}@example.com"
        payload = _wizard_payload(
            fullName="=QA AIC29 CSV",
            workEmail=email,
            services=["Other", "Deployment & Integration"],
            otherRequirement="CSV other field",
            budgetType="project",
            estimatedBudget="$100,000–$249,999",
            marketing=True,
        )
        created = _submit_wizard(payload)
        assert created.status_code == 201, created.text
        qa_cleanup["contact_ids"].append(created.json()["id"])
        qa_cleanup["contact_emails"].append(email)

        export_response = requests.get(f"{API}/admin/export/get_in_touch", headers=admin_headers, timeout=45)
        assert export_response.status_code == 200, export_response.text
        rows = list(csv.reader(io.StringIO(export_response.text)))
        assert rows
        headers = rows[0]
        for required_header in [
            "Other Requirement",
            "Project Stage",
            "Expected Start Timeline",
            "Budget Type",
            "Budget Status",
            "Marketing Consent",
            "Privacy Consent",
            "Source",
        ]:
            assert required_header in headers

        email_idx = headers.index("Company Email")
        row = next((r for r in rows[1:] if len(r) > email_idx and r[email_idx].lower() == email.lower()), None)
        assert row is not None
        full_name_idx = headers.index("Full Name")
        budget_type_idx = headers.index("Budget Type")
        other_idx = headers.index("Other Requirement")
        source_idx = headers.index("Source")
        assert row[full_name_idx].startswith("'=")
        assert row[budget_type_idx] == "Total project / initial engagement budget"
        assert row[other_idx] == payload["otherRequirement"]
        assert row[source_idx] == "/ai-consulting"

    def test_all_export_contains_ai_consulting_row_and_wizard_values(self, admin_headers):
        response = requests.get(f"{API}/admin/export/all", headers=admin_headers, timeout=45)
        assert response.status_code == 200, response.text
        rows = list(csv.reader(io.StringIO(response.text)))
        assert rows
        headers = rows[0]
        for required_header in [
            "Source",
            "Type",
            "Page Source",
            "Other Requirement",
            "Project Stage",
            "Expected Start Timeline",
            "Budget Type",
            "Budget Status",
        ]:
            assert required_header in headers

        source_idx = headers.index("Source")
        type_idx = headers.index("Type")
        page_source_idx = headers.index("Page Source")
        has_ai_consulting = any(
            len(row) > page_source_idx
            and row[source_idx] == "AI Consulting Enquiry"
            and row[type_idx] == "get_in_touch"
            and row[page_source_idx] in ("/ai-consulting", "/get-in-touch-10")
            for row in rows[1:]
        )
        assert has_ai_consulting

    def test_project_enquiries_collection_preserved_and_legacy_public_post_works(self, mongo_db, qa_cleanup):
        before_ids = [d["id"] for d in mongo_db.project_enquiries.find({}, {"_id": 0, "id": 1}).limit(25)]
        before_count = mongo_db.project_enquiries.count_documents({})

        payload = {
            "fullName": "QA AIC29 Legacy Project",
            "email": f"qa.aic29.project.{uuid.uuid4().hex[:8]}@example.com",
            "phone": "+1 415 555 0102",
            "company": "QA Legacy",
            "jobTitle": "Manager",
            "country": "United States",
            "city": "San Francisco",
            "budget": "$ 10,000–50,000",
            "message": "Legacy endpoint regression",
            "privacyConsent": True,
            "marketingConsent": False,
        }
        created = requests.post(f"{API}/project-enquiries", json=payload, timeout=45)
        assert created.status_code == 200, created.text
        created_id = created.json().get("id")
        assert isinstance(created_id, str) and created_id
        qa_cleanup["project_ids"].append(created_id)

        after_ids = [d["id"] for d in mongo_db.project_enquiries.find({}, {"_id": 0, "id": 1}).limit(25)]
        for existing_id in before_ids:
            assert existing_id in after_ids or mongo_db.project_enquiries.count_documents({"id": existing_id}) == 1

        mongo_db.project_enquiries.delete_one({"id": created_id})
        final_count = mongo_db.project_enquiries.count_documents({})
        assert final_count == before_count
