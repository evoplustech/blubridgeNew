import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FormField, FieldError, RequiredMark } from '../ai-consulting/FormField';
import { serviceOptions } from './serviceRequirements';

export const RequirementsSection = ({ state }) => <div className="aic-groups">
  <fieldset aria-labelledby="aic-services-label" aria-describedby="aic-services-help" data-testid="aic-services-group">
    <legend className="aic-label" id="aic-services-label" data-testid="aic-services-label">What can BluBridge help you with?<RequiredMark /></legend>
    <p className="aic-helper" id="aic-services-help" data-testid="aic-services-helper">Select all that apply.</p>
    <div className="aic-service-grid">
      {serviceOptions.map(({ id, value, key, label, field }) => {
        const selected = state.form.services.includes(value);
        const error = state.errors[field];
        const panelId = `aic-5-service-panel-${id}`;
        return <div key={id} className={`aic-v5-service${id === 'other' ? ' aic-v5-service-other' : ''}${selected ? ' aic-v5-service-selected' : ''}${state.errors.services || (selected && error) ? ' aic-service-invalid' : ''}`} data-testid={`aic-5-service-item-${id}`}>
          <label className={`aic-service-card${selected ? ' aic-service-selected' : ''}`} data-testid={`aic-service-card-${id}`}>
            <input id={`aic-service-${id}`} name="services" type="checkbox" value={value} checked={selected} onChange={() => state.toggleService(value)} aria-expanded={selected} aria-controls={selected ? panelId : undefined} aria-invalid={Boolean(state.errors.services)} aria-describedby={state.errors.services ? 'aic-services-error' : undefined} data-testid={`aic-service-${id}`} />
            <span>{label}</span>
            {selected ? <ChevronUp className="aic-other-chevron" size={17} aria-hidden="true" /> : <ChevronDown className="aic-other-chevron" size={17} aria-hidden="true" />}
          </label>
          {selected && <div id={panelId} className="aic-v5-service-panel" data-testid={`aic-5-service-panel-${id}`}>
            <FormField name={field} label={id === 'other' ? 'Please specify your requirement' : 'Tell us about your requirement'} type="textarea" maxLength={5000} value={state.form.serviceRequirements[key] || ''} onChange={event => state.changeRequirement(key, event.target.value)} error={error} placeholder={id === 'other' ? 'Please describe the AI service or requirement you are looking for.' : `Briefly describe what you need help with regarding ${label}.`} />
          </div>}
        </div>;
      })}
    </div>
    <FieldError name="services" error={state.errors.services} />
  </fieldset>
</div>;