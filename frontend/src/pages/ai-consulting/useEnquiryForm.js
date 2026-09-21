import { useState } from 'react';
import { countryByCode, parsePhone } from './countryData';
import { validateEnquiry } from './validation';
import { focusError } from './fieldUtils';
import { useWizardSubmission } from './useWizardSubmission';

const emptyForm = { fullName: '', workEmail: '', company: '', jobTitle: '', website: '', countryCode: '', phoneCountry: 'US', phone: '', services: [], requirement: '', stage: '', timeline: '', budgetType: '', estimatedBudget: '', budgetStatus: '', contactPermission: false };

export const useEnquiryForm = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const submission = useWizardSubmission();
  const disabled = submission.isSubmitting || Boolean(submission.receipt);
  const update = next => {
    if (disabled) return;
    submission.clearSubmission(); setForm(next);
    const validation = validateEnquiry(next);
    setErrors(previous => Object.fromEntries(Object.keys(previous).filter(key => validation[key]).map(key => [key, validation[key]])));
  };
  const change = event => {
    const { name, value, type, checked } = event.target;
    const next = { ...form, [name]: type === 'checkbox' ? checked : value };
    if (name === 'budgetType' && value !== form.budgetType) next.estimatedBudget = '';
    update(next);
  };
  const chooseCountry = code => update({ ...form, countryCode: code, phoneCountry: code });
  const choosePhoneCountry = code => update({ ...form, phoneCountry: code });
  const toggleService = service => {
    const selected = form.services.includes(service) ? form.services.filter(value => value !== service) : [...form.services, service];
    update({ ...form, services: selected });
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (disabled) return;
    const nextErrors = validateEnquiry(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { focusError(nextErrors); return; }
    submission.submit({ ...form, requirement: form.services.includes('Other') ? form.requirement : '', country: countryByCode[form.countryCode].name, phone: parsePhone(form.phone, form.phoneCountry).number }, serverErrors => { setErrors(serverErrors); focusError(serverErrors); });
  };
  // Keep the form event handler separate from the JSON submission transport.
  return { form, errors, change, chooseCountry, choosePhoneCountry, toggleService, handleSubmit, disabled, isSubmitting: submission.isSubmitting, receipt: submission.receipt, submitError: submission.submitError };
};