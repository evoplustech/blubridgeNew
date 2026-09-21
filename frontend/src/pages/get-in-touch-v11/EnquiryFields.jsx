import React from 'react';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { countries, budgetRanges } from './useEnquiryForm';

const fieldId = name => `git11-${name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`;

export const FieldError = ({ name, error }) => error ? <p id={`${fieldId(name)}-error`} className="git11-error" role="alert" data-testid={`${fieldId(name)}-error`}>{error}</p> : null;

const EnquiryField = ({ name, label, placeholder, type = 'text', required = false, autoComplete, state, children }) => {
  const { form, errors, onChange } = state;
  const id = fieldId(name);
  const maxLength = name === 'description' ? 5000 : name === 'workEmail' ? 254 : name === 'phone' ? 40 : name === 'country' ? 100 : 200;
  const props = { id, name, required, maxLength, value: form[name], onChange, 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${id}-error` : name === 'description' ? 'git11-description-hint' : undefined, className: `git11-input${errors[name] ? ' git11-input-invalid' : ''}` };
  return (
    <div className="git11-field">
      <label htmlFor={id} className="git11-label">{label}{required ? <span className="git11-required"> *</span> : <span className="git11-optional"> (optional)</span>}</label>
      {children ? <select {...props} className={`${props.className} git11-select${form[name] ? '' : ' git11-placeholder'}`} data-testid={`git11-select-${name}`}>{children}</select>
        : type === 'textarea' ? <Textarea {...props} rows={4} placeholder={placeholder} className={`${props.className} git11-textarea`} data-testid="git11-input-description" />
          : <Input {...props} type={type} placeholder={placeholder} autoComplete={autoComplete} data-testid={`git11-input-${id.slice(6)}`} />}
      <FieldError name={name} error={errors[name]} />
    </div>
  );
};

export const EnquiryFields = ({ state }) => (
  <div className="git11-columns" data-testid="git11-form-columns">
    <fieldset className="git11-column" data-testid="git11-details-column">
      <legend className="git11-column-title" data-testid="git11-details-heading">Your details</legend>
      <div className="git11-field-stack">
        <EnquiryField name="fullName" label="Full name" placeholder="Your full name" autoComplete="name" required state={state} />
        <EnquiryField name="workEmail" label="Work email" placeholder="you@company.com" autoComplete="email" type="email" required state={state} />
        <EnquiryField name="company" label="Company" placeholder="Company name" autoComplete="organization" required state={state} />
        <div className="git11-pair">
          <EnquiryField name="phone" label="Phone" placeholder="+91  Phone number" autoComplete="tel" type="tel" state={state} />
          <EnquiryField name="jobTitle" label="Job title" placeholder="Your role" autoComplete="organization-title" state={state} />
        </div>
      </div>
    </fieldset>
    <fieldset className="git11-column" data-testid="git11-project-column">
      <legend className="git11-column-title" data-testid="git11-project-heading">Your project</legend>
      <div className="git11-field-stack">
        <div className="git11-pair">
          <EnquiryField name="country" label="Country" state={state}>
            <option value="">Select country</option>
            {countries.map(country => <option key={country} value={country}>{country}</option>)}
          </EnquiryField>
          <EnquiryField name="city" label="City" placeholder="Your city" autoComplete="address-level2" state={state} />
        </div>
        <EnquiryField name="budget" label="Budget" state={state}>
          <option value="">Not sure yet</option>
          {['₹', '$', '€'].map(currency => <optgroup key={currency} label={currency}>
            {budgetRanges.map(range => <option key={range} value={`${currency} ${range}`}>{currency} {range}</option>)}
          </optgroup>)}
        </EnquiryField>
        <div>
          <EnquiryField name="description" label="What would you like to achieve?" type="textarea" placeholder="Tell us about your idea, challenge or project..." state={state} />
          <p id="git11-description-hint" className="git11-hint" data-testid="git11-description-hint">A brief overview is all we need to get started.</p>
        </div>
      </div>
    </fieldset>
  </div>
);