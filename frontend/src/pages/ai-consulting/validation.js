import { budgets, budgetStatuses, stages, timelines, services } from './options';
import { countryByCode, parsePhone } from './countryData';

export const validateDetails = value => {
  const errors = {};
  if (!value.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!value.workEmail.trim()) errors.workEmail = 'Please enter your work email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.workEmail.trim())) errors.workEmail = 'Please enter a valid email address.';
  if (!value.company.trim()) errors.company = 'Please enter your company name.';
  if (!value.jobTitle.trim()) errors.jobTitle = 'Please enter your job title.';
  if (!countryByCode[value.countryCode]) errors.countryCode = 'Please select your country / region.';
  if (!value.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!parsePhone(value.phone, value.phoneCountry)) errors.phone = 'Please enter a valid phone number for the selected calling code.';
  if (value.website.trim()) {
    try {
      const url = new URL(value.website.trim());
      if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.')) errors.website = 'Please enter a valid website URL, including https://.';
    } catch { errors.website = 'Please enter a valid website URL, including https://.'; }
  }
  return errors;
};

export const validateEnquiry = value => {
  const errors = validateDetails(value);
  Object.assign(errors, validateProject(value));
  if (!value.contactPermission) errors.contactPermission = 'Please give permission for BluBridge to contact you regarding this enquiry.';
  return errors;
};

export const validateProject = value => {
  const errors = {};
  if (!value.services.length || value.services.some(service => !services.some(([, label]) => label === service))) errors.services = 'Please select at least one option.';
  if (value.services.includes('Other') && !value.requirement.trim()) errors.requirement = 'Please tell us about your requirement.';
  if (!stages.includes(value.stage)) errors.stage = 'Please select your project stage.';
  if (!timelines.includes(value.timeline)) errors.timeline = 'Please select your expected start timeline.';
  if (!Object.hasOwn(budgets, value.budgetType)) errors.budgetType = 'Please select how you would like to specify your budget.';
  if (!budgets[value.budgetType]?.includes(value.estimatedBudget)) errors.estimatedBudget = 'Please select your estimated budget.';
  if (!budgetStatuses.includes(value.budgetStatus)) errors.budgetStatus = 'Please select the current budget status.';
  return errors;
};