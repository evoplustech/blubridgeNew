const LEAD_ROUTE = /^\/(?:contact|consulting(?:-\d+)?)(?:\/|$)/i;
const LINK_CTA_TOKENS = new Set(['btn', 'button', 'cta']);
const BUTTON_CTA_TOKENS = new Set(['cta', 'hero', 'primary', 'submit']);

const hasToken = (element, tokens) =>
  String(element.getAttribute('class') || '').split(/[^a-z0-9]+/i).some(token => tokens.has(token.toLowerCase()));

const isCta = (element, tokens) => element.hasAttribute('data-cta') || hasToken(element, tokens);

const describe = (element, link) => ({
  link_text: (element.getAttribute('aria-label') || element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100),
  link_id: element.id || undefined,
  link_classes: element.getAttribute('class') || undefined,
  page_path: `${window.location.pathname}${window.location.search}`,
  ...link,
});

// Only CTAs and outbound/contact links qualify; ordinary navigation and UI controls are ignored.
export function describeClick(target) {
  if (!(target instanceof Element)) return null;
  const element = target.closest('a[href], button, [role="button"]');
  if (!element) return null;
  if (element.tagName !== 'A') {
    const submit = element.tagName === 'BUTTON' && (element.getAttribute('type') || 'submit').toLowerCase() === 'submit' && element.closest('form');
    return submit || isCta(element, BUTTON_CTA_TOKENS) ? describe(element, { link_type: 'cta' }) : null;
  }
  let url;
  try { url = new URL(element.getAttribute('href'), window.location.href); } catch { return null; }
  if (url.protocol === 'mailto:') return describe(element, { link_type: 'email', link_url: url.href });
  if (url.protocol === 'tel:') return describe(element, { link_type: 'phone', link_url: url.href });
  if (!/^https?:$/.test(url.protocol)) return null;
  const link = { link_url: url.href, link_domain: url.hostname };
  if (url.host !== window.location.host) return describe(element, { ...link, link_type: 'outbound', outbound: true });
  if (isCta(element, LINK_CTA_TOKENS) || LEAD_ROUTE.test(url.pathname)) return describe(element, { ...link, link_type: 'cta' });
  return null;
}
