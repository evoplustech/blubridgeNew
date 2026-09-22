"""Targeted post-agent verification. No credentials, cookies or customer data in output."""
import asyncio
import json
import sys
import uuid
from pathlib import Path

from dotenv import dotenv_values
from playwright.async_api import async_playwright, expect
from pymongo import MongoClient

BASE = dotenv_values('/app/frontend/.env')['REACT_APP_BACKEND_URL'].rstrip('/')
CONFIG = dotenv_values('/app/backend/.env')
RESULTS = []


def passed(check):
    RESULTS.append({'check': check, 'status': 'pass'})
    print('PASS', check, flush=True)


async def select(page, field, index, text, keyboard=False):
    trigger = page.get_by_test_id(field)
    await trigger.scroll_into_view_if_needed()
    if keyboard:
        await trigger.focus()
        await page.keyboard.press('ArrowDown')
    else:
        await trigger.click()
    await expect(page.get_by_test_id(field + '-menu')).to_be_visible()
    if keyboard:
        await page.keyboard.type(text, delay=50)
        await page.keyboard.press('Enter')
    else:
        await page.get_by_test_id(f'{field}-option-{index}').click()
    await expect(page.get_by_test_id(field + '-menu')).to_be_hidden()
    await expect(trigger).to_have_text(text)
    passed(field + (' keyboard' if keyboard else ' mouse') + ' selection persists')


async def verify_admin(browser):
    context = await browser.new_context()
    page = await context.new_page()
    await page.set_viewport_size({'width': 1920, 'height': 800})
    logged_in = False
    try:
        await page.goto(BASE + '/admin', wait_until='domcontentloaded')
        await page.get_by_test_id('admin-login-username').fill(CONFIG['ADMIN_USERNAME'])
        await page.get_by_test_id('admin-login-password').fill(CONFIG['ADMIN_PASSWORD'])
        async with page.expect_response(lambda r: r.url.endswith('/api/admin/login')) as pending:
            await page.get_by_test_id('admin-login-submit').click()
        response = await pending.value
        assert response.status == 200, f'Login HTTP {response.status}'
        logged_in = True
        await page.wait_for_url(BASE + '/admin/dashboard')
        await expect(page.get_by_test_id('admin-header-logout')).to_be_visible()
        passed('secure configured credentials log in through browser')
        cookies = await context.cookies()
        cookie = next(c for c in cookies if c['name'] == '__Host-bb-admin')
        assert cookie['secure'] and cookie['httpOnly']
        RESULTS.append({'check': 'external cookie SameSite', 'status': 'limitation',
                        'observed': cookie['sameSite'], 'expected_at_application': 'Strict',
                        'cause': 'preview response rewriting outside application'})
        assert await page.evaluate('localStorage.getItem("adminToken")') is None
        await page.reload(wait_until='domcontentloaded')
        await expect(page.get_by_test_id('admin-header-logout')).to_be_visible()
        passed('dashboard session survives reload without browser-stored auth token')
        await page.set_viewport_size({'width': 390, 'height': 844})
        await page.get_by_test_id('admin-mobile-menu-toggle').click()
        async with page.expect_response(lambda r: r.url.endswith('/api/admin/logout')) as pending:
            await page.get_by_test_id('admin-mobile-logout').click()
        assert (await pending.value).status == 200
        logged_in = False
        await page.wait_for_url(BASE + '/admin')
        await expect(page.get_by_test_id('admin-login-submit')).to_be_visible()
        status = await page.evaluate('async () => (await fetch("/api/admin/verify", {credentials:"include"})).status')
        assert status == 401
        passed('mobile logout revokes session and returns to login')
    finally:
        if logged_in:
            await page.evaluate('''async () => {
                const context = await fetch('/api/admin/session', {credentials:'include'}).then(r=>r.json());
                await fetch('/api/admin/logout', {method:'POST', credentials:'include', headers:{'X-CSRF-Token':context.csrfToken}});
            }''')
        await context.close()


async def verify_form(browser, mobile):
    context = await browser.new_context()
    page = await context.new_page()
    await page.set_viewport_size({'width': 390, 'height': 844} if mobile else {'width': 1920, 'height': 800})
    client = MongoClient(CONFIG['MONGO_URL'])
    records = client[CONFIG['DB_NAME']].contact_enquiries
    email = f'qa.base.followup.{uuid.uuid4().hex}@example.com'
    created_id = None
    count = 0
    def count_posts(request):
        nonlocal count
        if request.method == 'POST' and request.url.endswith('/api/ai-consulting-enquiries'):
            count += 1
    page.on('request', count_posts)
    try:
        await page.goto(BASE + '/ai-consulting/', wait_until='domcontentloaded')
        await page.get_by_test_id('aic-submit-enquiry').click()
        await expect(page.get_by_test_id('aic-full-name-error')).to_be_visible()
        assert count == 0
        passed('empty validation sends no enquiry POST')
        fields = {'aic-full-name': 'QA Browser Followup', 'aic-work-email': email,
                  'aic-company': 'QA Followup', 'aic-job-title': 'Engineer'}
        for field, value in fields.items():
            await page.get_by_test_id(field).fill(value)
        for field in ['aic-country-code', 'aic-phone-country']:
            await page.get_by_test_id(field).click()
            await page.get_by_test_id(field + '-search').fill('India')
            await page.get_by_test_id(field + '-option-in').click()
            await expect(page.get_by_test_id(field + '-popover')).to_be_hidden()
        await page.get_by_test_id('aic-phone').fill('9876543210')
        await page.get_by_test_id('aic-service-consulting').check()
        await page.get_by_test_id('aic-service-other').check()
        await page.get_by_test_id('aic-requirement').fill('QA architecture requirement. ' * 60)
        await select(page, 'aic-stage', 1, 'Requirements defined', keyboard=not mobile)
        await select(page, 'aic-timeline', 1, '1–3 months', keyboard=not mobile)
        await page.get_by_test_id('aic-budget-type-monthly').check()
        await select(page, 'aic-estimated-budget', 1, '$5,000–$9,999 per month')
        await page.get_by_test_id('aic-budget-type-project').check()
        await expect(page.get_by_test_id('aic-estimated-budget')).to_have_text('Select your estimated budget')
        await select(page, 'aic-estimated-budget', 1, '$10,000–$24,999')
        await select(page, 'aic-budget-status', 1, 'Budget proposed — approval pending')
        await page.get_by_test_id('aic-contact-permission').check()
        await expect(page.get_by_test_id('aic-contact-permission')).to_be_checked()
        assert await page.locator('.aic-error').count() == 0
        passed('all six dropdowns, budget reset and consent work in full form')
        await page.mouse.move(20, 20)
        overflow = await page.evaluate("() => [...document.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.className||e.tagName).slice(0,5)")
        assert not overflow, str(overflow)
        passed('mobile full form no horizontal overflow' if mobile else 'desktop full form no horizontal overflow')
        async def delay(route):
            await asyncio.sleep(2)
            await route.continue_()
        await page.route('**/api/ai-consulting-enquiries', delay)
        button = page.get_by_test_id('aic-submit-enquiry')
        async with page.expect_response(lambda r: r.url.endswith('/api/ai-consulting-enquiries'), timeout=60000) as pending:
            await button.dblclick(delay=30)
            await expect(button).to_be_disabled()
            await expect(button).to_have_attribute('aria-busy', 'true')
            await expect(page.get_by_test_id('aic-submit-label')).to_have_text('Submitting…')
            await expect(page.get_by_test_id('aic-submit-spinner')).to_be_visible()
            await page.keyboard.press('Enter')
            passed('immediate disabled loading spinner during delayed real request')
        response = await pending.value
        assert response.status == 201, f'Submit HTTP {response.status}'
        receipt = await response.json()
        created_id = receipt['id']
        await expect(page.get_by_test_id('aic-success-message')).to_have_text('Success Fully Submitted')
        await expect(button).to_be_disabled()
        await expect(page.get_by_test_id('aic-full-name')).to_be_disabled()
        assert count == 1, f'POST count {count}'
        record = records.find_one({'id': created_id}, {'_id': 0})
        assert record and record['company_email'] == email
        assert records.count_documents({'company_email': email}) == 1
        assert record['start_timeline'] == '1–3 months'
        assert record['budget'] == '$10,000–$24,999'
        assert record['budget_status'] == 'Budget proposed — approval pending'
        assert record['privacy_consent'] is True
        passed(('mobile' if mobile else 'desktop') + ' real success, one POST, one DB row, canonical data and locked controls')
    finally:
        if created_id:
            records.delete_one({'id': created_id, 'company_email': email})
        client.close()
        await context.close()


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=['--no-sandbox'])
        try:
            if '--admin-only' not in sys.argv:
                await verify_form(browser, False)
                await verify_form(browser, True)
            if '--form-only' not in sys.argv:
                await verify_admin(browser)
        finally:
            await browser.close()


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except Exception as error:
        # Browser assertion output here contains no credential input values.
        RESULTS.append({'check': 'run completion', 'status': 'fail', 'error_type': type(error).__name__})
        raise
    finally:
        suffix = '_admin' if '--admin-only' in sys.argv else '_form' if '--form-only' in sys.argv else ''
        Path(f'/app/test_reports/iteration_36_followup{suffix}.json').write_text(json.dumps(RESULTS, indent=2))