from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form, Depends, Response, Header, Request
from fastapi.responses import JSONResponse, FileResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone, timedelta
import httpx
import requests
import asyncio
import base64
import re
import secrets
import hashlib
import smtplib
import resend
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from collections import defaultdict
import time
import html


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Brevo (Sendinblue) Email configuration
BREVO_API_KEY = os.environ.get('Backend_Email_Key', '')
BREVO_SENDER_EMAIL = "blazecoder3@gmail.com"
BREVO_RECIPIENT_EMAIL = "info@blubrg.com"

# Resend Email Configuration (for form submission notifications)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
RESEND_FROM_EMAIL = "contact@blubridge.ai"
RESEND_TO_EMAIL = "hiring@blubridge.com"

# Create the main app without a prefix
app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None, redirect_slashes=False)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api", redirect_slashes=False)

# ==================== SECURITY MIDDLEWARE ====================

# Rate limiter: in-memory store per IP per endpoint
class RateLimiter:
    def __init__(self):
        self._requests = defaultdict(list)
        self._blocked = {}
    
    def _cleanup(self, key):
        now = time.time()
        self._requests[key] = [t for t in self._requests[key] if now - t < 60]
    
    def is_blocked(self, ip):
        if ip in self._blocked and time.time() < self._blocked[ip]:
            return True
        if ip in self._blocked:
            del self._blocked[ip]
        return False
    
    def check(self, ip, endpoint, max_requests=30, window=60):
        key = f"{ip}:{endpoint}"
        now = time.time()
        self._cleanup(key)
        if len(self._requests[key]) >= max_requests:
            return False
        self._requests[key].append(now)
        return True
    
    def block_ip(self, ip, duration=300):
        self._blocked[ip] = time.time() + duration

rate_limiter = RateLimiter()

# Rate limits per endpoint category
RATE_LIMITS = {
    "form_submit": 5,       # 5 form submissions per minute
    "admin_login": 5,       # 5 login attempts per minute
    "admin_api": 60,        # 60 admin API calls per minute
    "public_api": 30,       # 30 general API calls per minute
    "file_upload": 3,       # 3 uploads per minute
    "export": 5,            # 5 exports per minute
}

# Admin login failure tracking for brute force protection
login_failures = defaultdict(list)
MAX_LOGIN_FAILURES = 5
LOGIN_LOCKOUT_SECONDS = 900  # 15 minutes

def sanitize_input(value):
    """Sanitize string input to prevent XSS and injection"""
    if not isinstance(value, str):
        return value
    value = html.escape(value, quote=True)
    return value

def sanitize_regex_input(value):
    """Escape special regex characters to prevent ReDoS and NoSQL injection"""
    if not isinstance(value, str):
        return value
    return re.escape(value)

def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"

class SecurityMiddleware(BaseHTTPMiddleware):
    """
    Enterprise-grade security middleware — FAIL-CLOSED architecture.
    ALL /api/ requests are validated BEFORE reaching any route handler.
    """
    
    # Explicitly whitelisted public GET paths (health check + public content only)
    PUBLIC_GET_PATHS = frozenset(["/api", "/api/", "/api/health", "/api/blog/posts"])
    PUBLIC_GET_PREFIXES = ("/api/blog/posts/",)
    
    # Explicitly whitelisted public POST paths (form submissions only)
    PUBLIC_POST_PATHS = frozenset([
        "/api/contact",
        "/api/contacts/submit", 
        "/api/contact-us",
        "/api/contact-enquiries",
        "/api/project-enquiries",
        "/api/newsletter/subscribe",
        "/api/careers/apply",
        "/api/job-applications/submit",
        "/api/status",
        "/api/admin/login",
    ])
    
    # Allowed methods globally
    ALLOWED_METHODS = frozenset(["GET", "POST", "OPTIONS", "PATCH", "DELETE"])
    
    def _extract_token(self, request: Request) -> str:
        auth = request.headers.get("authorization", "")
        if auth.startswith("Bearer "):
            return auth[7:]
        return ""
    
    async def dispatch(self, request: Request, call_next):
        client_ip = get_client_ip(request)
        path = request.url.path.rstrip("/") or "/"
        method = request.method
        
        # ====== BLOCK BANNED IPs ======
        if rate_limiter.is_blocked(client_ip):
            return JSONResponse(status_code=429, content={"detail": "Too many requests. Please try again later."})
        
        # ====== REJECT OVERSIZED PAYLOADS ======
        content_length = request.headers.get("content-length")
        if content_length:
            try:
                if int(content_length) > 10 * 1024 * 1024:
                    return JSONResponse(status_code=413, content={"detail": "Request too large"})
            except ValueError:
                return JSONResponse(status_code=400, content={"detail": "Invalid request"})
        
        # ====== API ROUTE SECURITY (fail-closed) ======
        if path.startswith("/api"):
            
            # 1. STRICT METHOD ENFORCEMENT — reject unknown methods
            if method not in self.ALLOWED_METHODS:
                logging.warning(f"Blocked invalid method {method} from {client_ip} on {path}")
                return JSONResponse(status_code=405, content={"detail": "Method Not Allowed"})
            
            # 2. OPTIONS always allowed (CORS preflight)
            if method == "OPTIONS":
                response = await call_next(request)
                return response
            
            # 3. GET REQUEST SECURITY — Default DENY, explicit allow
            if method == "GET":
                is_public = (path in self.PUBLIC_GET_PATHS or 
                            any(path.startswith(p) for p in self.PUBLIC_GET_PREFIXES))
                
                if not is_public:
                    # GET to a non-public path: MUST have valid admin token
                    token = self._extract_token(request)
                    if not token or not verify_admin_token(token):
                        logging.warning(f"Blocked unauth GET from {client_ip} on {path}")
                        return JSONResponse(status_code=405, content={"detail": "Method Not Allowed"})
            
            # 4. POST REQUEST SECURITY — public form endpoints allowed, others need auth
            if method == "POST":
                is_public_post = path in self.PUBLIC_POST_PATHS
                if not is_public_post:
                    token = self._extract_token(request)
                    if not token or not verify_admin_token(token):
                        logging.warning(f"Blocked unauth POST from {client_ip} on {path}")
                        return JSONResponse(status_code=401, content={"detail": "Unauthorized"})
            
            # 5. PATCH/DELETE — always require admin auth
            if method in ("PATCH", "DELETE"):
                token = self._extract_token(request)
                if not token or not verify_admin_token(token):
                    logging.warning(f"Blocked unauth {method} from {client_ip} on {path}")
                    return JSONResponse(status_code=401, content={"detail": "Unauthorized"})
            
            # 6. RATE LIMITING
            category = "public_api"
            if "admin/login" in path:
                category = "admin_login"
            elif "admin" in path and "export" in path:
                category = "export"
            elif "admin" in path:
                category = "admin_api"
            elif any(x in path for x in ["contact", "submit", "subscribe", "newsletter"]):
                category = "form_submit"
            elif "apply" in path:
                category = "file_upload"
            
            limit = RATE_LIMITS.get(category, 30)
            if not rate_limiter.check(client_ip, category, max_requests=limit):
                logging.warning(f"Rate limit hit: {client_ip} on {path} ({category})")
                return JSONResponse(status_code=429, content={"detail": "Rate limit exceeded. Please slow down."})
        
        # ====== EXECUTE REQUEST ======
        response = await call_next(request)
        
        # ====== BLOCK REDIRECT-BASED DATA LEAKS ======
        # If an /api/ route tries to redirect, block it to prevent redirect-chain attacks
        if path.startswith("/api") and response.status_code in (301, 302, 307, 308):
            logging.warning(f"Blocked redirect on API route: {path} -> {response.headers.get('location', 'unknown')}")
            return JSONResponse(status_code=405, content={"detail": "Method Not Allowed"})
        
        # ====== SECURITY HEADERS ON ALL RESPONSES ======
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
        response.headers["Cross-Origin-Resource-Policy"] = "same-site"
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        if "server" in response.headers:
            del response.headers["server"]
        
        return response

# Add security middleware FIRST
app.add_middleware(SecurityMiddleware)

# CORS: Restrict to known origins
ALLOWED_ORIGINS = [
    "https://blubridge.ai",
    "https://www.blubridge.ai",
    "https://blubridge.com",
    "https://www.blubridge.com",
    "https://brush-reveal-deploy.preview.emergentagent.com",
]
# Add any custom CORS origins from env
extra_origins = os.environ.get('CORS_ORIGINS', '')
if extra_origins and extra_origins != '*':
    ALLOWED_ORIGINS.extend([o.strip() for o in extra_origins.split(',') if o.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
)


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# LEGACY: Keep old ContactForm model for backward compatibility
class ContactForm(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    message: str
    interest: str = "general"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))

# NEW: Unified Contact Submission Model with type field
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="allow")  # Allow extra fields for flexibility
    
    type: Literal["contact_sales", "general_enquiry", "contact_us", "footer_form"]
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    message: Optional[str] = None
    # Sales-specific fields (optional)
    country: Optional[str] = None
    jobTitle: Optional[str] = None
    purpose: Optional[str] = None
    useCase: Optional[str] = None
    gpuType: Optional[str] = None
    expectedGpuCount: Optional[str] = None
    projectStartTimeline: Optional[str] = None
    heardAbout: Optional[str] = None
    # General enquiry specific
    enquiryCategory: Optional[str] = None
    # System fields
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    
    @field_validator('email')
    @classmethod
    def validate_email_format(cls, v):
        if len(v) > 254:
            raise ValueError('Email too long')
        return v
    
    @field_validator('firstName', 'lastName', 'company', 'message', mode='before')
    @classmethod
    def validate_string_length(cls, v):
        if v and isinstance(v, str) and len(v) > 5000:
            return v[:5000]  # Truncate instead of reject
        return v

class NewsletterSubscribe(BaseModel):
    email: EmailStr
    firstName: str
    lastName: str
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    image: str
    author: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    image: str
    author: str


# Email notification helper using Brevo (non-blocking)
async def send_email_notification(form_type: str, form_data: dict):
    """Send email notification via Brevo API. Does not block API response."""
    try:
        if not BREVO_API_KEY:
            logging.warning("Brevo API key not configured, skipping email notification")
            return
        
        # Format form type label for email
        type_labels = {
            "contact_sales": "Contact Sales",
            "general_enquiry": "General Enquiry", 
            "contact_us": "Contact Us",
            "job_application": "Job Application"
        }
        form_type_label = type_labels.get(form_type, form_type)
        
        # Build email subject
        subject = f"New Form Submission - {form_type_label}"
        
        # Build email body with all form fields
        body_lines = [
            f"Form Type: {form_type_label}",
            f"Submission Time: {form_data.get('createdAt', datetime.now(timezone.utc).isoformat())}",
            "",
            "Submitted Fields:",
            "-" * 40
        ]
        
        # Add all non-empty fields
        skip_fields = {'id', 'createdAt', 'type'}
        for key, value in form_data.items():
            if key not in skip_fields and value:
                body_lines.append(f"{key}: {value}")
        
        body = "\n".join(body_lines)
        
        # Brevo API payload
        email_payload = {
            "sender": {
                "name": "BluBridge Website",
                "email": BREVO_SENDER_EMAIL
            },
            "to": [
                {
                    "email": BREVO_RECIPIENT_EMAIL,
                    "name": "IT Support"
                }
            ],
            "subject": subject,
            "textContent": body
        }
        
        # Add Reply-To with user's email if available
        user_email = form_data.get('email')
        if user_email and isinstance(user_email, str) and '@' in user_email:
            email_payload["replyTo"] = {"email": user_email}
        
        # Send email via Brevo API (non-blocking)
        async def send_brevo_email():
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.post(
                        "https://api.brevo.com/v3/smtp/email",
                        json=email_payload,
                        headers={
                            "api-key": BREVO_API_KEY,
                            "Content-Type": "application/json"
                        },
                        timeout=10.0
                    )
                    if response.status_code == 201:
                        logging.info(f"Brevo email notification sent for {form_type_label}")
                    else:
                        logging.error(f"Brevo email failed: {response.status_code} - {response.text}")
            except Exception as e:
                logging.error(f"Failed to send Brevo email notification: {e}")
        
        # Run in background task to not block
        asyncio.create_task(send_brevo_email())
        
    except Exception as e:
        logging.error(f"Error preparing Brevo email notification: {e}")


# Gmail SMTP email notification (non-blocking)
async def send_gmail_notification(form_type: str, form_data: dict, submission_timestamp: str = None):
    """Send email notification via Resend API. Does not block API response."""
    
    def _send_resend_email():
        """Synchronous Resend send - runs in thread pool"""
        try:
            if not RESEND_API_KEY:
                logging.warning("RESEND_API_KEY not configured, skipping email notification")
                return
            
            # Set Resend API key
            resend.api_key = RESEND_API_KEY
            
            # Format form type label for email subject
            type_labels = {
                "contact_sales": "Contact Sales",
                "general_enquiry": "General Enquiry",
                "contact_us": "Contact Us",
                "footer_form": "Footer Form",
                "job_application": "Job Application",
                "newsletter": "Newsletter Subscription"
            }
            form_type_label = type_labels.get(form_type, form_type.replace("_", " ").title())
            
            # Get submission timestamp
            if submission_timestamp:
                timestamp_str = submission_timestamp
            else:
                timestamp_str = form_data.get('createdAt') or form_data.get('appliedAt') or form_data.get('subscribed_at') or datetime.now(timezone.utc).isoformat()
            
            # Parse and format the date for subject
            try:
                if isinstance(timestamp_str, str):
                    dt = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
                else:
                    dt = timestamp_str
                formatted_date = dt.strftime("%Y-%m-%d %H:%M:%S UTC")
            except Exception:
                formatted_date = str(timestamp_str)
            
            # Build email subject: Form_Type - Submission Date
            subject = f"{form_type_label} - {formatted_date}"
            
            # Build email body with all form fields
            body_lines = [
                f"Form Type: {form_type_label}",
                f"Submission Timestamp: {formatted_date}",
                "",
                "=" * 50,
                "SUBMITTED FORM DATA:",
                "=" * 50,
                ""
            ]
            
            # Add all non-empty fields (skip internal fields)
            skip_fields = {'_id', 'id', 'type', 'status', 'viewedAt', 'updatedAt'}
            
            for key, value in form_data.items():
                if key not in skip_fields and value is not None and value != "":
                    # Format the field name nicely
                    field_name = key.replace('_', ' ').replace('At', ' At')
                    # Convert camelCase to Title Case
                    field_name = ''.join([' ' + c if c.isupper() else c for c in field_name]).strip()
                    field_name = field_name.title()
                    body_lines.append(f"{field_name}: {value}")
            
            body_lines.append("")
            body_lines.append("=" * 50)
            body_lines.append("This is an automated notification from BluBridge website.")
            
            body = "\n".join(body_lines)
            
            # Send via Resend API
            params = {
                "from": f"BluBridge <{RESEND_FROM_EMAIL}>",
                "to": [RESEND_TO_EMAIL],
                "subject": subject,
                "text": body
            }
            
            # Add Reply-To with user's email if available
            user_email = form_data.get('email')
            if user_email and isinstance(user_email, str) and '@' in user_email:
                params["reply_to"] = user_email
            
            resend.Emails.send(params)
            
            logging.info(f"Resend notification sent for {form_type_label}")
            
        except Exception as e:
            logging.error(f"Failed to send Resend notification: {e}")
    
    # Run Resend send in background thread to not block async code
    try:
        loop = asyncio.get_event_loop()
        loop.run_in_executor(None, _send_resend_email)
    except Exception as e:
        logging.error(f"Error scheduling Resend notification: {e}")


# Separate email sender for Contact & Footer forms — sends to contact@blubridge.ai
CONTACT_FORM_TO_EMAIL = "contact@blubridge.ai"

async def send_contact_form_email(form_type: str, form_data: dict, submission_timestamp: str = None):
    """Send email for contact/footer forms to contact@blubridge.ai. Isolated from job application emails."""
    
    def _send():
        try:
            if not RESEND_API_KEY:
                logging.warning("RESEND_API_KEY not configured, skipping contact form email")
                return
            
            resend.api_key = RESEND_API_KEY
            
            type_labels = {
                "contact_sales": "Contact Sales",
                "general_enquiry": "General Enquiry",
                "contact_us": "Contact Us",
                "footer_form": "Footer Form",
                "newsletter": "Newsletter Subscription"
            }
            form_type_label = type_labels.get(form_type, form_type.replace("_", " ").title())
            
            if submission_timestamp:
                timestamp_str = submission_timestamp
            else:
                timestamp_str = form_data.get('createdAt') or form_data.get('subscribed_at') or datetime.now(timezone.utc).isoformat()
            
            try:
                if isinstance(timestamp_str, str):
                    dt = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
                else:
                    dt = timestamp_str
                formatted_date = dt.strftime("%Y-%m-%d %H:%M:%S UTC")
            except Exception:
                formatted_date = str(timestamp_str)
            
            subject = f"{form_type_label} - {formatted_date}"
            
            body_lines = [
                f"Form Type: {form_type_label}",
                f"Submission Timestamp: {formatted_date}",
                "",
                "=" * 50,
                "SUBMITTED FORM DATA:",
                "=" * 50,
                ""
            ]
            
            skip_fields = {'_id', 'id', 'type', 'status', 'viewedAt', 'updatedAt'}
            
            for key, value in form_data.items():
                if key not in skip_fields and value is not None and value != "":
                    field_name = key.replace('_', ' ').replace('At', ' At')
                    field_name = ''.join([' ' + c if c.isupper() else c for c in field_name]).strip()
                    field_name = field_name.title()
                    body_lines.append(f"{field_name}: {value}")
            
            body_lines.append("")
            body_lines.append("=" * 50)
            body_lines.append("This is an automated notification from BluBridge website.")
            
            body = "\n".join(body_lines)
            
            params = {
                "from": f"BluBridge <{RESEND_FROM_EMAIL}>",
                "to": [CONTACT_FORM_TO_EMAIL],
                "subject": subject,
                "text": body
            }
            
            user_email = form_data.get('email')
            if user_email and isinstance(user_email, str) and '@' in user_email:
                params["reply_to"] = user_email
            
            resend.Emails.send(params)
            logging.info(f"Contact form email sent to {CONTACT_FORM_TO_EMAIL} for {form_type_label}")
            
        except Exception as e:
            logging.error(f"Failed to send contact form email: {e}")
    
    try:
        loop = asyncio.get_event_loop()
        loop.run_in_executor(None, _send)
    except Exception as e:
        logging.error(f"Error scheduling contact form email: {e}")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@app.api_route("/health", methods=["GET", "HEAD"])
async def health():
    return Response(status_code=200)

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks(authorization: Optional[str] = Header(None)):
    """Get status checks — ADMIN ONLY"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Contact Form Endpoint - LEGACY (backward compatible)
@api_router.post("/contact")
async def submit_contact_form(form: ContactForm):
    """Legacy endpoint - converts old format to new unified contacts collection with duplicate prevention"""
    try:
        # Validate required fields
        if not form.email:
            raise HTTPException(status_code=400, detail="Email is required")
        if not form.firstName or not form.firstName.strip():
            raise HTTPException(status_code=400, detail="First name is required")
        if not form.lastName or not form.lastName.strip():
            raise HTTPException(status_code=400, detail="Last name is required")
        
        # DUPLICATE PREVENTION: Check for recent submission with same email
        one_minute_ago = (datetime.now(timezone.utc) - timedelta(minutes=1)).isoformat()
        existing = await db.contacts.find_one({
            "email": form.email.lower().strip(),
            "createdAt": {"$gte": one_minute_ago}
        })
        
        if existing:
            raise HTTPException(
                status_code=409, 
                detail="A similar submission was recently received. Please wait before submitting again."
            )
        
        # Map old 'interest' field to new 'type' field
        type_mapping = {
            "sales": "contact_sales",
            "general": "general_enquiry",
            "enterprise": "contact_sales"
        }
        form_type = type_mapping.get(form.interest, "general_enquiry")
        
        # Build document for new unified collection
        doc = {
            "type": form_type,
            "firstName": form.firstName,
            "lastName": form.lastName,
            "email": form.email.lower().strip(),
            "company": form.company,
            "phone": form.phone,
            "message": form.message,
            "interest": form.interest,  # Keep original for reference
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "id": form.id
        }
        
        # Save to unified 'contacts' collection
        await db.contacts.insert_one(doc)
        
        # Also save to legacy collection for backward compatibility
        legacy_doc = form.model_dump()
        legacy_doc['created_at'] = legacy_doc['created_at'].isoformat()
        await db.contact_forms.insert_one(legacy_doc)
        
        # Send email notification (non-blocking) — to contact@blubridge.ai
        await send_contact_form_email(form_type, doc)
        
        return {"message": "Contact form submitted successfully", "id": form.id}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit form")


# NEW: Unified Contact Submission Endpoint
@api_router.post("/contacts/submit")
async def submit_unified_contact(submission: ContactSubmission):
    """
    Unified contact submission endpoint.
    Requires 'type' field: contact_sales, general_enquiry, contact_us, or footer_form
    Includes duplicate prevention based on email + type within 1 minute
    """
    try:
        # Validate required fields based on type
        if not submission.email:
            raise HTTPException(status_code=400, detail="Email is required")
        
        # Validate email format
        if not validate_email(submission.email):
            raise HTTPException(status_code=400, detail="Invalid email format")
        
        # For contact_us type, validate required fields
        if submission.type == "contact_us":
            if not submission.firstName or not submission.firstName.strip():
                raise HTTPException(status_code=400, detail="First name is required")
            if not submission.lastName or not submission.lastName.strip():
                raise HTTPException(status_code=400, detail="Last name is required")
            if not submission.message or not submission.message.strip():
                raise HTTPException(status_code=400, detail="Message is required")
        
        # DUPLICATE PREVENTION: Check for recent submission with same email and type
        one_minute_ago = (datetime.now(timezone.utc) - timedelta(minutes=1)).isoformat()
        existing = await db.contacts.find_one({
            "email": submission.email.lower().strip(),
            "type": submission.type,
            "createdAt": {"$gte": one_minute_ago}
        })
        
        if existing:
            raise HTTPException(
                status_code=409, 
                detail="A similar submission was recently received. Please wait before submitting again."
            )
        
        # Build document with only non-null fields
        doc = {
            "type": submission.type,
            "id": submission.id or str(uuid.uuid4())
        }
        
        # Add all provided fields (exclude None values)
        submission_dict = submission.model_dump()
        for key, value in submission_dict.items():
            if value is not None:
                if isinstance(value, datetime):
                    doc[key] = value.isoformat()
                elif key == "email":
                    doc[key] = value.lower().strip()
                else:
                    doc[key] = value
        
        # Ensure createdAt is set
        if 'createdAt' not in doc:
            doc['createdAt'] = datetime.now(timezone.utc).isoformat()
        
        # Save to unified 'contacts' collection
        await db.contacts.insert_one(doc)
        
        # Send email notification (non-blocking) — to contact@blubridge.ai
        await send_contact_form_email(submission.type, doc)
        
        return {"message": "Form submitted successfully", "id": doc.get("id"), "type": submission.type}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit form")


# Get in Touch - Dedicated enquiry endpoint
class ContactEnquiry(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    role: str
    message: str
    marketingConsent: bool = False

    @field_validator('firstName', 'lastName', 'role')
    @classmethod
    def reject_blank(cls, v):
        if not v or not v.strip():
            raise ValueError('Required field cannot be blank')
        return v.strip()

    @field_validator('message')
    @classmethod
    def validate_enquiry_message(cls, v):
        if not v or not v.strip():
            raise ValueError('Project details are required')
        v = v.strip()
        if len(v) > 1000:
            raise ValueError('Project details must be 1000 characters or fewer')
        return v


@api_router.post("/contact-enquiries")
async def submit_contact_enquiry(enquiry: ContactEnquiry):
    """Get in Touch enquiry endpoint. Stores in contact_enquiries with duplicate prevention."""
    try:
        company_email = enquiry.email.lower().strip()
        if not validate_email(company_email):
            raise HTTPException(status_code=400, detail="Invalid email format")

        one_minute_ago = (datetime.now(timezone.utc) - timedelta(minutes=1)).isoformat()
        existing = await db.contact_enquiries.find_one({
            "company_email": company_email,
            "created_at": {"$gte": one_minute_ago}
        })
        if existing:
            raise HTTPException(
                status_code=409,
                detail="A similar submission was recently received. Please wait before submitting again."
            )

        now = datetime.now(timezone.utc).isoformat()
        doc = {
            "id": str(uuid.uuid4()),
            "first_name": enquiry.firstName,
            "last_name": enquiry.lastName,
            "company_email": company_email,
            "role": enquiry.role,
            "project_details": enquiry.message,
            "marketing_consent": enquiry.marketingConsent,
            "status": "new",
            "created_at": now,
            "updated_at": now,
        }
        await db.contact_enquiries.insert_one(doc)

        await send_contact_form_email("get_in_touch", {
            "first_name": doc["first_name"],
            "last_name": doc["last_name"],
            "email": company_email,
            "role": doc["role"],
            "project_details": doc["project_details"],
            "marketing_consent": "Yes" if doc["marketing_consent"] else "No",
        }, submission_timestamp=now)

        return {"message": "Enquiry submitted successfully", "id": doc["id"]}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error submitting contact enquiry: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit enquiry")


# Get in Touch v6 (/get-in-touch-6) - project enquiry endpoint
PROJECT_BUDGETS = {
    f"{currency} {budget_range}"
    for currency in ("₹", "$", "€")
    for budget_range in ("Under 10,000", "10,000–50,000", "50,000–100,000", "100,000–500,000", "500,000+")
}


class ProjectEnquiry(BaseModel):
    fullName: str
    email: EmailStr
    phone: str
    company: str
    jobTitle: str
    country: Optional[str] = None
    city: str
    budget: str
    message: Optional[str] = None
    privacyConsent: bool
    marketingConsent: bool = False

    @field_validator('fullName', 'company', 'jobTitle', 'city')
    @classmethod
    def reject_blank_required(cls, v):
        if not v or not v.strip():
            raise ValueError('Required field cannot be blank')
        return v.strip()

    @field_validator('budget')
    @classmethod
    def validate_budget(cls, v):
        v = v.strip()
        if v not in PROJECT_BUDGETS:
            raise ValueError('Select a valid budget currency and range')
        return v

    @field_validator('phone')
    @classmethod
    def validate_project_phone(cls, v):
        digits = re.sub(r'[^0-9]', '', v or '')
        if not (6 <= len(digits) <= 15):
            raise ValueError('Invalid phone number')
        return v.strip()

    @field_validator('country', 'message')
    @classmethod
    def trim_optional(cls, v):
        v = v.strip() if v else None
        return v or None

    @field_validator('message')
    @classmethod
    def limit_message(cls, v):
        if v and len(v) > 1000:
            raise ValueError('Message must be 1000 characters or fewer')
        return v

    @field_validator('privacyConsent')
    @classmethod
    def require_privacy(cls, v):
        if not v:
            raise ValueError('Privacy consent is required')
        return v


class ProjectEnquiryReceipt(BaseModel):
    message: str
    id: str


class ProjectEnquiryRecord(BaseModel):
    id: str
    full_name: str
    email: str
    phone: str
    company: str
    job_title: str
    country: Optional[str] = None
    city: str
    budget: Optional[str] = None  # Existing submissions predate the required budget field.
    message: Optional[str] = None
    privacy_consent: bool
    marketing_consent: bool = False
    status: str
    created_at: str
    updated_at: str


class ProjectEnquiryPage(BaseModel):
    data: List[ProjectEnquiryRecord]
    total: int
    page: int
    limit: int
    totalPages: int


@api_router.post("/project-enquiries", response_model=ProjectEnquiryReceipt)
async def submit_project_enquiry(enquiry: ProjectEnquiry):
    try:
        email = enquiry.email.lower().strip()
        if not validate_email(email):
            raise HTTPException(status_code=400, detail="Invalid email format")
        one_minute_ago = (datetime.now(timezone.utc) - timedelta(minutes=1)).isoformat()
        if await db.project_enquiries.find_one({"email": email, "created_at": {"$gte": one_minute_ago}}):
            raise HTTPException(status_code=409, detail="A similar submission was recently received. Please wait before submitting again.")
        now = datetime.now(timezone.utc).isoformat()
        doc = {
            "id": str(uuid.uuid4()),
            "full_name": enquiry.fullName,
            "email": email,
            "phone": enquiry.phone,
            "company": enquiry.company,
            "job_title": enquiry.jobTitle,
            "country": enquiry.country,
            "city": enquiry.city,
            "budget": enquiry.budget,
            "message": enquiry.message,
            "privacy_consent": True,
            "marketing_consent": enquiry.marketingConsent,
            "status": "new",
            "created_at": now,
            "updated_at": now,
        }
        await db.project_enquiries.insert_one(doc)
        await send_contact_form_email("project_enquiry", {
            "full_name": doc["full_name"], "email": email, "phone": doc["phone"], "company": doc["company"],
            "job_title": doc["job_title"], "country": doc["country"], "city": doc["city"], "message": doc["message"],
            "budget": doc["budget"],
            "marketing_consent": "Yes" if doc["marketing_consent"] else "No",
        }, submission_timestamp=now)
        return {"message": "Enquiry submitted successfully", "id": doc["id"]}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error submitting project enquiry: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit enquiry")


# Contact Us (Footer Form) - Simple endpoint
@api_router.post("/contact-us")
async def submit_contact_us(firstName: Optional[str] = None, lastName: Optional[str] = None, email: str = None, message: Optional[str] = None):
    """Simple Contact Us form (footer) endpoint with duplicate prevention"""
    from pydantic import ValidationError
    
    # Validate email
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    
    try:
        # Validate email format
        EmailStr._validate(email)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid email format")
    
    try:
        # DUPLICATE PREVENTION: Check for recent submission with same email
        one_minute_ago = (datetime.now(timezone.utc) - timedelta(minutes=1)).isoformat()
        existing = await db.contacts.find_one({
            "email": email.lower().strip(),
            "type": "contact_us",
            "createdAt": {"$gte": one_minute_ago}
        })
        
        if existing:
            raise HTTPException(
                status_code=409, 
                detail="A similar submission was recently received. Please wait before submitting again."
            )
        
        doc = {
            "type": "contact_us",
            "firstName": firstName,
            "lastName": lastName,
            "email": email.lower().strip(),
            "message": message,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "id": str(uuid.uuid4())
        }
        
        # Remove None values
        doc = {k: v for k, v in doc.items() if v is not None}
        doc["type"] = "contact_us"  # Ensure type is always set
        
        # Save to unified 'contacts' collection
        await db.contacts.insert_one(doc)
        
        # Send email notification (non-blocking) — to contact@blubridge.ai
        await send_contact_form_email("contact_us", doc)
        
        return {"message": "Contact form submitted successfully", "id": doc["id"]}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error submitting contact us form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit form")


@api_router.get("/contact/submissions")
async def get_contact_submissions(authorization: Optional[str] = Header(None)):
    """Get all submissions from legacy contact_forms collection — ADMIN ONLY"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    submissions = await db.contact_forms.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for submission in submissions:
        if isinstance(submission.get('created_at'), str):
            submission['created_at'] = datetime.fromisoformat(submission['created_at'])
    return submissions


# NEW: Get all contacts from unified collection
@api_router.get("/contacts")
async def get_all_contacts(authorization: Optional[str] = Header(None), type: Optional[str] = None, limit: int = 100):
    """Get contacts from unified collection — ADMIN ONLY"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    query = {}
    if type:
        query["type"] = type
    limit = max(1, min(limit, 200))
    contacts = await db.contacts.find(query, {"_id": 0}).sort("createdAt", -1).to_list(limit)
    return contacts

# Newsletter Subscription
@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(subscription: NewsletterSubscribe):
    try:
        # Check if email already exists
        existing = await db.newsletter_subscribers.find_one({"email": subscription.email})
        if existing:
            raise HTTPException(status_code=400, detail="Email already subscribed")
        
        doc = subscription.model_dump()
        doc['subscribed_at'] = doc['subscribed_at'].isoformat()
        await db.newsletter_subscribers.insert_one(doc)
        
        # Send Gmail notification (non-blocking)
        await send_gmail_notification("newsletter", doc)
        
        return {"message": "Successfully subscribed to newsletter", "id": subscription.id}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error subscribing to newsletter: {e}")
        raise HTTPException(status_code=500, detail="Failed to subscribe")

@api_router.get("/newsletter/subscribers")
async def get_newsletter_subscribers(authorization: Optional[str] = Header(None)):
    """Get newsletter subscribers — ADMIN ONLY"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    subscribers = await db.newsletter_subscribers.find({}, {"_id": 0}).sort("subscribed_at", -1).to_list(1000)
    for subscriber in subscribers:
        if isinstance(subscriber['subscribed_at'], str):
            subscriber['subscribed_at'] = datetime.fromisoformat(subscriber['subscribed_at'])
    return subscribers

# Blog Posts
@api_router.post("/blog/posts", response_model=BlogPost)
async def create_blog_post(post: BlogPostCreate, authorization: Optional[str] = Header(None)):
    """Create blog post — ADMIN ONLY"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        post_obj = BlogPost(**post.model_dump())
        doc = post_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        doc['updated_at'] = doc['updated_at'].isoformat()
        await db.blog_posts.insert_one(doc)
        return post_obj
    except Exception as e:
        logging.error(f"Error creating blog post: {e}")
        raise HTTPException(status_code=500, detail="Failed to create post")

@api_router.get("/blog/posts", response_model=List[BlogPost])
async def get_blog_posts(limit: int = 50):
    posts = await db.blog_posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for post in posts:
        if isinstance(post['created_at'], str):
            post['created_at'] = datetime.fromisoformat(post['created_at'])
        if isinstance(post['updated_at'], str):
            post['updated_at'] = datetime.fromisoformat(post['updated_at'])
    return posts

@api_router.get("/blog/posts/{slug}", response_model=BlogPost)
async def get_blog_post_by_slug(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if isinstance(post['created_at'], str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    if isinstance(post['updated_at'], str):
        post['updated_at'] = datetime.fromisoformat(post['updated_at'])
    
    return BlogPost(**post)


# ==================== JOB APPLICATIONS ====================

# Create uploads directory if it doesn't exist
UPLOADS_DIR = ROOT_DIR / "uploads" / "resumes"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

# ===== Emergent Object Storage (resume uploads) =====
STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
STORAGE_APP_PREFIX = "blubridge"
_storage_key = None

def init_storage(force: bool = False):
    """Session-scoped storage key, minted once and reused."""
    global _storage_key
    if _storage_key and not force:
        return _storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
    resp.raise_for_status()
    _storage_key = resp.json()["storage_key"]
    return _storage_key

def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data, timeout=120
    )
    resp.raise_for_status()
    return resp.json()

def get_object(path: str):
    key = init_storage()
    resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")

# Allowed file extensions and max file size
ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

# File signature (magic bytes) validation
FILE_SIGNATURES = {
    '.pdf': [b'%PDF'],
    '.doc': [b'\xd0\xcf\x11\xe0'],  # OLE2 compound document
    '.docx': [b'PK\x03\x04'],       # ZIP-based format
}

def validate_file(filename: str, file_size: int, file_content: bytes = None) -> tuple[bool, str]:
    """Validate uploaded file with extension, size, and magic byte checks"""
    ext = Path(filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        return False, "Invalid file type. Allowed types: PDF, DOC, DOCX"
    
    if file_size > MAX_FILE_SIZE:
        return False, "File too large. Maximum size: 5MB"
    
    # Validate file signature (magic bytes) to prevent disguised files
    if file_content and ext in FILE_SIGNATURES:
        valid_sig = any(file_content[:len(sig)] == sig for sig in FILE_SIGNATURES[ext])
        if not valid_sig:
            return False, "File content does not match its extension"
    
    # Block executable content
    if file_content:
        dangerous_patterns = [b'<script', b'<?php', b'#!/', b'<%']
        for pattern in dangerous_patterns:
            if pattern in file_content[:1024]:
                return False, "File contains potentially dangerous content"
    
    return True, ""

def validate_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return bool(re.match(pattern, email))

def validate_phone(phone: str) -> bool:
    """Validate phone number (10-15 digits)"""
    digits = re.sub(r'\D', '', phone)
    return 10 <= len(digits) <= 15


@api_router.post("/job-applications/submit")
async def submit_job_application(
    firstName: str = Form(...),
    lastName: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    location: str = Form(...),
    jobTitle: str = Form(...),
    linkedInProfile: Optional[str] = Form(None),
    resume: UploadFile = File(...)
):
    """Submit a job application with resume upload"""
    try:
        # Validation
        errors = {}
        
        # First Name validation
        if not firstName or len(firstName.strip()) < 2:
            errors['firstName'] = 'First name must be at least 2 characters'
        
        # Last Name validation
        if not lastName or len(lastName.strip()) < 2:
            errors['lastName'] = 'Last name must be at least 2 characters'
        
        # Email validation
        if not email or not validate_email(email):
            errors['email'] = 'Please enter a valid email address'
        
        # Phone validation
        if not phone or not validate_phone(phone):
            errors['phone'] = 'Please enter a valid phone number (10-15 digits)'
        
        # Location validation
        if not location or len(location.strip()) < 1:
            errors['location'] = 'Location is required'
        
        # Job Title validation
        if not jobTitle or len(jobTitle.strip()) < 1:
            errors['jobTitle'] = 'Job title is required'
        
        # Resume validation
        if not resume or not resume.filename:
            errors['resume'] = 'Resume is required'
        else:
            # Read file content to check size
            file_content = await resume.read()
            file_size = len(file_content)
            await resume.seek(0)  # Reset file pointer
            
            is_valid, error_msg = validate_file(resume.filename, file_size, file_content)
            if not is_valid:
                errors['resume'] = error_msg
        
        # If there are validation errors, return them
        if errors:
            return JSONResponse(
                status_code=400,
                content={"success": False, "errors": errors}
            )
        
        # DUPLICATE PREVENTION: Check for existing application with same email and job title within 24 hours
        twenty_four_hours_ago = (datetime.now(timezone.utc) - timedelta(hours=24)).isoformat()
        existing_application = await db.job_applications.find_one({
            "email": email.strip().lower(),
            "jobTitle": jobTitle.strip(),
            "appliedAt": {"$gte": twenty_four_hours_ago}
        })
        
        if existing_application:
            return JSONResponse(
                status_code=409,
                content={
                    "success": False, 
                    "errors": {"duplicate": f"You have already applied for {jobTitle} recently. Please wait 24 hours before reapplying."}
                }
            )
        
        # Generate unique filename
        file_ext = Path(resume.filename).suffix.lower()
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        storage_path = f"{STORAGE_APP_PREFIX}/resumes/{unique_filename}"
        
        # Upload resume to Emergent object storage (survives deployment)
        file_content = await resume.read()
        put_object(storage_path, file_content, resume.content_type or "application/octet-stream")
        
        # Create application document
        application_id = str(uuid.uuid4())
        application_doc = {
            "id": application_id,
            "firstName": firstName.strip(),
            "lastName": lastName.strip(),
            "email": email.strip().lower(),
            "phone": phone.strip(),
            "location": location.strip(),
            "resumeCV": storage_path,
            "resumeFilename": resume.filename,
            "linkedInProfile": linkedInProfile.strip() if linkedInProfile else None,
            "jobTitle": jobTitle.strip(),
            "appliedAt": datetime.now(timezone.utc).isoformat(),
            "status": "pending"
        }
        
        # Save to MongoDB
        await db.job_applications.insert_one(application_doc)
        
        # Send email notification (non-blocking)
        email_data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "location": location,
            "jobTitle": jobTitle,
            "linkedInProfile": linkedInProfile,
            "resumeFilename": resume.filename,
            "appliedAt": application_doc["appliedAt"]
        }
        await send_gmail_notification("job_application", email_data)
        
        logging.info(f"Job application submitted: {application_id} for {jobTitle}")
        
        return {
            "success": True,
            "message": "Application submitted successfully!",
            "id": application_id
        }
        
    except Exception as e:
        logging.error(f"Error submitting job application: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit application. Please try again.")


@api_router.get("/job-applications")
async def get_job_applications(authorization: Optional[str] = Header(None), status: Optional[str] = None, limit: int = 100):
    """Get all job applications — ADMIN ONLY"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        query = {}
        if status:
            query["status"] = status
        limit = max(1, min(limit, 200))
        applications = await db.job_applications.find(query, {"_id": 0}).sort("appliedAt", -1).to_list(limit)
        return applications
    except Exception as e:
        logging.error(f"Error fetching job applications: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch applications")


@api_router.get("/job-applications/{application_id}")
async def get_job_application(application_id: str, authorization: Optional[str] = Header(None)):
    """Get a single job application by ID — ADMIN ONLY"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        application = await db.job_applications.find_one({"id": application_id}, {"_id": 0})
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")
        return application
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching job application: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch application")


@api_router.patch("/job-applications/{application_id}/status")
async def update_application_status(application_id: str, status: str, authorization: Optional[str] = Header(None)):
    """Update the status of a job application — ADMIN ONLY"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    """Update the status of a job application"""
    valid_statuses = ["pending", "reviewed", "shortlisted", "rejected", "hired"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    try:
        result = await db.job_applications.update_one(
            {"id": application_id},
            {"$set": {"status": status, "updatedAt": datetime.now(timezone.utc).isoformat()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Application not found")
        
        return {"success": True, "message": f"Application status updated to {status}"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating application status: {e}")
        raise HTTPException(status_code=500, detail="Failed to update status")


# ==================== ADMIN PANEL APIs ====================

# Admin credentials stored in database (with fallback to defaults)
DEFAULT_ADMIN_USERNAME = "admin"
DEFAULT_ADMIN_PASSWORD = "admin"

# Simple token store (In production, use Redis or database)
admin_tokens = {}
TOKEN_EXPIRY_HOURS = 24

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminTokenResponse(BaseModel):
    token: str
    message: str

class AdminPasswordChange(BaseModel):
    currentPassword: str
    newPassword: str
    confirmPassword: str

def hash_password(password: str) -> str:
    """Hash password using SHA256 with salt"""
    return hashlib.sha256(password.encode()).hexdigest()

def generate_admin_token():
    """Generate a secure admin token"""
    return secrets.token_urlsafe(32)

def verify_admin_token(token: str) -> bool:
    """Verify if admin token is valid and not expired"""
    if token not in admin_tokens:
        return False
    token_data = admin_tokens[token]
    created_at = datetime.fromisoformat(token_data["created_at"])
    if datetime.now(timezone.utc) - created_at > timedelta(hours=TOKEN_EXPIRY_HOURS):
        del admin_tokens[token]
        return False
    return True

async def get_admin_credentials():
    """Get admin credentials from database or use defaults"""
    admin_doc = await db.admin_settings.find_one({"type": "credentials"})
    if admin_doc:
        return admin_doc.get("username", DEFAULT_ADMIN_USERNAME), admin_doc.get("passwordHash")
    return DEFAULT_ADMIN_USERNAME, hash_password(DEFAULT_ADMIN_PASSWORD)

async def get_admin_token(authorization: Optional[str] = None):
    """Dependency to verify admin authentication"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")
    
    # Extract token from "Bearer <token>" format
    if authorization.startswith("Bearer "):
        token = authorization[7:]
    else:
        token = authorization
    
    if not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return token


@api_router.post("/admin/login")
async def admin_login(credentials: AdminLogin, request: Request):
    """Admin login endpoint with brute force protection"""
    client_ip = get_client_ip(request)
    
    # Check for brute force lockout
    now = time.time()
    login_failures[client_ip] = [t for t in login_failures[client_ip] if now - t < LOGIN_LOCKOUT_SECONDS]
    if len(login_failures[client_ip]) >= MAX_LOGIN_FAILURES:
        logging.warning(f"Admin login locked out for IP: {client_ip}")
        raise HTTPException(status_code=429, detail="Too many failed attempts. Please try again later.")
    
    stored_username, stored_password_hash = await get_admin_credentials()
    input_password_hash = hash_password(credentials.password)
    
    if credentials.username == stored_username and input_password_hash == stored_password_hash:
        # Clear failures on success
        login_failures.pop(client_ip, None)
        token = generate_admin_token()
        admin_tokens[token] = {
            "username": credentials.username,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        return {"token": token, "message": "Login successful"}
    
    # Track failed attempt
    login_failures[client_ip].append(now)
    logging.warning(f"Failed admin login attempt from IP: {client_ip}")
    raise HTTPException(status_code=401, detail="Invalid credentials")


@api_router.post("/admin/logout")
async def admin_logout(authorization: Optional[str] = Header(None)):
    """Admin logout endpoint"""
    if authorization:
        token = authorization[7:] if authorization.startswith("Bearer ") else authorization
        if token in admin_tokens:
            del admin_tokens[token]
    return {"message": "Logged out successfully"}


@api_router.get("/admin/verify")
async def verify_admin(authorization: Optional[str] = Header(None)):
    """Verify if admin token is valid"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization[7:] if authorization.startswith("Bearer ") else authorization
    if verify_admin_token(token):
        return {"valid": True, "message": "Token is valid"}
    raise HTTPException(status_code=401, detail="Invalid token")


@api_router.get("/admin/dashboard/stats")
async def get_admin_stats(authorization: Optional[str] = Header(None)):
    """Get dashboard statistics"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        # Get counts for each form type
        # Footer forms: submissions from the website footer
        footer_count = await db.contacts.count_documents({"type": "footer_form"})
        # Contact forms: submissions from Contact page, Sales page, General Enquiry page
        contact_count = await db.contacts.count_documents({"type": {"$in": ["contact_us", "contact_sales", "general_enquiry"]}})
        # Career applications: job applications
        careers_count = await db.job_applications.count_documents({})
        get_in_touch_count = await db.contact_enquiries.count_documents({})
        project_count = await db.project_enquiries.count_documents({})
        
        # Get new (unviewed) counts
        footer_new = await db.contacts.count_documents({"type": "footer_form", "status": {"$ne": "viewed"}})
        contact_new = await db.contacts.count_documents({"type": {"$in": ["contact_us", "contact_sales", "general_enquiry"]}, "status": {"$ne": "viewed"}})
        careers_new = await db.job_applications.count_documents({"status": "pending"})
        get_in_touch_new = await db.contact_enquiries.count_documents({"status": {"$ne": "viewed"}})
        project_new = await db.project_enquiries.count_documents({"status": {"$ne": "viewed"}})
        
        return {
            "footer_forms": {"total": footer_count, "new": footer_new},
            "contact_forms": {"total": contact_count, "new": contact_new},
            "career_applications": {"total": careers_count, "new": careers_new},
            "get_in_touch": {"total": get_in_touch_count, "new": get_in_touch_new},
            "project_enquiries": {"total": project_count, "new": project_new},
            "total_submissions": footer_count + contact_count + careers_count + get_in_touch_count + project_count
        }
    except Exception as e:
        logging.error(f"Error fetching admin stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch stats")


@api_router.get("/admin/submissions/footer")
async def get_footer_submissions(authorization: Optional[str] = Header(None), limit: int = 50, page: int = 1, search: Optional[str] = None):
    """Get footer form submissions with pagination"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    # Clamp pagination params
    limit = max(1, min(limit, 200))
    page = max(1, page)
    
    try:
        query = {"type": "footer_form"}
        if search:
            safe_search = sanitize_regex_input(search)
            query["$or"] = [
                {"firstName": {"$regex": safe_search, "$options": "i"}},
                {"lastName": {"$regex": safe_search, "$options": "i"}},
                {"email": {"$regex": safe_search, "$options": "i"}}
            ]
        
        total = await db.contacts.count_documents(query)
        skip = (page - 1) * limit
        submissions = await db.contacts.find(query, {"_id": 0}).sort("createdAt", -1).skip(skip).to_list(limit)
        total_pages = (total + limit - 1) // limit if limit > 0 else 1
        return {"data": submissions, "total": total, "page": page, "limit": limit, "totalPages": total_pages}
    except Exception as e:
        logging.error(f"Error fetching footer submissions: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")


@api_router.get("/admin/submissions/contact")
async def get_contact_submissions_admin(authorization: Optional[str] = Header(None), limit: int = 50, page: int = 1, search: Optional[str] = None):
    """Get contact form submissions (contact page, sales & general enquiry) with pagination"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    # Clamp pagination params
    limit = max(1, min(limit, 200))
    page = max(1, page)
    
    try:
        query = {"type": {"$in": ["contact_us", "contact_sales", "general_enquiry"]}}
        if search:
            safe_search = sanitize_regex_input(search)
            query["$or"] = [
                {"firstName": {"$regex": safe_search, "$options": "i"}},
                {"lastName": {"$regex": safe_search, "$options": "i"}},
                {"email": {"$regex": safe_search, "$options": "i"}},
                {"company": {"$regex": safe_search, "$options": "i"}}
            ]
        
        total = await db.contacts.count_documents(query)
        skip = (page - 1) * limit
        submissions = await db.contacts.find(query, {"_id": 0}).sort("createdAt", -1).skip(skip).to_list(limit)
        total_pages = (total + limit - 1) // limit if limit > 0 else 1
        return {"data": submissions, "total": total, "page": page, "limit": limit, "totalPages": total_pages}
    except Exception as e:
        logging.error(f"Error fetching contact submissions: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")


@api_router.get("/admin/submissions/get-in-touch")
async def get_get_in_touch_submissions_admin(authorization: Optional[str] = Header(None), limit: int = 50, page: int = 1, search: Optional[str] = None):
    """Get in Touch enquiries (contact_enquiries collection) with pagination"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")

    limit = max(1, min(limit, 200))
    page = max(1, page)

    try:
        query = {}
        if search:
            safe_search = sanitize_regex_input(search)
            query["$or"] = [
                {"first_name": {"$regex": safe_search, "$options": "i"}},
                {"last_name": {"$regex": safe_search, "$options": "i"}},
                {"company_email": {"$regex": safe_search, "$options": "i"}},
                {"role": {"$regex": safe_search, "$options": "i"}}
            ]

        total = await db.contact_enquiries.count_documents(query)
        skip = (page - 1) * limit
        submissions = await db.contact_enquiries.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).to_list(limit)
        total_pages = (total + limit - 1) // limit if limit > 0 else 1
        return {"data": submissions, "total": total, "page": page, "limit": limit, "totalPages": total_pages}
    except Exception as e:
        logging.error(f"Error fetching get-in-touch submissions: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")


@api_router.get("/admin/submissions/project-enquiries", response_model=ProjectEnquiryPage)
async def get_project_enquiries_admin(authorization: Optional[str] = Header(None), limit: int = 50, page: int = 1, search: Optional[str] = None):
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    limit = max(1, min(limit, 200))
    page = max(1, page)
    query = {}
    if search:
        safe_search = sanitize_regex_input(search)
        query["$or"] = [{field: {"$regex": safe_search, "$options": "i"}} for field in ("full_name", "email", "company", "job_title", "budget")]
    total = await db.project_enquiries.count_documents(query)
    submissions = await db.project_enquiries.find(query, {"_id": 0}).sort("created_at", -1).skip((page - 1) * limit).to_list(limit)
    return {"data": submissions, "total": total, "page": page, "limit": limit, "totalPages": (total + limit - 1) // limit}


@api_router.get("/admin/submissions/careers")
async def get_career_applications_admin(authorization: Optional[str] = Header(None), limit: int = 50, page: int = 1, search: Optional[str] = None, status: Optional[str] = None, start_date: Optional[str] = None, end_date: Optional[str] = None):
    """Get career applications with optional date range filter and pagination"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    # Clamp pagination params
    limit = max(1, min(limit, 200))
    page = max(1, page)
    
    try:
        query = {}
        if status:
            query["status"] = status
        if search:
            safe_search = sanitize_regex_input(search)
            query["$or"] = [
                {"firstName": {"$regex": safe_search, "$options": "i"}},
                {"lastName": {"$regex": safe_search, "$options": "i"}},
                {"email": {"$regex": safe_search, "$options": "i"}},
                {"jobTitle": {"$regex": safe_search, "$options": "i"}}
            ]
        
        # Date range filter
        if start_date or end_date:
            date_query = {}
            if start_date:
                date_query["$gte"] = start_date + "T00:00:00"
            if end_date:
                date_query["$lte"] = end_date + "T23:59:59"
            if date_query:
                query["appliedAt"] = date_query
        
        total = await db.job_applications.count_documents(query)
        skip = (page - 1) * limit
        applications = await db.job_applications.find(query, {"_id": 0}).sort("appliedAt", -1).skip(skip).to_list(limit)
        total_pages = (total + limit - 1) // limit if limit > 0 else 1
        return {"data": applications, "total": total, "page": page, "limit": limit, "totalPages": total_pages}
    except Exception as e:
        logging.error(f"Error fetching career applications: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch applications")


@api_router.get("/admin/submission/{submission_id}")
async def get_submission_detail(submission_id: str, form_type: str, authorization: Optional[str] = Header(None)):
    """Get a single submission detail and mark as viewed"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    # Validate form_type
    if form_type not in ("careers", "footer", "contact", "get_in_touch", "project_enquiry"):
        raise HTTPException(status_code=400, detail="Invalid form type")
    
    try:
        if form_type == "careers":
            # Get from job_applications
            submission = await db.job_applications.find_one({"id": submission_id}, {"_id": 0})
            if submission:
                # Mark as viewed (change status from pending to reviewed if still pending)
                if submission.get("status") == "pending":
                    await db.job_applications.update_one(
                        {"id": submission_id},
                        {"$set": {"status": "reviewed", "viewedAt": datetime.now(timezone.utc).isoformat()}}
                    )
                    submission["status"] = "reviewed"
        elif form_type == "project_enquiry":
            submission = await db.project_enquiries.find_one({"id": submission_id}, {"_id": 0})
            if submission:
                now_iso = datetime.now(timezone.utc).isoformat()
                await db.project_enquiries.update_one({"id": submission_id}, {"$set": {"status": "viewed", "updated_at": now_iso}})
                submission.update(status="viewed", updated_at=now_iso)
                return ProjectEnquiryRecord.model_validate(submission)
        elif form_type == "get_in_touch":
            submission = await db.contact_enquiries.find_one({"id": submission_id}, {"_id": 0})
            if submission:
                now_iso = datetime.now(timezone.utc).isoformat()
                await db.contact_enquiries.update_one(
                    {"id": submission_id},
                    {"$set": {"status": "viewed", "updated_at": now_iso}}
                )
                submission["status"] = "viewed"
        else:
            # Get from contacts
            submission = await db.contacts.find_one({"id": submission_id}, {"_id": 0})
            if submission:
                # Mark as viewed
                await db.contacts.update_one(
                    {"id": submission_id},
                    {"$set": {"status": "viewed", "viewedAt": datetime.now(timezone.utc).isoformat()}}
                )
                submission["status"] = "viewed"
        
        if not submission:
            raise HTTPException(status_code=404, detail="Submission not found")
        
        return submission
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching submission detail: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch submission")


@api_router.delete("/admin/submission/{submission_id}")
async def delete_submission(submission_id: str, form_type: str, authorization: Optional[str] = Header(None)):
    """Delete a submission"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    # Validate form_type
    if form_type not in ("careers", "footer", "contact", "get_in_touch", "project_enquiry"):
        raise HTTPException(status_code=400, detail="Invalid form type")
    
    try:
        if form_type == "careers":
            # Delete from job_applications and remove resume file
            application = await db.job_applications.find_one({"id": submission_id})
            if application and application.get("resumeCV"):
                resume_path = Path(application["resumeCV"])
                if resume_path.exists():
                    resume_path.unlink()
            result = await db.job_applications.delete_one({"id": submission_id})
        elif form_type == "get_in_touch":
            result = await db.contact_enquiries.delete_one({"id": submission_id})
        elif form_type == "project_enquiry":
            result = await db.project_enquiries.delete_one({"id": submission_id})
        else:
            result = await db.contacts.delete_one({"id": submission_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Submission not found")
        
        return {"success": True, "message": "Submission deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error deleting submission: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete submission")


@api_router.get("/admin/resume/{application_id}")
async def download_resume(application_id: str, authorization: Optional[str] = Header(None)):
    """Download resume file for a job application"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        application = await db.job_applications.find_one({"id": application_id}, {"_id": 0})
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")
        
        resume_ref = application.get("resumeCV", "")
        filename = application.get("resumeFilename", "resume.pdf")
        
        # Object-storage resumes (new submissions)
        if resume_ref.startswith(f"{STORAGE_APP_PREFIX}/"):
            try:
                data, content_type = get_object(resume_ref)
            except Exception as e:
                logging.error(f"Object storage fetch failed for {resume_ref}: {e}")
                raise HTTPException(status_code=404, detail="Resume file not found")
            return Response(
                content=data,
                media_type=content_type,
                headers={"Content-Disposition": f'attachment; filename="{filename}"'}
            )
        
        # Legacy local-disk resumes (pre-migration submissions)
        resume_path = Path(resume_ref)
        # Prevent path traversal: ensure file is within uploads directory
        try:
            resume_path = resume_path.resolve()
            uploads_resolved = UPLOADS_DIR.resolve()
            if not str(resume_path).startswith(str(uploads_resolved)):
                raise HTTPException(status_code=403, detail="Access denied")
        except (ValueError, OSError):
            raise HTTPException(status_code=403, detail="Invalid file path")
        
        if not resume_path.exists():
            raise HTTPException(status_code=404, detail="Resume file not found")
        
        return FileResponse(
            path=str(resume_path),
            filename=filename,
            media_type="application/octet-stream"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error downloading resume: {e}")
        raise HTTPException(status_code=500, detail="Failed to download resume")


@api_router.post("/admin/change-password")
async def change_admin_password(password_data: AdminPasswordChange, authorization: Optional[str] = Header(None)):
    """Change admin password"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        # Validate new passwords match
        if password_data.newPassword != password_data.confirmPassword:
            raise HTTPException(status_code=400, detail="New passwords do not match")
        
        # Validate password length
        if len(password_data.newPassword) < 6:
            raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
        
        # Verify current password
        stored_username, stored_password_hash = await get_admin_credentials()
        current_hash = hash_password(password_data.currentPassword)
        
        if current_hash != stored_password_hash:
            raise HTTPException(status_code=400, detail="Current password is incorrect")
        
        # Update password in database
        new_password_hash = hash_password(password_data.newPassword)
        await db.admin_settings.update_one(
            {"type": "credentials"},
            {"$set": {
                "type": "credentials",
                "username": stored_username,
                "passwordHash": new_password_hash,
                "updatedAt": datetime.now(timezone.utc).isoformat()
            }},
            upsert=True
        )
        
        return {"success": True, "message": "Password changed successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error changing password: {e}")
        raise HTTPException(status_code=500, detail="Failed to change password")


@api_router.get("/admin/settings")
async def get_admin_settings(authorization: Optional[str] = Header(None)):
    """Get admin settings"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        stored_username, _ = await get_admin_credentials()
        return {"username": stored_username}
    except Exception as e:
        logging.error(f"Error fetching admin settings: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch settings")


@api_router.get("/admin/export/careers/filtered")
async def export_filtered_careers(
    authorization: Optional[str] = Header(None),
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None
):
    """Export filtered career applications as CSV"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        import csv
        import io
        
        query = {}
        if status:
            query["status"] = status
        if start_date:
            query["appliedAt"] = query.get("appliedAt", {})
            query["appliedAt"]["$gte"] = start_date
        if end_date:
            query["appliedAt"] = query.get("appliedAt", {})
            query["appliedAt"]["$lte"] = end_date + "T23:59:59"
        if search:
            safe_search = sanitize_regex_input(search)
            query["$or"] = [
                {"firstName": {"$regex": safe_search, "$options": "i"}},
                {"lastName": {"$regex": safe_search, "$options": "i"}},
                {"email": {"$regex": safe_search, "$options": "i"}},
                {"jobTitle": {"$regex": safe_search, "$options": "i"}}
            ]
        
        data = await db.job_applications.find(query, {"_id": 0}).sort("appliedAt", -1).to_list(100000)
        
        headers = ["First Name", "Last Name", "Email", "Phone", "Location", "Job Title", "LinkedIn", "Status", "Applied At"]
        rows = [[d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), d.get("phone", ""), d.get("location", ""), d.get("jobTitle", ""), d.get("linkedInProfile", ""), d.get("status", ""), d.get("appliedAt", "")] for d in data]
        
        filename = f"career_applications_filtered_{datetime.now(timezone.utc).strftime('%Y%m%d')}.csv"
        
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(headers)
        writer.writerows(rows)
        
        csv_content = output.getvalue()
        return Response(
            content=csv_content,
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error exporting filtered careers: {e}")
        raise HTTPException(status_code=500, detail="Failed to export filtered data")


@api_router.get("/admin/export/{data_type}")
async def export_data(data_type: str, authorization: Optional[str] = Header(None)):
    """Export data as CSV"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    # Validate data_type to prevent enumeration
    valid_types = {"footer", "contact", "careers", "get_in_touch", "project_enquiry", "all"}
    if data_type not in valid_types:
        raise HTTPException(status_code=400, detail="Invalid export type")
    
    try:
        import csv
        import io
        
        if data_type == "project_enquiry":
            data = await db.project_enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(100000)
            fields = ["full_name", "email", "phone", "company", "job_title", "country", "city", "budget", "message", "privacy_consent", "marketing_consent", "status", "created_at"]
            headers = [field.replace("_", " ").title() for field in fields]
            rows = [[d.get(field, "") if field not in ("privacy_consent", "marketing_consent") else ("Yes" if d.get(field) else "No") for field in fields] for d in data]
            filename = "project_enquiries_export.csv"

        elif data_type == "get_in_touch":
            data = await db.contact_enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(100000)
            headers = ["First Name", "Last Name", "Company Email", "Role", "Project Details", "Marketing Consent", "Status", "Created At"]
            rows = [[d.get("first_name", ""), d.get("last_name", ""), d.get("company_email", ""), d.get("role", ""), d.get("project_details", ""), "Yes" if d.get("marketing_consent") else "No", d.get("status", ""), d.get("created_at", "")] for d in data]
            filename = "get_in_touch_export.csv"
            
        elif data_type == "footer":
            # Export footer form submissions
            data = await db.contacts.find({"type": "footer_form"}, {"_id": 0}).sort("createdAt", -1).to_list(100000)
            headers = ["First Name", "Last Name", "Email", "Message", "Created At"]
            rows = [[d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), d.get("message", ""), d.get("createdAt", "")] for d in data]
            filename = "footer_forms_export.csv"
            
        elif data_type == "contact":
            # Export contact form submissions
            data = await db.contacts.find({"type": {"$in": ["contact_us", "contact_sales", "general_enquiry"]}}, {"_id": 0}).sort("createdAt", -1).to_list(100000)
            headers = ["Type", "First Name", "Last Name", "Email", "Company", "Phone", "Message", "Country", "Job Title", "Purpose", "Created At"]
            rows = [[d.get("type", ""), d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), d.get("company", ""), d.get("phone", ""), d.get("message", ""), d.get("country", ""), d.get("jobTitle", ""), d.get("purpose", ""), d.get("createdAt", "")] for d in data]
            filename = "contact_forms_export.csv"
            
        elif data_type == "careers":
            # Export job applications
            data = await db.job_applications.find({}, {"_id": 0}).sort("appliedAt", -1).to_list(100000)
            headers = ["First Name", "Last Name", "Email", "Phone", "Location", "Job Title", "LinkedIn", "Status", "Applied At"]
            rows = [[d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), d.get("phone", ""), d.get("location", ""), d.get("jobTitle", ""), d.get("linkedInProfile", ""), d.get("status", ""), d.get("appliedAt", "")] for d in data]
            filename = "career_applications_export.csv"
            
        elif data_type == "all":
            # Export all data combined
            footer_data = await db.contacts.find({"type": "footer_form"}, {"_id": 0}).to_list(100000)
            contact_data = await db.contacts.find({"type": {"$in": ["contact_us", "contact_sales", "general_enquiry"]}}, {"_id": 0}).to_list(100000)
            career_data = await db.job_applications.find({}, {"_id": 0}).to_list(100000)
            
            headers = ["Source", "Type", "First Name", "Last Name", "Email", "Phone", "Company", "Message", "Job Title", "Status", "Created At"]
            rows = []
            
            for d in footer_data:
                rows.append(["Footer Form", d.get("type", ""), d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), "", "", d.get("message", ""), "", "", d.get("createdAt", "")])
            
            for d in contact_data:
                rows.append(["Contact Form", d.get("type", ""), d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), d.get("phone", ""), d.get("company", ""), d.get("message", ""), d.get("jobTitle", ""), "", d.get("createdAt", "")])
            
            for d in career_data:
                rows.append(["Career Application", "job_application", d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), d.get("phone", ""), "", "", d.get("jobTitle", ""), d.get("status", ""), d.get("appliedAt", "")])
            
            git_data = await db.contact_enquiries.find({}, {"_id": 0}).to_list(100000)
            for d in git_data:
                rows.append(["Get in Touch", "get_in_touch", d.get("first_name", ""), d.get("last_name", ""), d.get("company_email", ""), "", "", d.get("project_details", ""), d.get("role", ""), d.get("status", ""), d.get("created_at", "")])
            
            headers.append("Budget")
            rows = [row + [""] for row in rows]
            project_data = await db.project_enquiries.find({}, {"_id": 0}).to_list(100000)
            for d in project_data:
                rows.append(["Project Enquiry", "project_enquiry", d.get("full_name", ""), "", d.get("email", ""), d.get("phone", ""), d.get("company", ""), d.get("message", ""), d.get("job_title", ""), d.get("status", ""), d.get("created_at", ""), d.get("budget", "")])
            filename = "all_submissions_export.csv"
        else:
            raise HTTPException(status_code=400, detail="Invalid data type")
        
        # Create CSV in memory
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(headers)
        if data_type in ("project_enquiry", "all"):
            # Treat user-entered text as text, never spreadsheet formulas.
            rows = [[("'" + str(value)) if str(value).lstrip().startswith(("=", "+", "-", "@")) else value for value in row] for row in rows]
        writer.writerows(rows)
        
        # Return as downloadable file
        csv_content = output.getvalue()
        return Response(
            content=csv_content,
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error exporting data: {e}")
        raise HTTPException(status_code=500, detail="Failed to export data")


@api_router.post("/admin/cleanup-duplicates")
async def cleanup_duplicate_records(authorization: Optional[str] = Header(None)):
    """
    Clean up duplicate records from all collections.
    Keeps only the first (oldest) record for each unique combination.
    """
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        cleanup_results = {
            "contacts": {"duplicates_found": 0, "duplicates_removed": 0},
            "job_applications": {"duplicates_found": 0, "duplicates_removed": 0},
            "footer_forms": {"duplicates_found": 0, "duplicates_removed": 0}
        }
        
        # 1. Clean up contacts collection - unique by email + type
        contacts_pipeline = [
            {"$group": {
                "_id": {"email": {"$toLower": "$email"}, "type": "$type"},
                "count": {"$sum": 1},
                "ids": {"$push": "$id"},
                "docs": {"$push": "$$ROOT"}
            }},
            {"$match": {"count": {"$gt": 1}}}
        ]
        
        contact_duplicates = await db.contacts.aggregate(contacts_pipeline).to_list(None)
        for dup_group in contact_duplicates:
            cleanup_results["contacts"]["duplicates_found"] += dup_group["count"] - 1
            # Keep the first one (oldest), remove the rest
            ids_to_remove = dup_group["ids"][1:]  # Skip first
            for id_to_remove in ids_to_remove:
                await db.contacts.delete_one({"id": id_to_remove})
                cleanup_results["contacts"]["duplicates_removed"] += 1
        
        # 2. Clean up job_applications collection - unique by email + jobTitle
        job_pipeline = [
            {"$group": {
                "_id": {"email": {"$toLower": "$email"}, "jobTitle": "$jobTitle"},
                "count": {"$sum": 1},
                "ids": {"$push": "$id"},
                "docs": {"$push": "$$ROOT"}
            }},
            {"$match": {"count": {"$gt": 1}}}
        ]
        
        job_duplicates = await db.job_applications.aggregate(job_pipeline).to_list(None)
        for dup_group in job_duplicates:
            cleanup_results["job_applications"]["duplicates_found"] += dup_group["count"] - 1
            # Keep the first one (oldest), remove the rest
            ids_to_remove = dup_group["ids"][1:]  # Skip first
            for id_to_remove in ids_to_remove:
                # Also delete resume file if exists
                app_doc = await db.job_applications.find_one({"id": id_to_remove})
                if app_doc and app_doc.get("resumeCV"):
                    resume_path = Path(app_doc["resumeCV"])
                    if resume_path.exists():
                        resume_path.unlink()
                await db.job_applications.delete_one({"id": id_to_remove})
                cleanup_results["job_applications"]["duplicates_removed"] += 1
        
        # 3. Clean up footer_forms collection (legacy) - unique by email
        footer_pipeline = [
            {"$group": {
                "_id": {"email": {"$toLower": "$email"}},
                "count": {"$sum": 1},
                "ids": {"$push": "$id"}
            }},
            {"$match": {"count": {"$gt": 1}}}
        ]
        
        footer_duplicates = await db.footer_forms.aggregate(footer_pipeline).to_list(None)
        for dup_group in footer_duplicates:
            cleanup_results["footer_forms"]["duplicates_found"] += dup_group["count"] - 1
            ids_to_remove = dup_group["ids"][1:]
            for id_to_remove in ids_to_remove:
                if id_to_remove:  # Some old records might not have id
                    await db.footer_forms.delete_one({"id": id_to_remove})
                    cleanup_results["footer_forms"]["duplicates_removed"] += 1
        
        total_found = sum(r["duplicates_found"] for r in cleanup_results.values())
        total_removed = sum(r["duplicates_removed"] for r in cleanup_results.values())
        
        return {
            "success": True,
            "message": f"Cleanup complete. Found {total_found} duplicates, removed {total_removed}.",
            "details": cleanup_results
        }
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error during duplicate cleanup: {e}")
        raise HTTPException(status_code=500, detail="Failed to cleanup duplicates")


# Include the router in the main app
app.include_router(api_router)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_storage_init():
    try:
        init_storage()
        logging.info("Object storage initialized")
    except Exception as e:
        logging.error(f"Object storage init failed (will retry on first use): {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()