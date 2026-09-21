export const fieldId = name => `aic-${name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`;
export const focusError = errors => {
  const name = Object.keys(errors)[0];
  const id = name === 'services' ? 'aic-service-consulting' : name === 'budgetType' ? 'aic-budget-type-project' : fieldId(name);
  requestAnimationFrame(() => {
    const field = document.getElementById(id);
    field?.focus({ preventScroll: true });
    field?.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
};