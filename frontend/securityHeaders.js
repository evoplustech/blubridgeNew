const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

function requiredOrigins(name) {
  if (process.env[name] === undefined) throw new Error(`Missing configuration: ${name}`);
  return process.env[name].split(/\s+/).filter(Boolean).map(value => {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:' || value.includes('*')) throw new Error(`Invalid origin in ${name}`);
    return parsed.origin;
  });
}

module.exports = function securityHeaders(app) {
  const scripts = requiredOrigins('SECURITY_CSP_SCRIPT_ORIGINS');
  const connections = requiredOrigins('SECURITY_CSP_CONNECT_ORIGINS');
  const assets = requiredOrigins('SECURITY_CSP_ASSET_ORIGINS');
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    const nonce = crypto.randomBytes(24).toString('base64');
    const admin = req.path === '/admin' || req.path.startsWith('/admin/');
    const directives = [
      "default-src 'self'", `script-src 'self' 'nonce-${nonce}' ${admin ? '' : scripts.join(' ')}`,
      "script-src-attr 'none'", "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com", `img-src 'self' data: blob: ${assets.join(' ')}`,
      `media-src 'self' blob: ${assets.join(' ')}`, `connect-src 'self' ${admin ? '' : connections.join(' ')}`,
      "object-src 'none'", "base-uri 'self'", "form-action 'self'", "frame-ancestors 'none'", "frame-src 'none'", "worker-src 'self' blob:",
    ];
    res.setHeader('Content-Security-Policy', directives.join('; '));
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    if (process.env.SECURITY_REQUIRE_HTTPS === 'true') res.setHeader('Strict-Transport-Security', 'max-age=31536000');
    if (admin) res.setHeader('Cache-Control', 'no-store');
    const originalSend = res.send.bind(res);
    res.send = body => {
      if (typeof body === 'string' && /<!doctype html>|<html[\s>]/i.test(body)) {
        if (admin) {
          body = body.replace(/<script\b[^>]*src=["'](?:https?:)?\/\/[^"']+["'][^>]*>\s*<\/script>/gi, '');
          body = body.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (tag, script) => /posthog\.init/.test(script) ? '' : tag);
        }
        body = body.replace(/<script\b(?![^>]*\bnonce=)/gi, `<script nonce="${nonce}"`);
      }
      return originalSend(body);
    };
    let decoded;
    try { decoded = decodeURIComponent(req.path); } catch { return res.status(400).send('Invalid request'); }
    if (decoded.includes('\\') || decoded.includes('\0') || decoded.split('/').some(p => p === '.' || p === '..') || /(^|\/)\.(?!well-known(?:\/|$))|\.(?:map|env|bak|log|pem|key)$|\/(?:package(?:-lock)?\.json|yarn\.lock|server\.js|requirements\.txt|memory|security|test_reports|backend|src|node_modules|\.git)(?:\/|$)/i.test(decoded)) return res.status(404).send('Not found');
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return res.status(405).set('Allow', 'GET, HEAD, OPTIONS').send('Method Not Allowed');
    if (req.method === 'OPTIONS') return res.status(204).set('Allow', 'GET, HEAD, OPTIONS').end();
    next();
  });
};

module.exports.confinedFile = function confinedFile(root, requestPath) {
  const file = path.resolve(root, '.' + requestPath);
  if (!file.startsWith(path.resolve(root) + path.sep) || !fs.existsSync(file)) return null;
  const real = fs.realpathSync(file);
  return real.startsWith(fs.realpathSync(root) + path.sep) && fs.statSync(real).isFile() ? real : null;
};