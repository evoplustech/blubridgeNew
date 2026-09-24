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

## Build failure fix (2026-09-24) — `sh: 1: craco: not found` (exit 127)
Render installs with `NODE_ENV=production`, which SKIPS `devDependencies`. The build tools
(`@craco/craco`, `tailwindcss`, `postcss`, `autoprefixer`, `@babel/plugin-proposal-private-property-in-object`)
were in `devDependencies`, so `craco build` had no binary.
Fix: those five packages were moved into `dependencies` in `frontend/package.json`.
Verified locally: `NODE_ENV=production yarn install --frozen-lockfile` now provides `node_modules/.bin/craco`,
and `CI=true yarn build` succeeds with the Google tag present in `build/index.html`.
No Render build-command or env change needed — just redeploy.

## Build failure fix #2 (2026-09-24) — `Cannot find module 'ajv/dist/compile/codegen'`
Cause: the Render build command contained `npm install ajv@^7 --save-dev`. That forces root `ajv@7` while
CRA5's webpack tree needs the matched pair `ajv@6` + `ajv-keywords@3` (and `ajv-keywords@5` needs `ajv@8`),
so `schema-utils` -> `ajv-keywords` crashed. The ajv hack is the bug, not a missing env var.

Do BOTH:
1. **Change the Render build command to** (verified working locally against the committed `yarn.lock`):
   `yarn install --frozen-lockfile && yarn build`
   Publish directory stays `frontend/build`, root directory `frontend`.
   (If you must stay on npm: `npm install --legacy-peer-deps && npm run build` — remove the `ajv@^7` install.)
2. Repo already pins the compatible pair via npm `overrides` in `frontend/package.json`
   (`ajv ^6.12.6`, `ajv-keywords ^3.5.2`) so npm-based installs resolve correctly too. Yarn 1 ignores this
   field, and `yarn install --frozen-lockfile` still passes (verified).

Proof: a clean `NODE_ENV=production yarn install --frozen-lockfile` + `CI=true craco build` in an isolated
sandbox completed successfully with `AW-18460200148` present in `build/index.html`.
