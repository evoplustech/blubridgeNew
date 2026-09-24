"""Published-route inventory, redirects, sitemap/robots, Google Ads tags, and /consulting submit checks.

# Modules/features covered:
# - frontend published catalog routing and exclusions
# - sitemap.xml and robots.txt generation
# - Google Ads script/config presence on public pages and absence on admin pages
# - real /api/ai-consulting-enquiries submit path with DB persistence + admin visibility
"""

import os
import re
import time
import uuid
from pathlib import Path
from urllib.parse import urljoin

import pytest
import requests
from dotenv import dotenv_values
from pymongo import MongoClient


BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)

BASE_URL = BASE_URL.rstrip("/")
FRONTEND_ROOT = Path("/app/frontend")
GOOGLE_ADS_ID = "AW-18460200148"


@pytest.fixture(scope="module")
def client():
    session = requests.Session()
    session.headers.update({"User-Agent": "iter39-routing-publish-tests"})
    return session


@pytest.fixture(scope="module")
def env_data():
    env = dotenv_values("/app/backend/.env")
    admin_username = env.get("ADMIN_USERNAME")
    admin_password = env.get("ADMIN_PASSWORD")
    mongo_url = env.get("MONGO_URL")
    db_name = env.get("DB_NAME")
    if not admin_username or not admin_password:
        pytest.skip("Missing admin credentials in backend/.env")
    if not mongo_url or not db_name:
        pytest.skip("Missing MONGO_URL/DB_NAME in backend/.env")
    return {
        "admin_username": admin_username,
        "admin_password": admin_password,
        "mongo_url": mongo_url,
        "db_name": db_name,
    }


@pytest.fixture(scope="module")
def mongo_db(env_data):
    mongo_client = MongoClient(env_data["mongo_url"])
    db = mongo_client[env_data["db_name"]]
    yield db
    mongo_client.close()


def _head_html(html: str) -> str:
    match = re.search(r"<head\\b[^>]*>([\\s\\S]*?)</head>", html, re.IGNORECASE)
    return match.group(1) if match else ""


def _extract_title(html: str) -> str:
    match = re.search(r"<title>([^<]*)</title>", html, re.IGNORECASE)
    return (match.group(1).strip() if match else "")


def _get_html(session: requests.Session, path: str, allow_redirects: bool = True):
    """Simple retry wrapper for occasional transient HTML responses."""
    url = urljoin(BASE_URL + "/", path)
    last = None
    for _ in range(3):
        last = session.get(url, allow_redirects=allow_redirects, timeout=25)
        if last.status_code in (429, 503):
            time.sleep(1.0)
            continue
        return last
    return last


def _public_post(session: requests.Session, path: str, payload: dict):
    form_ctx = session.get(f"{BASE_URL}/api/form-context", timeout=30)
    assert form_ctx.status_code == 200, form_ctx.text
    token = form_ctx.json().get("formToken")
    assert isinstance(token, str) and token
    time.sleep(1.1)
    return session.post(
        f"{BASE_URL}/api{path}",
        json=payload,
        headers={"Origin": BASE_URL, "X-BB-Form-Token": token},
        timeout=45,
    )


def _html_without_cf_challenge(session: requests.Session, path: str) -> str:
    """Retry when edge anti-bot challenge HTML appears."""
    html = ""
    for _ in range(3):
        response = _get_html(session, path)
        assert response is not None
        assert response.status_code == 200
        html = response.text
        if "__CF$cv$params" not in html and "challenge-platform" not in html:
            return html
        time.sleep(1.0)
    return html


def _admin_login():
    env = dotenv_values("/app/backend/.env")
    username = env.get("ADMIN_USERNAME")
    password = env.get("ADMIN_PASSWORD")
    admin_session = requests.Session()
    csrf = admin_session.get(f"{BASE_URL}/api/admin/session", timeout=30)
    assert csrf.status_code == 200, csrf.text
    csrf_token = csrf.json().get("csrfToken")
    assert isinstance(csrf_token, str) and csrf_token
    login = admin_session.post(
        f"{BASE_URL}/api/admin/login",
        json={"username": username, "password": password},
        headers={"X-CSRF-Token": csrf_token, "Origin": BASE_URL},
        timeout=30,
    )
    assert login.status_code == 200, login.text
    login_csrf = login.json().get("csrfToken")
    assert isinstance(login_csrf, str) and login_csrf
    return admin_session, login_csrf


def test_admin_cookie_http_only_and_secure_flags(client):
    admin_session = requests.Session()
    csrf = admin_session.get(f"{BASE_URL}/api/admin/session", timeout=30)
    assert csrf.status_code == 200, csrf.text
    token = csrf.json().get("csrfToken")
    assert isinstance(token, str) and token

    env = dotenv_values("/app/backend/.env")
    login = admin_session.post(
        f"{BASE_URL}/api/admin/login",
        json={"username": env.get("ADMIN_USERNAME"), "password": env.get("ADMIN_PASSWORD")},
        headers={"X-CSRF-Token": token, "Origin": BASE_URL},
        timeout=30,
    )
    assert login.status_code == 200, login.text
    set_cookie = login.headers.get("set-cookie", "").lower()
    assert "httponly" in set_cookie
    assert "secure" in set_cookie
    assert "samesite=" in set_cookie
    assert "path=/" in set_cookie

    logout_csrf = login.json().get("csrfToken")
    if isinstance(logout_csrf, str) and logout_csrf:
        admin_session.post(
            f"{BASE_URL}/api/admin/logout",
            headers={"X-CSRF-Token": logout_csrf},
            timeout=30,
        )


def test_admin_password_hash_uses_bcrypt_2b(env_data, mongo_db):
    doc = mongo_db.admin_settings.find_one({"type": "credentials"}, {"_id": 0, "passwordHash": 1})
    assert doc is not None
    encoded = doc.get("passwordHash", "")
    assert isinstance(encoded, str)
    assert encoded.startswith("$2b$")


def test_cors_preflight_uses_credentials_with_explicit_origin(client):
    origin = BASE_URL
    response = client.options(
        f"{BASE_URL}/api/admin/login",
        headers={
            "Origin": origin,
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type,x-csrf-token",
        },
        timeout=30,
    )
    assert response.status_code in (200, 204)
    assert response.headers.get("access-control-allow-credentials", "").lower() == "true"
    acao = response.headers.get("access-control-allow-origin", "")
    assert acao and acao != "*"


def test_public_inventory_routes_return_200_not_home_fallback(client):
    pages = __import__("json").loads((FRONTEND_ROOT / "src/routing/publishedPages.json").read_text())
    public_paths = [path for values in pages["public"].values() for path in values]
    assert len(public_paths) == 46

    home_marker = "<h1>Beyond the Horizon</h1>"
    home_title = "Frontier AI Research and Enterprise Solutions | Blubridge"

    for path in public_paths:
        response = _get_html(client, path)
        assert response.status_code == 200, f"{path} -> {response.status_code}"
        assert "<div id=\"root\">" in response.text
        title = _extract_title(response.text)
        assert title
        if path != "/":
            assert home_marker not in response.text, f"{path} appears to render home fallback content"
            assert title != home_title, f"{path} unexpectedly has home title"


def test_admin_catalog_routes_accessible_html(client):
    pages = __import__("json").loads((FRONTEND_ROOT / "src/routing/publishedPages.json").read_text())
    for path in pages["admin"]:
        response = _get_html(client, path)
        assert response.status_code == 200, f"{path} -> {response.status_code}"
        assert "<div id=\"root\">" in response.text


def test_consulting_route_and_ai_consulting_redirect_with_query(client):
    consulting = _get_html(client, "/consulting")
    assert consulting.status_code == 200

    consulting_slash = _get_html(client, "/consulting/")
    assert consulting_slash.status_code == 200

    old_no_slash = client.get(f"{BASE_URL}/ai-consulting?qa=1&src=iter39", allow_redirects=False, timeout=25)
    assert old_no_slash.status_code == 308
    assert old_no_slash.headers.get("location") == "/consulting?qa=1&src=iter39"

    old_slash = client.get(f"{BASE_URL}/ai-consulting/?qa=2&src=iter39", allow_redirects=False, timeout=25)
    assert old_slash.status_code == 308
    assert old_slash.headers.get("location") == "/consulting?qa=2&src=iter39"


def test_excluded_and_unknown_routes_are_404_with_noindex(client):
    excluded = [
        "/media-kit",
        "/get-in-touch",
        "/get-in-touch-1",
        "/get-in-touch-2",
        "/get-in-touch-3",
        "/get-in-touch-4",
        "/get-in-touch-5",
        "/get-in-touch-6",
        "/get-in-touch-7",
        "/get-in-touch-8",
        "/get-in-touch-9",
        "/get-in-touch-10",
        "/ai-consulting-1",
        "/ai-consulting-2",
        "/ai-consulting-3",
        "/ai-consulting-4",
        "/ai-consulting-5",
        "/contact/sales",
        "/contact/general-enquiry",
        "/partners",
        "/pricing",
        "/docs",
        "/blog",
        "/home1",
        "/some-unknown-path",
        "/products/not-real",
        "/solutions/not-real",
        "/careers/job/not-real-role",
    ]

    for path in excluded:
        response = _get_html(client, path, allow_redirects=False)
        assert response.status_code == 404, f"{path} -> {response.status_code}"
        assert "noindex" in (response.headers.get("x-robots-tag", "").lower())
        assert "Page not found" in response.text
        assert response.headers.get("location") is None


def test_sitemap_has_exact_46_public_urls_and_expected_exclusions(client):
    response = _get_html(client, "/sitemap.xml")
    assert response.status_code == 200
    assert "xml" in response.headers.get("content-type", "").lower()

    locs = re.findall(r"<loc>([^<]+)</loc>", response.text)
    assert len(locs) == 46
    assert len(set(locs)) == 46
    assert all(loc.startswith("https://blubridge.com") for loc in locs)
    assert "https://blubridge.com/consulting" in locs

    excluded = [
        "https://blubridge.com/ai-consulting",
        "https://blubridge.com/media-kit",
        "https://blubridge.com/get-in-touch",
        "https://blubridge.com/pricing",
        "https://blubridge.com/docs",
        "https://blubridge.com/admin",
    ]
    for item in excluded:
        assert item not in locs


def test_robots_disallow_admin_and_reference_sitemap(client):
    response = _get_html(client, "/robots.txt")
    assert response.status_code == 200
    body = response.text
    assert "User-agent: *" in body
    assert "Allow: /" in body
    assert "Disallow: /admin" in body
    assert "Sitemap: https://blubridge.com/sitemap.xml" in body


def test_google_tag_present_once_on_public_and_absent_on_admin(client):
    public_paths = ["/", "/consulting", "/contact"]
    admin_paths = ["/admin", "/admin/dashboard", "/Admin", "/%61dmin"]

    for path in public_paths:
        html = _html_without_cf_challenge(client, path)
        assert "<head" in html.lower(), f"Missing head on {path}"
        assert html.count(f"googletagmanager.com/gtag/js?id={GOOGLE_ADS_ID}") == 1
        assert len(re.findall(r"gtag\('config',\s*['\"]AW-18460200148['\"]\)", html)) == 1
        config_open_tag = re.search(r'<script[^>]*data-testid="google-ads-tag-config"[^>]*>', html)
        assert config_open_tag is not None
        assert 'nonce="' in config_open_tag.group(0)

    for path in admin_paths:
        html = _html_without_cf_challenge(client, path)
        assert "googletagmanager.com/gtag/js" not in html
        assert "gtag('config'" not in html
        assert "window.dataLayer" not in html


def test_boundary_script_precedes_google_script_in_public_head(client):
    response = _get_html(client, "/")
    assert response.status_code == 200
    html = response.text
    boundary_idx = html.find('data-testid="admin-document-boundary"')
    google_idx = html.find('data-testid="google-ads-tag-script"')
    config_idx = html.find('data-testid="google-ads-tag-config"')
    assert boundary_idx != -1
    assert google_idx != -1
    assert config_idx != -1
    assert boundary_idx < google_idx < config_idx


def test_csp_public_vs_admin_google_scope(client):
    public_response = _get_html(client, "/")
    admin_response = _get_html(client, "/admin")

    assert public_response.status_code == 200
    assert admin_response.status_code == 200

    public_csp = public_response.headers.get("content-security-policy", "")
    admin_csp = admin_response.headers.get("content-security-policy", "")

    assert "frame-src 'none'" in public_csp
    assert "frame-src 'none'" in admin_csp
    assert "script-src-attr 'none'" in public_csp
    assert "script-src-attr 'none'" in admin_csp
    def script_src(csp: str) -> str:
        for part in [p.strip() for p in csp.split(";") if p.strip()]:
            if part.startswith("script-src "):
                return part
        return ""

    public_script = script_src(public_csp)
    admin_script = script_src(admin_csp)
    assert "unsafe-inline" not in public_script
    assert "unsafe-eval" not in public_script
    assert "unsafe-inline" not in admin_script
    assert "unsafe-eval" not in admin_script

    public_lower = public_csp.lower()
    admin_lower = admin_csp.lower()
    assert any(marker in public_lower for marker in ["googleadservices", "doubleclick", "googlesyndication"])
    assert not any(marker in admin_lower for marker in ["googleadservices", "doubleclick", "googlesyndication"])


def test_consulting_form_real_submit_persists_source_and_admin_detail(client, mongo_db):
    email = f"routing-qa-{uuid.uuid4().hex[:8]}@example.com"
    payload = {
        "fullName": "Routing QA User",
        "workEmail": email,
        "company": "Routing QA Pvt Ltd",
        "jobTitle": "QA Engineer",
        "website": "https://example.com",
        "countryCode": "IN",
        "country": "India",
        "phoneCountry": "IN",
        "phone": "9876543210",
        "initiativeRole": "Technical evaluator / recommender",
        "otherRole": "",
        "contactPermission": True,
        "services": ["AI Consulting & Technical Advisory"],
        "otherRequirement": "",
        "requirement": "Routing verification requirement",
        "stage": "Requirements defined",
        "timeline": "1–3 months",
        "budgetType": "project",
        "estimatedBudget": "$10,000–$24,999",
        "budgetStatus": "Budget approved and available",
    }

    public_session = requests.Session()
    created_id = None
    admin_session = None
    admin_csrf = None
    try:
        created = _public_post(public_session, "/ai-consulting-enquiries", payload)
        assert created.status_code == 201, created.text
        data = created.json()
        created_id = data.get("id")
        assert isinstance(created_id, str) and created_id
        assert data.get("message") == "Your AI consulting enquiry has been received."

        doc = mongo_db.contact_enquiries.find_one({"id": created_id}, {"_id": 0})
        assert doc is not None
        assert doc.get("company_email") == email.lower()
        assert doc.get("source") == "/ai-consulting"

        admin_session, admin_csrf = _admin_login()
        listing = admin_session.get(f"{BASE_URL}/api/admin/submissions/get-in-touch?search={email}", timeout=30)
        assert listing.status_code == 200, listing.text
        listing_data = listing.json()
        records = listing_data.get("data", [])
        assert any(r.get("id") == created_id for r in records)

        detail = admin_session.get(
            f"{BASE_URL}/api/admin/submission/{created_id}?form_type=get_in_touch",
            headers={"X-CSRF-Token": admin_csrf},
            timeout=30,
        )
        assert detail.status_code == 200, detail.text
        detail_data = detail.json()
        assert detail_data.get("id") == created_id
        assert detail_data.get("source") == "/ai-consulting"
        assert detail_data.get("full_name") == "Routing QA User"
        assert detail_data.get("company_email") == email.lower()
    finally:
        if created_id:
            mongo_db.contact_enquiries.delete_one({"id": created_id})
        if admin_session and admin_csrf:
            admin_session.post(
                f"{BASE_URL}/api/admin/logout",
                headers={"X-CSRF-Token": admin_csrf},
                timeout=30,
            )
