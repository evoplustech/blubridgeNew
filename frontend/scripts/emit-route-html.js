// Post-build: puts the Google tag into the HTML source of the static build.
// - build/index.html  -> every SPA route served by the static host (admin is guarded inside the snippet)
// - build/consulting/index.html + build/consulting.html -> pre-rendered documents for the ad landing route
//   (Render answers the extensionless /consulting through the _redirects rewrite).
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true });
const injectGoogleTag = require('../googleTagSnippet');

const buildDir = path.join(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('[route-html] build/index.html missing — skipped');
  process.exit(0);
}

let html;
try {
  html = injectGoogleTag(fs.readFileSync(indexPath, 'utf8'), '/');
} catch (error) {
  console.error(`[route-html] Google tag not configured (${error.message}) — build left untouched`);
  process.exit(0);
}

fs.writeFileSync(indexPath, html);
console.log('[route-html] index.html now carries the Google tag in its source');

let routes = [];
try { routes = injectGoogleTag.taggedRoutes(); } catch { routes = []; }

routes.forEach(route => {
  const slug = route.replace(/^\//, '');
  [path.join(buildDir, slug, 'index.html'), path.join(buildDir, `${slug}.html`)].forEach(target => {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, html);
    console.log(`[route-html] wrote ${path.relative(buildDir, target)}`);
  });
});
