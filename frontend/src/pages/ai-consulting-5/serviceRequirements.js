import { services, optionLabel } from '../ai-consulting/options';
import { validateEnquiry } from '../ai-consulting/validation';

export const serviceOptions = services.map(([id, value]) => ({
  id, value, label: optionLabel(value),
  key: value === 'Other' ? 'Other' : optionLabel(value),
  field: `requirement-${id}`,
}));

export const validateServiceEnquiry = form => {
  // All non-service validation stays identical to the base form.
  const errors = validateEnquiry({ ...form, requirement: '' });
  delete errors.requirement;
  serviceOptions.forEach(({ value, key, field }) => {
    if (!form.services.includes(value)) return;
    const response = form.serviceRequirements[key] || '';
    if (!response.trim()) errors[field] = 'Please tell us about your requirement.';
    else if (response.length > 5000) errors[field] = 'Please keep your requirement to 5,000 characters.';
  });
  return errors;
};

export const selectedRequirements = form => Object.fromEntries(serviceOptions
  .filter(({ value }) => form.services.includes(value))
  .map(({ key }) => [key, form.serviceRequirements[key].trim()]));

export const serverErrorField = location => location?.[1] === 'serviceRequirements'
  ? serviceOptions.find(({ key }) => key === location[2])?.field || 'services'
  : location?.[1];