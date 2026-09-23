import asyncio
import csv
import hashlib
import io
import json
import uuid
from datetime import datetime, timezone
from pathlib import Path

from dotenv import dotenv_values
from pymongo import MongoClient
from playwright.async_api import async_playwright, expect


BACKEND_ENV = dotenv_values('/app/backend/.env')
FRONTEND_ENV = dotenv_values('/app/frontend/.env')
BASE_URL = FRONTEND_ENV['REACT_APP_BACKEND_URL'].rstrip('/')
MONGO_URL = BACKEND_ENV['MONGO_URL']
DB_NAME = BACKEND_ENV['DB_NAME']
ADMIN_USERNAME = BACKEND_ENV['ADMIN_USERNAME']
ADMIN_PASSWORD = BACKEND_ENV['ADMIN_PASSWORD']

OUTPUT_DIR = Path('/app/test_reports/admin_detail_layout')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
RAW_RESULTS_PATH = OUTPUT_DIR / 'iteration_37_raw.json'


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def mk_id(prefix):
    return f"{prefix}-{uuid.uuid4()}"


def make_fixtures(run_tag):
    long_unbroken = 'L' * 380
    long_multiline = "Line A\nLine B with detail\nLine C with more detail"

    docs = []

    docs.append({
        'id': mk_id('qa-git-legacy'),
        'first_name': 'QA',
        'last_name': 'Legacy Fallback',
        'company_email': f'qa-legacy-{run_tag}@example.test',
        'company': 'QA Legacy Co',
        'phone': '+1 555 100 2001',
        'role': 'Operations Manager',
        'country': 'Canada',
        'city': 'Toronto',
        'services': ['AI strategy'],
        'project_details': 'Legacy fallback detail body',
        'privacy_consent': True,
        'marketing_consent': False,
        'status': 'new',
        'created_at': now_iso(),
        'updated_at': now_iso(),
        # source intentionally omitted
        # contact_permission intentionally omitted
    })

    docs.append({
        'id': mk_id('qa-git-monthly'),
        'full_name': 'QA Monthly Wizard',
        'company_email': f'qa-monthly-{run_tag}@example.test',
        'company': 'QA Monthly Co',
        'phone': '+44 7700 900123',
        'role': 'Head of AI',
        'country': 'United Kingdom',
        'city': 'London',
        'country_code': 'GB',
        'phone_country': 'GB',
        'calling_code': '+44',
        'website': 'https://qa-monthly.example.test',
        'initiative_role': 'Other',
        'other_role': 'Innovation sponsor',
        'services': ['Generative AI', 'Other'],
        'other_requirement': 'Legacy-other requirement should be visible',
        'project_details': 'Canonical values check',
        'project_stage': 'Discovery – Proof of Concept',
        'start_timeline': '2—3 months',
        'budget_type': 'monthly',
        'budget': '$ 10,000–50,000',
        'budget_status': 'Approved – awaiting vendor selection',
        'contact_permission': False,
        'privacy_consent': False,
        'marketing_consent': False,
        'source': '/ai-consulting',
        'status': 'new',
        'created_at': now_iso(),
        'updated_at': now_iso(),
    })

    docs.append({
        'id': mk_id('qa-git-v4'),
        'full_name': 'QA Variant4 Services',
        'company_email': f'qa-v4-{run_tag}@example.test',
        'company': 'QA V4 Co',
        'phone': '+91 99999 00001',
        'role': 'CTO',
        'country': 'India',
        'city': 'Bengaluru',
        'country_code': 'IN',
        'phone_country': 'IN',
        'calling_code': '+91',
        'website': 'https://qa-v4.example.test',
        'initiative_role': 'Technical lead',
        'services': ['AI strategy', 'Generative AI', 'AI integration'],
        'service_requirements': {
            'AI strategy': long_multiline,
            'Generative AI': long_unbroken,
            'AI integration': 'Integrate with ERP and data lake connectors',
        },
        'project_details': 'GENERIC_DESCRIPTION_MUST_NOT_RENDER_WHEN_SERVICE_REQUIREMENTS_EXIST',
        'project_stage': 'Pilot',
        'start_timeline': 'Immediately',
        'budget_type': 'project',
        'budget': '€ 100,000–500,000',
        'budget_status': 'Proposed',
        'contact_permission': True,
        'privacy_consent': True,
        'marketing_consent': True,
        'source': '/ai-consulting',
        'form_variant': 'v4',
        'status': 'new',
        'created_at': now_iso(),
        'updated_at': now_iso(),
    })

    docs.append({
        'id': mk_id('qa-git-v5'),
        'full_name': 'QA Variant5 Services',
        'company_email': f'qa-v5-{run_tag}@example.test',
        'company': 'QA V5 Co',
        'phone': '+49 170 1234567',
        'role': 'Program Director',
        'country': 'Germany',
        'city': 'Berlin',
        'country_code': 'DE',
        'phone_country': 'DE',
        'calling_code': '+49',
        'website': 'https://qa-v5.example.test',
        'initiative_role': 'Business owner',
        'services': ['AI strategy', 'Generative AI', 'AI agents', 'Custom AI models', 'AI integration', 'Other'],
        'service_requirements': {
            'AI strategy': 'Strategy detail 1',
            'Generative AI': 'Strategy detail 2',
            'AI agents': 'Strategy detail 3',
            'Custom AI models': 'Strategy detail 4',
            'AI integration': 'Strategy detail 5',
            'Other': f"{long_unbroken}\n{long_multiline}",
            'Requirement 7': 'Additional detail 7',
            'Requirement 8': 'Additional detail 8',
            'Requirement 9': 'Additional detail 9',
        },
        'other_requirement': 'Other requirement detail for variant5',
        'project_details': 'GENERIC_DESCRIPTION_MUST_NOT_RENDER_WHEN_SERVICE_REQUIREMENTS_EXIST_V5',
        'project_stage': 'Scaling',
        'start_timeline': 'Quarterly rollout',
        'budget_type': 'project',
        'budget': '$ 500,000+',
        'budget_status': 'Allocated',
        'contact_permission': True,
        'privacy_consent': True,
        'marketing_consent': False,
        'source': '/ai-consulting',
        'form_variant': 'v5',
        'status': 'new',
        'created_at': now_iso(),
        'updated_at': now_iso(),
    })

    return docs


async def run_ui_checks(fixtures, real_record_email, results):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=['--no-sandbox'])
        context = await browser.new_context()
        page = await context.new_page()

        try:
            await page.goto(f'{BASE_URL}/admin', wait_until='domcontentloaded')
            await page.get_by_test_id('admin-login-username').fill(ADMIN_USERNAME)
            await page.get_by_test_id('admin-login-password').fill(ADMIN_PASSWORD)
            async with page.expect_response(lambda r: r.url.endswith('/api/admin/login')) as login_resp:
                await page.get_by_test_id('admin-login-submit').click()
            login_status = (await login_resp.value).status
            if login_status != 200:
                raise AssertionError(f'Login failed with status {login_status}')
            await page.wait_for_url(f'{BASE_URL}/admin/dashboard', wait_until='domcontentloaded')
            results.append({'check': 'Admin login single-session', 'status': 'pass'})

            await page.goto(f'{BASE_URL}/admin/get-in-touch', wait_until='domcontentloaded')
            await expect(page.get_by_test_id('admin-get-in-touch-page')).to_be_visible()
            results.append({'check': 'Get-in-touch admin page load', 'status': 'pass'})

            # Open screenshot-matching existing record safely (no value logging)
            await page.get_by_test_id('admin-git-search').fill(real_record_email)
            await page.get_by_test_id('admin-git-search-btn').click()
            await page.wait_for_timeout(400)
            row_btn = page.locator('[data-testid^="admin-git-view-"]').first
            await row_btn.click()
            modal = page.get_by_test_id('admin-git-detail-modal')
            await expect(modal).to_be_visible()
            await expect(page.get_by_test_id('admin-git-detail-source')).to_be_visible()
            await expect(page.get_by_test_id('admin-git-detail-submitted')).to_be_visible()
            await expect(page.get_by_test_id('admin-git-detail-footer')).to_be_visible()
            await page.keyboard.press('Escape')
            await expect(modal).to_be_hidden()
            results.append({'check': 'Existing viewed record opens and Escape closes', 'status': 'pass'})

            async def open_fixture(doc_id, email):
                await page.get_by_test_id('admin-git-search').fill(email)
                await page.get_by_test_id('admin-git-search-btn').click()
                await page.wait_for_timeout(300)
                await page.get_by_test_id(f'admin-git-view-{doc_id}').click()
                await expect(page.get_by_test_id('admin-git-detail-modal')).to_be_visible()

            # Legacy fallback checks
            legacy = next(d for d in fixtures if d['id'].startswith('qa-git-legacy'))
            await open_fixture(legacy['id'], legacy['company_email'])
            await expect(page.get_by_test_id('admin-git-detail-full-name')).to_have_text('QA Legacy Fallback')
            await expect(page.get_by_test_id('admin-git-detail-source')).to_have_text('Not provided')
            await expect(page.get_by_test_id('admin-git-detail-contact-permission')).to_have_count(0)
            await page.get_by_test_id('admin-git-detail-close').click()
            await expect(page.get_by_test_id('admin-git-detail-modal')).to_be_hidden()
            results.append({'check': 'Legacy fallback record fields and missing defaults', 'status': 'pass'})

            # Monthly wizard checks
            monthly = next(d for d in fixtures if d['id'].startswith('qa-git-monthly'))
            await open_fixture(monthly['id'], monthly['company_email'])
            await expect(page.get_by_test_id('admin-git-detail-contact-permission')).to_have_text('No')
            await expect(page.get_by_test_id('admin-git-detail-other-role')).to_have_text(monthly['other_role'])
            await expect(page.get_by_test_id('admin-git-detail-other-requirement')).to_have_text(monthly['other_requirement'])
            await expect(page.get_by_test_id('admin-git-detail-project-stage')).to_have_text(monthly['project_stage'])
            await expect(page.get_by_test_id('admin-git-detail-start-timeline')).to_have_text(monthly['start_timeline'])
            await page.get_by_test_id('admin-git-detail-close').click()
            await expect(page.get_by_test_id('admin-git-detail-modal')).to_be_hidden()
            results.append({'check': 'Monthly wizard details and consent render unchanged', 'status': 'pass'})

            # Service requirements checks (v4/v5)
            v4 = next(d for d in fixtures if d['id'].startswith('qa-git-v4'))
            await open_fixture(v4['id'], v4['company_email'])
            await expect(page.get_by_test_id('admin-git-detail-service-requirement-0')).to_be_visible()
            body_text = await page.get_by_test_id('admin-git-detail-body').inner_text()
            if 'GENERIC_DESCRIPTION_MUST_NOT_RENDER_WHEN_SERVICE_REQUIREMENTS_EXIST' in body_text:
                raise AssertionError('Generic description rendered unexpectedly for service requirements record (v4).')
            await page.get_by_test_id('admin-git-detail-close').click()
            await expect(page.get_by_test_id('admin-git-detail-modal')).to_be_hidden()

            v5 = next(d for d in fixtures if d['id'].startswith('qa-git-v5'))
            await open_fixture(v5['id'], v5['company_email'])
            req_count = await page.locator('[data-testid^="admin-git-detail-service-requirement-"]').count()
            if req_count < 6:
                raise AssertionError(f'Expected multiple per-service requirement rows, got {req_count}')
            body_text = await page.get_by_test_id('admin-git-detail-body').inner_text()
            if 'GENERIC_DESCRIPTION_MUST_NOT_RENDER_WHEN_SERVICE_REQUIREMENTS_EXIST_V5' in body_text:
                raise AssertionError('Generic description rendered unexpectedly for service requirements record (v5).')
            await page.get_by_test_id('admin-git-detail-close').click()
            await expect(page.get_by_test_id('admin-git-detail-modal')).to_be_hidden()
            results.append({'check': 'Per-service requirements preserve values without generic-description duplication', 'status': 'pass'})

            # Responsive/layout checks using real record
            await page.get_by_test_id('admin-git-search').fill(real_record_email)
            await page.get_by_test_id('admin-git-search-btn').click()
            await page.wait_for_timeout(300)
            await page.locator('[data-testid^="admin-git-view-"]').first.click()
            await expect(page.get_by_test_id('admin-git-detail-modal')).to_be_visible()

            for viewport, expected_cols in [({'width': 1920, 'height': 800}, 2), ({'width': 390, 'height': 844}, 1)]:
                await page.set_viewport_size(viewport)
                await page.wait_for_timeout(200)
                modal = page.get_by_test_id('admin-git-detail-modal')
                body = page.get_by_test_id('admin-git-detail-body')
                header = page.get_by_test_id('admin-git-detail-header')
                footer = page.get_by_test_id('admin-git-detail-footer')
                close_btn = page.get_by_test_id('admin-git-detail-close')

                before_h = await header.bounding_box()
                before_f = await footer.bounding_box()
                before_c = await close_btn.bounding_box()
                await body.evaluate('(el)=>{el.scrollTop=el.scrollHeight;}')
                await expect(page.get_by_test_id('admin-git-detail-submitted')).to_be_in_viewport()
                after_h = await header.bounding_box()
                after_f = await footer.bounding_box()
                after_c = await close_btn.bounding_box()

                if abs(after_h['y'] - before_h['y']) > 1:
                    raise AssertionError(f'Header moved while body scrolled at {viewport}')
                if abs(after_f['y'] - before_f['y']) > 1:
                    raise AssertionError(f'Footer moved while body scrolled at {viewport}')
                if abs(after_c['y'] - before_c['y']) > 1:
                    raise AssertionError(f'Close button moved while body scrolled at {viewport}')

                dims = await modal.bounding_box()
                if dims['x'] < 0 or dims['y'] < 0 or dims['x'] + dims['width'] > viewport['width'] + 1 or dims['y'] + dims['height'] > viewport['height'] + 1:
                    raise AssertionError(f'Modal not fully in viewport at {viewport}: {dims}')

                col_count = await page.evaluate("""() => {
                    const grid = document.querySelector('.consultation-detail-grid');
                    if (!grid) return 0;
                    return getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length;
                }""")
                if col_count != expected_cols:
                    raise AssertionError(f'Expected {expected_cols} columns at {viewport}, got {col_count}')

                overflow = await page.evaluate("""() => {
                    const offenders = Array.from(document.querySelectorAll('*')).filter(el => {
                        const style = getComputedStyle(el);
                        if (style.display === 'none' || style.visibility === 'hidden') return false;
                        if (style.position === 'fixed') return false;
                        const r = el.getBoundingClientRect();
                        return r.right > window.innerWidth + 1;
                    });
                    return offenders.slice(0, 5).map(el => el.className || el.tagName);
                }""")
                if overflow:
                    raise AssertionError(f'Horizontal overflow at {viewport}: {overflow}')

            for width in [320, 768, 1024, 1440]:
                await page.set_viewport_size({'width': width, 'height': 844})
                await page.wait_for_timeout(120)
                offenders = await page.evaluate("""() => {
                    return [...document.querySelectorAll('*')].filter(el => {
                        const style = getComputedStyle(el);
                        if (style.display === 'none' || style.visibility === 'hidden') return false;
                        if (style.position === 'fixed') return false;
                        return el.getBoundingClientRect().right > window.innerWidth + 1;
                    }).length;
                }""")
                if offenders > 0:
                    raise AssertionError(f'Overflow offenders detected at width {width}')

            results.append({'check': 'Responsive modal layout and sticky controls', 'status': 'pass'})

            # Dismiss checks: header X and footer Close
            await page.set_viewport_size({'width': 1920, 'height': 800})
            await page.get_by_test_id('admin-git-detail-close').click()
            await expect(page.get_by_test_id('admin-git-detail-modal')).to_be_hidden()
            await page.locator('[data-testid^="admin-git-view-"]').first.click()
            await expect(page.get_by_test_id('admin-git-detail-modal')).to_be_visible()
            await page.get_by_test_id('admin-git-detail-dismiss').click()
            await expect(page.get_by_test_id('admin-git-detail-modal')).to_be_hidden()
            results.append({'check': 'Header X and footer Close dismiss modal', 'status': 'pass'})

            # Opening another enquiry starts body at top
            await open_fixture(v4['id'], v4['company_email'])
            body = page.get_by_test_id('admin-git-detail-body')
            await body.evaluate('(el)=>{el.scrollTop=el.scrollHeight;}')
            await page.get_by_test_id('admin-git-detail-close').click()
            await open_fixture(monthly['id'], monthly['company_email'])
            scroll_top = await body.evaluate('(el)=>el.scrollTop')
            if scroll_top > 2:
                raise AssertionError(f'Body scroll did not reset on new enquiry open (scrollTop={scroll_top})')
            results.append({'check': 'Body scroll resets when opening another enquiry', 'status': 'pass'})

            # Focus trap and keyboard scroll
            modal_locator = page.get_by_test_id('admin-git-detail-modal')
            await page.get_by_test_id('admin-git-detail-close').focus()
            for _ in range(10):
                await page.keyboard.press('Tab')
            inside = await page.evaluate("""() => {
                const modal = document.querySelector('[data-testid="admin-git-detail-modal"]');
                return modal ? modal.contains(document.activeElement) : false;
            }""")
            if not inside:
                raise AssertionError('Focus escaped modal after Tab traversal')
            for _ in range(4):
                await page.keyboard.press('Shift+Tab')
            inside_shift = await page.evaluate("""() => {
                const modal = document.querySelector('[data-testid="admin-git-detail-modal"]');
                return modal ? modal.contains(document.activeElement) : false;
            }""")
            if not inside_shift:
                raise AssertionError('Focus escaped modal after Shift+Tab traversal')

            await page.get_by_test_id('admin-git-detail-close').click()
            await open_fixture(v5['id'], v5['company_email'])
            await page.get_by_test_id('admin-git-detail-body').evaluate('(el)=>{el.scrollTop=0;}')
            await page.get_by_test_id('admin-git-detail-body').focus()
            await page.keyboard.press('End')
            await page.wait_for_timeout(150)
            scrolled = await page.get_by_test_id('admin-git-detail-body').evaluate('(el)=>el.scrollTop')
            if scrolled <= 0:
                raise AssertionError('Body did not scroll via keyboard on long fixture')
            results.append({'check': 'Focus trap and keyboard body scroll', 'status': 'pass'})

            # Delete cancel preserves entry
            await page.get_by_test_id('admin-git-detail-close').click()
            await open_fixture(v5['id'], v5['company_email'])

            async def dismiss_confirm(dialog):
                await dialog.dismiss()
            page.once('dialog', dismiss_confirm)
            await page.get_by_test_id('admin-git-detail-delete').click()
            await page.wait_for_timeout(250)
            await expect(page.get_by_test_id('admin-git-detail-modal')).to_be_visible()
            await expect(page.get_by_test_id(f'admin-git-row-{v5["id"]}')).to_be_visible()
            results.append({'check': 'Delete cancel preserves record and keeps dialog open', 'status': 'pass'})

            # Delete error interception: abort request and ensure footer error is visible
            abort_target = legacy['id']
            await page.get_by_test_id('admin-git-detail-close').click()
            await open_fixture(abort_target, legacy['company_email'])

            async def abort_route(route):
                await route.abort('failed')

            await page.route(f'**/api/admin/submission/{abort_target}?form_type=get_in_touch', abort_route)

            async def accept_confirm(dialog):
                await dialog.accept()
            page.once('dialog', accept_confirm)
            await page.get_by_test_id('admin-git-detail-delete').click()
            await expect(page.get_by_test_id('admin-git-detail-error')).to_be_visible(timeout=5000)
            await page.unroute(f'**/api/admin/submission/{abort_target}?form_type=get_in_touch', abort_route)
            results.append({'check': 'Delete failure shows error in fixed footer (network abort interception)', 'status': 'pass', 'note': 'INTERCEPTION_USED_FOR_TEST_ONLY'})

            # Busy button disabled during delayed live DELETE and confirmed delete only fixture removed
            delete_target = monthly['id']
            await page.get_by_test_id('admin-git-detail-close').click()
            await open_fixture(delete_target, monthly['company_email'])

            async def delay_continue(route):
                await asyncio.sleep(1.3)
                await route.continue_()

            await page.route(f'**/api/admin/submission/{delete_target}?form_type=get_in_touch', delay_continue)

            page.once('dialog', accept_confirm)
            await page.get_by_test_id('admin-git-detail-delete').click()
            await expect(page.get_by_test_id('admin-git-detail-delete')).to_be_disabled()
            await expect(page.get_by_test_id('admin-git-detail-modal')).to_be_hidden(timeout=8000)
            await page.unroute(f'**/api/admin/submission/{delete_target}?form_type=get_in_touch', delay_continue)
            await expect(page.get_by_test_id(f'admin-git-row-{delete_target}')).to_have_count(0)
            results.append({'check': 'Delete confirms, disables busy button, and removes only selected fixture', 'status': 'pass'})

            # View marks viewed
            await open_fixture(v4['id'], v4['company_email'])
            await page.get_by_test_id('admin-git-detail-close').click()
            await expect(page.get_by_test_id(f'admin-git-status-{v4["id"]}')).to_have_text('Viewed')
            results.append({'check': 'View action marks status as viewed', 'status': 'pass'})

            # Export regression check for temporary record values
            await page.get_by_test_id('admin-git-search').fill(v4['company_email'])
            await page.get_by_test_id('admin-git-search-btn').click()
            async with page.expect_download() as dl:
                await page.get_by_test_id('admin-git-export').click()
            download = await dl.value
            download_path = await download.path()
            csv_bytes = Path(download_path).read_bytes()
            text = csv_bytes.decode('utf-8', errors='replace')
            rows = list(csv.reader(io.StringIO(text)))
            found = any(v4['company_email'] in row for row in rows)
            if not found:
                raise AssertionError('Temporary fixture record missing from export CSV')
            results.append({'check': 'Export includes temporary fixture values', 'status': 'pass'})

            # Get error messages using specific selectors
            error_text = await page.evaluate("""() => {
            const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]'));
            return errorElements.map(el => el.textContent).join(", ");
            }""")
            if error_text:
                results.append({'check': 'Page error scan', 'status': 'info', 'message': 'Found error selectors during run'})

        finally:
            await page.evaluate('''async () => {
                try {
                    const response = await fetch('/api/admin/session', { credentials: 'include' });
                    if (!response.ok) return;
                    const data = await response.json();
                    await fetch('/api/admin/logout', {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'X-CSRF-Token': data.csrfToken }
                    });
                } catch (_) {
                    // no-op
                }
            }''')
            await context.close()
            await browser.close()


def verify_protected_hashes():
    baseline = json.loads(Path('/tmp/admin-detail-protected.json').read_text())
    mismatches = []
    checked = 0
    for file_path, expected_hash in baseline.items():
        p = Path(file_path)
        if not p.exists():
            mismatches.append({'path': file_path, 'issue': 'missing'})
            continue
        digest = hashlib.sha256(p.read_bytes()).hexdigest()
        checked += 1
        if digest != expected_hash:
            mismatches.append({'path': file_path, 'issue': 'hash_mismatch'})
    return checked, mismatches


async def main():
    results = []
    run_tag = uuid.uuid4().hex[:8]
    fixture_docs = make_fixtures(run_tag)
    fixture_ids = [d['id'] for d in fixture_docs]

    with MongoClient(MONGO_URL) as client:
        col = client[DB_NAME].contact_enquiries

        real_record = col.find_one(
            {'full_name': 'Test Test', 'country': 'Afghanistan', 'source': '/ai-consulting', 'status': 'viewed'},
            {'_id': 0, 'company_email': 1},
            sort=[('created_at', -1)]
        )
        if not real_record or not real_record.get('company_email'):
            raise RuntimeError('Required screenshot-matching real record not found.')

        col.insert_many(fixture_docs)

    try:
        await run_ui_checks(fixture_docs, real_record['company_email'], results)
    finally:
        with MongoClient(MONGO_URL) as client:
            col = client[DB_NAME].contact_enquiries
            col.delete_many({'id': {'$in': fixture_ids}})

    checked, mismatches = verify_protected_hashes()
    if mismatches:
        results.append({'check': 'Protected source hashes', 'status': 'fail', 'details': mismatches[:5]})
    else:
        results.append({'check': 'Protected source hashes', 'status': 'pass', 'checked_files': checked})

    RAW_RESULTS_PATH.write_text(json.dumps({'results': results, 'fixture_ids': fixture_ids}, indent=2))

    failed = [r for r in results if r.get('status') == 'fail']
    print(json.dumps({
        'ok': len(failed) == 0,
        'total_checks': len(results),
        'failed_checks': len(failed),
        'raw_results': str(RAW_RESULTS_PATH),
    }, indent=2))

    if failed:
        raise SystemExit(1)


if __name__ == '__main__':
    asyncio.run(main())
