import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
import { EnquiryFields, FieldError } from './get-in-touch-v11/EnquiryFields';
import { services, serviceId, useEnquiryForm } from './get-in-touch-v11/useEnquiryForm';
import './get-in-touch-v11/GetInTouchV11.css';

// Independent screenshot-based variant of /get-in-touch-8 with its own submission endpoint.
export default function GetInTouchV11() {
  const state = useEnquiryForm();
  useDocumentTitle('Get in Touch | BluBridge');
  useMetaDescription("From an early idea to your next AI initiative, let's find the right place to start.");
  return (
    <section className="git11-page" data-testid="get-in-touch-v11-page">
      <div className="git11-container">
        <header className="git11-intro">
          <p className="git11-eyebrow" data-testid="git11-eyebrow">GET IN TOUCH</p>
          <h1 className="git11-heading" data-testid="git11-heading">Let’s build what’s next.</h1>
          <p className="git11-subtitle" data-testid="git11-subtitle">From an early idea to your next AI initiative,<br />{' '}let’s find the right place to start.</p>
        </header>
        <form onSubmit={state.onSubmit} noValidate aria-busy={state.isSubmitting} data-testid="git11-form">
          <fieldset disabled={state.isSubmitting} className="git11-submit-fields">
          <div className="git11-services" role="group" aria-labelledby="git11-services-label" aria-describedby={state.errors.services ? 'git11-services-error' : 'git11-services-hint'} data-testid="git11-services-container">
            <div className="git11-services-heading">
              <p id="git11-services-label" data-testid="git11-services-label">What can we help you with? <span className="git11-required">*</span></p>
              <p id="git11-services-hint" className="git11-hint" data-testid="git11-services-hint">Choose one or more</p>
            </div>
            <div className="git11-service-options">
              {services.map(service => {
                const selected = state.selectedServices.includes(service);
                return <Button key={service} type="button" variant="outline" role="checkbox" aria-checked={selected} className={`git11-service${selected ? ' git11-service-selected' : ''}`} onClick={() => state.toggleService(service)} data-testid={`git11-service-${serviceId(service)}`}>
                  {selected && <Check size={17} strokeWidth={2.5} aria-hidden="true" />}{service}
                </Button>;
              })}
            </div>
            <FieldError name="services" error={state.errors.services} />
          </div>
          <EnquiryFields state={state} />
          <div className="git11-form-footer">
            <div className="git11-consents">
              <label className="git11-consent">
                <input name="privacy" type="checkbox" required checked={state.form.privacy} onChange={state.onChange} aria-invalid={Boolean(state.errors.privacy)} aria-describedby={state.errors.privacy ? 'git11-privacy-error' : undefined} data-testid="git11-checkbox-privacy" />
                <span>I agree to the <Link to="/policies/privacy-policy" data-testid="git11-privacy-link">Privacy Policy</Link>. <span className="git11-consent-required">*</span></span>
              </label>
              <FieldError name="privacy" error={state.errors.privacy} />
              <label className="git11-consent">
                <input name="marketing" type="checkbox" checked={state.form.marketing} onChange={state.onChange} data-testid="git11-checkbox-marketing" />
                <span>Send me occasional BluBridge updates. <span className="git11-optional">(optional)</span></span>
              </label>
            </div>
            <div className="git11-action">
              <Button type="submit" disabled={state.isSubmitting} className="git11-submit" data-testid="git11-submit">{state.isSubmitting ? 'Sending…' : 'Let’s talk about AI'} <ArrowRight size={19} strokeWidth={1.5} aria-hidden="true" /></Button>
              <p className="git11-required-note" data-testid="git11-required-note">Fields marked <span className="git11-consent-required">*</span> are required.</p>
            </div>
          </div>
          </fieldset>
          {state.notice && <p className="git11-notice" role="status" data-testid="git11-notice">{state.notice}</p>}
          {state.submitError && <p className="git11-error" role="alert" data-testid="git11-submit-error">{state.submitError}</p>}
        </form>
      </div>
    </section>
  );
}