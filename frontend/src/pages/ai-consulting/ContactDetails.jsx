import React from 'react';
import { Input } from '../../components/ui/input';
import { FormField, FieldError, RequiredMark } from './FormField';
import { CountrySelect } from './CountrySelect';

export const ContactDetails = ({ state }) => {
  const props = name => ({ name, value: state.form[name], onChange: state.change, error: state.errors[name] });
  return <div className="aic-two-columns" data-testid="aic-contact-information">
    <FormField {...props('fullName')} label="Full Name" placeholder="Enter your full name" autoComplete="name" maxLength={200} />
    <FormField {...props('workEmail')} label="Work Email" placeholder="name@company.com" type="email" autoComplete="email" maxLength={254} />
    <FormField {...props('company')} label="Company Name" placeholder="Enter your company name" autoComplete="organization" maxLength={200} />
    <FormField {...props('jobTitle')} label="Job Title" placeholder="Example: CTO, Head of AI, Founder" autoComplete="organization-title" maxLength={200} />
    <div className="aic-field" data-testid="aic-country-field">
      <label htmlFor="aic-country-code" className="aic-label" data-testid="aic-country-label">Your Country / Region<RequiredMark /></label>
      <CountrySelect id="aic-country-code" value={state.form.countryCode} onChange={state.chooseCountry} disabled={state.disabled} error={state.errors.countryCode} />
      <FieldError name="countryCode" error={state.errors.countryCode} />
    </div>
    <div className="aic-field" data-testid="aic-phone-field">
      <label htmlFor="aic-phone" className="aic-label" data-testid="aic-phone-label">Phone Number<RequiredMark /></label>
      <div className="aic-phone-inputs">
        <CountrySelect id="aic-phone-country" value={state.form.phoneCountry} onChange={state.choosePhoneCountry} disabled={state.disabled} error={state.errors.phoneCountry} callingCode />
        <Input id="aic-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" required maxLength={40} value={state.form.phone} onChange={state.change} placeholder="Enter your phone number" aria-invalid={Boolean(state.errors.phone)} aria-describedby={state.errors.phone ? 'aic-phone-error' : undefined} className={`aic-input${state.errors.phone ? ' aic-invalid' : ''}`} data-testid="aic-phone" />
      </div>
      <FieldError name="phone" error={state.errors.phone} />
      <FieldError name="phoneCountry" error={state.errors.phoneCountry} />
    </div>
    <div className="aic-full-width"><FormField {...props('website')} label="Company Website" placeholder="https://www.company.com" type="url" autoComplete="url" required={false} maxLength={2048} /></div>
  </div>;
};