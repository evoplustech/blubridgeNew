import React from 'react';
import { Link } from 'react-router-dom';
import { FormField, FieldError, RequiredMark } from './FormField';
import { countries } from './options';

export const ContactDetails = ({ state }) => {
  const props = name => ({ name, value: state.details[name], onChange: state.changeDetails, error: state.detailErrors[name] });
  return <div className="aic-groups" data-testid="aic-contact-details">
    <div className="aic-two-columns">
      <FormField {...props('fullName')} label="Full name" placeholder="Your full name" autoComplete="name" maxLength={200} />
      <FormField {...props('workEmail')} label="Work email" placeholder="you@company.com" type="email" autoComplete="email" maxLength={254} />
      <FormField {...props('company')} label="Company" placeholder="Company name" autoComplete="organization" maxLength={200} />
      <FormField {...props('jobTitle')} label="Job title" placeholder="Your role" autoComplete="organization-title" required={false} maxLength={200} />
      <FormField {...props('phone')} label="Phone" placeholder="+91  Phone number" type="tel" autoComplete="tel" required={false} maxLength={40} />
      <FormField {...props('country')} label="Country" placeholder="Select country" options={countries} required={false} />
      <FormField {...props('city')} label="City" placeholder="Your city" autoComplete="address-level2" required={false} maxLength={200} />
    </div>
    <div className="aic-consents">
      <label className="aic-choice">
        <input id="aic-privacy" name="privacy" type="checkbox" required checked={state.details.privacy} onChange={state.changeDetails} aria-invalid={Boolean(state.detailErrors.privacy)} aria-describedby={state.detailErrors.privacy ? 'aic-privacy-error' : undefined} data-testid="aic-privacy" />
        <span>I agree to the <Link to="/policies/privacy-policy" data-testid="aic-privacy-link">Privacy Policy</Link>.<RequiredMark /></span>
      </label>
      <FieldError name="privacy" error={state.detailErrors.privacy} />
      <label className="aic-choice">
        <input name="marketing" type="checkbox" checked={state.details.marketing} onChange={state.changeDetails} data-testid="aic-marketing" />
        <span>Send me occasional BluBridge updates. <span className="aic-optional">(optional)</span></span>
      </label>
    </div>
  </div>;
};