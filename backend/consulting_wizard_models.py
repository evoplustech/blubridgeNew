import json
from typing import Annotated, Dict, List, Literal, Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field, ValidationInfo, field_validator
from enquiry_contact_validation import country_code, normalise_phone, website_url
from consulting_service_requirements import validate_service_requirements

WizardService = Literal['AI Consulting & Technical Advisory', 'Custom AI & Model Development', 'Generative AI, LLM & RAG Systems', 'AI Agents & Automation', 'Model Training & Fine-Tuning', 'GPU & AI Systems Optimisation', 'Deployment & Integration', 'Maintenance & Support', 'Not sure — I need guidance', 'Other']
PROJECT_BUDGETS = ['Below $10,000', '$10,000–$24,999', '$25,000–$49,999', '$50,000–$99,999', '$100,000–$249,999', '$250,000 or more', 'Budget not yet defined']
MONTHLY_BUDGETS = ['Below $5,000 per month', '$5,000–$9,999 per month', '$10,000–$24,999 per month', '$25,000–$49,999 per month', '$50,000 or more per month', 'Budget not yet defined']
BUDGET_TYPE_LABELS = {'project': 'Total project / initial engagement budget', 'monthly': 'Monthly budget for an ongoing engagement'}
WIZARD_EXPORT_FIELDS = [('other_requirement', 'Other Requirement'), ('project_stage', 'Project Stage'), ('start_timeline', 'Expected Start Timeline'), ('budget_type', 'Budget Type'), ('budget_status', 'Budget Status'), ('website', 'Company Website'), ('initiative_role', 'Role In Initiative'), ('other_role', 'Other Role'), ('country_code', 'Country Code'), ('phone_country', 'Phone Country'), ('calling_code', 'Calling Code'), ('contact_permission', 'Contact Permission')]
WIZARD_EXPORT_FIELDS.append(('service_requirements', 'Service Requirements'))


def wizard_export_values(doc):
    values = []
    for key, _ in WIZARD_EXPORT_FIELDS:
        value = doc.get(key, '')
        if key == 'budget_type':
            value = BUDGET_TYPE_LABELS.get(value, '')
        elif key == 'contact_permission':
            value = '' if doc.get(key) is None else 'Yes' if doc[key] else 'No'
        elif key == 'service_requirements':
            value = json.dumps(value, ensure_ascii=False) if value else ''
        values.append(value)
    return values


class AIConsultingWizardEnquiry(BaseModel):
    model_config = ConfigDict(extra='forbid', str_strip_whitespace=True)
    # consulting-3 form variant: optional split name fields (fullName is still sent).
    formVariant: Optional[Literal['ai-consulting-4', 'ai-consulting-5', 'consulting-3']] = None
    firstName: Optional[str] = Field(default=None, max_length=120)
    lastName: Optional[str] = Field(default=None, max_length=120)
    fullName: str = Field(min_length=1, max_length=200)
    workEmail: EmailStr
    company: str = Field(min_length=1, max_length=200)
    jobTitle: str = Field(min_length=1, max_length=200)
    website: Optional[str] = Field(default=None, max_length=2048)
    countryCode: str = Field(min_length=2, max_length=2)
    country: str = Field(min_length=1, max_length=150)
    phoneCountry: str = Field(min_length=2, max_length=2)
    phone: str = Field(min_length=1, max_length=40)
    # Retain optional legacy values without requiring them on current forms.
    initiativeRole: Optional[Literal['Final decision-maker / approver', 'Part of the decision-making team', 'Technical evaluator / recommender', 'Procurement / purchasing', 'Researching on behalf of a decision-maker', 'Other']] = None
    otherRole: Optional[str] = Field(default=None, max_length=200)
    contactPermission: bool
    services: List[WizardService] = Field(min_length=1, max_length=10)
    serviceRequirements: Optional[Dict[str, Annotated[str, Field(max_length=5000)]]] = Field(default=None, max_length=9, validate_default=True)
    otherRequirement: str = Field(default='', max_length=1000, validate_default=True)
    requirement: str = Field(default='', max_length=5000, validate_default=True)
    # Required for every form except the short consulting-3 variant (enforced below).
    stage: Optional[Literal['Exploring options', 'Requirements defined', 'Planning a proof of concept or pilot', 'Development in progress', 'Improving an existing system', 'Ready for deployment', 'Other']] = Field(default=None, validate_default=True)
    timeline: Optional[Literal['Within 30 days', '1–3 months', '3–6 months', 'More than 6 months', 'No fixed start date yet']] = Field(default=None, validate_default=True)
    budgetType: Optional[Literal['project', 'monthly']] = Field(default=None, validate_default=True)
    estimatedBudget: Optional[str] = Field(default=None, validate_default=True)
    budgetStatus: Optional[Literal['Budget approved and available', 'Budget proposed — approval pending', 'Need a scoped proposal to secure approval', 'No budget available currently', 'I do not know the budget status yet']] = Field(default=None, validate_default=True)

    @field_validator('stage', 'timeline', 'budgetType', 'budgetStatus')
    @classmethod
    def required_unless_short_form(cls, value, info: ValidationInfo):
        if value is None and info.data.get('formVariant') != 'consulting-3':
            raise ValueError('Field required')
        return value

    @field_validator('countryCode', 'phoneCountry')
    @classmethod
    def valid_country(cls, value):
        return country_code(value)

    @field_validator('website')
    @classmethod
    def valid_website(cls, value):
        return website_url(value)

    @field_validator('phone')
    @classmethod
    def valid_phone(cls, value, info: ValidationInfo):
        return normalise_phone(value, info.data.get('phoneCountry'))

    @field_validator('contactPermission')
    @classmethod
    def permission_required(cls, value):
        if not value:
            raise ValueError('Please give permission for BluBridge to contact you regarding this enquiry.')
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
        # Legacy clients may still supply this field. Current forms use the
        # single `requirement` textarea, required only for Other services.
        return value if 'Other' in info.data.get('services', []) else ''

    @field_validator('serviceRequirements')
    @classmethod
    def per_service_requirements(cls, value, info: ValidationInfo):
        return validate_service_requirements(value, info.data.get('services', []), info.data.get('formVariant') in ('ai-consulting-4', 'ai-consulting-5'))

    @field_validator('requirement')
    @classmethod
    def conditional_requirement(cls, value, info: ValidationInfo):
        per_service = info.data.get('formVariant') in ('ai-consulting-4', 'ai-consulting-5') or info.data.get('serviceRequirements') is not None
        short_form = info.data.get('formVariant') == 'consulting-3'  # project text is optional there
        if not per_service and not short_form and 'Other' in info.data.get('services', []) and not value:
            raise ValueError('Please tell us about your requirement.')
        return value

    @field_validator('estimatedBudget')
    @classmethod
    def correct_budget_range(cls, value, info: ValidationInfo):
        if value is None and info.data.get('formVariant') == 'consulting-3':
            return value
        options = {'project': PROJECT_BUDGETS, 'monthly': MONTHLY_BUDGETS}.get(info.data.get('budgetType'), [])
        if value not in options:
            raise ValueError('Please select a valid estimate for this budget type.')
        return value