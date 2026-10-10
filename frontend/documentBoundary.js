const fs = require('fs');
const path = require('path');

const isAdminPath = pathname => /^\/admin(?:\/|$)/i.test(decodeURIComponent(pathname));

// Runs before any third-party code so crossing the admin boundary loads a new CSP/document.
module.exports = function documentBoundary() {
  const boundary = fs.readFileSync(path.join(__dirname, 'public', 'admin-route-boundary.js'), 'utf8');
  const script = `<script data-testid="admin-document-boundary">${boundary}</script>`;
  return html => html.replace(/<head\b[^>]*>/i, match => `${match}\n${script}`);
};

module.exports.isAdminPath = isAdminPath;
