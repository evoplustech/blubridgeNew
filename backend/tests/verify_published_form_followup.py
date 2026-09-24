"""Reuse the proven real-browser form flow against the redirected URL/new public route."""
import asyncio
import importlib.util
import json
from pathlib import Path
from playwright.async_api import async_playwright

spec = importlib.util.spec_from_file_location('base_flow', Path(__file__).with_name('verify_base_browser_followup.py'))
flow = importlib.util.module_from_spec(spec)
spec.loader.exec_module(flow)


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=['--no-sandbox'])
        try:
            await flow.verify_form(browser, False)
            await flow.verify_form(browser, True)
        finally:
            await browser.close()
            Path('/app/test_reports/published_form_followup.json').write_text(json.dumps(flow.RESULTS, indent=2))


if __name__ == '__main__':
    asyncio.run(main())