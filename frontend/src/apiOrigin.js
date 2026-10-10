// Static hosting (Render Static Site) cannot proxy /api, so the bundle targets the configured backend; Node/preview hosting is same-origin.
export const API_ORIGIN = process.env.REACT_APP_BACKEND_URL || window.location.origin;
