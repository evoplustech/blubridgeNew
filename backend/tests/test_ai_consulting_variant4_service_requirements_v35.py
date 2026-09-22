"""AI consulting variant-4 backend validation tests (iteration 35).

# Modules/features covered: /api/ai-consulting-enquiries per-service requirement validation, legacy compatibility.
"""

import os
import uuid

import pytest
import requests
from pymongo import MongoClient


BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)

BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"

SERVICES_ALL_9 = [
    "AI Consulting & Technical Advisory",
    "Custom AI & Model Development",
    "Generative AI, LLM & RAG Systems",
    "AI Agents & Automation",
    "Model Training & Fine-Tuning",
    "GPU & AI Systems Optimisation",
    "Deployment & Integration",
    "Maintenance & Support",
    "Other",
]


def _read_env_file(path: str, key: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith(f"{key}="):
                return line.split("=", 1)[1].strip().strip('"')
    return ""


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


@pytest.fixture
def qa_cleanup(mongo_db):
    ids = []
    emails = []
    yield {"ids": ids, "emails": emails}
    if ids:
        mongo_db.contact_enquiries.delete_many({"id": {"$in": ids}})
    if emails:
        mongo_db.contact_enquiries.delete_many({"company_email": {"$in": [e.lower() for e in emails]}})


def _payload(**overrides):
    data = {
        "fullName": "TEST V35 User",
        "workEmail": f"qa.v35.{uuid.uuid4().hex[:10]}@example.com",
        "company": "TEST Systems",
        "jobTitle": "QA Engineer",
        "website": "https://example.com",
        "countryCode": "US",
        "country": "United States",
        "phoneCountry": "US",
        "phone": "415 555 2671",
        "contactPermission": True,
        "services": ["AI Consulting & Technical Advisory", "Other"],
        "formVariant": "ai-consulting-4",
        "serviceRequirements": {
            "AI Consulting & Technical Advisory": "Need strategic consulting support",
            "Other": "Need custom service planning",
        },
        "stage": "Exploring options",
        "timeline": "Within 30 days",
        "budgetType": "project",
        "estimatedBudget": "$25,000–$49,999",
        "budgetStatus": "Budget approved and available",
    }
    data.update(overrides)
    return data


def _submit(payload: dict):
    return requests.post(f"{API}/ai-consulting-enquiries", json=payload, timeout=45)


def _error_locs(response_json: dict):
    return [item.get("loc", []) for item in response_json.get("detail", [])]


def test_variant4_missing_service_requirements_returns_422_json():
    response = _submit(_payload(serviceRequirements=None))
    assert response.status_code == 422, response.text
    body = response.json()
    assert isinstance(body, dict)
    assert isinstance(body.get("detail"), list)


def test_variant4_empty_selected_requirement_returns_422_with_field_loc():
    response = _submit(
        _payload(
            serviceRequirements={
                "AI Consulting & Technical Advisory": "",
                "Other": "Valid detail",
            }
        )
    )
    assert response.status_code == 422, response.text
    detail = response.json().get("detail", [])
    assert any("Please tell us about your requirement." in str(item.get("msg")) for item in detail)
    locs = _error_locs(response.json())
    assert any(loc[:2] == ["body", "serviceRequirements"] and loc[-1] == "AI Consulting & Technical Advisory" for loc in locs)


def test_variant4_whitespace_selected_requirement_returns_422_with_field_loc():
    response = _submit(
        _payload(
            serviceRequirements={
                "AI Consulting & Technical Advisory": "   \n  \t ",
                "Other": "Valid detail",
            }
        )
    )
    assert response.status_code == 422, response.text
    locs = _error_locs(response.json())
    assert any(loc[:2] == ["body", "serviceRequirements"] and loc[-1] == "AI Consulting & Technical Advisory" for loc in locs)


def test_variant4_unknown_or_unselected_map_key_rejected_422():
    response = _submit(
        _payload(
            services=["Other"],
            serviceRequirements={
                "Other": "Need help",
                "AI Consulting & Technical Advisory": "Should not be present",
            },
        )
    )
    assert response.status_code == 422, response.text
    detail = response.json().get("detail", [])
    assert any("Requirements can only be supplied for selected services." in str(item.get("msg")) for item in detail)


def test_variant4_gpu_service_requires_display_key_not_canonical_name():
    response = _submit(
        _payload(
            services=["GPU & AI Systems Optimisation"],
            serviceRequirements={"GPU & AI Systems Optimisation": "Need GPU optimization"},
        )
    )
    assert response.status_code == 422, response.text
    detail = response.json().get("detail", [])
    assert any("AI Performance Optimization" in str(item.get("loc", [])) for item in detail)


def test_variant4_value_over_5000_rejected_422_and_json_not_500():
    too_long = "A" * 5001
    response = _submit(
        _payload(
            serviceRequirements={
                "AI Consulting & Technical Advisory": too_long,
                "Other": "Need help",
            }
        )
    )
    assert response.status_code == 422, response.text
    assert response.headers.get("content-type", "").lower().startswith("application/json")


def test_variant4_non_string_or_null_values_rejected_422():
    response = _submit(
        _payload(
            serviceRequirements={
                "AI Consulting & Technical Advisory": None,
                "Other": 123,
            }
        )
    )
    assert response.status_code == 422, response.text
    detail = response.json().get("detail", [])
    assert len(detail) >= 1


def test_variant4_all_9_services_valid_and_persisted(mongo_db, qa_cleanup):
    email = f"qa.v35.all9.{uuid.uuid4().hex[:8]}@example.com"
    requirements = {
        "AI Consulting & Technical Advisory": "Req 1",
        "Custom AI & Model Development": "Req 2",
        "Generative AI, LLM & RAG Systems": "Req 3",
        "AI Agents & Automation": "Req 4",
        "Model Training & Fine-Tuning": "Req 5",
        "AI Performance Optimization": "Req 6",
        "Deployment & Integration": "Req 7",
        "Maintenance & Support": "Req 8",
        "Other": "Req 9",
    }
    response = _submit(
        _payload(
            workEmail=email,
            services=SERVICES_ALL_9,
            serviceRequirements=requirements,
        )
    )
    assert response.status_code == 201, response.text
    enquiry_id = response.json().get("id")
    assert isinstance(enquiry_id, str) and enquiry_id
    qa_cleanup["ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0, "service_requirements": 1, "form_variant": 1})
    assert doc is not None
    assert doc.get("form_variant") == "ai-consulting-4"
    assert doc.get("service_requirements") == requirements


def test_legacy_with_other_and_requirement_still_works(mongo_db, qa_cleanup):
    email = f"qa.v35.legacy.other.{uuid.uuid4().hex[:8]}@example.com"
    payload = _payload(
        workEmail=email,
        formVariant=None,
        serviceRequirements=None,
        services=["Other"],
        requirement="Legacy single requirement path",
    )
    response = _submit(payload)
    assert response.status_code == 201, response.text
    enquiry_id = response.json().get("id")
    qa_cleanup["ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0, "project_details": 1, "service_requirements": 1})
    assert doc is not None
    assert doc.get("project_details") == "Legacy single requirement path"
    assert doc.get("service_requirements") is None


def test_legacy_non_other_blank_requirement_still_works(mongo_db, qa_cleanup):
    email = f"qa.v35.legacy.nonother.{uuid.uuid4().hex[:8]}@example.com"
    payload = _payload(
        workEmail=email,
        formVariant=None,
        serviceRequirements=None,
        services=["AI Consulting & Technical Advisory"],
        requirement="",
    )
    response = _submit(payload)
    assert response.status_code == 201, response.text
    enquiry_id = response.json().get("id")
    qa_cleanup["ids"].append(enquiry_id)
    qa_cleanup["emails"].append(email)

    doc = mongo_db.contact_enquiries.find_one({"id": enquiry_id}, {"_id": 0, "project_details": 1, "services": 1})
    assert doc is not None
    assert doc.get("project_details") == ""
    assert doc.get("services") == ["AI Consulting & Technical Advisory"]
