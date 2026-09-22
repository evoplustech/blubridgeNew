# Private credential retrieval — security hardening

- Role: existing administrator; no new permanent user/tenant roles.
- Current username and password: read `ADMIN_USERNAME` and `ADMIN_PASSWORD` from restricted `/app/backend/.env` (mode0600). Owner approved a generated strong replacement. Never print values in tool output, screenshots, chat, source or reports.
- Python tests: load with `dotenv_values('/app/backend/.env')` and use those keys only in memory. No embedded credentials or defaults. Old documented default is revoked after the operator rotation command.
- Login URL remains `/admin`. GET `/api/admin/session` with a cookie jar, then POST `/api/admin/login` with username/password and returned `X-CSRF-Token`. Auth uses a Secure HttpOnly SameSite=Strict cookie, NOT browser storage or Authorization bearer tokens.
- Keep cookie jar plus CSRF for mutations and legacy detail GETs that mark records viewed. Logout revokes the server session. Password changes invalidate all account sessions.
- The private configured password is the initial recovery credential. If the operator changes it through the UI, their new password takes precedence; no startup reset is permitted.
- Additional security-test accounts must be isolated fixtures, removed after verification. Never commit credential values here.

## Access verification — 2026-09-22
- Owner chose to keep the generated secure password, not restore `admin` / `admin`. No credentials changed in this follow-up.
- Owner retrieval: privately open `backend/.env` in the project editor and use `ADMIN_USERNAME` / `ADMIN_PASSWORD` at `/admin`. Do not paste these values into chat or a public report.
- Configured credentials verified against the current external preview: login, authenticated verify and dashboard returned200; logout returned200 and subsequent verify returned401. Real browser login, dashboard reload, mobile logout and post-logout401 also passed; see `test_reports/iteration_36_followup_admin.json`.
- Cookie-policy caveat: application emits SameSite=Strict; preview ingress rewrites it to SameSite=None; Partitioned. Secure/HttpOnly, CSRF, origin checks and persistent revocation remain enabled. This is an unresolved infrastructure policy difference, not a credential failure; do not weaken application protections.