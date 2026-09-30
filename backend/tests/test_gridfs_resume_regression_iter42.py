"""Iteration 42 regression: verify GridFS resume upload, admin download,
duplicate handling, retry after invalid file, and other public/admin forms."""
import io
import os
import time
import uuid
import requests
from dotenv import dotenv_values

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else \
    dotenv_values("/app/frontend/.env")["REACT_APP_BACKEND_URL"].rstrip("/")

ADMIN = dotenv_values("/app/backend/.env")
ADMIN_USERNAME = ADMIN["ADMIN_USERNAME"].strip("'\"")
ADMIN_PASSWORD = ADMIN["ADMIN_PASSWORD"].strip("'\"")

ORIGIN = BASE_URL  # allowlisted


def _new_session():
    s = requests.Session()
    s.headers.update({"Origin": ORIGIN, "Referer": ORIGIN + "/"})
    return s


def _form_ctx(s):
    r = s.get(f"{BASE_URL}/api/form-context")
    assert r.status_code == 200, r.text
    token = r.json()["formToken"]
    time.sleep(0.7)  # min_age 0.5s
    return token


def _pdf_bytes():
    # tiny valid PDF
    return (
        b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n"
        b"2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n"
        b"3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 100 100]>>endobj\n"
        b"xref\n0 4\n0000000000 65535 f\n0000000010 00000 n\n0000000060 00000 n\n0000000110 00000 n\n"
        b"trailer<</Size 4/Root 1 0 R>>\nstartxref\n170\n%%EOF\n"
    )


def _docx_bytes():
    # Minimal empty DOCX (valid zip signature so backend accepts by extension)
    import zipfile
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as z:
        z.writestr("[Content_Types].xml", "<?xml version='1.0'?><Types xmlns='http://schemas.openxmlformats.org/package/2006/content-types'/>")
    return buf.getvalue()


# ---------- Public form regression ----------

def test_newsletter_subscribe_ok():
    s = _new_session()
    tok = _form_ctx(s)
    email = f"TEST_news_{uuid.uuid4().hex[:8]}@example.com"
    r = s.post(
        f"{BASE_URL}/api/newsletter/subscribe",
        json={"email": email, "firstName": "Test", "lastName": "User"},
        headers={"Content-Type": "application/json", "X-BB-Form-Token": tok},
    )
    assert r.status_code in (200, 201), r.text


def test_contact_enquiry_ok():
    s = _new_session()
    tok = _form_ctx(s)
    payload = {
        "firstName": "Test", "lastName": "Bot",
        "email": f"TEST_contact_{uuid.uuid4().hex[:8]}@example.com",
        "role": "QA", "message": "Regression check",
    }
    r = s.post(
        f"{BASE_URL}/api/contact-enquiries", json=payload,
        headers={"Content-Type": "application/json", "X-BB-Form-Token": tok},
    )
    assert r.status_code in (200, 201, 409), r.text  # duplicate window is 1 min


def test_ai_consulting_enquiry_ok():
    s = _new_session()
    tok = _form_ctx(s)
    payload = {
        "fullName": "Test QA", "workEmail": f"TEST_cons_{uuid.uuid4().hex[:8]}@example.com",
        "company": "Test Co", "phone": "9876543210", "jobTitle": "QA",
        "country": "India", "countryCode": "IN",
        "services": ["ai-consulting"],
        "website": "https://example.com",
        "initiativeRole": "decision_maker", "otherRole": None,
        "phoneCountry": "IN", "otherRequirement": None,
        "requirement": "Regression test", "stage": "idea", "timeline": "1-3 months",
        "budgetType": "estimated", "estimatedBudget": "10000-50000", "budgetStatus": "approved",
        "contactPermission": True,
    }
    r = s.post(
        f"{BASE_URL}/api/ai-consulting-enquiries", json=payload,
        headers={"Content-Type": "application/json", "X-BB-Form-Token": tok},
    )
    assert r.status_code in (201, 409, 422), r.text


# ---------- Career flow ----------

def test_career_pdf_submit_and_admin_download_and_cleanup():
    # 1) submit
    s = _new_session()
    tok = _form_ctx(s)
    email = f"TEST_career_{uuid.uuid4().hex[:8]}@example.com"
    pdf = _pdf_bytes()
    files = {"resume": ("regression.pdf", pdf, "application/pdf")}
    data = {
        "firstName": "Reg", "lastName": "Tester",
        "email": email, "phone": "9876543210",
        "location": "Bengaluru", "jobTitle": "Data Science / AI ML Engineer",
    }
    r = s.post(
        f"{BASE_URL}/api/job-applications/submit",
        data=data, files=files, headers={"X-BB-Form-Token": tok},
    )
    assert r.status_code == 200, r.text
    body = r.json()
    assert body.get("success") is True and body.get("id"), body
    application_id = body["id"]

    # 2) duplicate immediately -> 409 friendly
    tok2 = _form_ctx(s)
    files2 = {"resume": ("regression.pdf", pdf, "application/pdf")}
    r2 = s.post(
        f"{BASE_URL}/api/job-applications/submit",
        data=data, files=files2, headers={"X-BB-Form-Token": tok2},
    )
    assert r2.status_code == 409, r2.text
    assert "already applied" in r2.json().get("errors", {}).get("duplicate", "").lower()

    # 3) admin login
    a = _new_session()
    sess = a.get(f"{BASE_URL}/api/admin/session")
    assert sess.status_code == 200
    csrf = sess.json()["csrfToken"]
    login = a.post(
        f"{BASE_URL}/api/admin/login",
        json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD},
        headers={"Content-Type": "application/json", "X-CSRF-Token": csrf},
    )
    assert login.status_code == 200, login.text
    csrf = login.json()["csrfToken"]

    # 4) list job applications -> should include our record
    lst = a.get(f"{BASE_URL}/api/job-applications", params={"limit": 50})
    assert lst.status_code == 200, lst.text
    ids = [x["id"] for x in lst.json()]
    assert application_id in ids

    # 5) download resume -> bytes match
    dl = a.get(f"{BASE_URL}/api/admin/resume/{application_id}")
    assert dl.status_code == 200, dl.text
    assert dl.content == pdf, "Downloaded resume does not match uploaded bytes"

    # 6) status update (status is a query parameter)
    upd = a.patch(
        f"{BASE_URL}/api/job-applications/{application_id}/status",
        params={"status": "reviewed"},
        headers={"X-CSRF-Token": csrf},
    )
    assert upd.status_code in (200, 204), upd.text

    # 7) delete via admin submission endpoint to clean up
    a.delete(
        f"{BASE_URL}/api/admin/submission/{application_id}",
        params={"form_type": "career"},
        headers={"X-CSRF-Token": csrf},
    )

    # 8) logout
    out = a.post(f"{BASE_URL}/api/admin/logout", headers={"X-CSRF-Token": csrf})
    assert out.status_code == 200

    # 9) after logout, list must 401
    lst2 = a.get(f"{BASE_URL}/api/job-applications", params={"limit": 5})
    assert lst2.status_code == 401


def test_career_invalid_txt_rejected_then_retry_pdf_succeeds():
    # uploads rate limit is 3/60s per IP; previous tests already consumed a few.
    time.sleep(65)
    s = _new_session()
    email = f"TEST_retry_{uuid.uuid4().hex[:8]}@example.com"
    data = {
        "firstName": "Retry", "lastName": "Tester",
        "email": email, "phone": "9876543210",
        "location": "Bengaluru", "jobTitle": "QA Retry Role " + uuid.uuid4().hex[:6],
    }

    # 1) TXT rejected
    tok = _form_ctx(s)
    r_bad = s.post(
        f"{BASE_URL}/api/job-applications/submit",
        data=data,
        files={"resume": ("bad.txt", b"hello world", "text/plain")},
        headers={"X-BB-Form-Token": tok},
    )
    assert r_bad.status_code == 400, r_bad.text
    err = r_bad.json().get("errors", {}).get("resume", "").lower()
    assert "invalid" in err or "pdf" in err or "not allowed" in err, err

    # 2) Same email retry with valid PDF should succeed (no false duplicate)
    tok2 = _form_ctx(s)
    pdf = _pdf_bytes()
    r_ok = s.post(
        f"{BASE_URL}/api/job-applications/submit",
        data=data,
        files={"resume": ("resume.pdf", pdf, "application/pdf")},
        headers={"X-BB-Form-Token": tok2},
    )
    assert r_ok.status_code == 200, r_ok.text
    app_id = r_ok.json()["id"]

    # cleanup
    a = _new_session()
    csrf = a.get(f"{BASE_URL}/api/admin/session").json()["csrfToken"]
    login = a.post(
        f"{BASE_URL}/api/admin/login",
        json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD},
        headers={"Content-Type": "application/json", "X-CSRF-Token": csrf},
    )
    csrf = login.json()["csrfToken"]
    a.delete(
        f"{BASE_URL}/api/admin/submission/{app_id}",
        params={"form_type": "career"},
        headers={"X-CSRF-Token": csrf},
    )


def test_career_oversized_rejected():
    s = _new_session()
    tok = _form_ctx(s)
    big = b"%PDF-1.4\n" + b"A" * (5 * 1024 * 1024 + 100)  # >5MB but within 6MB gateway cap
    r = s.post(
        f"{BASE_URL}/api/job-applications/submit",
        data={
            "firstName": "Big", "lastName": "File",
            "email": f"TEST_big_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "9876543210", "location": "X",
            "jobTitle": "QA Big " + uuid.uuid4().hex[:6],
        },
        files={"resume": ("big.pdf", big, "application/pdf")},
        headers={"X-BB-Form-Token": tok},
    )
    # Backend returns 400 with size error, gateway may return 413 if >6MB
    assert r.status_code in (400, 413), r.text
    if r.status_code == 400:
        err = r.json().get("errors", {}).get("resume", "").lower()
        assert "5mb" in err or "size" in err or "too large" in err, err
