const { getPageAccess, publicPaths } = require('./src/routing/pageAccess');

module.exports = app => {
  const site = new URL(process.env.PUBLIC_SITE_URL);
  if (site.protocol !== 'https:') throw new Error('PUBLIC_SITE_URL must use HTTPS');
  app.get('/sitemap.xml', (req, res) => {
    const urls = publicPaths.map(path => `<url><loc>${new URL(path, site).href}</loc></url>`).join('\n');
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
  });
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: ${new URL('/sitemap.xml', site).href}\n`);
  });
  app.use((req, res, next) => {
    if (getPageAccess(req.path) !== 'redirect') return next();
    const query = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
    return res.redirect(308, `/consulting${query}`);
  });
};