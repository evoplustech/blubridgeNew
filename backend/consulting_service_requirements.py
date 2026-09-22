from pydantic import ValidationError
from pydantic_core import PydanticCustomError


def requirement_key(service):
    return 'AI Performance Optimization' if service == 'GPU & AI Systems Optimisation' else service


def validate_service_requirements(value, services, required):
    if value is None and not required:
        return None
    requirements = value or {}
    selected_keys = [requirement_key(service) for service in services]
    errors = []
    for key in selected_keys:
        if not requirements.get(key, '').strip():
            errors.append({'type': PydanticCustomError('service_requirement_required', 'Please tell us about your requirement.'), 'loc': (key,), 'input': requirements.get(key)})
    for key in requirements:
        if key not in selected_keys:
            errors.append({'type': PydanticCustomError('unselected_service_requirement', 'Requirements can only be supplied for selected services.'), 'loc': (key,), 'input': requirements[key]})
    if errors:
        raise ValidationError.from_exception_data('ServiceRequirements', errors)
    return {key: requirements[key].strip() for key in selected_keys}


def service_requirements_summary(requirements):
    return '\n\n'.join(f'{service}:\n{value}' for service, value in requirements.items())