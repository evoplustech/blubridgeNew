const { createProxyMiddleware } = require('http-proxy-middleware');

const apiPath = path => path === '/api' || path.startsWith('/api/');
const methods = new Set(['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']);
const hopHeaders = new Set(['connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization', 'te', 'trailer', 'transfer-encoding', 'upgrade']);
const securityHeaders = new Set(['origin', 'referer', 'cookie', 'authorization', 'x-csrf-token', 'x-bb-form-token']);

function configuredUrl(name) {
  if (!process.env[name]) throw new Error(`${name} is required`);
  try { return new URL(process.env[name]); }
  catch { throw new Error(`${name} must be a valid origin URL`); }
}

function proxyTarget() {
  const target = configuredUrl('API_PROXY_TARGET');
  const loopback = ['127.0.0.1', 'localhost', '[::1]'].includes(target.hostname);
  if (!(target.protocol === 'https:' || (target.protocol === 'http:' && loopback)) ||
      target.username || target.password || target.pathname !== '/' || target.search || target.hash) {
    throw new Error('API_PROXY_TARGET must be an HTTPS origin (HTTP is allowed only for a local backend)');
  }
  const frontend = configuredUrl('REACT_APP_BACKEND_URL');
  if (target.origin === frontend.origin || (loopback && target.port === process.env.PORT)) {
    throw new Error('API_PROXY_TARGET must point to the backend, not the frontend');
  }
  return target.origin;
}

const reject = (res, status, detail) => res.status(status).set({ 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }).json({ detail });

module.exports = function installApiProxy(app) {
  const proxy = createProxyMiddleware({
    target: proxyTarget(), changeOrigin: true, xfwd: false, ws: false,
    pathFilter: (_path, req) => apiPath(req.url.split('?', 1)[0]),
    followRedirects: false, cookieDomainRewrite: false, cookiePathRewrite: false,
    proxyTimeout: 30000, timeout: 35000,
    on: {
      error(error, _req, res) {
        console.error('api_proxy_error', { code: error.code });
        if (res.headersSent) return res.destroy();
        res.writeHead(502, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
        res.end(JSON.stringify({ detail: 'The service is temporarily unavailable. Please try again.' }));
      },
    },
  });

  // Root mounting preserves /api and its query string. No body parser may precede this.
  app.use((req, res, next) => {
    const path = req.url.split('?', 1)[0];
    let decoded;
    try { decoded = decodeURIComponent(path); }
    catch { return apiPath(path) ? reject(res, 400, 'Invalid API path') : next(); }
    if (!apiPath(path) && !apiPath(decoded)) return next();
    if (!apiPath(path) || /%(?:2e|2f|5c|25)/i.test(path) || /[\\\x00-\x1f\x7f]/.test(decoded) || decoded.split('/').some(part => part === '.' || part === '..')) {
      return reject(res, 400, 'Invalid API path');
    }
    if (!methods.has(req.method)) return reject(res, 405, 'Method not allowed');
    const connectionHeaders = (req.headers.connection || '').split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
    if (connectionHeaders.some(name => securityHeaders.has(name) || name.startsWith('sec-fetch-'))) {
      return reject(res, 400, 'Invalid connection headers');
    }
    for (const name of Object.keys(req.headers)) {
      if (hopHeaders.has(name) || connectionHeaders.includes(name) || name === 'forwarded' || name.startsWith('x-forwarded-')) delete req.headers[name];
    }
    return proxy(req, res, next);
  });
  app.use((req, res, next) => apiPath(req.url.split('?', 1)[0]) ? reject(res, 404, 'API route not found') : next());
};