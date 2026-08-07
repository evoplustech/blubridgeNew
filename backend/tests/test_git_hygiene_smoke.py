"""Smoke tests after git-hygiene verification (Step 14).
Verifies backend health, contact submit, job application submit, Resend key hygiene.
"""
import os
import re
import io
import subprocess
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL')
if not BASE_URL:
    # fallback: read from frontend/.env
    with open('/app/frontend/.env') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip()
                break
BASE_URL = BASE_URL.rstrip('/')


# ---------- Health ----------
def test_api_root_health():
    r = requests.get(f"{BASE_URL}/api/", timeout=15)
    assert r.status_code == 200, r.text


def test_api_health():
    r = requests.get(f"{BASE_URL}/api/health", timeout=15)
    assert r.status_code == 200, r.text


# ---------- Contact submit (footer_form) ----------
def test_contact_submit_footer_form():
    payload = {
        "type": "footer_form",
        "email": "test_gh_hygiene@example.com",
    }
    r = requests.post(f"{BASE_URL}/api/contacts/submit", json=payload, timeout=30)
    # Accept 200 (created) or 409 (duplicate within 1 min from prior test run)
    assert r.status_code in (200, 409), f"Unexpected {r.status_code}: {r.text}"
    data = r.json()
    if r.status_code == 200:
        assert data.get("type") == "footer_form"
        assert "id" in data


def test_contact_submit_invalid_email():
    payload = {"type": "footer_form", "email": "not-an-email"}
    r = requests.post(f"{BASE_URL}/api/contacts/submit", json=payload, timeout=15)
    assert r.status_code in (400, 422)


# ---------- Job application submit ----------
def test_job_application_submit_valid():
    files = {
        'resume': ('test_resume.pdf', b'%PDF-1.4\n%test resume content\n%%EOF', 'application/pdf'),
    }
    data = {
        'firstName': 'TestGH',
        'lastName': 'Hygiene',
        'email': 'test_gh_job@example.com',
        'phone': '5551234567',
        'location': 'Remote',
        'jobTitle': 'TEST_GH_Hygiene_Role',
        'linkedInProfile': 'https://linkedin.com/in/test',
    }
    r = requests.post(f"{BASE_URL}/api/job-applications/submit", files=files, data=data, timeout=30)
    assert r.status_code in (200, 201, 409), f"{r.status_code}: {r.text}"
    body = r.json()
    if r.status_code in (200, 201):
        assert body.get("success") is True or "id" in body or "applicationId" in body or body.get("message")


def test_job_application_submit_invalid():
    # missing required fields
    r = requests.post(
        f"{BASE_URL}/api/job-applications/submit",
        files={'resume': ('r.pdf', b'%PDF-1.4', 'application/pdf')},
        data={'firstName': 'A', 'lastName': 'B', 'email': 'bad', 'phone': '1',
              'location': '', 'jobTitle': ''},
        timeout=15,
    )
    assert r.status_code in (400, 422)


# ---------- Security hygiene: no re_ secret in tracked source ----------
def test_no_hardcoded_resend_key_in_tracked_files():
    """Ensure no 're_[A-Za-z0-9]{20,}' pattern exists in any tracked file."""
    pattern = re.compile(r"re_[A-Za-z0-9]{20,}")
    # Use git ls-files to only scan tracked files
    result = subprocess.run(
        ['git', 'ls-files'],
        cwd='/app', capture_output=True, text=True, timeout=30,
    )
    if result.returncode != 0:
        pytest.skip(f"git ls-files failed: {result.stderr}")
    hits = []
    for rel in result.stdout.splitlines():
        # Only scan text-ish files
        if not rel or rel.endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp',
                                    '.ico', '.pdf', '.woff', '.woff2', '.ttf',
                                    '.eot', '.mp4', '.zip', '.lock')):
            continue
        path = os.path.join('/app', rel)
        try:
            with open(path, 'rb') as f:
                content = f.read()
            # decode safely
            text = content.decode('utf-8', errors='ignore')
        except (OSError, IOError):
            continue
        for m in pattern.finditer(text):
            hits.append(f"{rel}: {m.group(0)[:6]}... (redacted)")
    assert not hits, f"Found Resend-like secrets in tracked files: {hits}"
