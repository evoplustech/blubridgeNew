import { useState } from 'react';
import { GUIDANCE } from './options';
import { validateDetails, validateProject } from './validation';
import { useWizardSubmission } from './useWizardSubmission';

export const fieldId = name => `aic-${name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`;
const retainErrors = (previous, next) => Object.fromEntries(Object.keys(previous).filter(key => next[key]).map(key => [key, next[key]]));
const focusError = errors => {
  const name = Object.keys(errors)[0];
  const id = name === 'services' ? 'aic-service-consulting' : name === 'budgetType' ? 'aic-budget-type-project' : fieldId(name);
  requestAnimationFrame(() => document.getElementById(id)?.focus());
};

const emptyDetails = { fullName: '', workEmail: '', company: '', phone: '', jobTitle: '', country: '', city: '', privacy: false, marketing: false };
const emptyProject = { services: [], otherRequirement: '', requirement: '', stage: '', timeline: '', budgetType: '', estimatedBudget: '', budgetStatus: '' };

export const useConsultingWizard = () => {
  const submission = useWizardSubmission();
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState(emptyDetails);
  const [project, setProject] = useState(emptyProject);
  const [detailErrors, setDetailErrors] = useState({});
  const [projectErrors, setProjectErrors] = useState({});
  const changeDetails = e => {
    submission.clearSubmission();
    const { name, value, type, checked } = e.target;
    const next = { ...details, [name]: type === 'checkbox' ? checked : value };
    setDetails(next);
    setDetailErrors(previous => retainErrors(previous, validateDetails(next)));
  };
  const updateProject = next => {
    submission.clearSubmission();
    setProject(next);
    setProjectErrors(previous => retainErrors(previous, validateProject(next)));
  };
  const changeProject = e => {
    const { name, value } = e.target;
    const next = { ...project, [name]: value };
    if (name === 'budgetType' && value !== project.budgetType) next.estimatedBudget = '';
    updateProject(next);
  };
  const toggleService = service => {
    let selected;
    if (project.services.includes(service)) selected = project.services.filter(value => value !== service);
    else if (service === GUIDANCE) selected = [GUIDANCE];
    else selected = [...project.services.filter(value => value !== GUIDANCE), service];
    updateProject({ ...project, services: selected, otherRequirement: selected.includes('Other') ? project.otherRequirement : '' });
  };
  const next = e => {
    e.preventDefault();
    if (submission.isSubmitting || submission.receipt) return;
    if (step === 2) {
      const contactErrors = validateDetails(details);
      const projectValidation = validateProject(project);
      if (Object.keys(contactErrors).length || Object.keys(projectValidation).length) {
        showServerErrors({ ...contactErrors, ...projectValidation });
        return;
      }
      submission.submit({ ...details, ...project }, showServerErrors);
      return;
    }
    const errors = step === 0 ? validateDetails(details) : validateProject(project);
    if (step === 0) setDetailErrors(errors); else setProjectErrors(errors);
    if (Object.keys(errors).length) { focusError(errors); return; }
    setStep(step + 1);
  };
  const showServerErrors = errors => {
    const contact = Object.fromEntries(Object.entries(errors).filter(([key]) => key in emptyDetails));
    const projectFields = Object.fromEntries(Object.entries(errors).filter(([key]) => key in emptyProject));
    setDetailErrors(contact); setProjectErrors(projectFields);
    if (Object.keys(contact).length) { setStep(0); focusError(contact); }
    else if (Object.keys(projectFields).length) { setStep(1); focusError(projectFields); }
  };
  const restart = () => {
    setDetails(emptyDetails); setProject(emptyProject); setDetailErrors({}); setProjectErrors({});
    submission.clearSubmission(); setStep(0);
  };
  return { step, setStep, details, project, detailErrors, projectErrors, changeDetails, changeProject, toggleService, next, restart, ...submission };
};