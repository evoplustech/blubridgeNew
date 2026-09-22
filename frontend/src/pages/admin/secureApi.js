const API = process.env.REACT_APP_BACKEND_URL;
let csrfPromise;
localStorage.removeItem('adminToken'); // Remove only the obsolete pre-hardening credential.

const csrf = () => {
  if (!csrfPromise) csrfPromise = window.fetch(`${API}/api/admin/session`, { credentials: 'include' })
    .then(async response => {
      if (!response.ok) throw new Error('Unable to verify request');
      return (await response.json()).csrfToken;
    }).catch(error => { csrfPromise = null; throw error; });
  return csrfPromise;
};

export async function adminFetch(url, options = {}) {
  const parsed = new URL(url, window.location.origin);
  if (parsed.pathname.startsWith('/api/admin/submission/') && (!options.method || options.method.toUpperCase() === 'GET')) {
    options = { ...options, method: 'PATCH' }; // Preserve mark-as-viewed via a CSRF-protected mutation.
  }
  const headers = new Headers(options.headers);
  headers.delete('Authorization');
  headers.set('X-CSRF-Token', await csrf());
  const response = await window.fetch(url, { ...options, headers, credentials: 'include' });
  if (response.status === 401 || url.endsWith('/logout') || url.endsWith('/change-password')) csrfPromise = null;
  if (url.endsWith('/login') && response.ok) {
    const data = await response.clone().json();
    csrfPromise = Promise.resolve(data.csrfToken);
  }
  if (!response.ok && response.headers.get('content-type')?.includes('application/json')) {
    const data = await response.clone().json();
    if (Array.isArray(data.detail)) {
      data.detail = data.detail.map(item => item.msg || 'Invalid request').join(' ');
      return new Response(JSON.stringify(data), { status: response.status, headers: response.headers });
    }
  }
  return response;
}