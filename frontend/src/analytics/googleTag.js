const TAG_ID = /^(?:GT|AW|G|DC)-[A-Z0-9]+$/;
const LOADED = '__bbGoogleTag';
const LOADER = 'script[src^="https://www.googletagmanager.com/gtag/js"]';

export const isAdminPath = pathname => {
  try { return /^\/admin(?:\/|$)/i.test(decodeURIComponent(pathname)); } catch { return true; }
};

export const configuredTagIds = () =>
  [process.env.REACT_APP_GOOGLE_TAG_ID, process.env.REACT_APP_GOOGLE_ADS_TAG_ID].filter(Boolean);

// Production host allowlist (space-separated); preview/staging hosts never send hits to Google.
export const isAllowedHost = hostname => {
  const allowed = process.env.REACT_APP_GOOGLE_TAG_ALLOWED_HOSTS;
  if (allowed === undefined) throw new Error('REACT_APP_GOOGLE_TAG_ALLOWED_HOSTS is required');
  return allowed.toLowerCase().split(/\s+/).filter(Boolean).includes(hostname.toLowerCase());
};

function gtag() { window.dataLayer.push(arguments); }

// Destinations already configured by the global <head> snippet (public/index.html).
const inlineConfiguredIds = () =>
  (window.dataLayer || []).filter(entry => entry && entry[0] === 'config' && typeof entry[1] === 'string').map(entry => entry[1]);

function loaderUrl(tagId) {
  const url = new URL(process.env.REACT_APP_GOOGLE_TAG_SCRIPT_URL);
  if (url.protocol !== 'https:') throw new Error('REACT_APP_GOOGLE_TAG_SCRIPT_URL must use HTTPS');
  url.searchParams.set('id', tagId);
  return url.href;
}

// Idempotent: boots gtag.js once per public document, reusing the <head> snippet when present. Misconfiguration is logged, never thrown.
export function loadGoogleTag() {
  if (window[LOADED]) return true;
  if (isAdminPath(window.location.pathname)) return false;
  try {
    if (!isAllowedHost(window.location.hostname)) {
      console.info(`[google-tag] disabled on ${window.location.hostname} (not a production host)`);
      return false;
    }
    const envIds = configuredTagIds();
    const invalid = envIds.find(id => !TAG_ID.test(id));
    if (invalid) throw new Error(`Invalid Google tag id: ${invalid}`);
    const inlineIds = inlineConfiguredIds();
    const hasLoader = Boolean(document.querySelector(LOADER));
    if (!envIds.length && !hasLoader) throw new Error('REACT_APP_GOOGLE_TAG_ID is required');
    const ownIds = envIds.filter(id => !inlineIds.includes(id));
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || gtag;
    if (!hasLoader) {
      window.gtag('js', new Date());
      const script = document.createElement('script');
      script.async = true;
      script.src = loaderUrl(envIds[0]);
      script.dataset.testid = 'google-tag-script';
      document.head.appendChild(script);
    }
    ownIds.forEach(id => window.gtag('config', id, { send_page_view: false }));
    window[LOADED] = { ownIds, inlineIds, views: 0 };
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
  const state = window[LOADED];
  if (!state) return;
  const params = {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${pathname}${search}`,
  };
  // The <head> snippet already sent the first page_view for its destinations.
  if (state.views++ === 0 && state.inlineIds.length) {
    if (!state.ownIds.length) return;
    params.send_to = state.ownIds;
  }
  window.gtag('event', 'page_view', params);
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
