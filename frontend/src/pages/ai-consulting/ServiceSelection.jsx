import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { services, optionLabel } from './options';
import { FieldError, FormField, RequiredMark } from './FormField';

export const ServiceSelection = ({ state }) => {
  const { project, projectErrors, toggleService, changeProject } = state;
  return <div className="aic-service-section">
    <fieldset className="aic-fieldset" aria-describedby={`aic-services-helper${projectErrors.services ? ' aic-services-error' : ''}`} aria-invalid={Boolean(projectErrors.services)} data-testid="aic-services-group">
      <legend className="aic-label" data-testid="aic-services-label">What can BluBridge help you with?<RequiredMark /></legend>
      <p id="aic-services-helper" className="aic-helper" data-testid="aic-services-helper">Select all that apply.</p>
      <div className="aic-service-grid">
        {services.map(([id, label]) => {
          const selected = project.services.includes(label);
          const choice = <label key={id} className={`aic-service-card${selected ? ' aic-service-selected' : ''}${projectErrors.services ? ' aic-service-invalid' : ''}`} data-testid={`aic-service-card-${id}`}>
            <input id={`aic-service-${id}`} type="checkbox" checked={selected} onChange={() => toggleService(label)} aria-controls={id === 'other' && selected ? 'aic-other-details' : undefined} aria-invalid={Boolean(projectErrors.services)} aria-describedby={projectErrors.services ? 'aic-services-error' : undefined} data-testid={`aic-service-${id}`} />
            <span>{optionLabel(label)}</span>
            {id === 'other' && (selected ? <ChevronUp className="aic-other-chevron" size={16} aria-hidden="true" /> : <ChevronDown className="aic-other-chevron" size={16} aria-hidden="true" />)}
          </label>;
          return id === 'other' ? <div key={id} className={`aic-service-other${selected ? ' aic-service-other-selected' : ''}${projectErrors.services || projectErrors.otherRequirement ? ' aic-service-other-invalid' : ''}`} data-testid="aic-other-option">
            {choice}
            {selected && <div id="aic-other-details" className="aic-other-field" data-testid="aic-other-field">
              <FormField name="otherRequirement" label="Please specify your requirement" placeholder="Briefly specify your requirement" maxLength={1000} value={project.otherRequirement} onChange={changeProject} error={projectErrors.otherRequirement} />
            </div>}
          </div> : choice;
        })}
      </div>
      <FieldError name="services" error={projectErrors.services} />
    </fieldset>
  </div>;
};