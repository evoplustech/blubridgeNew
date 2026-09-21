import { budgets, budgetStatuses, stages, timelines, services, GUIDANCE } from './options';

export const validateDetails = value => {
  const errors = {};
  if (!value.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!value.workEmail.trim()) errors.workEmail = 'Please enter your work email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.workEmail.trim())) errors.workEmail = 'Please enter a valid email address.';
  if (!value.company.trim()) errors.company = 'Please enter your company name.';
  if (value.phone.trim() && (!/^[+()\d\s.-]+$/.test(value.phone.trim()) || !/^\d{6,15}$/.test(value.phone.replace(/\D/g, '')))) errors.phone = 'Please enter a valid phone number.';
  if (!value.privacy) errors.privacy = 'Please agree to the Privacy Policy to continue.';
  return errors;
};

export const validateProject = value => {
  const errors = {};
  if (!value.services.length || value.services.some(service => !services.some(([, label]) => label === service))) errors.services = 'Please select at least one option.';
  if (value.services.includes(GUIDANCE) && value.services.length > 1) errors.services = 'Please select guidance on its own.';
  if (value.services.includes('Other') && !value.otherRequirement.trim()) errors.otherRequirement = 'Please specify your requirement.';
  if (!value.requirement.trim()) errors.requirement = 'Please tell us about your requirement.';
  if (!stages.includes(value.stage)) errors.stage = 'Please select your project stage.';
  if (!timelines.includes(value.timeline)) errors.timeline = 'Please select your expected start timeline.';
  if (!Object.hasOwn(budgets, value.budgetType)) errors.budgetType = 'Please select how you would like to specify your budget.';
  if (!budgets[value.budgetType]?.includes(value.estimatedBudget)) errors.estimatedBudget = 'Please select your estimated budget.';
  if (!budgetStatuses.includes(value.budgetStatus)) errors.budgetStatus = 'Please select the current budget status.';
  return errors;
};