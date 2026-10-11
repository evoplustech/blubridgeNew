// Post-build: writes a dedicated HTML document for every Google-tagged route (e.g. build/consulting/index.html)
// so static hosting (Render Static Site) serves the tag inside the page source on that route only.
// Render serves an existing file before any SPA rewrite rule, so /consulting resolves to this document.
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

const html = fs.readFileSync(indexPath, 'utf8');

let routes = [];
try {
  routes = injectGoogleTag.taggedRoutes();
} catch (error) {
  console.error(`[route-html] Google tag routes not configured (${error.message}) — no route documents written`);
  process.exit(0);
}

routes.forEach(route => {
  const slug = route.replace(/^\//, '');
  const tagged = injectGoogleTag(html, route);
  // Both shapes are written so static hosts resolve /consulting with either clean-URL strategy.
  const targets = [path.join(buildDir, slug, 'index.html'), path.join(buildDir, `${slug}.html`)];
  targets.forEach(target => {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, tagged);
    console.log(`[route-html] wrote ${path.relative(buildDir, target)} with the Google tag`);
  });
});
