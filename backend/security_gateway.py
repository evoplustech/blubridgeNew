"""Explicit method/access policy, bounded parsing and defensive HTTP handling."""
import asyncio
import hmac
import logging
import json
import os
import re
from collections import Counter
from urllib.parse import urlsplit

from fastapi import HTTPException
from starlette.requests import Request
from starlette.responses import JSONResponse, Response
from starlette.routing import Match
from security_sessions import ADMIN_COOKIE, FORM_COOKIE, principal_context

PUBLIC_GET = frozenset({'/api', '/api/', '/health', '/api/admin/session', '/api/form-context', '/api/blog/posts'})
PUBLIC_POST = frozenset({'/api/contact', '/api/contacts/submit', '/api/contact-us', '/api/contact-enquiries', '/api/project-enquiries', '/api/ai-consultation-enquiries', '/api/ai-consulting-enquiries', '/api/newsletter/subscribe', '/api/job-applications/submit'})
ALLOWED_HEADERS = frozenset({'content-type', 'x-csrf-token', 'x-bb-form-token', 'x-requested-with'})


def unique_json(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError('Duplicate JSON property')
        result[key] = value
    return result


def effective_routes(router):
    for route in router.routes:
        if hasattr(route, 'effective_route_contexts'):
            yield from route.effective_route_contexts()
        else:
            yield route


class SecurityGateway:
    def __init__(self, app, services, router):
        self.app, self.services, self.router = app, services, router

    async def __call__(self, scope, receive, send):
        if scope['type'] != 'http':
            return await self.app(scope, receive, send)
        request = Request(scope, receive=receive)
        path, method = request.url.path, request.method
        origin = request.headers.get('origin')
        allowed_origin = origin in self.services.origins
        reset = None
        response_started = False

        async def secure_send(message):
            nonlocal response_started
            if message['type'] == 'http.response.start':
                response_started = True
                headers = [(k, v) for k, v in message.get('headers', []) if k.lower() not in {b'server', b'x-powered-by'}]
                values = {
                    'x-content-type-options': 'nosniff', 'referrer-policy': 'strict-origin-when-cross-origin',
                    'permissions-policy': 'camera=(), microphone=(), geolocation=()', 'x-frame-options': 'DENY',
                    'content-security-policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
                    'cache-control': 'no-store', 'pragma': 'no-cache', 'cross-origin-resource-policy': 'same-site',
                }
                if os.environ['SECURITY_REQUIRE_HTTPS'] == 'true':
                    values['strict-transport-security'] = 'max-age=31536000'
                if allowed_origin:
                    values.update({'access-control-allow-origin': origin, 'access-control-allow-credentials': 'true', 'vary': 'Origin'})
                names = {key.encode() for key in values}
                message['headers'] = [(k, v) for k, v in headers if k.lower() not in names] + [(k.encode(), v.encode()) for k, v in values.items()]
            await send(message)

        try:
            if len(scope.get('raw_path', b'')) > 2048 or len(scope.get('query_string', b'')) > 4096:
                raise HTTPException(414, 'Request URI too long')
            if request.headers.get('content-encoding') or any(request.headers.get(h) for h in ('x-http-method-override', 'x-method-override', 'x-http-method')):
                raise HTTPException(400, 'Invalid request')
            counts = Counter(k.lower() for k, _ in scope['headers'])
            if any(counts[k] > 1 for k in (b'origin', b'authorization', b'cookie', b'content-length', b'content-type', b'x-csrf-token', b'x-bb-form-token')):
                raise HTTPException(400, 'Ambiguous headers')
            cookie_names = [part.strip().split('=', 1)[0] for part in request.headers.get('cookie', '').split(';') if '=' in part]
            if any(v > 1 for v in Counter(cookie_names).values()):
                raise HTTPException(400, 'Ambiguous cookies')

            matches = []
            for route in effective_routes(self.router):
                probe = dict(scope, method=request.headers.get('access-control-request-method', 'GET') if method == 'OPTIONS' else method)
                match, child = route.matches(probe)
                if match != Match.NONE:
                    matches.append((route, match, child))
            if not matches:
                raise HTTPException(404, 'Not found')
            allowed_methods = set().union(*(route.methods or set() for route, _, _ in matches))
            full = next(((r, c) for r, m, c in matches if m == Match.FULL), None)
            if method == 'OPTIONS':
                if not origin or not allowed_origin:
                    raise HTTPException(403, 'Origin not allowed')
                requested_headers = {v.strip().lower() for v in request.headers.get('access-control-request-headers', '').split(',') if v.strip()}
                if not full or not requested_headers <= ALLOWED_HEADERS:
                    raise HTTPException(405 if not full else 403, 'Preflight not allowed')
                return await Response(status_code=204, headers={'Access-Control-Allow-Methods': ', '.join(sorted(allowed_methods)), 'Access-Control-Allow-Headers': ', '.join(sorted(ALLOWED_HEADERS)), 'Access-Control-Max-Age': '600'})(scope, receive, secure_send)
            if method not in allowed_methods or not full:
                raise HTTPException(405, 'Method Not Allowed', headers={'Allow': ', '.join(sorted(allowed_methods))})
            route, child = full
            scope.update(child)
            scope['route'] = route
            if origin and not allowed_origin:
                raise HTTPException(403, 'Origin not allowed')
            if method not in ('GET', 'HEAD'):
                referer = request.headers.get('referer')
                if referer and not origin:
                    parsed = urlsplit(referer)
                    if f'{parsed.scheme}://{parsed.netloc}' not in self.services.origins:
                        raise HTTPException(403, 'Origin not allowed')
                # Cross-site is permitted only from an explicitly allowlisted origin; CSRF/form proofs still apply.
                if request.headers.get('sec-fetch-site') == 'cross-site' and not allowed_origin:
                    raise HTTPException(403, 'Request verification failed')

            query = request.query_params.multi_items()
            if len(query) != len({k for k, _ in query}):
                raise HTTPException(400, 'Duplicate query parameters')
            permitted = {field.alias for field in getattr(getattr(route, 'dependant', None), 'query_params', [])}
            for key, value in query:
                if key not in permitted or len(value) > 256 or any(ord(c) < 32 for c in value):
                    raise HTTPException(422, 'Invalid query parameter')
                if key in ('page', 'limit') and (not value.isdecimal() or not 1 <= int(value) <= (200 if key == 'limit' else 10000)):
                    raise HTTPException(422, 'Invalid pagination')
                if key in ('start_date', 'end_date') and not re.fullmatch(r'\d{4}-\d{2}-\d{2}', value):
                    raise HTTPException(422, 'Invalid date')
            for value in scope.get('path_params', {}).values():
                if not isinstance(value, str) or len(value) > 256 or any(ord(c) < 32 for c in value):
                    raise HTTPException(422, 'Invalid identifier')

            public = (method in ('GET', 'HEAD') and (path in PUBLIC_GET or route.path == '/api/blog/posts/{slug}')) or (method == 'POST' and (path in PUBLIC_POST or path == '/api/admin/login'))
            ip = self.services.client_ip(request)
            maximum = int(os.environ['SECURITY_ADMIN_RATE_LIMIT']) if not public else 60
            await self.services.limit(ip, 'authenticated' if not public else 'public-read', maximum)
            if not public:
                principal = await self.services.authenticate(request)
                reset = principal_context.set(principal)
                if method not in ('GET', 'HEAD'):
                    self.services.require_csrf(request)
                # Existing route guards consume only this server-derived header.
                scope['headers'] = [(k, v) for k, v in scope['headers'] if k.lower() != b'authorization'] + [(b'authorization', ('Bearer ' + request.cookies[ADMIN_COOKIE]).encode())]
            if path in PUBLIC_POST:
                await self.services.limit(ip, 'public-submit', int(os.environ['SECURITY_PUBLIC_RATE_LIMIT']))
                if path == '/api/job-applications/submit':
                    await self.services.limit(ip, 'uploads', 3)
                token = request.cookies.get(FORM_COOKIE, '')
                header_token = request.headers.get('x-bb-form-token', '')
                # Browsers that drop cross-site cookies still prove intent via an allowlisted Origin plus the signed token.
                paired = bool(token) and hmac.compare_digest(token, header_token)
                if not (paired or allowed_origin) or not self.services.check_context(header_token, 'form', min_age=0.5):
                    raise HTTPException(403, 'Form verification failed. Please try again.')

            chunks, total = [], 0
            cap = int(os.environ['SECURITY_UPLOAD_MAX_BYTES'] if path == '/api/job-applications/submit' else os.environ['SECURITY_JSON_MAX_BYTES'])
            while True:
                message = await asyncio.wait_for(receive(), timeout=15)
                if message['type'] == 'http.disconnect':
                    return
                data = message.get('body', b'')
                total += len(data)
                if total > cap:
                    raise HTTPException(413, 'Request too large')
                chunks.append(data)
                if not message.get('more_body', False):
                    break
            body = b''.join(chunks)
            if path in PUBLIC_POST and path != '/api/job-applications/submit' and request.headers.get('content-type', '').split(';')[0].strip().lower() != 'application/json':
                raise HTTPException(415, 'Expected application/json')
            if body:
                content_type = request.headers.get('content-type', '').split(';')[0].strip().lower()
                if path == '/api/job-applications/submit':
                    if content_type != 'multipart/form-data':
                        raise HTTPException(415, 'Expected multipart form data')
                elif content_type != 'application/json':
                    raise HTTPException(415, 'Expected application/json')
                else:
                    try:
                        parsed = json.loads(body, object_pairs_hook=unique_json, parse_constant=lambda x: (_ for _ in ()).throw(ValueError()))
                        if not isinstance(parsed, dict):
                            raise ValueError()
                    except (ValueError, UnicodeError, RecursionError):
                        raise HTTPException(400, 'Invalid JSON object')
                    if parsed and not getattr(getattr(route, 'dependant', None), 'body_params', []):
                        raise HTTPException(422, 'Unexpected request body')
            replayed = False

            async def replay():
                nonlocal replayed
                if not replayed:
                    replayed = True
                    return {'type': 'http.request', 'body': body, 'more_body': False}
                return await receive()

            if path == '/api/job-applications/submit' and body:
                parsed_request = Request(scope, receive=replay)
                form = await parsed_request.form(max_files=1, max_fields=12)
                try:
                    fields = form.multi_items()
                    names = [key for key, _ in fields]
                    allowed = {field.alias for field in route.dependant.body_params}
                    if len(names) != len(set(names)) or not set(names) <= allowed:
                        raise HTTPException(422, 'Unexpected or duplicate form fields')
                    if any(isinstance(value, str) and len(value) > 5000 for _, value in fields):
                        raise HTTPException(422, 'Form field too long')
                finally:
                    await form.close()
                replayed = False

            await self.app(scope, replay, secure_send)
            if not public and method not in ('GET', 'HEAD'):
                await self.services.audit('admin_operation', request, principal_context.get()['id'])
        except HTTPException as error:
            if error.status_code in (401, 403):
                await self.services.audit('access_denied', request, status=error.status_code)
            await JSONResponse({'detail': error.detail}, status_code=error.status_code, headers=error.headers)(scope, receive, secure_send)
        except Exception as error:
            logging.error('Request processing failed: %s', type(error).__name__)
            if not response_started:
                await JSONResponse({'detail': 'Unable to process request'}, status_code=500)(scope, receive, secure_send)
        finally:
            if reset is not None:
                principal_context.reset(reset)