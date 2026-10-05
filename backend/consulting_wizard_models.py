import re
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
    # consulting-3 / consulting-4 are short page variants (see validators below); fullName is always sent.
    formVariant: Optional[Literal['ai-consulting-4', 'ai-consulting-5', 'consulting-3', 'consulting-4', 'consulting-5']] = None
    firstName: Optional[str] = Field(default=None, max_length=120)
    lastName: Optional[str] = Field(default=None, max_length=120)
    fullName: str = Field(min_length=1, max_length=200)
    workEmail: EmailStr
    # Required on every form except consulting-4 (enforced by validators below).
    company: Optional[str] = Field(default=None, max_length=200, validate_default=True)
    jobTitle: Optional[str] = Field(default=None, max_length=200, validate_default=True)
    website: Optional[str] = Field(default=None, max_length=2048)
    countryCode: Optional[str] = Field(default=None, max_length=2, validate_default=True)
    country: Optional[str] = Field(default=None, max_length=150, validate_default=True)
    phoneCountry: Optional[str] = Field(default=None, max_length=2, validate_default=True)
    phone: Optional[str] = Field(default=None, max_length=40, validate_default=True)
    # Retain optional legacy values without requiring them on current forms.
    initiativeRole: Optional[Literal['Final decision-maker / approver', 'Part of the decision-making team', 'Technical evaluator / recommender', 'Procurement / purchasing', 'Researching on behalf of a decision-maker', 'Other']] = None
    otherRole: Optional[str] = Field(default=None, max_length=200)
    contactPermission: bool
    # Required on every form except consulting-5 (enforced below).
    services: List[WizardService] = Field(default_factory=list, max_length=10, validate_default=True)
    serviceRequirements: Optional[Dict[str, Annotated[str, Field(max_length=5000)]]] = Field(default=None, max_length=9, validate_default=True)
    otherRequirement: str = Field(default='', max_length=1000, validate_default=True)
    requirement: str = Field(default='', max_length=5000, validate_default=True)
    # Required for every form except the short consulting-3 variant (enforced below).
    stage: Optional[Literal['Exploring options', 'Requirements defined', 'Planning a proof of concept or pilot', 'Development in progress', 'Improving an existing system', 'Ready for deployment', 'Other']] = Field(default=None, validate_default=True)
    timeline: Optional[Literal['Within 30 days', '1–3 months', '3–6 months', 'More than 6 months', 'No fixed start date yet']] = Field(default=None, validate_default=True)
    budgetType: Optional[Literal['project', 'monthly']] = Field(default=None, validate_default=True)
    estimatedBudget: Optional[str] = Field(default=None, validate_default=True)
    budgetStatus: Optional[Literal['Budget approved and available', 'Budget proposed — approval pending', 'Need a scoped proposal to secure approval', 'No budget available currently', 'I do not know the budget status yet']] = Field(default=None, validate_default=True)
    # consulting-4 fields (optional on the server for every other form)
    projectBudget: Optional[Literal['Less than $10k', '$10k - $50k', '$50k - $100k', '$100k+', 'Not sure yet']] = Field(default=None, validate_default=True)
    ndaFirst: Optional[bool] = None
    # Up to two uploads from /api/ai-consulting-attachments (one file + one voice message)
    attachmentIds: Optional[List[Annotated[str, Field(pattern=r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$')]]] = Field(default=None, max_length=2)

    # consulting-5 fields (optional on the server for every other form)
    referralSource: Optional[Literal['Google search', 'LinkedIn', 'Referral', 'Social media', 'Event or conference', 'Other']] = Field(default=None, validate_default=True)
    budgetMin: Optional[int] = Field(default=None, ge=10, le=500, validate_default=True)  # in $k
    budgetMax: Optional[int] = Field(default=None, ge=10, le=500, validate_default=True)  # in $k

    @field_validator('services')
    @classmethod
    def services_unless_consulting5(cls, value, info: ValidationInfo):
        if not value and info.data.get('formVariant') != 'consulting-5':
            raise ValueError('List should have at least 1 item after validation, not 0')
        return value

    @field_validator('referralSource')
    @classmethod
    def referral_for_consulting5(cls, value, info: ValidationInfo):
        if value is None and info.data.get('formVariant') == 'consulting-5':
            raise ValueError('Please tell us how you heard about us.')
        return value

    @field_validator('budgetMin', 'budgetMax')
    @classmethod
    def budget_range_for_consulting5(cls, value, info: ValidationInfo):
        if info.data.get('formVariant') != 'consulting-5':
            return value
        if value is None:
            raise ValueError('Please define your budget range.')
        if value % 5:
            raise ValueError('Budget must be in steps of $5k.')
        if info.field_name == 'budgetMax' and info.data.get('budgetMin') is not None and value < info.data['budgetMin']:
            raise ValueError('Maximum budget cannot be less than the minimum.')
        return value

    @field_validator('stage', 'timeline', 'budgetType', 'budgetStatus')
    @classmethod
    def required_unless_short_form(cls, value, info: ValidationInfo):
        if value is None and info.data.get('formVariant') not in ('consulting-3', 'consulting-4', 'consulting-5'):
            raise ValueError('Field required')
        return value

    @field_validator('projectBudget')
    @classmethod
    def budget_for_consulting4(cls, value, info: ValidationInfo):
        if value is None and info.data.get('formVariant') == 'consulting-4':
            raise ValueError('Please select a project budget.')
        return value

    @field_validator('company', 'jobTitle', 'country')
    @classmethod
    def required_text_unless_consulting4(cls, value, info: ValidationInfo):
        if not value:
            variant = info.data.get('formVariant')
            if variant == 'consulting-4' or (variant == 'consulting-5' and info.field_name != 'company'):
                return None
            raise ValueError('Field required')
        return value

    @field_validator('countryCode', 'phoneCountry')
    @classmethod
    def valid_country(cls, value, info: ValidationInfo):
        if not value and info.data.get('formVariant') in ('consulting-4', 'consulting-5'):
            return None
        if not value:
            raise ValueError('Field required')
        return country_code(value)

    @field_validator('website')
    @classmethod
    def valid_website(cls, value):
        return website_url(value)

    @field_validator('phone')
    @classmethod
    def valid_phone(cls, value, info: ValidationInfo):
        if info.data.get('formVariant') in ('consulting-4', 'consulting-5'):
            # Optional, no country selector on that page: accept a plain international number.
            if not value:
                return None
            if not re.fullmatch(r'[+\d\s().-]{6,40}', value) or not 6 <= len(re.sub(r'\D', '', value)) <= 15:
                raise ValueError('Please enter a valid phone number.')
            return value
        if not value:
            raise ValueError('Field required')
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
        if info.data.get('formVariant') in ('consulting-4', 'consulting-5'):
            if not value:
                raise ValueError('Please describe your challenge or goal.' if info.data.get('formVariant') == 'consulting-4' else 'Please tell us how we can help.')
            return value
        short_form = info.data.get('formVariant') == 'consulting-3'  # project text is optional there
        if not per_service and not short_form and 'Other' in info.data.get('services', []) and not value:
            raise ValueError('Please tell us about your requirement.')
        return value

    @field_validator('estimatedBudget')
    @classmethod
    def correct_budget_range(cls, value, info: ValidationInfo):
        if value is None and info.data.get('formVariant') in ('consulting-3', 'consulting-4', 'consulting-5'):
            return value
        options = {'project': PROJECT_BUDGETS, 'monthly': MONTHLY_BUDGETS}.get(info.data.get('budgetType'), [])
        if value not in options:
            raise ValueError('Please select a valid estimate for this budget type.')
        return value