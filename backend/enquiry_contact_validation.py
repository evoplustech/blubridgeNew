import re
from urllib.parse import urlsplit
import phonenumbers
import pycountry
from pydantic import HttpUrl, TypeAdapter

COUNTRY_CODES = {country.alpha_2 for country in pycountry.countries} | {'AC', 'TA', 'XK'}
PHONE_REGIONS = {'AQ': 'NF', 'BV': 'NO', 'TF': 'RE', 'HM': 'NF', 'PN': 'NZ', 'GS': 'FK', 'UM': 'US'}


def country_code(value):
    value = value.upper()
    if value not in COUNTRY_CODES:
        raise ValueError('Please select a valid country / region.')
    return value


def normalise_phone(value, region):
    try:
        region = PHONE_REGIONS.get(region, region)
        if not re.fullmatch(r'[+()\d\s.-]+', value):
            raise ValueError()
        phone = phonenumbers.parse(value, region)
        if not phonenumbers.is_possible_number(phone) or phone.country_code != phonenumbers.country_code_for_region(region):
            raise ValueError()
        return phonenumbers.format_number(phone, phonenumbers.PhoneNumberFormat.E164)
    except (ValueError, phonenumbers.NumberParseException):
        raise ValueError('Please enter a valid phone number for the selected calling code.')


def website_url(value):
    if value is None or not value.strip():
        return None
    value = value.strip()
    try:
        TypeAdapter(HttpUrl).validate_python(value)
        if '.' not in (urlsplit(value).hostname or ''):
            raise ValueError()
    except ValueError:
        raise ValueError('Please enter a valid website URL, including https://.')
    return value