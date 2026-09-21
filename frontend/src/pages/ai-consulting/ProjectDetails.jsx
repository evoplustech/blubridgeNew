import React from 'react';
import { FormField, FieldError, RequiredMark } from './FormField';
import { ServiceSelection } from './ServiceSelection';
import { stages, timelines, budgetTypes, budgets, budgetStatuses, budgetLabel } from './options';

export const ProjectDetails = ({ state }) => {
  const { project, projectErrors, changeProject } = state;
  const props = name => ({ name, value: project[name], error: projectErrors[name], onChange: changeProject });
  return <div className="aic-groups" data-testid="aic-project-details">
    <ServiceSelection state={state} />
    <FormField {...props('requirement')} label="Tell us about your requirement" type="textarea" placeholder="What problem are you trying to solve? Briefly describe what you would like to build or improve, the expected outcome and any existing systems involved." />
    <div className="aic-two-columns" data-testid="aic-stage-timeline-row">
      <FormField {...props('stage')} label="What is the current stage of your project?" placeholder="Select your project stage" options={stages} />
      <FormField {...props('timeline')} label="When would you like to start?" placeholder="Select your expected start timeline" options={timelines} />
    </div>
    <div className="aic-budget-section" data-testid="aic-budget-section">
      <fieldset className="aic-fieldset" aria-describedby={`aic-budget-type-helper${projectErrors.budgetType ? ' aic-budget-type-error' : ''}`} aria-invalid={Boolean(projectErrors.budgetType)}>
        <legend className="aic-label">How would you like to specify your budget?<RequiredMark /></legend>
        <div className={`aic-budget-types${projectErrors.budgetType ? ' aic-radio-invalid' : ''}`}>
          {budgetTypes.map(([value, label]) => <label className="aic-choice" key={value}>
            <input id={`aic-budget-type-${value}`} type="radio" name="budgetType" value={value} required checked={project.budgetType === value} onChange={changeProject} aria-invalid={Boolean(projectErrors.budgetType)} aria-describedby={projectErrors.budgetType ? 'aic-budget-type-error' : 'aic-budget-type-helper'} data-testid={`aic-budget-type-${value}`} />
            <span>{label}</span>
          </label>)}
        </div>
        <p id="aic-budget-type-helper" className="aic-helper" data-testid="aic-budget-type-helper">Select whether your estimate covers the project or initial phase, or a recurring monthly engagement.</p>
        <FieldError name="budgetType" error={projectErrors.budgetType} />
      </fieldset>
      <div className="aic-two-columns" data-testid="aic-budget-status-row">
        <FormField {...props('estimatedBudget')} label={budgetLabel(project.budgetType)} placeholder="Select your estimated budget" options={budgets[project.budgetType] || []} disabled={!project.budgetType} />
        <FormField {...props('budgetStatus')} label="What is the current status of this budget?" placeholder="Select budget status" options={budgetStatuses} />
      </div>
    </div>
  </div>;
};