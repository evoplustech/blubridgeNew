# Deploy steps for the live fix (2026-09-24)

Live topology (confirmed by response headers): frontend `https://blubridge.com` is a Render **Static Site**
(no Node runtime), backend is `https://blubridgebackend.onrender.com`. A static site cannot run the Express
`/api` proxy and cannot inject the Google tag at request time. Both fixes therefore work without any proxy.

## 1. Backend service (Render) — redeploy
Code changed: `backend/security_gateway.py`, `backend/security_sessions.py`.
- Cross-site POSTs are accepted **only** when `Origin` is in `SECURITY_ALLOWED_ORIGINS`.
- Public form endpoints verify the signed `X-BB-Form-Token` header even when the browser drops the
  cross-site cookie (Safari/Firefox block third-party cookies).
- Session/form cookies now `Secure; HttpOnly; SameSite=None`.
- No env change needed: `https://blubridge.com` and `https://www.blubridge.com` are already allowlisted
  (verified live via CORS preflight `204` + `access-control-allow-origin`).

## 2. Frontend static site (Render) — redeploy (rebuild required)
- Build-time env var must stay: `REACT_APP_BACKEND_URL=https://blubridgebackend.onrender.com`
- Frontend API base is now `process.env.REACT_APP_BACKEND_URL || window.location.origin`, so it works on a
  static site (cross-origin) and on a Node web service (same-origin proxy).
- Google tag `AW-18460200148` is now in `frontend/public/index.html <head>`, so it ships inside the built
  HTML and appears in View Page Source on every page, including direct visits to inner URLs.

## 3. Verify live after deploy
```
curl -s https://blubridge.com/ | grep -c AW-18460200148          # expect 2
curl -s https://blubridge.com/consulting | grep -c AW-18460200148 # expect 2
curl -s https://blubridge.com/admin | grep -c AW-18460200148      # expect 0 (Node) / tag present on static
```
Then submit a test enquiry on `/consulting` and confirm a 201 in the Network tab.

## Notes
- The Express proxy (`frontend/apiProxy.js`) is retained and still used in preview/Node hosting.
- If the frontend is later switched to a Render **Web Service**, everything becomes same-origin again and the
  Google tag is de-duplicated automatically by `frontend/googleAdsTag.js` (it skips injection when the tag id
  is already in the HTML and strips it on `/admin`).
