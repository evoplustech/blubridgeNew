"""API proxy regression suite (iteration 40).

# Modules/features covered: frontend/apiProxy.js root mount, security filtering, upstream forwarding behavior.
"""

import base64
import os
import socket
import subprocess
import tempfile
import time
from pathlib import Path

import pytest
import requests


LOCAL_FRONTEND = "http://127.0.0.1:3000"


def _wait_http(url: str, timeout: float = 15.0):
    start = time.time()
    last_error = None
    while time.time() - start < timeout:
        try:
            response = requests.get(url, timeout=2)
            return response
        except Exception as error:  # pragma: no cover - polling helper
            last_error = error
            time.sleep(0.2)
    raise RuntimeError(f"Service not ready: {url}; last_error={last_error}")


def _free_port() -> int:
    sock = socket.socket()
    sock.bind(("127.0.0.1", 0))
    port = sock.getsockname()[1]
    sock.close()
    return port


@pytest.fixture(scope="module")
def local_frontend_ready():
    response = _wait_http(f"{LOCAL_FRONTEND}/")
    assert response.status_code == 200
    return True


@pytest.fixture(scope="module")
def proto_stub_stack():
    """Start ephemeral node upstream stub + node proxy app using real apiProxy.js."""
    upstream_port = _free_port()
    proxy_port = _free_port()
    root = Path("/app/frontend")
    tmp_dir = Path(tempfile.mkdtemp(prefix="iter40_proxy_"))

    upstream_file = tmp_dir / "upstream_stub.js"
    proxy_file = tmp_dir / "proxy_app.js"

    upstream_file.write_text(
        """
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/healthz')) {
    res.writeHead(200, {'content-type': 'application/json'});
    return res.end(JSON.stringify({ok: true}));
  }
  if (req.url.startsWith('/api/multi-cookie')) {
    res.setHeader('Set-Cookie', ['a=1; Path=/; HttpOnly; Secure; SameSite=Strict', 'b=2; Path=/; HttpOnly; Secure; SameSite=Strict']);
  }
  let chunks = [];
  req.on('data', c => chunks.push(c));
  req.on('end', () => {
    const body = Buffer.concat(chunks);
    const out = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      bodyLength: body.length,
      bodyBase64: body.toString('base64')
    };
    res.writeHead(207, {'content-type': 'application/json'});
    res.end(JSON.stringify(out));
  });
});
server.listen(process.env.UPSTREAM_PORT, '127.0.0.1');
""".strip()
    )

    proxy_file.write_text(
        """
const express = require('express');
const install = require('/app/frontend/apiProxy');
const app = express();
install(app);
app.get('/healthz', (_req, res) => res.json({ok: true}));
app.listen(process.env.PORT, '127.0.0.1');
""".replace("require('express')", "require('/app/frontend/node_modules/express')").strip()
    )

    upstream_env = os.environ.copy()
    upstream_env["UPSTREAM_PORT"] = str(upstream_port)
    upstream = subprocess.Popen(
        ["node", str(upstream_file)],
        cwd=str(root),
        env=upstream_env,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    proxy_env = os.environ.copy()
    proxy_env["PORT"] = str(proxy_port)
    proxy_env["API_PROXY_TARGET"] = f"http://127.0.0.1:{upstream_port}"
    proxy_env["REACT_APP_BACKEND_URL"] = "https://brush-reveal-deploy.preview.emergentagent.com"
    proxy = subprocess.Popen(
        ["node", str(proxy_file)],
        cwd=str(root),
        env=proxy_env,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    try:
        _wait_http(f"http://127.0.0.1:{proxy_port}/healthz")
        yield {"proxy_port": proxy_port, "upstream_port": upstream_port}
    finally:
        for process in (proxy, upstream):
            process.terminate()
            try:
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                process.kill()


def test_local_proxy_form_context_sets_cookie_and_json(local_frontend_ready):
    response = requests.get(f"{LOCAL_FRONTEND}/api/form-context", timeout=20)
    assert response.status_code == 200
    payload = response.json()
    assert isinstance(payload.get("formToken"), str) and payload["formToken"]
    set_cookie = response.headers.get("set-cookie", "")
    assert "__Host-bb-form=" in set_cookie
    assert "HttpOnly" in set_cookie
    assert "SameSite=strict" in set_cookie or "SameSite=Strict" in set_cookie


def test_local_proxy_api_root_and_api_slash_are_handled_as_api(local_frontend_ready):
    root = requests.get(f"{LOCAL_FRONTEND}/api", timeout=20)
    slash = requests.get(f"{LOCAL_FRONTEND}/api/", timeout=20)
    assert root.status_code in (200, 404)
    assert slash.status_code == 200
    assert root.headers.get("content-type", "").startswith("application/json")
    assert slash.headers.get("content-type", "").startswith("application/json")


def test_local_proxy_valid_cookie_and_form_token_empty_body_is_422(local_frontend_ready):
    session = requests.Session()
    context = session.get(f"{LOCAL_FRONTEND}/api/form-context", timeout=20)
    token = context.json()["formToken"]
    cookie_value = context.cookies.get("__Host-bb-form")
    assert isinstance(cookie_value, str) and cookie_value
    time.sleep(1.1)
    response = session.post(
        f"{LOCAL_FRONTEND}/api/ai-consulting-enquiries",
        json={},
        headers={
            "Origin": "https://brush-reveal-deploy.preview.emergentagent.com",
            "X-BB-Form-Token": token,
            "Cookie": f"__Host-bb-form={cookie_value}",
        },
        timeout=25,
    )
    assert response.status_code == 422


def test_local_proxy_cross_site_rejected_403(local_frontend_ready):
    response = requests.post(
        f"{LOCAL_FRONTEND}/api/ai-consulting-enquiries",
        json={},
        headers={"Origin": "https://evil.example", "Sec-Fetch-Site": "cross-site"},
        timeout=25,
    )
    assert response.status_code == 403
    assert response.json().get("detail") in {"Origin not allowed", "Request verification failed"}


def test_local_proxy_missing_form_proof_rejected_403(local_frontend_ready):
    session = requests.Session()
    _ = session.get(f"{LOCAL_FRONTEND}/api/form-context", timeout=20)
    response = session.post(
        f"{LOCAL_FRONTEND}/api/ai-consulting-enquiries",
        json={},
        headers={"Origin": "https://brush-reveal-deploy.preview.emergentagent.com"},
        timeout=25,
    )
    assert response.status_code == 403
    assert "detail" in response.json()


def test_local_proxy_unknown_api_returns_404_json(local_frontend_ready):
    response = requests.get(f"{LOCAL_FRONTEND}/api/definitely-not-real", timeout=20)
    assert response.status_code == 404
    assert response.headers.get("content-type", "").startswith("application/json")
    assert response.json().get("detail")


def test_local_proxy_security_connection_header_rejected_400(local_frontend_ready):
    response = requests.get(
        f"{LOCAL_FRONTEND}/api/form-context",
        headers={"Connection": "origin"},
        timeout=20,
    )
    assert response.status_code == 400
    assert response.json().get("detail") == "Invalid connection headers"


def test_local_proxy_unsupported_method_rejected_405(local_frontend_ready):
    response = requests.request("TRACE", f"{LOCAL_FRONTEND}/api/form-context", timeout=20)
    assert response.status_code == 405
    assert response.json().get("detail") == "Method not allowed"


def test_local_proxy_malformed_api_path_rejected_400(local_frontend_ready):
    response = requests.get(f"{LOCAL_FRONTEND}/api/%2e%2e/secret", timeout=20)
    assert response.status_code == 400
    assert response.headers.get("content-type", "").startswith("application/json")


def test_proto_proxy_preserves_path_query_and_body(proto_stub_stack):
    proxy_url = f"http://127.0.0.1:{proto_stub_stack['proxy_port']}"
    payload = b"\x00\x01\x02\x03binary"
    response = requests.patch(
        f"{proxy_url}/api/echo?x=1&x=2&z=ok",
        data=payload,
        headers={
            "Content-Type": "application/octet-stream",
            "Cookie": "c1=v1",
            "Origin": "https://brush-reveal-deploy.preview.emergentagent.com",
            "Sec-Fetch-Site": "same-site",
            "X-CSRF-Token": "csrf123",
            "X-Forwarded-For": "8.8.8.8",
            "Forwarded": "for=8.8.8.8",
            "Connection": "keep-alive",
        },
        timeout=20,
    )
    assert response.status_code == 207
    body = response.json()
    assert body["method"] == "PATCH"
    assert body["url"] == "/api/echo?x=1&x=2&z=ok"
    assert body["bodyLength"] == len(payload)
    assert body["bodyBase64"] == base64.b64encode(payload).decode()
    headers = body["headers"]
    assert headers.get("cookie") == "c1=v1"
    assert headers.get("origin") == "https://brush-reveal-deploy.preview.emergentagent.com"
    assert headers.get("sec-fetch-site") == "same-site"
    assert headers.get("x-csrf-token") == "csrf123"
    assert "x-forwarded-for" not in headers
    assert "forwarded" not in headers


def test_proto_proxy_multiple_set_cookie_passthrough(proto_stub_stack):
    proxy_url = f"http://127.0.0.1:{proto_stub_stack['proxy_port']}"
    response = requests.get(f"{proxy_url}/api/multi-cookie", timeout=20)
    assert response.status_code == 207
    cookies = response.raw.headers.getlist("Set-Cookie")
    assert len(cookies) == 2
    assert cookies[0].startswith("a=1")
    assert cookies[1].startswith("b=2")


def test_proto_proxy_unreachable_upstream_returns_redacted_502():
    port = _free_port()
    root = Path("/app/frontend")
    tmp_dir = Path(tempfile.mkdtemp(prefix="iter40_proxy_unreach_"))
    proxy_file = tmp_dir / "proxy_app_unreachable.js"
    proxy_file.write_text(
        """
const express = require('express');
const install = require('/app/frontend/apiProxy');
const app = express();
install(app);
app.listen(process.env.PORT, '127.0.0.1');
""".replace("require('express')", "require('/app/frontend/node_modules/express')").strip()
    )
    env = os.environ.copy()
    env["PORT"] = str(port)
    env["API_PROXY_TARGET"] = "http://127.0.0.1:65534"
    env["REACT_APP_BACKEND_URL"] = "https://brush-reveal-deploy.preview.emergentagent.com"
    process = subprocess.Popen(["node", str(proxy_file)], cwd=str(root), env=env)
    try:
        _wait_http(f"http://127.0.0.1:{port}/not-api")
        response = requests.get(f"http://127.0.0.1:{port}/api/form-context", timeout=20)
        assert response.status_code == 502
        payload = response.json()
        assert payload.get("detail") == "The service is temporarily unavailable. Please try again."
        assert "127.0.0.1" not in response.text
    finally:
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
