import logging
import re


class PrivacyFilter(logging.Filter):
    def filter(self, record):
        message = record.getMessage()
        message = re.sub(r'mongodb(?:\+srv)?://\S+', '[REDACTED_DATABASE_URI]', message)
        message = re.sub(r'[A-Za-z0-9.!#$%&\x27*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', '[REDACTED_EMAIL]', message)
        message = re.sub(r'(?i)(authorization|cookie|password|api[-_]?key|token)\s*[:=]\s*[^\s,;]+', r'\1=[REDACTED]', message)
        if record.levelno >= logging.WARNING and ':' in message and ('error' in message.lower() or 'failed' in message.lower()):
            message = message.split(':', 1)[0] + ': [sensitive details omitted]'
        record.msg, record.args = message, ()
        return True


def install_privacy_filter():
    for handler in logging.getLogger().handlers:
        handler.addFilter(PrivacyFilter())