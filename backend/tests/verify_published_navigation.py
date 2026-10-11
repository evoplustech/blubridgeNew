"""Public-page navigation/link and Google Ads boundary verification (no admin login)."""
import asyncio
import json
from pathlib import Path
from urllib.parse import urlsplit, unquote
from dotenv import dotenv_values
from playwright.async_api import async_playwright, expect

BASE = dotenv_values('/app/frontend/.env')['REACT_APP_BACKEND_URL'].rstrip('/')
PAGES = json.loads(Path('/app/frontend/src/routing/publishedPages.json').read_text())
PATHS = [path for paths in PAGES['public'].values() for path in paths]
ALLOWED = {path.lower().rstrip('/') or '/' for path in PATHS}
ENV = dotenv_values('/app/frontend/.env')
TAG_EXPECTED = urlsplit(BASE).hostname.lower() in (ENV.get('REACT_APP_GOOGLE_TAG_ALLOWED_HOSTS') or '').lower().split()
VISITED = {path.lower().rstrip('/') or '/' for path in PATHS}
RESULTS = []


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=['--no-sandbox'])
        page = await browser.new_page()
        await page.set_viewport_size({'width': 1920, 'height': 800})
        try:
            await page.goto(BASE + '/', wait_until='domcontentloaded')
            await page.wait_for_selector('header, nav', timeout=15000)
            bad_links = []
            for path in PATHS:
                await page.evaluate('''path => {
                    history.pushState({}, '', path);
                    dispatchEvent(new PopStateEvent('popstate', {state: history.state}));
                }''', path)
                await page.wait_for_timeout(180)
                assert await page.get_by_test_id('page-not-found').count() == 0, path
                assert len(await page.locator('main').inner_text()) > 50, path
                for link in await page.locator('main a[href],header a[href],footer a[href]').evaluate_all('(els)=>els.map(e=>e.href)'):
                    url = urlsplit(link)
                    if url.netloc != urlsplit(BASE).netloc:
                        continue
                    normalized = unquote(url.path).lower().rstrip('/') or '/'
                    if normalized not in ALLOWED and not normalized.startswith(('/images/', '/static/')):
                        bad_links.append({'page': path, 'link': url.path})
            assert not bad_links, json.dumps(bad_links)
            RESULTS.append({'check': '46 public pages render via SPA navigation without links to unpublished pages', 'status': 'pass'})
            print('PASS 46 public pages and all rendered internal links')
            # Google tag boots only on /consulting and only on production hosts (REACT_APP_GOOGLE_TAG_ROUTES / _ALLOWED_HOSTS).
            tag_here = TAG_EXPECTED and ('/consulting' in VISITED)
            counts = await page.evaluate('''({scripts:document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]').length,
                configs:(window.dataLayer||[]).filter(x=>x[0]==='config'&&(x[1]==='GT-PLHLCK7D'||x[1]==='AW-18460200148')).length})''')
            assert counts == ({'scripts': 1, 'configs': 2} if tag_here else {'scripts': 0, 'configs': 0}), counts
            RESULTS.append({'check': 'Google tag scoped to /consulting and not duplicated across SPA navigation', 'status': 'pass'})
            print('PASS Google tag scoping across public SPA navigation')
            async with page.expect_navigation(wait_until='domcontentloaded'):
                await page.evaluate("history.pushState({},'', '/admin')")
            await expect(page.get_by_test_id('admin-login-submit')).to_be_visible()
            assert await page.locator('script[src*="googletagmanager.com/gtag/js"]').count() == 0
            assert await page.evaluate('typeof window.gtag') == 'undefined'
            async with page.expect_navigation(wait_until='domcontentloaded'):
                await page.evaluate("history.pushState({},'', '/consulting')")
            await expect(page.get_by_test_id('aic-full-name')).to_be_visible()
            assert await page.locator('script[src*="googletagmanager.com/gtag/js"]').count() == (1 if TAG_EXPECTED else 0)
            RESULTS.append({'check': 'Admin/public boundaries reload document; Google absent on admin', 'status': 'pass'})
            print('PASS admin/public document isolation without credential use')
            for viewport in [{'width': 1920, 'height': 800}, {'width': 390, 'height': 844}]:
                await page.set_viewport_size(viewport)
                await page.evaluate("history.pushState({},'', '/media-kit');dispatchEvent(new PopStateEvent('popstate',{state:history.state}));")
                await expect(page.get_by_test_id('page-not-found-heading')).to_be_visible()
                await page.mouse.move(20,20)
                offenders = await page.evaluate("() => [...document.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).slice(0,5).map(e => e.className || e.tagName)")
                print('VIEWPORT',viewport['width'],'OVERFLOW',offenders)
                assert not offenders
                await page.get_by_test_id('page-not-found-home').click()
                await expect(page.get_by_test_id('page-not-found')).to_have_count(0)
            RESULTS.append({'check': 'Desktop/mobile SPA exclusions show 404 and Back Home works without overflow', 'status': 'pass'})
        finally:
            await browser.close()
            Path('/app/test_reports/published_navigation_followup.json').write_text(json.dumps(RESULTS, indent=2))


if __name__ == '__main__':
    asyncio.run(main())