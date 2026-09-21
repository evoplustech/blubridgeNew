// Display wording only: preserve canonical values used by validation and saved records.
const displayNames = { Other: 'Other - Please specify', 'GPU & AI Systems Optimisation': 'AI Performance Optimization' };
export const optionLabel = value => (displayNames[value] || value).replace(/[–—]/g, '-');
export const services = [
  ['consulting', 'AI Consulting & Technical Advisory'],
  ['custom-ai', 'Custom AI & Model Development'],
  ['generative-ai', 'Generative AI, LLM & RAG Systems'],
  ['agents', 'AI Agents & Automation'],
  ['model-training', 'Model Training & Fine-Tuning'],
  ['gpu-optimisation', 'GPU & AI Systems Optimisation'],
  ['integration', 'Deployment & Integration'],
  ['support', 'Maintenance & Support'],
  ['other', 'Other'],
];
export const stages = ['Exploring options', 'Requirements defined', 'Planning a proof of concept or pilot', 'Development in progress', 'Improving an existing system', 'Ready for deployment', 'Other'];
export const timelines = ['Within 30 days', '1–3 months', '3–6 months', 'More than 6 months', 'No fixed start date yet'];
export const budgetTypes = [
  ['project', 'Total project / initial engagement budget'],
  ['monthly', 'Monthly budget for an ongoing engagement'],
];
export const budgets = {
  project: ['Below $10,000', '$10,000–$24,999', '$25,000–$49,999', '$50,000–$99,999', '$100,000–$249,999', '$250,000 or more', 'Budget not yet defined'],
  monthly: ['Below $5,000 per month', '$5,000–$9,999 per month', '$10,000–$24,999 per month', '$25,000–$49,999 per month', '$50,000 or more per month', 'Budget not yet defined'],
};
export const budgetStatuses = ['Budget approved and available', 'Budget proposed — approval pending', 'Need a scoped proposal to secure approval', 'No budget available currently', 'I do not know the budget status yet'];
export const budgetLabel = type => type === 'monthly' ? 'Estimated Monthly Budget (USD)' : 'Estimated Project Budget (USD)';
export const countries = ['India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Singapore', 'Australia', 'Canada', 'Germany', 'France', 'Netherlands', 'Switzerland', 'Ireland', 'Spain', 'Italy', 'Sweden', 'Norway', 'Denmark', 'Japan', 'South Korea', 'Malaysia', 'Indonesia', 'Saudi Arabia', 'Qatar', 'South Africa', 'Brazil', 'Mexico', 'New Zealand', 'Israel', 'Sri Lanka', 'Other'];