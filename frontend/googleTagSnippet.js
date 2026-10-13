// Builds the Google tag (gtag.js) snippet that ships inside the HTML <head> source of the site.
// It must live in the document source (not be injected by the bundle) so Google Ads / Tag Assistant
// detection and "View page source" find it. Admin pages never configure the tag: the Express renderer
// skips them entirely, and the statically hosted document guards on the path at runtime.

const envValue = name => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
};

const envList = name => envValue(name).toLowerCase().split(/\s+/).filter(Boolean);

const normalizePath = pathname => pathname.replace(/\/+$/, '').toLowerCase() || '/';

// Routes that also get their own pre-rendered document (see scripts/emit-route-html.js).
const taggedRoutes = () => envList('REACT_APP_GOOGLE_TAG_ROUTES').map(normalizePath);

const isAdminPath = pathname => {
  try { return /^\/admin(?:\/|$)/i.test(decodeURIComponent(pathname.split('?')[0].split('#')[0])); }
  catch { return true; }
};

function googleTagSnippet() {
  const adsId = envValue('REACT_APP_GOOGLE_ADS_TAG_ID');
  const tagIds = [adsId, process.env.REACT_APP_GOOGLE_TAG_ID].filter(Boolean);
  const loader = new URL(envValue('REACT_APP_GOOGLE_TAG_SCRIPT_URL'));
  if (loader.protocol !== 'https:') throw new Error('REACT_APP_GOOGLE_TAG_SCRIPT_URL must use HTTPS');
  loader.searchParams.set('id', adsId);
  // gtag.js on its own sends nothing: the gtag('config') calls trigger the hits, so guarding them keeps
  // admin pages free of tracking even when the host serves them the same static document.
  return `<!-- Google tag (gtag.js) -->
<script async src="${loader.href}" data-testid="google-tag-script"></script>
<script data-testid="google-tag-config">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  if (!/^\\/admin(?:\\/|$)/i.test(location.pathname)) {
    gtag('js', new Date());
${tagIds.map(id => `    gtag('config', '${id}');`).join('\n')}
    window.__bbGoogleTagInline = { tagIds: ${JSON.stringify(tagIds)} };
  }
</script>`;
}

const SNIPPET_BLOCK = /\n?<!-- Google tag \(gtag\.js\) -->[\s\S]*?<script data-testid="google-tag-config">[\s\S]*?<\/script>/;

// Adds the snippet to every non-admin document, once; strips it from admin documents.
module.exports = function injectGoogleTag(html, pathname) {
  if (isAdminPath(pathname)) return html.replace(SNIPPET_BLOCK, '');
  if (html.includes('data-testid="google-tag-config"')) return html;
  const snippet = googleTagSnippet();
  return html.replace(/<head\b[^>]*>/i, match => `${match}\n${snippet}`);
};

module.exports.isAdminPath = isAdminPath;
module.exports.taggedRoutes = taggedRoutes;
module.exports.googleTagSnippet = googleTagSnippet;
