const pages = require('./publishedPages.json');
const publicPaths = Object.values(pages.public).flat();
const publicSet = new Set(publicPaths.map(path => path.toLowerCase()));
const adminSet = new Set(pages.admin);
// Internal-only pages stay in the codebase and remain reachable on preview/dev hosts, but are hidden
// (rendered as Page not found) anywhere else — including the live domain. Fails closed: an unknown or
// missing host hides them.
const internalOnlySet = new Set(pages.internalOnly.map(path => path.toLowerCase()));
const internalHosts = (process.env.REACT_APP_INTERNAL_PREVIEW_HOSTS || '').toLowerCase().split(/\s+/).filter(Boolean);

const normalizePagePath = pathname => {
  try { return decodeURIComponent(pathname).replace(/\/+$/, '').toLowerCase() || '/'; }
  catch { return ''; }
};

const isInternalHost = hostname => internalHosts.includes(String(hostname || '').toLowerCase());

const getPageAccess = (pathname, hostname) => {
  const path = normalizePagePath(pathname);
  if (path === '/ai-consulting') return 'redirect';
  if (internalOnlySet.has(path) && !isInternalHost(hostname)) return 'not-found';
  if (publicSet.has(path)) return 'public';
  if (adminSet.has(path)) return 'admin';
  return 'not-found';
};

const indexablePaths = publicPaths.filter(path => !internalOnlySet.has(path.toLowerCase()));

module.exports = { getPageAccess, normalizePagePath, publicPaths, indexablePaths, isInternalHost };
