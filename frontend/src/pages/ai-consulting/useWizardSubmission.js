import { useRef, useState } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const useWizardSubmission = () => {
  const sending = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const clearSubmission = () => { setReceipt(null); setSubmitError(''); };
  const submit = async (payload, onValidationFailure) => {
    if (sending.current || receipt) return;
    sending.current = true; setIsSubmitting(true); setSubmitError('');
    try {
      const response = await fetch(`${API_URL}/api/ai-consulting-enquiries`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        setReceipt(data);
      } else if (response.status === 422) {
        const data = await response.json();
        const errors = {};
        if (Array.isArray(data.detail)) data.detail.forEach(item => { const name = item.loc?.[1]; if (name) errors[name] = item.msg.replace(/^Value error, /, ''); });
        onValidationFailure(errors);
        setSubmitError('Please check the highlighted fields and try again.');
      } else if (response.status === 409) {
        setSubmitError('An enquiry was already submitted with this email recently. Please wait a minute before submitting again.');
      } else if (response.status === 429) {
        setSubmitError('Too many requests. Please wait a minute before trying again.');
      } else {
        setSubmitError('We couldn’t submit your enquiry. Your details are still here; please try again.');
      }
    } catch {
      setSubmitError('We couldn’t confirm submission. Please check your connection and try again.');
    } finally { sending.current = false; setIsSubmitting(false); }
  };
  return { submit, receipt, submitError, isSubmitting, clearSubmission };
};