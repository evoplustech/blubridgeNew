import React from 'react';
import { FormField } from './FormField';
import { ServiceSelection } from './ServiceSelection';

export const RequirementsSection = ({ state }) => {
  const otherSelected = state.form.services.includes('Other');
  const requirement = <FormField name="requirement" value={state.form.requirement} onChange={state.change} error={state.errors.requirement} label="Tell us about your requirement" type="textarea" maxLength={5000} placeholder="What problem are you trying to solve? Briefly describe what you would like to build or improve, the expected outcome and any existing systems involved." />;
  return <div className="aic-groups">
    <ServiceSelection state={{ project: state.form, projectErrors: state.errors, toggleService: state.toggleService }}>
      {otherSelected && requirement}
    </ServiceSelection>
  </div>;
};