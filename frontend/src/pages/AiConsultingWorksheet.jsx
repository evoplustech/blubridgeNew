import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
import { useEnquiryForm } from './ai-consulting/useEnquiryForm';
import { ContactDetails } from './ai-consulting/ContactDetails';
import { RequirementsSection } from './ai-consulting/RequirementsSection';
import { ProjectDetails } from './ai-consulting/ProjectDetails';
import { FieldError, RequiredMark } from './ai-consulting/FormField';
import { clearAccidentalQuery } from './ai-consulting/clearAccidentalQuery';
import { enquiryHeading, enquiryDescription } from './ai-consulting/introCopy';
import './ai-consulting-worksheet/AiConsultingWorksheet.css';

const outline = [['contact', 'Contact'], ['needs', 'Requirements'], ['project', 'Project'], ['budget', 'Budget'], ['permission', 'Permission']];

const WorksheetSection = ({ name, title, helper, children }) => <section className="aic-sheet-section" aria-labelledby={`aic-${name}-heading`} data-testid={`aic-section-${name}`}>
  <header className="aic-sheet-section-heading">
    <h3 id={`aic-${name}-heading`} data-testid={`aic-${name}-heading`}>{title}</h3>
    {helper && <p data-testid={`aic-${name}-helper`}>{helper}</p>}
  </header>
  {children}
</section>;

export default function AiConsultingWorksheet() {
  const state = useEnquiryForm();
  const success = useRef(null);
  useDocumentTitle('AI Consulting | BluBridge');
  useMetaDescription(enquiryDescription);
  useEffect(() => { clearAccidentalQuery(); }, []);
  useEffect(() => {
    if (state.receipt) { success.current?.focus({ preventScroll: true }); success.current?.scrollIntoView({ block: 'center', behavior: 'instant' }); }
  }, [state.receipt]);
  return <section className="aic-sheet-page" data-testid="ai-consulting-worksheet-page">
    <div className="aic-sheet-container">
      <header className="aic-sheet-intro">
        <p className="aic-sheet-eyebrow" data-testid="aic-eyebrow">GET IN TOUCH</p>
        <div>
          <h1 className="aic-sheet-heading" data-testid="aic-heading">{enquiryHeading}</h1>
          <p className="aic-sheet-subtitle" data-testid="aic-subtitle">{enquiryDescription}</p>
        </div>
      </header>
      <div className="aic-sheet-layout">
        <aside className="aic-sheet-index-area" aria-label="Form section summary" data-testid="aic-sheet-index-area">
          <ol className="aic-sheet-index" data-testid="aic-sheet-index">
            {outline.map(([id, label], index) => <li key={id} data-testid={`aic-sheet-index-${id}`}><span className="aic-sheet-index-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{label}</span></li>)}
          </ol>
        </aside>
        <form className="aic-sheet-form" method="post" noValidate onSubmitCapture={event => event.preventDefault()} onSubmit={state.handleSubmit} aria-busy={state.isSubmitting} aria-labelledby="aic-form-heading" data-testid="aic-form">
          <h2 id="aic-form-heading" className="sr-only" data-testid="aic-form-heading">AI Consulting Enquiry</h2>
          {state.receipt && <div ref={success} tabIndex={-1} className="aic-confirmation" role="status" data-testid="aic-success">
            <p className="font-semibold" data-testid="aic-success-message">Success Fully Submitted</p>
            <p data-testid="aic-success-details">Your AI consulting enquiry has been received. Our team will be in touch shortly.</p>
            <p className="aic-helper" data-testid="aic-success-reference">Enquiry reference: {state.receipt.id}</p>
          </div>}
          <fieldset className="aic-submit-fields" disabled={state.disabled}>
            <WorksheetSection name="contact" title="Contact Information" helper="Tell us who you are and how we can reach you."><ContactDetails state={state} /></WorksheetSection>
            <WorksheetSection name="requirements" title="Project Requirements" helper="Help us understand your involvement and what you are looking to achieve."><RequirementsSection state={state} /></WorksheetSection>
            <WorksheetSection name="timeline-budget" title="Project Timeline & Budget" helper="Tell us where the project currently stands and your expected investment range."><ProjectDetails state={state} /></WorksheetSection>
            <WorksheetSection name="permission" title="Contact Permission">
              <label className="aic-choice aic-permission" htmlFor="aic-contact-permission" data-testid="aic-contact-permission-label">
                <input id="aic-contact-permission" name="contactPermission" type="checkbox" required checked={state.form.contactPermission} onChange={state.change} aria-invalid={Boolean(state.errors.contactPermission)} aria-describedby={state.errors.contactPermission ? 'aic-contact-permission-error' : undefined} data-testid="aic-contact-permission" />
                <span>I agree that BluBridge may contact me by phone or email regarding this enquiry. I acknowledge the <Link to="/policies/privacy-policy" data-testid="aic-privacy-link">Privacy Policy</Link>.<RequiredMark /></span>
              </label>
              <FieldError name="contactPermission" error={state.errors.contactPermission} />
            </WorksheetSection>
            <div className="aic-actions"><Button type="submit" className="aic-primary" disabled={state.disabled} data-testid="aic-submit-enquiry">{state.receipt ? 'Enquiry Submitted' : state.isSubmitting ? 'Submitting…' : 'Submit Enquiry'}</Button></div>
          </fieldset>
          {state.submitError && <p className="aic-error aic-submit-error" role="alert" data-testid="aic-submit-error">{state.submitError}</p>}
        </form>
      </div>
    </div>
  </section>;
}