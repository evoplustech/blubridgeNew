import React, { useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
import { useConsultingWizard } from './ai-consulting/useConsultingWizard';
import { ContactDetails } from './ai-consulting/ContactDetails';
import { ProjectDetails } from './ai-consulting/ProjectDetails';
import { ReviewDetails } from './ai-consulting/ReviewDetails';
import './ai-consulting/AiConsulting.css';

const steps = ['Your Details', 'Project Details', 'Review'];

export default function AiConsulting() {
  const state = useConsultingWizard();
  const heading = useRef(null);
  const previousStep = useRef(0);
  useDocumentTitle('AI Consulting | BluBridge');
  useMetaDescription("From an early idea to your next AI initiative, let's find the right place to start.");
  useEffect(() => {
    if (previousStep.current !== state.step || state.receipt) {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
      previousStep.current = state.step;
    }
  }, [state.step, state.receipt]);
  return <section className="aic-page" data-testid="ai-consulting-page">
    <div className="aic-container">
      <header className="aic-intro">
        <p className="aic-eyebrow" data-testid="aic-eyebrow">GET IN TOUCH</p>
        <h1 className="aic-heading" data-testid="aic-heading">Let’s build what’s next.</h1>
        <p className="aic-subtitle" data-testid="aic-subtitle">From an early idea to your next AI initiative,<br />{' '}let’s find the right place to start.</p>
      </header>
      <nav aria-label="Enquiry progress" className="aic-progress">
        <ol>{steps.map((label, index) => <li key={label} className={index === state.step ? 'aic-step-current' : index < state.step ? 'aic-step-complete' : ''} aria-current={index === state.step ? 'step' : undefined} data-testid={`aic-step-${index}`}>
          <span className="aic-step-number" aria-hidden="true">{index + 1}</span><span>{label}</span>
        </li>)}</ol>
      </nav>
      <form noValidate onSubmit={state.next} onKeyDown={event => {
        if (event.key === 'Enter' && state.step < 2 && event.target.tagName === 'INPUT' && !event.nativeEvent.isComposing) event.preventDefault();
      }} aria-busy={state.isSubmitting} data-testid="aic-form">
        <div className="aic-section-heading">
          <h2 ref={heading} tabIndex={-1} data-testid="aic-section-title">{steps[state.step]}</h2>
          {state.step === 1 && <p data-testid="aic-project-subtitle">Tell us about your requirement so we can understand how to help.</p>}
          {state.step === 2 && <p className="aic-review-status" data-testid="aic-review-status">{state.receipt ? 'Submitted' : state.isSubmitting ? 'Submitting…' : 'Not submitted'}</p>}
        </div>
        {state.receipt && <div className="aic-confirmation" role="status" data-testid="aic-success">
          <p className="font-semibold" data-testid="aic-success-message">Success Fully Submitted</p>
          <p data-testid="aic-success-details">Your AI consulting enquiry has been received. Our team will be in touch shortly.</p>
          <p className="aic-helper" data-testid="aic-success-reference">Enquiry reference: {state.receipt.id}</p>
        </div>}
        <fieldset className="aic-submit-fields" disabled={state.isSubmitting || Boolean(state.receipt)}>
        {state.step === 0 ? <ContactDetails state={state} /> : state.step === 1 ? <ProjectDetails state={state} /> : <ReviewDetails state={state} />}
        <div className="aic-actions">
          <Button type="button" variant="outline" className="aic-back" disabled={state.step === 0} onClick={() => state.setStep(state.step - 1)} data-testid="aic-back">Back</Button>
          {state.step < 2 ? <Button type="submit" className="aic-primary" data-testid="aic-continue">{state.step === 1 ? 'Review & Continue' : 'Continue'}</Button>
            : <Button type="submit" className="aic-primary" disabled={state.isSubmitting || Boolean(state.receipt)} data-testid="aic-submit-enquiry">{state.receipt ? 'Enquiry submitted' : state.isSubmitting ? 'Submitting…' : 'Submit enquiry'}</Button>}
        </div>
        </fieldset>
        {state.submitError && <p className="aic-error aic-submit-error" role="alert" data-testid="aic-submit-error">{state.submitError}</p>}
        {state.receipt && <Button type="button" variant="outline" className="aic-back aic-restart" onClick={state.restart} data-testid="aic-new-enquiry">Start a new enquiry</Button>}
      </form>
    </div>
  </section>;
}