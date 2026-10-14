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


# Personal / free mailbox providers that may not be used as a work email on the consulting enquiry forms.
# Configurable: mirror of frontend/src/pages/ai-consulting/personalEmailDomains.js
PERSONAL_EMAIL_DOMAINS = {
    # Google
    'gmail.com', 'googlemail.com', 'google.com',
    # Microsoft personal
    'outlook.com', 'outlook.in', 'outlook.co.uk', 'outlook.fr', 'outlook.de', 'outlook.es', 'outlook.it',
    'outlook.com.au', 'outlook.co.id', 'outlook.sa', 'outlook.jp', 'outlook.kr', 'outlook.dk', 'outlook.cl',
    'hotmail.com', 'hotmail.co.uk', 'hotmail.co.jp', 'hotmail.fr', 'hotmail.de', 'hotmail.it', 'hotmail.es',
    'hotmail.be', 'hotmail.nl', 'hotmail.ca', 'hotmail.com.au', 'hotmail.com.br', 'hotmail.com.ar',
    'live.com', 'live.co.uk', 'live.in', 'live.ca', 'live.com.au', 'live.fr', 'live.de', 'live.it', 'live.nl',
    'live.se', 'live.dk', 'live.no', 'live.jp', 'live.cn', 'msn.com', 'passport.com', 'windowslive.com',
    # Yahoo
    'yahoo.com', 'yahoo.co.uk', 'yahoo.co.in', 'yahoo.in', 'yahoo.co.jp', 'yahoo.co.id', 'yahoo.co.nz',
    'yahoo.com.au', 'yahoo.com.br', 'yahoo.com.mx', 'yahoo.com.ar', 'yahoo.com.sg', 'yahoo.com.hk',
    'yahoo.com.ph', 'yahoo.com.tw', 'yahoo.com.vn', 'yahoo.com.tr', 'yahoo.de', 'yahoo.fr', 'yahoo.it',
    'yahoo.es', 'yahoo.se', 'yahoo.dk', 'yahoo.no', 'yahoo.fi', 'yahoo.nl', 'yahoo.be', 'yahoo.pl',
    'yahoo.gr', 'yahoo.ie', 'yahoo.ca', 'ymail.com', 'rocketmail.com', 'yahoogroups.com',
    # Apple
    'icloud.com', 'me.com', 'mac.com',
    # AOL / Verizon
    'aol.com', 'aol.co.uk', 'aol.de', 'aol.fr', 'aim.com', 'verizon.net', 'netscape.net',
    # Proton
    'protonmail.com', 'protonmail.ch', 'proton.me', 'pm.me',
    # GMX / Mail.com family
    'gmx.com', 'gmx.de', 'gmx.net', 'gmx.at', 'gmx.ch', 'gmx.co.uk', 'gmx.fr', 'gmx.es',
    'mail.com', 'email.com', 'usa.com', 'consultant.com', 'europe.com', 'post.com', 'writeme.com',
    # Yandex / Mail.ru / other CIS
    'yandex.com', 'yandex.ru', 'yandex.by', 'yandex.kz', 'ya.ru', 'mail.ru', 'inbox.ru', 'bk.ru',
    'list.ru', 'internet.ru', 'rambler.ru',
    # Zoho personal
    'zoho.com', 'zohomail.com', 'zoho.in', 'zoho.eu',
    # India / regional ISPs and free providers
    'rediffmail.com', 'rediff.com', 'indiatimes.com', 'in.com', 'sify.com', 'vsnl.net', 'vsnl.com',
    'bsnl.in', 'airtelmail.in', 'yopmail.com',
    # Asia-Pacific free providers
    'qq.com', 'foxmail.com', '163.com', '126.com', 'sina.com', 'sina.cn', 'sohu.com', 'aliyun.com',
    '21cn.com', 'naver.com', 'hanmail.net', 'daum.net', 'nate.com', 'docomo.ne.jp', 'ezweb.ne.jp',
    'softbank.ne.jp', 'nifty.com', 'excite.co.jp',
    # Europe / Americas free providers and ISP mailboxes
    'web.de', 't-online.de', 'freenet.de', 'arcor.de', 'orange.fr', 'wanadoo.fr', 'free.fr', 'sfr.fr',
    'laposte.net', 'libero.it', 'virgilio.it', 'alice.it', 'tiscali.it', 'tin.it', 'terra.com',
    'terra.com.br', 'uol.com.br', 'bol.com.br', 'ig.com.br', 'globo.com', 'telefonica.net',
    'seznam.cz', 'centrum.cz', 'wp.pl', 'o2.pl', 'onet.pl', 'interia.pl', 'abv.bg', 'mynet.com',
    'comcast.net', 'sbcglobal.net', 'att.net', 'bellsouth.net', 'cox.net', 'charter.net', 'earthlink.net',
    'juno.com', 'optonline.net', 'roadrunner.com', 'rogers.com', 'shaw.ca', 'sympatico.ca', 'telus.net',
    'btinternet.com', 'sky.com', 'virginmedia.com', 'talktalk.net', 'ntlworld.com', 'blueyonder.co.uk',
    'bigpond.com', 'bigpond.net.au', 'optusnet.com.au', 'iinet.net.au', 'xtra.co.nz',
    # Disposable / throwaway
    'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com', 'temp-mail.org',
    'trashmail.com', 'throwawaymail.com', 'getnada.com', 'sharklasers.com', 'dispostable.com',
    'fakeinbox.com', 'maildrop.cc', 'mailnesia.com', 'tutanota.com', 'tutanota.de', 'tuta.io',
}

PERSONAL_EMAIL_MESSAGE = ('Please enter your company email address. Personal email providers such as '
                          'Gmail, Yahoo, and Outlook are not allowed.')


def is_personal_email_domain(domain):
    labels = domain.strip().lower().rstrip('.').split('.')
    return any('.'.join(labels[index:]) in PERSONAL_EMAIL_DOMAINS for index in range(len(labels)))


def work_email(value):
    """Company email addresses only; personal mailbox providers are rejected server-side."""
    email = (value or '').strip()
    if is_personal_email_domain(email.rpartition('@')[2]):
        raise ValueError(PERSONAL_EMAIL_MESSAGE)
    return email
