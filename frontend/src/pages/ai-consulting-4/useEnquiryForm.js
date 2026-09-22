import { useState } from 'react';
import { countryByCode, parsePhone } from '../ai-consulting/countryData';
import { focusError } from '../ai-consulting/fieldUtils';
import { validateServiceEnquiry, selectedRequirements } from './serviceRequirements';
import { useServiceSubmission } from './useServiceSubmission';

const emptyForm = { fullName: '', workEmail: '', company: '', jobTitle: '', website: '', countryCode: '', phoneCountry: 'US', phone: '', services: [], serviceRequirements: {}, stage: '', timeline: '', budgetType: '', estimatedBudget: '', budgetStatus: '', contactPermission: false };

export const useEnquiryForm = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const submission = useServiceSubmission();
  const disabled = submission.isSubmitting || Boolean(submission.receipt);
  const update = next => {
    if (disabled) return;
    submission.clearSubmission(); setForm(next);
    const validation = validateServiceEnquiry(next);
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
  const changeRequirement = (key, value) => update({ ...form, serviceRequirements: { ...form.serviceRequirements, [key]: value } });
  const handleSubmit = event => {
    event.preventDefault();
    if (disabled) return;
    const nextErrors = validateServiceEnquiry(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { focusError(nextErrors); return; }
    submission.submit({ ...form, formVariant: 'ai-consulting-4', serviceRequirements: selectedRequirements(form), country: countryByCode[form.countryCode].name, phone: parsePhone(form.phone, form.phoneCountry).number }, serverErrors => { setErrors(serverErrors); focusError(serverErrors); });
  };
  return { form, errors, change, chooseCountry, choosePhoneCountry, toggleService, changeRequirement, handleSubmit, disabled, isSubmitting: submission.isSubmitting, receipt: submission.receipt, submitError: submission.submitError };
};