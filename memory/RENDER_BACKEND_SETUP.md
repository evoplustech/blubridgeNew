# Render backend configuration diagnosis — 2026-09-24

## Confirmed cause and scope

The supplied Render stack reaches `backend/server.py:47`, constructs `SecurityServices`, and raises `KeyError: 'SECURITY_AUDIT_KEY'`. The variable is absent in that backend process. Startup exits before Uvicorn can bind; the subsequent port warning is a consequence, not evidence of an incorrect port command. The stack is not evidence that Python3.13.4 or Uvicorn0.25.0 caused this failure.

`server.py` loads `backend/.env` before creating the Mongo client/security services. `.env` files are intentionally Git-ignored. A successful preview/local `.env` check does not populate or verify Render's environment. Current Render configuration and live URL were not supplied; no access to the Render dashboard was used.

**No production application files, environment values, secrets, credentials, DB records or security policies changed during this diagnosis.**

## Required runtime settings (13)

Set these on the **backend web service**, not just the frontend or an unlinked environment group. Variable names are case-sensitive.

| Variable | Required value / treatment |
|---|---|
| `MONGO_URL` | Retain the intended production MongoDB URI. Do not replace it with preview/local Mongo configuration. It is read successfully before the reported failure, but network connectivity is only exercised later. |
| `DB_NAME` | Retain the existing production database name; do not rename/change it to hide the failure. |
| `SECURITY_AUDIT_KEY` | Copy the approved existing persistent secret privately from the secret store or restricted `backend/.env`. Do not print, commit, post it in chat, use an empty placeholder, or regenerate on every start. |
| `SECURITY_ALLOWED_ORIGINS` | Comma-separated exact HTTPS **frontend origins**, without paths/trailing slashes. Example only, if those are the actual frontends: `https://blubridge.com,https://www.blubridge.com`. Use `.ai`/other hosts only if they are actually approved frontend origins. No `*`, HTTP or whitespace-only value. |
| `SECURITY_TRUSTED_PROXY_CIDRS` | Key must exist. An explicitly empty string is accepted by this application and trusts no forwarded proxy peers. Otherwise supply only independently verified proxy CIDRs. Never invent Render ranges, reuse preview ranges, or use `*`/`0.0.0.0/0`. |
| `SECURITY_SESSION_IDLE_SECONDS` | `1800` |
| `SECURITY_SESSION_ABSOLUTE_SECONDS` | `28800` |
| `SECURITY_AUDIT_RETENTION_DAYS` | `90` |
| `SECURITY_ADMIN_RATE_LIMIT` | `120` |
| `SECURITY_PUBLIC_RATE_LIMIT` | `10` |
| `SECURITY_JSON_MAX_BYTES` | `262144` |
| `SECURITY_UPLOAD_MAX_BYTES` | `6291456` |
| `SECURITY_REQUIRE_HTTPS` | `true` (lowercase string; keep the existing HTTPS response-header setting) |

Numeric values above match the current application configuration; they are explicit operator settings, not added code defaults. Startup immediately reads the first7 settings through the session limits; other required security values are used on requests/auditing and must also be present to avoid later500s.

### Proxy caveat

An empty trusted-proxy setting is fail-closed for forwarded client-IP parsing; it does not promise correct per-visitor rate limiting behind an unidentified proxy. Clients may share the proxy's rate-limit bucket. Verify actual Render ingress peers before changing this configuration. Render's generic web-service documentation reviewed here does not establish specific trusted inbound CIDRs. Outbound IP ranges used to allow MongoDB connections are not automatically valid inbound proxy-trust ranges. Do not enable blanket Uvicorn forwarded-header trust.

### Active CORS behavior

The active `SecurityGateway` uses `SECURITY_ALLOWED_ORIGINS`. Legacy `CORS_ORIGINS='*'` does **not** override it or make all origins accepted. Do not rely on the generic preview health-check statement that wildcard CORS makes this deployment ready.

## Apply in Render

1. Open the existing backend service -> **Environment** -> **Add Environment Variable**, or use **Add from .env** for a deliberately prepared backend configuration. Do not blindly import preview Mongo addresses, credentials or preview-only origins.
2. Add the missing audit secret and check all13 keys above. For empty `SECURITY_TRUSTED_PROXY_CIDRS`, the key must be present with an empty string (e.g. `SECURITY_TRUSTED_PROXY_CIDRS=` in a deliberately prepared dotenv import), not omitted. If the dashboard does not retain an empty value, obtain the verified proxy setting rather than guessing.
3. Choose **Save and deploy** to reuse the existing successful build with updated runtime settings. **Save, rebuild, and deploy** is also valid; **Save only** does not apply values to the running deployment immediately.
4. Keep the service root directory `backend` and its existing commands:

```sh
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port $PORT
```

Render supplies `PORT`; do not replace it with the preview's internal8001. The current stack successfully found `backend/server.py`, so the existing entry-point/root configuration already got this far. Use the implemented `/health` health-check path for a directly hosted backend; `/api/health` is not an implemented endpoint. This differs from the preview ingress, which routes only `/api/*` to the backend.

5. Confirm startup completes, the service binds to its assigned port, and `/health` returns200. Then verify form context, one legitimate submission, and admin login from the intended frontend. If another error occurs, use its final exception lines; never suppress missing-secret validation to make the server start.

## Other deployment requirements

- **MongoDB:** startup awaits security collection/index initialization before storage setup. Ensure production DB credentials have appropriate database/index permissions and MongoDB allows the backend's verified outbound addresses. A parsed URI is not proof of network connectivity.
- **Same-site browser URLs:** the application deliberately uses Secure/HttpOnly/SameSite=Strict cookies and rejects cross-site state-changing requests. A frontend on `blubridge.com` talking directly to an unrelated `onrender.com` API can fail even with a correct origin allowlist. Use a correctly configured same-origin `/api` route or an HTTPS API hostname under the same registrable domain, e.g. `api.blubridge.com` for a `blubridge.com` frontend. Set frontend `REACT_APP_BACKEND_URL` consistently. These example hosts are not claimed to exist or be configured. Do not weaken cookie/CSRF/origin checks.
- **Admin account:** the existing `admin_settings` record in MongoDB is authoritative. Setting `ADMIN_USERNAME`/`ADMIN_PASSWORD` alone does not provision/reset an account at startup. Retain the intended database/admin record; separately authorize provisioning if using a new empty database. No account was reset here.
- **Email (feature-specific, not startup blockers):** `RESEND_API_KEY` powers configured form notifications; `Backend_Email_Key` is the case-sensitive Brevo integration key. Missing keys can skip/fail notifications even if records save. The configured sender identities must be authorized by those providers. No email delivery on Render was verified.
- **Resume storage (feature-specific):** `EMERGENT_LLM_KEY` is used by the existing object-storage integration; `INTEGRATION_PROXY_URL` selects its configured gateway if supplied. The current code catches storage-init failures at startup and retries on use, so the backend may start while careers uploads still fail. Ensure the approved storage credential/service works from the deployed backend. Do not replace object storage with ephemeral local storage.
- `SMTP_PASSWORD` is not read by the current backend source; no additional JWT secret is used by the opaque-session implementation. Recovery/admin management environment keys are not normal startup requirements.

## Verification and remaining action

`test_reports/render_configuration_diagnosis.json`:6 isolated checks passed. AST inventory found13 required keys; missing audit key reproduced the reported exception; existing full configuration constructs security services; wildcard/HTTP origins stay rejected; explicit empty proxy setting is supported; numeric/HTTPS settings validated. These checks do not claim a complete Python3.13/Render runtime test, DB connectivity, email/storage availability or a repaired Render deployment.

**Remaining action:** owner supplies the approved values to the Render backend and applies them, verifies real ingress proxy/topology configuration, then checks live startup/health/forms/admin. The preview's separate historical SameSite rewrite limitation remains unchanged.

Sources: https://render.com/docs/configure-environment-variables ; https://render.com/docs/web-services ; https://fastapi.tiangolo.com/advanced/behind-a-proxy/