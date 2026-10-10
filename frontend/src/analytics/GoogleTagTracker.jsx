import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isAdminPath, loadGoogleTag, trackEvent, trackPageView } from './googleTag';
import { describeClick } from './clickTracking';
import { describeFormSuccess } from './leadTracking';
import { FORM_SUCCESS_EVENT } from '../security/formTransport';

export const GoogleTagTracker = () => {
  const { pathname, search } = useLocation();
  const admin = isAdminPath(pathname);

  useEffect(() => {
    if (admin || !loadGoogleTag()) return undefined;
    const onClick = event => {
      const click = describeClick(event.target);
      if (click) trackEvent('click', click);
    };
    const onFormSuccess = event => {
      const lead = describeFormSuccess(event.detail?.path);
      if (lead) trackEvent(lead.name, lead.params);
    };
    document.addEventListener('click', onClick, true);
    window.addEventListener(FORM_SUCCESS_EVENT, onFormSuccess);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener(FORM_SUCCESS_EVENT, onFormSuccess);
    };
  }, [admin]);

  useEffect(() => {
    if (admin) return undefined;
    // Deferred so route components have applied their document titles first.
    const timer = window.setTimeout(() => trackPageView({ pathname, search }), 0);
    return () => window.clearTimeout(timer);
  }, [admin, pathname, search]);

  return null;
};
