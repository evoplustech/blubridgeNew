import React from 'react';
import { Button } from '../../components/ui/button';
import { budgetLabel, budgetTypes } from './options';

const Summary = ({ title, fields, onEdit, section }) => <section className="aic-review-section" data-testid={`aic-review-${section}`}>
  <div className="aic-review-heading">
    <h3>{title}</h3>
    <Button type="button" variant="ghost" className="aic-edit" onClick={onEdit} data-testid={`aic-edit-${section}`}>Edit</Button>
  </div>
  <dl className="aic-two-columns">
    {fields.map(([name, label, value, full]) => <div key={name} className={full ? 'aic-summary-wide' : ''}>
      <dt>{label}</dt><dd data-testid={`aic-review-${name}`}>{value || 'Not provided'}</dd>
    </div>)}
  </dl>
</section>;

export const ReviewDetails = ({ state }) => {
  const { details: d, project: p, setStep } = state;
  const fields = [
    ['services', 'What can BluBridge help you with?', p.services.join('\n'), true],
    ...(p.services.includes('Other') ? [['other-requirement', 'Please specify your requirement', p.otherRequirement, true]] : []),
    ['requirement', 'Tell us about your requirement', p.requirement, true],
    ['stage', 'What is the current stage of your project?', p.stage], ['timeline', 'When would you like to start?', p.timeline],
    ['budget-type', 'How would you like to specify your budget?', budgetTypes.find(([value]) => value === p.budgetType)?.[1], true],
    ['estimated-budget', budgetLabel(p.budgetType), p.estimatedBudget], ['budget-status', 'What is the current status of this budget?', p.budgetStatus],
  ];
  return <div className="aic-review" data-testid="aic-review">
    <Summary title="Your Details" section="contact" onEdit={() => setStep(0)} fields={[
      ['full-name', 'Full name', d.fullName], ['email', 'Work email', d.workEmail], ['company', 'Company', d.company], ['job-title', 'Job title', d.jobTitle], ['phone', 'Phone', d.phone], ['country', 'Country', d.country], ['city', 'City', d.city], ['privacy', 'Privacy consent', d.privacy ? 'Yes' : 'No'], ['marketing', 'BluBridge updates', d.marketing ? 'Yes' : 'No'],
    ]} />
    <Summary title="Project Details" section="project" fields={fields} onEdit={() => setStep(1)} />
  </div>;
};