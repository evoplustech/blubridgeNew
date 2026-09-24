const pages = require('./publishedPages.json');
const publicPaths = Object.values(pages.public).flat();
const publicSet = new Set(publicPaths.map(path => path.toLowerCase()));
const adminSet = new Set(pages.admin);

const normalizePagePath = pathname => {
  try { return decodeURIComponent(pathname).replace(/\/+$/, '').toLowerCase() || '/'; }
  catch { return ''; }
};

const getPageAccess = pathname => {
  const path = normalizePagePath(pathname);
  if (path === '/ai-consulting') return 'redirect';
  if (publicSet.has(path)) return 'public';
  if (adminSet.has(path)) return 'admin';
  return 'not-found';
};

module.exports = { getPageAccess, normalizePagePath, publicPaths };