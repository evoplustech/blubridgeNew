# Proxy verification and deployment triage — 2026-09-24

## Verified fix in the workspace
-12/12 proxy/protocol regression tests pass (`pytest/iter40_api_proxy.xml`).
- Real external-preview desktop/mobile browser flows forward their actual API requests through local Express into the existing FastAPI/MongoDB:201 and one saved record each; duplicate409; authenticated admin login/verify/dashboard/logout/revocation pass. Proxy forwarding counters prove the new middleware was exercised (`iteration_40_browser_proxy.json`).
- Only two labelled QA records created in preview and removed by exactID/email. No production record created; live reproduction used an invalid empty payload only.
- All214 protected backend/form/UI source hashes unchanged. No auth settings/credentials/ports changed. Protocol tests used a TEST-ONLY **MOCKED** upstream fixture to inspect raw framing/cookies; actual submission/admin flows were real.

## Reported `/api` versus `/api/` difference
The testing report requested a contract decision rather than identifying a forwarding failure. Direct comparison confirmed:

| Path | Existing backend | New proxy |
|---|---|---|
| `/api` |404 JSON|404 JSON|
| `/api/` |200 JSON|200 JSON|

`backend/server.py` registers `@api_router.get('/')`, not a no-slash alias. The proxy is intentionally transparent and must preserve paths/status; adding or rewriting a backend health endpoint is not required to fix consulting submission. Health is `/health` on the direct backend, and operational proxy verification uses `/api/form-context`. This report item is classified as pre-existing behavior/no proxy regression, not left as a failing feature test.

## Static deployment check triage
- Source compilation and env-based URL checks passed; returned statusWARN concerns preview configuration and existing email literals, not a defect in the new proxy.
- Its suggestion to remove preview Uvicorn `--no-proxy-headers` is NOT applied: application security deliberately inspects trusted peers itself; blanket lower-layer header trust can bypass that policy. This preview supervisor command is not the user's Render command and did not cause the live cross-site403. Trusted proxy configuration remains explicit/operator-verified.
- Its claim that legacy `CORS_ORIGINS='*'` permits all browser origins is not applicable: active `SecurityGateway` uses `SECURITY_ALLOWED_ORIGINS`, rejects cross-site requests and validates cookies/proof. These protections remain unchanged.
- Existing sender/recipient email literals are non-secret business configuration, not the reason the backend returns403 before reaching submission. No unrelated mail/auth changes made.

## Remaining live activation
Live `blubridge.com` still needs updated frontend code, Node server startup and a React rebuild with `REACT_APP_BACKEND_URL=https://blubridge.com`, plus server-only `API_PROXY_TARGET=https://blubridgebackend.onrender.com` and existing CSP/site/tag settings. See `frontend/render-config.example` and `memory/RENDER_FRONTEND_API_FIX.md`.

The coding workspace cannot change the owner's Render service configuration/DNS. Therefore do **not** call live submission fixed until `https://blubridge.com/api/form-context` returnsJSON and a same-origin live form request succeeds. Resume storage availability on Render is separate/unverified.