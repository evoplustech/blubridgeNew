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

## Authorized credential rotation — 2026-09-23 (current)
- User explicitly requested username `admin`, then chose a generated strong replacement while preserving the existing minimum12-character password policy. The earlier user-supplied short password was NOT installed.
- Current username: `admin`. Current password: read `ADMIN_PASSWORD` from `/app/backend/.env` privately. Generated using32 cryptographically random bytes and stored in that mode0600 file only; never copy into chat, source, screenshots or reports. `ADMIN_USERNAME` is synchronized to `admin`.
- Changed via existing authenticated, CSRF-protected `POST /api/admin/change-password`; bcrypt credential hash and auth_version updated, every existing session revoked. No new account, auth-code edits or security-policy exceptions.
- Verified before restart: new login, authenticated verify and dashboard200; prior password401 and old-session replay401; verification-session logout200 and subsequent verify401. Results without secrets: `/app/test_reports/admin_rotation_20260923.json`.
- This rotation supersedes prior credential values. Unrelated environment keys are preserved. Backend restarted after the environment update; new login/dashboard/logout passed again, confirming credentials survive restart. All verification sessions were logged out.