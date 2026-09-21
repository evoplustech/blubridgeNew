const enquiryFields = ['fullName', 'workEmail', 'company', 'jobTitle', 'website', 'countryCode', 'country', 'phoneCountry', 'phone', 'initiativeRole', 'otherRole', 'services', 'otherRequirement', 'requirement', 'stage', 'timeline', 'budgetType', 'estimatedBudget', 'budgetStatus', 'contactPermission', 'city', 'privacy', 'marketing'];

// Remove enquiry values left by the previous native-GET bug, preserving unrelated parameters.
export const clearAccidentalQuery = () => {
  const url = new URL(window.location.href);
  let changed = false;
  enquiryFields.forEach(name => {
    if (url.searchParams.has(name)) { url.searchParams.delete(name); changed = true; }
  });
  if (changed) window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
};