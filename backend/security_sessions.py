"""Server-authoritative administrator sessions; no browser-readable bearer credentials."""
import asyncio
import hashlib
import hmac
import ipaddress
import os
import secrets
import time
import uuid
from urllib.parse import urlsplit
from contextvars import ContextVar
from datetime import datetime, timedelta, timezone

import bcrypt
from fastapi import HTTPException
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError

principal_context = ContextVar('security_principal', default=None)
ADMIN_COOKIE = '__Host-bb-admin'
GUEST_COOKIE = '__Host-bb-csrf'
FORM_COOKIE = '__Host-bb-form'


def now_utc():
    return datetime.now(timezone.utc)


def token_hash(token):
    return hashlib.sha256(token.encode()).hexdigest()


def hash_password(password):
    if not 12 <= len(password) or len(password.encode()) > 72:
        raise HTTPException(400, 'Password must be at least 12 characters and at most 72 UTF-8 bytes')
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12)).decode()


def verify_password(password, encoded):
    try:
        return len(password.encode()) <= 72 and bcrypt.checkpw(password.encode(), encoded.encode())
    except (ValueError, TypeError):
        return False


def verify_admin_token(token):
    principal = principal_context.get()
    return bool(principal and principal['role'] == 'admin' and token and hmac.compare_digest(principal['session_id'], token_hash(token)))


class SecurityServices:
    def __init__(self, database):
        self.db = database
        self.key = os.environ['SECURITY_AUDIT_KEY'].encode()
        self.origins = frozenset(x.strip().rstrip('/') for x in os.environ['SECURITY_ALLOWED_ORIGINS'].split(',') if x.strip())
        if not self.origins or '*' in self.origins or any(not x.startswith('https://') for x in self.origins):
            raise RuntimeError('Explicit HTTPS security origins are required')
        self.trusted_proxies = tuple(ipaddress.ip_network(x.strip()) for x in os.environ['SECURITY_TRUSTED_PROXY_CIDRS'].split(',') if x.strip())
        self.idle = int(os.environ['SECURITY_SESSION_IDLE_SECONDS'])
        self.absolute = int(os.environ['SECURITY_SESSION_ABSOLUTE_SECONDS'])
        self.dummy_hash = bcrypt.hashpw(secrets.token_bytes(32).hex().encode(), bcrypt.gensalt(rounds=12)).decode()

    def fingerprint(self, value):
        return hmac.new(self.key, value.encode(), hashlib.sha256).hexdigest()

    def client_ip(self, request):
        peer = request.client.host if request.client else 'unknown'
        try:
            address = ipaddress.ip_address(peer)
            if not any(address in network for network in self.trusted_proxies):
                return str(address)
            chain = request.headers.get('x-forwarded-for', '').split(',') + [peer]
            for value in reversed(chain):
                address = ipaddress.ip_address(value.strip())
                if not any(address in network for network in self.trusted_proxies):
                    return str(address)
            return peer
        except ValueError:
            return peer

    async def limit(self, identity, category, maximum, seconds=60):
        slot = int(time.time()) // seconds
        identifier = self.fingerprint(f'{category}:{identity}:{slot}')
        row = await self.db.security_rate_limits.find_one_and_update(
            {'_id': identifier}, {'$inc': {'count': 1}, '$setOnInsert': {'expires_at': now_utc() + timedelta(seconds=seconds * 2)}},
            upsert=True, return_document=ReturnDocument.AFTER, projection={'_id': 0, 'count': 1})
        if row['count'] > maximum:
            raise HTTPException(429, 'Too many requests. Please try again later.', headers={'Retry-After': str(seconds)})

    async def audit(self, event, request, actor=None, status=None):
        try:
            origin_parts = urlsplit(request.headers.get('origin', ''))
            origin_site = f'{origin_parts.scheme}://{origin_parts.hostname}' if origin_parts.scheme in ('https', 'http') and origin_parts.hostname else None
        except ValueError:
            origin_site = None
        await self.db.security_events.insert_one({
            'id': str(uuid.uuid4()), 'event': event, 'actor': actor,
            'method': request.method, 'route': getattr(request.scope.get('route'), 'path', 'unmatched'),
            'status': status, 'network': self.fingerprint(self.client_ip(request)),
            'origin_fingerprint': self.fingerprint(request.headers.get('origin', '')),
            'origin_allowed': request.headers.get('origin') in self.origins,
            'origin_site': origin_site,
            'created_at': now_utc(), 'expires_at': now_utc() + timedelta(days=int(os.environ['SECURITY_AUDIT_RETENTION_DAYS'])),
        })

    def signed_context(self, purpose):
        data = f'{secrets.token_urlsafe(24)}.{int(time.time())}'
        return f'{data}.{self.fingerprint(purpose + ":" + data)}'

    def check_context(self, token, purpose, min_age=0):
        try:
            nonce, timestamp, signature = token.split('.')
            age = time.time() - int(timestamp)
            valid = 0 <= age <= 1800 and age >= min_age and len(nonce) >= 24
            return valid and hmac.compare_digest(signature, self.fingerprint(f'{purpose}:{nonce}.{timestamp}'))
        except (ValueError, AttributeError):
            return False

    def csrf_for(self, token):
        return self.fingerprint('csrf:' + token)

    def cookie(self, response, name, value, seconds):
        # SameSite=None is required because the approved frontend origin is a separate host.
        response.set_cookie(name, value, secure=True, httponly=True, samesite='none', path='/', max_age=seconds)

    async def authenticate(self, request):
        token = request.cookies.get(ADMIN_COOKIE, '')
        if not 32 <= len(token) <= 128:
            raise HTTPException(401, 'Not authenticated')
        now = now_utc()
        session = await self.db.admin_sessions.find_one({
            'id': token_hash(token), 'expires_at': {'$gt': now}, 'last_seen': {'$gt': now - timedelta(seconds=self.idle)}
        }, {'_id': 0})
        if not session:
            raise HTTPException(401, 'Not authenticated')
        account = await self.db.admin_settings.find_one({'type': 'credentials', 'auth_id': session['user_id']}, {'_id': 0})
        if not account or account.get('disabled') or account.get('auth_version') != session['auth_version']:
            raise HTTPException(401, 'Not authenticated')
        if account.get('role') != 'admin':
            raise HTTPException(403, 'Access denied')
        await self.db.admin_sessions.update_one({'id': session['id']}, {'$set': {'last_seen': now}})
        return {'id': account['auth_id'], 'username': account['username'], 'role': account['role'], 'session_id': session['id'], 'auth_version': account['auth_version']}

    def require_csrf(self, request):
        token = request.cookies.get(ADMIN_COOKIE) or request.cookies.get(GUEST_COOKIE)
        if not token or not hmac.compare_digest(request.headers.get('x-csrf-token', ''), self.csrf_for(token)):
            raise HTTPException(403, 'Request verification failed')
        if not request.cookies.get(ADMIN_COOKIE) and not self.check_context(token, 'guest'):
            raise HTTPException(403, 'Request verification failed')

    async def login(self, credentials, request, response):
        self.require_csrf(request)
        ip = self.client_ip(request)
        await self.limit(ip, 'login-network', 5, 900)
        await self.limit(credentials.username.casefold(), 'login-account', 10, 900)
        account = await self.db.admin_settings.find_one({'type': 'credentials', 'username': credentials.username}, {'_id': 0})
        encoded = account.get('passwordHash', self.dummy_hash) if account else self.dummy_hash
        matched = await asyncio.to_thread(verify_password, credentials.password, encoded)
        if not matched or not account or account.get('disabled') or account.get('role') != 'admin':
            await self.audit('login_denied', request, status=401)
            raise HTTPException(401, 'Invalid credentials')
        old = request.cookies.get(ADMIN_COOKIE)
        if old:
            await self.db.admin_sessions.delete_one({'id': token_hash(old)})
        token = secrets.token_urlsafe(48)
        now = now_utc()
        session = {'id': token_hash(token), 'user_id': account['auth_id'], 'auth_version': account['auth_version'], 'created_at': now, 'last_seen': now, 'expires_at': now + timedelta(seconds=self.absolute)}
        await self.db.admin_sessions.insert_one(session)
        self.cookie(response, ADMIN_COOKIE, token, self.absolute)
        await self.audit('login_succeeded', request, account['auth_id'], 200)
        return {'message': 'Login successful', 'csrfToken': self.csrf_for(token)}

    async def reserve_submission(self, email, category):
        now = now_utc()
        identifier = self.fingerprint('submission:' + category + ':' + email.strip().casefold())
        try:
            await self.db.security_submission_claims.update_one(
                {'_id': identifier, 'expires_at': {'$lte': now}},
                {'$set': {'expires_at': now + timedelta(seconds=60)}}, upsert=True)
        except DuplicateKeyError:
            raise HTTPException(409, 'A similar submission was recently received. Please wait before submitting again.')

    async def initialize(self):
        await self.db.admin_sessions.create_index('id', unique=True)
        await self.db.admin_sessions.create_index('expires_at', expireAfterSeconds=0)
        await self.db.security_rate_limits.create_index('expires_at', expireAfterSeconds=0)
        await self.db.security_events.create_index('expires_at', expireAfterSeconds=0)
        await self.db.security_submission_claims.create_index('expires_at', expireAfterSeconds=0)