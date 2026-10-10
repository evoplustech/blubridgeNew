import axios from 'axios';

const base = new URL(window.location.origin);
const publicPaths = new Set(['/api/contact', '/api/contacts/submit', '/api/contact-us', '/api/contact-enquiries', '/api/project-enquiries', '/api/ai-consultation-enquiries', '/api/ai-consulting-enquiries', '/api/newsletter/subscribe', '/api/job-applications/submit', '/api/ai-consulting-attachments', '/api/ai-consulting-attachments/consulting-5', '/api/ai-consulting-attachments/consulting-14', '/api/ai-consulting-attachments/consulting-17', '/api/ai-consulting-attachments/consulting-18']);
const nativeFetch = window.fetch.bind(window);
let context;
let started = 0;

// Announced after any successful public form POST so analytics can record the lead without touching form code.
export const FORM_SUCCESS_EVENT = 'bb:form-success';
const announceSuccess = (url, status) => {
  if (status < 200 || status >= 300) return;
  window.dispatchEvent(new CustomEvent(FORM_SUCCESS_EVENT, { detail: { path: new URL(url, base.origin).pathname, status } }));
};

async function getContext(refresh = false) {
  if (refresh) context = null;
  if (!context) {
    context = nativeFetch(`${base.origin}/api/form-context`, { credentials: 'include' }).then(async response => {
      if (!response.ok) throw new Error('Unable to verify the form. Please try again.');
      started = Date.now();
      return (await response.json()).formToken;
    }).catch(error => { context = null; throw error; });
  }
  const token = await context;
  const remaining = 1050 - (Date.now() - started);
  if (remaining > 0) await new Promise(resolve => setTimeout(resolve, remaining));
  return token;
}

function protectedForm(url, method) {
  const parsed = new URL(url, window.location.origin);
  return parsed.origin === base.origin && publicPaths.has(parsed.pathname) && method.toUpperCase() === 'POST';
}

// Only same-backend public form POSTs are affected. No visible fields change.
window.fetch = async (input, options = {}) => {
  const url = input instanceof Request ? input.url : String(input);
  const method = options.method || (input instanceof Request ? input.method : 'GET');
  if (!protectedForm(url, method)) return nativeFetch(input, options);
  const headers = new Headers(options.headers || (input instanceof Request ? input.headers : undefined));
  headers.set('X-BB-Form-Token', await getContext());
  let response = await nativeFetch(input, { ...options, headers, credentials: 'include' });
  if (response.status === 403) {
    headers.set('X-BB-Form-Token', await getContext(true));
    response = await nativeFetch(input, { ...options, headers, credentials: 'include' });
  }
  announceSuccess(url, response.status);
  return response;
};

axios.interceptors.request.use(async config => {
  if (protectedForm(config.url, config.method || 'GET')) {
    config.withCredentials = true;
    config.headers['X-BB-Form-Token'] = await getContext();
  }
  return config;
});
axios.interceptors.response.use(response => {
  if (protectedForm(response.config.url, response.config.method || 'GET')) announceSuccess(response.config.url, response.status);
  return response;
}, async error => {
  const config = error.config;
  if (config && !config._formRetry && error.response?.status === 403 && protectedForm(config.url, config.method || 'GET')) {
    config._formRetry = true;
    await getContext(true);
    return axios(config);
  }
  return Promise.reject(error);
});

getContext().catch(() => {});