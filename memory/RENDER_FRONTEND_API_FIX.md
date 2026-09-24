# Live consulting submission fix — 2026-09-24

## Confirmed live failure

The backend now starts. The live React bundle calls `https://blubridgebackend.onrender.com` from `https://blubridge.com`, which is **cross-site**. Browser verification reproduced:

- `GET /api/form-context`:200 JSON.
- `POST /api/ai-consulting-enquiries`:403 `Request verification failed` despite a freshly obtained form token. The probe used `{}`, so no enquiry was created.
- Existing Fetch Metadata protection rejects cross-site POSTs, and the Strict cookie is not usable across these two sites. Neither check should be disabled.
- `https://blubridge.com/api/form-context` currently returns200 **HTML**, not API JSON. `/media-kit` also returns200 HTML with no Express CSP or boundary marker, despite the repository's404 policy. This is strong evidence that the live frontend is using static/SPA serving rather than the repository's expected Express pipeline. A successful backend deployment alone cannot fix that.

## Code fix prepared

`frontend/apiProxy.js`, mounted at the root before HTML security/static middleware, forwards only `/api` to the fixed server-side `API_PROXY_TARGET`. It preserves the complete path/query, body stream, Origin, Fetch Metadata, Cookie, CSRF/proof headers, backend status and Set-Cookie headers. It validates targets/paths/methods, removes spoofable forwarding/hop-by-hop headers, fails closed on missing configuration and returns redacted JSON502 on connection errors. No browser-supplied proxy target or redirects are followed.

`http-proxy-middleware@3.0.7` is pinned through Yarn; it supports the existing Node20/Express5 runtime. No engine bypass/upgrade or backend/auth/form edits were made. The initial4.2.0 installation was rejected by its Node22+ requirement, so the integration guide was consulted again before installing the compatible patched3.x release.

Server build execution now uses `cwd: __dirname` instead of `/app/frontend`, so the existing server can rebuild correctly outside the preview filesystem. Preview `REACT_APP_BACKEND_URL` is unchanged; its server-only target is the existing local backend from environment configuration.

## Required change on the LIVE FRONTEND service

Apply the updated frontend code and run its existing Node/Express server. Static-only hosting cannot execute this proxy.

- **Root Directory:** `frontend`
- **Build Command:** `yarn install --frozen-lockfile --production=false && yarn build`
- **Start Command:** `yarn start` (the existing package script runs `node server.js`)
- **PORT:** retain Render's injected value; do not copy preview3000.

Set the following **frontend-service** values before rebuilding:

```dotenv
REACT_APP_BACKEND_URL=https://blubridge.com
API_PROXY_TARGET=https://blubridgebackend.onrender.com
```

The first is browser-visible and must point at the frontend origin. The second is server-only and must point at the backend. They must **not** both point at the Render backend or both point at the frontend. Do not put MongoDB credentials, the audit secret or admin passwords in frontend/REACT_APP variables.

The existing Express server also requires its explicit CSP, Google-tag and site configuration. `frontend/render-config.example` is a secret-free import template with those settings and the two values above. It deliberately does not override Render's `PORT`. Import/review its contents on the frontend service rather than copying the preview `.env` or changing backend Mongo/security secrets. Rebuild is required because Create React App embeds `REACT_APP_BACKEND_URL` at build time.

If the current Render frontend is a Static Site, it cannot use a Node Start Command. The custom domain must be served by the Node web service running this repository's frontend server for this fix to apply. That infrastructure change requires owner access; the coding workspace has not changed the Render service or DNS.

Keep the backend's exact `SECURITY_ALLOWED_ORIGINS` entries for the actual frontend origin(s), including `https://blubridge.com`. Preserve all other backend security settings. If `www` is used, align it with the chosen canonical frontend origin (redirect to the canonical hostname rather than cross-origin admin calls under a self-only CSP).

## After the frontend update

1. At `https://blubridge.com/api/form-context`, verify JSON200 (not the React page); do not publish the token or cookie values.
2. Confirm frontend HTML has its existing CSP and `/media-kit` returns404.
3. Submit one clearly labelled consulting enquiry. Browser request URL must now be `https://blubridge.com/api/ai-consulting-enquiries`, not the onrender.com hostname. Expect201 and the existing success message.
4. Verify the enquiry in admin; confirm cookies, CSRF protection and logout still work. Do not reset credentials or delete customer data.

Production is **not yet claimed fixed**: the updated Node frontend and build-time settings still need to be applied through the owner's Render access and then checked live. The separate backend resume-storage initialization warning is not responsible for this attachment-free consulting request and remains a separate configuration check.