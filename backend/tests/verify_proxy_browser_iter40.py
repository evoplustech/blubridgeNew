"""Browser verification through preview URL with API forwarding to local Express proxy."""

import asyncio
import json
import uuid

from dotenv import dotenv_values
from playwright.async_api import async_playwright, expect
from pymongo import MongoClient


FRONTEND_ENV = dotenv_values('/app/frontend/.env')
BACKEND_ENV = dotenv_values('/app/backend/.env')
BASE = FRONTEND_ENV['REACT_APP_BACKEND_URL'].rstrip('/')
LOCAL_PROXY = 'http://127.0.0.1:3000'


def result(check, status='pass', **extra):
    payload = {'check': check, 'status': status}
    payload.update(extra)
    print(json.dumps(payload), flush=True)
    return payload


async def install_forwarding(page, counters):
    async def _handler(route):
        req = route.request
        original = req.url
        suffix = original.split('/api', 1)[1]
        target = f'{LOCAL_PROXY}/api{suffix}'
        counters['forwarded'] += 1
        resp = await route.fetch(url=target, headers=req.headers, method=req.method, post_data=req.post_data_buffer)
        await route.fulfill(response=resp)

    await page.route(f'{BASE}/api/**', _handler)


async def submit_consulting(browser, mobile=False):
    context = await browser.new_context(ignore_https_errors=True)
    page = await context.new_page()
    counters = {'forwarded': 0}
    await install_forwarding(page, counters)
    await page.set_viewport_size({'width': 390, 'height': 844} if mobile else {'width': 1920, 'height': 800})

    mongo = MongoClient(BACKEND_ENV['MONGO_URL'])
    records = mongo[BACKEND_ENV['DB_NAME']].contact_enquiries

    created_id = None
    email = f"qa.proxy.iter40.{('m' if mobile else 'd')}.{uuid.uuid4().hex[:10]}@example.com"
    full_name = f"QA Proxy Iter40 {'Mobile' if mobile else 'Desktop'}"

    try:
        await page.goto(f'{BASE}/consulting', wait_until='domcontentloaded')
        await expect(page.get_by_test_id('aic-submit-enquiry')).to_be_visible(timeout=10000)

        await page.get_by_test_id('aic-full-name').fill(full_name)
        await page.get_by_test_id('aic-work-email').fill(email)
        await page.get_by_test_id('aic-company').fill('QA Proxy Labs')
        await page.get_by_test_id('aic-job-title').fill('QA Engineer')

        for field in ['aic-country-code', 'aic-phone-country']:
            await page.get_by_test_id(field).click()
            await page.wait_for_timeout(200)
            await page.get_by_test_id(f'{field}-search').fill('India')
            await page.get_by_test_id(f'{field}-option-in').click()
            await expect(page.get_by_test_id(f'{field}-popover')).to_be_hidden()

        await page.get_by_test_id('aic-phone').fill('9876543210')
        await page.get_by_test_id('aic-service-consulting').check()

        async def pick(field, option_index=1):
            await page.get_by_test_id(field).click()
            await page.wait_for_timeout(250)
            await page.get_by_test_id(f'{field}-option-{option_index}').click(force=True)
            await expect(page.get_by_test_id(f'{field}-menu')).to_be_hidden()

        await pick('aic-stage')
        await pick('aic-timeline')
        await page.get_by_test_id('aic-budget-type-project').check()
        await pick('aic-estimated-budget')
        await pick('aic-budget-status')
        await page.get_by_test_id('aic-contact-permission').check()

        async with page.expect_response(lambda r: r.url.endswith('/api/ai-consulting-enquiries') and r.request.method == 'POST', timeout=60000) as pending:
            await page.get_by_test_id('aic-submit-enquiry').click()
        response = await pending.value
        assert response.status == 201, f'expected 201 got {response.status}'
        receipt = await response.json()
        created_id = receipt['id']

        await expect(page.get_by_test_id('aic-success-message')).to_be_visible(timeout=15000)
        doc = records.find_one({'id': created_id}, {'_id': 0})
        assert doc is not None
        assert doc['company_email'] == email.lower()

        assert counters['forwarded'] > 0

        duplicate_status = await page.evaluate(
            """async (payload) => {
              const ctx = await fetch('/api/form-context', {credentials: 'include'});
              const token = (await ctx.json()).formToken;
              await new Promise(r => setTimeout(r, 1100));
              const res = await fetch('/api/ai-consulting-enquiries', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json', 'X-BB-Form-Token': token},
                body: JSON.stringify(payload)
              });
              return res.status;
            }""",
            {
                'fullName': full_name,
                'workEmail': email,
                'company': 'QA Proxy Labs',
                'jobTitle': 'QA Engineer',
                'website': 'https://qa.example.com',
                'countryCode': 'IN',
                'country': 'India',
                'phoneCountry': 'IN',
                'phone': '9876543210',
                'initiativeRole': 'Technical evaluator / recommender',
                'otherRole': '',
                'contactPermission': True,
                'services': ['AI Consulting & Technical Advisory'],
                'otherRequirement': '',
                'requirement': 'QA proxy verification requirement. ' * 3,
                'stage': 'Requirements defined',
                'timeline': '1–3 months',
                'budgetType': 'project',
                'estimatedBudget': '$10,000–$24,999',
                'budgetStatus': 'Budget proposed — approval pending',
            },
        )
        assert duplicate_status == 409, f'duplicate expected 409 got {duplicate_status}'

        count = records.count_documents({'company_email': email.lower()})
        assert count == 1

        return result(
            f"consulting {'mobile' if mobile else 'desktop'} submit via proxy",
            forwarded_api_calls=counters['forwarded'],
            created_id=created_id,
            duplicate_status=duplicate_status,
        )
    finally:
        await page.unroute_all(behavior='ignoreErrors')
        if created_id:
            records.delete_one({'id': created_id, 'company_email': email.lower()})
        mongo.close()
        await context.close()


async def verify_admin(browser):
    context = await browser.new_context(ignore_https_errors=True)
    page = await context.new_page()
    counters = {'forwarded': 0}
    await install_forwarding(page, counters)
    await page.set_viewport_size({'width': 1920, 'height': 800})

    try:
        await page.goto(f'{BASE}/admin', wait_until='domcontentloaded')
        await page.get_by_test_id('admin-login-username').fill(BACKEND_ENV['ADMIN_USERNAME'])
        await page.get_by_test_id('admin-login-password').fill(BACKEND_ENV['ADMIN_PASSWORD'])
        async with page.expect_response(lambda r: r.url.endswith('/api/admin/login') and r.request.method == 'POST', timeout=60000) as pending:
            await page.get_by_test_id('admin-login-submit').click()
        login_resp = await pending.value
        assert login_resp.status == 200
        await page.wait_for_url(f'{BASE}/admin/dashboard', timeout=20000)
        await expect(page.get_by_test_id('admin-header-logout')).to_be_visible()

        verify_status = await page.evaluate("""async () => (await fetch('/api/admin/verify', {credentials:'include'})).status""")
        assert verify_status == 200

        async with page.expect_response(lambda r: r.url.endswith('/api/admin/logout') and r.request.method == 'POST', timeout=60000) as pending_logout:
            await page.get_by_test_id('admin-header-logout').click()
        logout_resp = await pending_logout.value
        assert logout_resp.status == 200

        post_logout_verify = await page.evaluate("""async () => (await fetch('/api/admin/verify', {credentials:'include'})).status""")
        assert post_logout_verify == 401

        assert counters['forwarded'] > 0
        return result('admin login/verify/logout via proxy', forwarded_api_calls=counters['forwarded'])
    finally:
        await page.unroute_all(behavior='ignoreErrors')
        await context.close()


async def main():
    outputs = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=['--no-sandbox'])
        try:
            outputs.append(await submit_consulting(browser, mobile=False))
            outputs.append(await submit_consulting(browser, mobile=True))
            outputs.append(await verify_admin(browser))
        finally:
            await browser.close()

    status = 'pass'
    if any(item.get('status') != 'pass' for item in outputs):
        status = 'fail'
    outputs.append(result('proxy forwarding aggregate', status=status))
    Path = __import__('pathlib').Path
    Path('/app/test_reports/iteration_40_browser_proxy.json').write_text(json.dumps(outputs, indent=2))


if __name__ == '__main__':
    asyncio.run(main())
