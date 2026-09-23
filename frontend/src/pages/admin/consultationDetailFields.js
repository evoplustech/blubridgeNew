export const consultationName = item => item.full_name || [item.first_name, item.last_name].filter(Boolean).join(' ');
const consent = value => value == null ? 'Not recorded' : value ? 'Yes' : 'No';

export const consultationDetailSections = enquiry => {
  const wizard = enquiry.source === '/ai-consulting';
  const contactFields = enquiry.contact_permission != null;
  const serviceRequirements = Object.entries(enquiry.service_requirements || {});
  const budgetType = enquiry.budget_type === 'monthly' ? 'Monthly budget for an ongoing engagement' : enquiry.budget_type === 'project' ? 'Total project / initial engagement budget' : null;
  return [
    { key: 'contact', title: 'Contact information', fields: [
      ['full-name', 'Full name', consultationName(enquiry)], ['email', 'Work email', enquiry.company_email],
      ['company', 'Company', enquiry.company], ['job-title', 'Job title / Role', enquiry.role],
      ['phone', 'Phone', enquiry.phone],
      ...(contactFields ? [['calling-code', 'Calling Code', enquiry.calling_code], ['website', 'Company Website', enquiry.website]] : []),
      ['country', 'Country', enquiry.country], ['city', 'City', enquiry.city],
      ...(contactFields ? [
        ['country-code', 'Country / Region Code', enquiry.country_code],
        ['phone-country', 'Phone Country / Region Code', enquiry.phone_country],
      ] : []),
    ] },
    { key: 'project', title: 'Project requirements', fields: [
      ...(contactFields ? [
        ['initiative-role', 'What is your role in this initiative?', enquiry.initiative_role],
        ...(enquiry.initiative_role === 'Other' ? [['other-role', 'Please specify your role', enquiry.other_role]] : []),
      ] : []),
      ['services', 'AI services', enquiry.services?.join(', '), true],
      ...(wizard && enquiry.services?.includes('Other') && enquiry.other_requirement ? [['other-requirement', 'Please specify your requirement', enquiry.other_requirement, true]] : []),
      ...(serviceRequirements.length
        ? serviceRequirements.map(([service, requirement], index) => [`service-requirement-${index}`, service === 'Other' ? 'Other - Please specify' : service, requirement, true])
        : [['description', wizard ? 'Tell us about your requirement' : 'What would you like to achieve?', enquiry.project_details, true]]),
      ...(wizard ? [
        ['project-stage', 'What is the current stage of your project?', enquiry.project_stage],
        ['start-timeline', 'When would you like to start?', enquiry.start_timeline],
      ] : []),
    ] },
    { key: 'budget', title: 'Budget', fields: [
      ['budget', wizard ? (enquiry.budget_type === 'monthly' ? 'Estimated Monthly Budget (USD)' : 'Estimated Project Budget (USD)') : 'Budget', enquiry.budget || 'Not sure yet / Not provided'],
      ...(wizard ? [
        ['budget-type', 'How would you like to specify your budget?', budgetType],
        ['budget-status', 'What is the current status of this budget?', enquiry.budget_status],
      ] : []),
    ] },
    { key: 'consent', title: 'Consent', fields: [
      ...(contactFields ? [['contact-permission', 'Contact Permission', consent(enquiry.contact_permission)]] : []),
      ['privacy', 'Privacy consent', consent(enquiry.privacy_consent)],
      ['marketing', 'BluBridge updates', consent(enquiry.marketing_consent)],
    ] },
    { key: 'submission', title: 'Submission details', fields: [
      ['source', 'Source page', enquiry.source], ['status', 'Status', enquiry.status === 'viewed' ? 'Viewed' : 'New'],
      ['submitted', 'Submitted', new Date(enquiry.created_at).toLocaleString()],
    ] },
  ];
};