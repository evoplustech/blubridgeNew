const fs = require('fs');
const path = require('path');

const isAdminPath = pathname => /^\/admin(?:\/|$)/i.test(decodeURIComponent(pathname));

module.exports = function googleAdsTag() {
  const tagId = process.env.GOOGLE_ADS_TAG_ID;
  if (!/^AW-\d+$/.test(tagId || '')) throw new Error('A valid GOOGLE_ADS_TAG_ID is required');
  const scriptUrl = new URL(process.env.GOOGLE_ADS_SCRIPT_URL);
  if (scriptUrl.protocol !== 'https:') throw new Error('GOOGLE_ADS_SCRIPT_URL must use HTTPS');
  scriptUrl.searchParams.set('id', tagId);
  const boundary = fs.readFileSync(path.join(__dirname, 'public', 'admin-route-boundary.js'), 'utf8');

  return (html, admin) => {
    // Run before any third-party code so crossing the admin boundary loads a new CSP/document.
    const navigationBoundary = `<script data-testid="admin-document-boundary">${boundary}</script>`;
    const googleTag = admin ? '' : `
      <!-- Google tag (gtag.js) -->
      <script async data-testid="google-ads-tag-script" src="${scriptUrl.href.replace(/&/g, '&amp;')}"></script>
      <script data-testid="google-ads-tag-config">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', ${JSON.stringify(tagId)});
      </script>`;
    return html.replace(/<head\b[^>]*>/i, match => `${match}\n${navigationBoundary}${googleTag}`);
  };
};

module.exports.isAdminPath = isAdminPath;