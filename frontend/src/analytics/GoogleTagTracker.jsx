import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { conversionSendTo, hasInlineTag, isTrackedPath, loadGoogleTag, trackEvent, trackPageView } from './googleTag';
import { describeClick } from './clickTracking';
import { describeFormSuccess } from './leadTracking';
import { FORM_SUCCESS_EVENT } from '../security/formTransport';

export const GoogleTagTracker = () => {
  const { pathname, search } = useLocation();
  const tracked = isTrackedPath(pathname);

  useEffect(() => {
    if (!tracked || !loadGoogleTag()) return undefined;
    const onClick = event => {
      const click = describeClick(event.target);
      if (click) trackEvent('click', click);
    };
    const onFormSuccess = event => {
      const lead = describeFormSuccess(event.detail?.path);
      if (!lead) return;
      trackEvent(lead.name, lead.params);
      const sendTo = lead.name === 'generate_lead' && conversionSendTo();
      if (sendTo) trackEvent('conversion', { send_to: sendTo, ...lead.params });
    };
    document.addEventListener('click', onClick, true);
    window.addEventListener(FORM_SUCCESS_EVENT, onFormSuccess);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener(FORM_SUCCESS_EVENT, onFormSuccess);
    };
  }, [tracked]);

  useEffect(() => {
    // The in-source snippet already sends the page view for its own document.
    if (!tracked || hasInlineTag()) return undefined;
    // Deferred so route components have applied their document titles first.
    const timer = window.setTimeout(() => trackPageView({ pathname, search }), 0);
    return () => window.clearTimeout(timer);
  }, [tracked, pathname, search]);

  return null;
};
