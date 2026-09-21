import re
from typing import List, Literal, Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field, ValidationInfo, field_validator

WizardService = Literal['AI Consulting & Technical Advisory', 'Custom AI & Model Development', 'Generative AI, LLM & RAG Systems', 'AI Agents & Automation', 'Model Training & Fine-Tuning', 'GPU & AI Systems Optimisation', 'Deployment & Integration', 'Maintenance & Support', 'Not sure — I need guidance', 'Other']
PROJECT_BUDGETS = ['Below $10,000', '$10,000–$24,999', '$25,000–$49,999', '$50,000–$99,999', '$100,000–$249,999', '$250,000 or more', 'Budget not yet defined']
MONTHLY_BUDGETS = ['Below $5,000 per month', '$5,000–$9,999 per month', '$10,000–$24,999 per month', '$25,000–$49,999 per month', '$50,000 or more per month', 'Budget not yet defined']
BUDGET_TYPE_LABELS = {'project': 'Total project / initial engagement budget', 'monthly': 'Monthly budget for an ongoing engagement'}
WIZARD_EXPORT_FIELDS = [('other_requirement', 'Other Requirement'), ('project_stage', 'Project Stage'), ('start_timeline', 'Expected Start Timeline'), ('budget_type', 'Budget Type'), ('budget_status', 'Budget Status')]


def wizard_export_values(doc):
    return [BUDGET_TYPE_LABELS.get(doc.get(key), '') if key == 'budget_type' else doc.get(key, '') for key, _ in WIZARD_EXPORT_FIELDS]


class AIConsultingWizardEnquiry(BaseModel):
    model_config = ConfigDict(extra='forbid', str_strip_whitespace=True)
    fullName: str = Field(min_length=1, max_length=200)
    workEmail: EmailStr
    company: str = Field(min_length=1, max_length=200)
    phone: Optional[str] = Field(default=None, max_length=40)
    jobTitle: Optional[str] = Field(default=None, max_length=200)
    country: Optional[str] = Field(default=None, max_length=100)
    city: Optional[str] = Field(default=None, max_length=200)
    privacy: bool
    marketing: bool = False
    services: List[WizardService] = Field(min_length=1, max_length=10)
    otherRequirement: str = Field(default='', max_length=1000, validate_default=True)
    requirement: str = Field(min_length=1, max_length=5000)
    stage: Literal['Exploring options', 'Requirements defined', 'Planning a proof of concept or pilot', 'Development in progress', 'Improving an existing system', 'Ready for deployment', 'Other']
    timeline: Literal['Within 30 days', '1–3 months', '3–6 months', 'More than 6 months', 'No fixed start date yet']
    budgetType: Literal['project', 'monthly']
    estimatedBudget: str
    budgetStatus: Literal['Budget approved and available', 'Budget proposed — approval pending', 'Need a scoped proposal to secure approval', 'No budget available currently', 'I do not know the budget status yet']

    @field_validator('phone', 'jobTitle', 'country', 'city', mode='before')
    @classmethod
    def optional_text(cls, value):
        return (value.strip() or None) if isinstance(value, str) else value

    @field_validator('phone')
    @classmethod
    def valid_phone(cls, value):
        if value and (not re.fullmatch(r'[+()\d\s.-]+', value) or not 6 <= len(re.sub(r'\D', '', value)) <= 15):
            raise ValueError('Please enter a valid phone number.')
        return value

    @field_validator('privacy')
    @classmethod
    def privacy_required(cls, value):
        if not value:
            raise ValueError('Please agree to the Privacy Policy to continue.')
        return value

    @field_validator('services')
    @classmethod
    def exclusive_guidance(cls, value):
        value = list(dict.fromkeys(value))
        if 'Not sure — I need guidance' in value and len(value) != 1:
            raise ValueError('Please select guidance on its own.')
        return value

    @field_validator('otherRequirement')
    @classmethod
    def conditional_other(cls, value, info: ValidationInfo):
        if 'Other' in info.data.get('services', []):
            if not value:
                raise ValueError('Please specify your requirement.')
            return value
        return ''

    @field_validator('estimatedBudget')
    @classmethod
    def correct_budget_range(cls, value, info: ValidationInfo):
        options = {'project': PROJECT_BUDGETS, 'monthly': MONTHLY_BUDGETS}.get(info.data.get('budgetType'), [])
        if value not in options:
            raise ValueError('Please select a valid estimate for this budget type.')
        return value