import os
import re
import subprocess
from urllib.parse import urljoin

import pytest
import requests


# Google Ads tag + CSP boundary checks for public and admin routes
BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
GOOGLE_ADS_ID = "AW-18460200148"


@pytest.fixture(scope="session")
def base_url():
    if not BASE_URL:
        pytest.skip("REACT_APP_BACKEND_URL is required")
    return BASE_URL.rstrip("/")


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"User-Agent": "iter38-google-ads-csp-tests"})
    return s


def _directive(csp: str, name: str) -> str:
    for part in [p.strip() for p in csp.split(";") if p.strip()]:
        if part.startswith(name + " ") or part == name:
            return part
    return ""


def _head_html(html: str) -> str:
    match = re.search(r"<head\b[^>]*>([\s\S]*?)</head>", html, re.IGNORECASE)
    return match.group(1) if match else ""


def _nonce_from_csp(csp: str) -> str:
    script_src = _directive(csp, "script-src")
    match = re.search(r"'nonce-([^']+)'", script_src)
    return match.group(1) if match else ""


def _google_loader_count(head: str) -> int:
    return len(re.findall(rf"https://www\.googletagmanager\.com/gtag/js\?id={re.escape(GOOGLE_ADS_ID)}", head))


def _google_config_count(head: str) -> int:
    return len(re.findall(r"gtag\('config',\s*['\"]AW-18460200148['\"]\)", head))


def _google_nonce_values(head: str):
    values = []
    for match in re.finditer(r"<script\b[^>]*>([\s\S]*?)</script>", head, re.IGNORECASE):
        tag = match.group(0)
        body = match.group(1)
        if "googletagmanager.com/gtag/js" in tag or "gtag('config'" in body:
            nonce = re.search(r'nonce="([^"]+)"', tag)
            values.append(nonce.group(1) if nonce else "")
    return values


def test_public_root_has_exact_google_tag_once_and_nonce(client, base_url):
    response = client.get(urljoin(base_url + "/", "/"), timeout=25)
    assert response.status_code == 200
    csp = response.headers.get("Content-Security-Policy", "")
    assert csp
    head = _head_html(response.text)
    assert head

    assert _google_loader_count(head) == 1
    assert _google_config_count(head) == 1

    nonce = _nonce_from_csp(csp)
    assert nonce
    nonces = _google_nonce_values(head)
    assert len(nonces) == 2
    assert all(n == nonce for n in nonces)


def test_public_route_variants_and_index_redirect(client, base_url):
    public_routes = ["/solutions", "/solutions/", "/contact?src=qa", "/not-a-real-page"]
    for route in public_routes:
        res = client.get(urljoin(base_url + "/", route), timeout=25)
        assert res.status_code == 200
        head = _head_html(res.text)
        assert _google_loader_count(head) == 1
        assert _google_config_count(head) == 1

    idx = client.get(urljoin(base_url + "/", "/index.html"), allow_redirects=False, timeout=25)
    assert idx.status_code == 308
    assert idx.headers.get("Location") == "/"


def test_admin_paths_have_no_google_loader_or_config(client, base_url):
    admin_routes = [
        "/admin",
        "/admin/",
        "/admin/dashboard",
        "/admin/get-in-touch",
        "/admin/settings",
        "/Admin",
        "/%61dmin",
    ]
    for route in admin_routes:
        res = client.get(urljoin(base_url + "/", route), timeout=25)
        assert res.status_code == 200
        head = _head_html(res.text)
        assert "googletagmanager.com/gtag/js" not in head
        assert "gtag('config'" not in head


def test_csp_public_vs_admin_scope_and_security_directives(client, base_url):
    pub = client.get(urljoin(base_url + "/", "/"), timeout=25)
    adm = client.get(urljoin(base_url + "/", "/admin"), timeout=25)

    assert pub.status_code == 200
    assert adm.status_code == 200

    pub_csp = pub.headers.get("Content-Security-Policy", "")
    adm_csp = adm.headers.get("Content-Security-Policy", "")

    assert "script-src-attr 'none'" in pub_csp
    assert "script-src-attr 'none'" in adm_csp
    assert "frame-src 'none'" in pub_csp
    assert "frame-src 'none'" in adm_csp

    pub_script = _directive(pub_csp, "script-src")
    adm_script = _directive(adm_csp, "script-src")
    assert "'unsafe-inline'" not in pub_script
    assert "'unsafe-eval'" not in pub_script
    assert "*" not in pub_script
    assert "'unsafe-inline'" not in adm_script
    assert "'unsafe-eval'" not in adm_script
    assert "*" not in adm_script

    pub_connect = _directive(pub_csp, "connect-src")
    adm_connect = _directive(adm_csp, "connect-src")
    pub_img = _directive(pub_csp, "img-src")
    adm_img = _directive(adm_csp, "img-src")

    ads_markers = ["googleadservices", "doubleclick", "googlesyndication"]
    assert any(marker in pub_connect.lower() for marker in ads_markers)
    assert not any(marker in adm_connect.lower() for marker in ads_markers)
    assert any(marker in pub_img.lower() for marker in ads_markers)
    assert not any(marker in adm_img.lower() for marker in ads_markers)


def test_malformed_path_returns_400_not_500(client, base_url):
    malformed_url = urljoin(base_url + "/", "/%E0%A4%A")
    cmd = ["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}", "--path-as-is", malformed_url]
    result = subprocess.run(cmd, check=True, capture_output=True, text=True)
    assert result.stdout.strip() == "400"
