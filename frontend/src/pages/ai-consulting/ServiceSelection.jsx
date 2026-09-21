import React from 'react';
import { services } from './options';
import { FieldError, FormField, RequiredMark } from './FormField';

export const ServiceSelection = ({ state }) => {
  const { project, projectErrors, toggleService, changeProject } = state;
  return <div className="aic-service-section">
    <fieldset className="aic-fieldset" aria-describedby={`aic-services-helper${projectErrors.services ? ' aic-services-error' : ''}`} aria-invalid={Boolean(projectErrors.services)} data-testid="aic-services-group">
      <legend className="aic-label">What can BluBridge help you with?<RequiredMark /></legend>
      <p id="aic-services-helper" className="aic-helper" data-testid="aic-services-helper">Select all that apply.</p>
      <div className="aic-service-grid">
        {services.map(([id, label]) => <label key={id} className={`aic-service-card${project.services.includes(label) ? ' aic-service-selected' : ''}${projectErrors.services ? ' aic-service-invalid' : ''}`} data-testid={`aic-service-card-${id}`}>
          <input id={`aic-service-${id}`} type="checkbox" checked={project.services.includes(label)} onChange={() => toggleService(label)} aria-invalid={Boolean(projectErrors.services)} aria-describedby={projectErrors.services ? 'aic-services-error' : undefined} data-testid={`aic-service-${id}`} />
          <span>{label}</span>
        </label>)}
      </div>
      <FieldError name="services" error={projectErrors.services} />
    </fieldset>
    {project.services.includes('Other') && <div className="aic-other-field" data-testid="aic-other-field">
      <FormField name="otherRequirement" label="Please specify your requirement" placeholder="Briefly specify your requirement" maxLength={1000} value={project.otherRequirement} onChange={changeProject} error={projectErrors.otherRequirement} />
    </div>}
  </div>;
};