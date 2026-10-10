const LEAD_FORMS = {
  '/api/contact': 'contact',
  '/api/contacts/submit': 'contact',
  '/api/contact-us': 'contact',
  '/api/contact-enquiries': 'get_in_touch',
  '/api/project-enquiries': 'project_enquiry',
  '/api/ai-consultation-enquiries': 'ai_consultation',
  '/api/ai-consulting-enquiries': 'ai_consulting',
  '/api/job-applications/submit': 'job_application',
};

// Maps a successful public form POST (announced by security/formTransport) to its GA4 event.
export function describeFormSuccess(apiPath) {
  const page_path = `${window.location.pathname}${window.location.search}`;
  if (LEAD_FORMS[apiPath]) return { name: 'generate_lead', params: { form_name: LEAD_FORMS[apiPath], page_path } };
  if (apiPath === '/api/newsletter/subscribe') return { name: 'sign_up', params: { method: 'newsletter', page_path } };
  return null;
}
