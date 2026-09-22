from typing import List, Literal, Optional
import re
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

AIService = Literal['AI strategy', 'Generative AI', 'AI agents', 'Custom AI models', 'AI integration', 'Not sure yet']
CONSULTATION_BUDGETS = {f'{currency} {value}' for currency in ('₹', '$', '€') for value in ('Under 10,000', '10,000–50,000', '50,000–100,000', '100,000–500,000', '500,000+')}


class AIConsultationEnquiry(BaseModel):
    model_config = ConfigDict(extra='forbid', str_strip_whitespace=True)
    fullName: str = Field(min_length=1, max_length=200)
    workEmail: EmailStr
    company: str = Field(min_length=1, max_length=200)
    services: List[AIService] = Field(min_length=1, max_length=6)
    phone: Optional[str] = Field(default=None, max_length=40)
    jobTitle: Optional[str] = Field(default=None, max_length=200)
    country: Optional[str] = Field(default=None, max_length=100)
    city: Optional[str] = Field(default=None, max_length=200)
    budget: Optional[str] = None
    description: Optional[str] = Field(default=None, max_length=5000)
    privacy: bool
    marketing: bool = False

    @field_validator('phone', 'jobTitle', 'country', 'city', 'budget', 'description', mode='before')
    @classmethod
    def empty_to_none(cls, value):
        return (value.strip() or None) if isinstance(value, str) else value

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, value):
        if value and (not re.fullmatch(r'[+()\d\s.-]+', value) or not 6 <= len(re.sub(r'\D', '', value)) <= 15):
            raise ValueError('Please enter a valid phone number')
        return value

    @field_validator('budget')
    @classmethod
    def validate_budget(cls, value):
        if value is not None and value not in CONSULTATION_BUDGETS:
            raise ValueError('Please choose a valid budget')
        return value

    @field_validator('privacy')
    @classmethod
    def require_privacy(cls, value):
        if not value:
            raise ValueError('Privacy consent is required')
        return value

    @field_validator('services')
    @classmethod
    def unique_services(cls, value):
        return list(dict.fromkeys(value))


class ConsultationRecord(BaseModel):
    id: str
    full_name: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company_email: str
    company: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    budget: Optional[str] = None
    services: List[str] = Field(default_factory=list)
    service_requirements: Optional[dict[str, str]] = None
    form_variant: Optional[str] = None
    project_details: Optional[str] = None
    other_requirement: Optional[str] = None
    project_stage: Optional[str] = None
    start_timeline: Optional[str] = None
    budget_type: Optional[str] = None
    budget_status: Optional[str] = None
    website: Optional[str] = None
    initiative_role: Optional[str] = None
    other_role: Optional[str] = None
    country_code: Optional[str] = None
    phone_country: Optional[str] = None
    calling_code: Optional[str] = None
    contact_permission: Optional[bool] = None
    privacy_consent: Optional[bool] = None
    marketing_consent: bool = False
    source: Optional[str] = None
    status: str
    created_at: str
    updated_at: Optional[str] = None


class ConsultationPage(BaseModel):
    data: List[ConsultationRecord]
    total: int
    page: int
    limit: int
    totalPages: int