const TAG_ID = /^(?:GT|AW|G|DC)-[A-Z0-9]+$/;
const LOADED = '__bbGoogleTag';

export const isAdminPath = pathname => {
  try { return /^\/admin(?:\/|$)/i.test(decodeURIComponent(pathname)); } catch { return true; }
};

const envList = name => {
  if (process.env[name] === undefined) throw new Error(`${name} is required`);
  return process.env[name].toLowerCase().split(/\s+/).filter(Boolean);
};

const normalizePath = pathname => pathname.replace(/\/+$/, '').toLowerCase() || '/';

// Only the configured landing routes are tracked (REACT_APP_GOOGLE_TAG_ROUTES, e.g. "/consulting"); admin never is.
export const isTrackedPath = pathname =>
  !isAdminPath(pathname) && envList('REACT_APP_GOOGLE_TAG_ROUTES').map(normalizePath).includes(normalizePath(pathname));

// Production host allowlist; preview/staging hosts never send hits to Google.
export const isAllowedHost = hostname => envList('REACT_APP_GOOGLE_TAG_ALLOWED_HOSTS').includes(hostname.toLowerCase());

export const configuredTagIds = () =>
  [process.env.REACT_APP_GOOGLE_TAG_ID, process.env.REACT_APP_GOOGLE_ADS_TAG_ID].filter(Boolean);

function gtag() { window.dataLayer.push(arguments); }

function loaderUrl(tagId) {
  const url = new URL(process.env.REACT_APP_GOOGLE_TAG_SCRIPT_URL);
  if (url.protocol !== 'https:') throw new Error('REACT_APP_GOOGLE_TAG_SCRIPT_URL must use HTTPS');
  url.searchParams.set('id', tagId);
  return url.href;
}

// Idempotent: boots gtag.js once per document, the first time a tracked route is shown. Misconfiguration is logged, never thrown.
// True when the document source already carries the tag (see frontend/googleTagSnippet.js).
export const hasInlineTag = () => Boolean(window.__bbGoogleTagInline);

export function loadGoogleTag() {
  if (window[LOADED]) return true;
  if (hasInlineTag()) {
    window[LOADED] = window.__bbGoogleTagInline;
    return true;
  }
  try {
    if (!isAllowedHost(window.location.hostname)) {
      console.info(`[google-tag] disabled on ${window.location.hostname} (not a production host)`);
      return false;
    }
    const tagIds = configuredTagIds();
    if (!tagIds.length) throw new Error('REACT_APP_GOOGLE_TAG_ID is required');
    const invalid = tagIds.find(id => !TAG_ID.test(id));
    if (invalid) throw new Error(`Invalid Google tag id: ${invalid}`);
    const src = loaderUrl(tagIds[0]);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || gtag;
    window.gtag('js', new Date());
    tagIds.forEach(id => window.gtag('config', id, { send_page_view: false }));
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.dataset.testid = 'google-tag-script';
    document.head.appendChild(script);
    window[LOADED] = { tagIds };
    return true;
  } catch (error) {
    console.error('[google-tag] not loaded:', error.message);
    return false;
  }
}

export function trackEvent(name, params) {
  if (!window[LOADED]) return;
  window.gtag('event', name, params);
}

export function trackPageView({ pathname, search }) {
  trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${pathname}${search}`,
  });
}

// Google Ads conversion target "AW-XXXX/LABEL"; null until REACT_APP_GOOGLE_ADS_CONVERSION_LABEL is configured.
export function conversionSendTo() {
  const adsId = process.env.REACT_APP_GOOGLE_ADS_TAG_ID;
  const label = process.env.REACT_APP_GOOGLE_ADS_CONVERSION_LABEL;
  if (!adsId || !label) return null;
  if (!/^[A-Za-z0-9_-]+$/.test(label)) {
    console.error('[google-tag] invalid Ads conversion label');
    return null;
  }
  return `${adsId}/${label}`;
}
