# Approved page inventory — 2026-09-24

Verified in the current application. No separate external deployment was initiated by this task.
Source of truth: `frontend/src/routing/publishedPages.json` (22 public URLs, 8 existing admin routes). Latest user clarification retains only the main Products and Solutions pages within those sections; all other approved groups are unchanged.

## Home
- `/`

## Company
- `/about-us`
- `/careers`
- `/joinourteam`

## Job details
- `/careers/job/data-science-ai-ml-engineer`
- `/careers/job/business-development-ai-strategy`
- `/careers/job/social-media-growth-manager-ai-deep-tech`
- `/careers/job/social-media-growth-specialist-freelancer`

## Products
- `/products`

## Solutions
- `/solutions`

## Research
- `/research`
- `/Research/FLUX`
- `/Research/FLUX-Data`
- `/Research/FLUX-3`
- `/Research/FLUX-4`
- `/Research/Blu-Werp`
- `/Research/BluTrain`

## Contact and consulting
- `/contact`
- `/consulting`

## Policies
- `/policies/transparency-and-human-rights`
- `/policies/privacy-policy`
- `/policies/terms-conditions`

## Existing protected admin routes — unchanged
- `/admin`
- `/admin/dashboard`
- `/admin/footer-forms`
- `/admin/contact-forms`
- `/admin/get-in-touch`
- `/admin/project-enquiries` (existing redirect to `/admin/get-in-touch`)
- `/admin/careers`
- `/admin/settings`

## Redirect and exclusions
- `/ai-consulting` and `/ai-consulting/` permanently redirect (308) to `/consulting`, preserving query parameters. Client-side navigation preserves the fragment too. `/consulting/` remains a valid trailing-slash alias.
- 404: `/media-kit`, `/get-in-touch` and variants1–10, `/ai-consulting-1`–`5`, `/contact/sales`, `/contact/general-enquiry`, `/partners`, `/pricing`, `/docs`, `/blog`, `/home1`, and unknown routes (including unknown product/solution/job paths).
- Also404: all9 product-detail pages,7 solution-detail pages and8 industry pages (all `/products/*` and `/solutions/*` detail paths). Links to sections such as `/solutions#model-customization` still work on the retained main page.
- Excluded page source files are preserved, not deleted; saved enquiries and protected APIs are unchanged. Previously **MOCKED** contact variants7–9 are not public anymore.
- Dynamic `/sitemap.xml` lists only the22 public URLs. `PUBLIC_SITE_URL` retains the previous sitemap origin, `https://blubridge.com`. The preview itself supplies its existing noindex response header; publication rules do not override that infrastructure behavior.
- Google Ads tag `AW-18460200148` is present once per public document and absent from admin documents. No enquiry-success conversion event/label has been configured.