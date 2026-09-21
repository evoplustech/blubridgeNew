import React from 'react';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { fieldId } from './useConsultingWizard';

export const RequiredMark = () => <span className="aic-required" aria-hidden="true"> *</span>;
export const FieldError = ({ name, error }) => error ? <p id={`${fieldId(name)}-error`} className="aic-error" role="alert" data-testid={`${fieldId(name)}-error`}>{error}</p> : null;

export const FormField = ({ name, label, value, onChange, error, placeholder, required = true, type = 'text', options, autoComplete, disabled = false, maxLength }) => {
  const id = fieldId(name);
  const props = { id, name, value, onChange, required, disabled, 'aria-invalid': Boolean(error), 'aria-describedby': error ? `${id}-error` : undefined, 'data-testid': id, className: `aic-input${error ? ' aic-invalid' : ''}` };
  return <div className="aic-field">
    <label htmlFor={id} className="aic-label" data-testid={`${id}-label`}>{label}{required ? <RequiredMark /> : <span className="aic-optional"> (optional)</span>}</label>
    {options ? <select {...props} className={`${props.className} aic-select${value ? '' : ' aic-placeholder'}`}>
      <option value="">{placeholder}</option>
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select> : type === 'textarea' ? <Textarea {...props} rows={6} placeholder={placeholder} maxLength={maxLength} className={`${props.className} aic-textarea`} />
      : <Input {...props} type={type} autoComplete={autoComplete} placeholder={placeholder} maxLength={maxLength} />}
    <FieldError name={name} error={error} />
  </div>;
};