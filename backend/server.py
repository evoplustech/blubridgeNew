from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form, Depends, Response, Header
from fastapi.responses import JSONResponse, FileResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone, timedelta
import httpx
import asyncio
import base64
import re
import secrets
import hashlib
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Brevo (Sendinblue) Email configuration
BREVO_API_KEY = os.environ.get('Backend-Email-Key', '')
BREVO_SENDER_EMAIL = "blazecoder3@gmail.com"
BREVO_RECIPIENT_EMAIL = "info@blubrg.com"

# Gmail SMTP Configuration (for form submission notifications)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_FROM_EMAIL = "blubridgenoreply@gmail.com"
SMTP_TO_EMAIL = "contact@blubridge.ai"
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


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
                "name": "BluBrg Website",
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
    """Send email notification via Gmail SMTP. Does not block API response."""
    
    def _send_smtp_email():
        """Synchronous SMTP send - runs in thread pool"""
        try:
            if not SMTP_PASSWORD:
                logging.warning("SMTP_PASSWORD not configured, skipping Gmail notification")
                return
            
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
            
            # Create email message
            msg = MIMEMultipart()
            msg['From'] = SMTP_FROM_EMAIL
            msg['To'] = SMTP_TO_EMAIL
            msg['Subject'] = subject
            msg.attach(MIMEText(body, 'plain'))
            
            # Send via Gmail SMTP with TLS
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.starttls()
                server.login(SMTP_FROM_EMAIL, SMTP_PASSWORD)
                server.sendmail(SMTP_FROM_EMAIL, SMTP_TO_EMAIL, msg.as_string())
            
            logging.info(f"Gmail notification sent for {form_type_label}")
            
        except smtplib.SMTPAuthenticationError as e:
            logging.error(f"Gmail SMTP authentication failed: {e}")
        except smtplib.SMTPException as e:
            logging.error(f"Gmail SMTP error: {e}")
        except Exception as e:
            logging.error(f"Failed to send Gmail notification: {e}")
    
    # Run SMTP send in background thread to not block async code
    try:
        loop = asyncio.get_event_loop()
        loop.run_in_executor(None, _send_smtp_email)
    except Exception as e:
        logging.error(f"Error scheduling Gmail notification: {e}")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

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
async def get_status_checks():
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
    """Legacy endpoint - converts old format to new unified contacts collection"""
    try:
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
            "email": form.email,
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
        
        # Send email notification (non-blocking)
        await send_email_notification(form_type, doc)
        await send_gmail_notification(form_type, doc)
        
        return {"message": "Contact form submitted successfully", "id": form.id}
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
        
        # Send email notification (non-blocking)
        await send_email_notification(submission.type, doc)
        await send_gmail_notification(submission.type, doc)
        
        return {"message": "Form submitted successfully", "id": doc.get("id"), "type": submission.type}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit form")


# Contact Us (Footer Form) - Simple endpoint
@api_router.post("/contact-us")
async def submit_contact_us(firstName: Optional[str] = None, lastName: Optional[str] = None, email: str = None, message: Optional[str] = None):
    """Simple Contact Us form (footer) endpoint"""
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
        doc = {
            "type": "contact_us",
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "message": message,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "id": str(uuid.uuid4())
        }
        
        # Remove None values
        doc = {k: v for k, v in doc.items() if v is not None}
        doc["type"] = "contact_us"  # Ensure type is always set
        
        # Save to unified 'contacts' collection
        await db.contacts.insert_one(doc)
        
        # Send email notification (non-blocking)
        await send_email_notification("contact_us", doc)
        await send_gmail_notification("contact_us", doc)
        
        return {"message": "Contact form submitted successfully", "id": doc["id"]}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error submitting contact us form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit form")


@api_router.get("/contact/submissions")
async def get_contact_submissions():
    """Get all submissions from legacy contact_forms collection"""
    submissions = await db.contact_forms.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for submission in submissions:
        if isinstance(submission.get('created_at'), str):
            submission['created_at'] = datetime.fromisoformat(submission['created_at'])
    return submissions


# NEW: Get all contacts from unified collection
@api_router.get("/contacts")
async def get_all_contacts(type: Optional[str] = None, limit: int = 100):
    """Get contacts from unified collection, optionally filtered by type"""
    query = {}
    if type:
        query["type"] = type
    
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
async def get_newsletter_subscribers():
    subscribers = await db.newsletter_subscribers.find({}, {"_id": 0}).sort("subscribed_at", -1).to_list(1000)
    for subscriber in subscribers:
        if isinstance(subscriber['subscribed_at'], str):
            subscriber['subscribed_at'] = datetime.fromisoformat(subscriber['subscribed_at'])
    return subscribers

# Blog Posts
@api_router.post("/blog/posts", response_model=BlogPost)
async def create_blog_post(post: BlogPostCreate):
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

# Allowed file extensions and max file size
ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def validate_file(filename: str, file_size: int) -> tuple[bool, str]:
    """Validate uploaded file"""
    # Check file extension
    ext = Path(filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        return False, "Invalid file type. Allowed types: PDF, DOC, DOCX"
    
    # Check file size
    if file_size > MAX_FILE_SIZE:
        return False, "File too large. Maximum size: 5MB"
    
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
            
            is_valid, error_msg = validate_file(resume.filename, file_size)
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
        file_path = UPLOADS_DIR / unique_filename
        
        # Save the file
        file_content = await resume.read()
        with open(file_path, 'wb') as f:
            f.write(file_content)
        
        # Create application document
        application_id = str(uuid.uuid4())
        application_doc = {
            "id": application_id,
            "firstName": firstName.strip(),
            "lastName": lastName.strip(),
            "email": email.strip().lower(),
            "phone": phone.strip(),
            "location": location.strip(),
            "resumeCV": str(file_path),
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
        await send_email_notification("job_application", email_data)
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
async def get_job_applications(status: Optional[str] = None, limit: int = 100):
    """Get all job applications, optionally filtered by status"""
    try:
        query = {}
        if status:
            query["status"] = status
        
        applications = await db.job_applications.find(query, {"_id": 0}).sort("appliedAt", -1).to_list(limit)
        return applications
    except Exception as e:
        logging.error(f"Error fetching job applications: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch applications")


@api_router.get("/job-applications/{application_id}")
async def get_job_application(application_id: str):
    """Get a single job application by ID"""
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
async def update_application_status(application_id: str, status: str):
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
    """Hash password using SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def generate_admin_token():
    """Generate a secure admin token"""
    return secrets.token_urlsafe(32)

def verify_admin_token(token: str) -> bool:
    """Verify if admin token is valid"""
    return token in admin_tokens

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
async def admin_login(credentials: AdminLogin):
    """Admin login endpoint"""
    stored_username, stored_password_hash = await get_admin_credentials()
    input_password_hash = hash_password(credentials.password)
    
    if credentials.username == stored_username and input_password_hash == stored_password_hash:
        token = generate_admin_token()
        admin_tokens[token] = {
            "username": credentials.username,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        return {"token": token, "message": "Login successful"}
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
        
        # Get new (unviewed) counts
        footer_new = await db.contacts.count_documents({"type": "footer_form", "status": {"$ne": "viewed"}})
        contact_new = await db.contacts.count_documents({"type": {"$in": ["contact_us", "contact_sales", "general_enquiry"]}, "status": {"$ne": "viewed"}})
        careers_new = await db.job_applications.count_documents({"status": "pending"})
        
        return {
            "footer_forms": {"total": footer_count, "new": footer_new},
            "contact_forms": {"total": contact_count, "new": contact_new},
            "career_applications": {"total": careers_count, "new": careers_new},
            "total_submissions": footer_count + contact_count + careers_count
        }
    except Exception as e:
        logging.error(f"Error fetching admin stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch stats")


@api_router.get("/admin/submissions/footer")
async def get_footer_submissions(authorization: Optional[str] = Header(None), limit: int = 100, search: Optional[str] = None):
    """Get footer form submissions"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        query = {"type": "footer_form"}
        if search:
            query["$or"] = [
                {"firstName": {"$regex": search, "$options": "i"}},
                {"lastName": {"$regex": search, "$options": "i"}},
                {"email": {"$regex": search, "$options": "i"}}
            ]
        
        submissions = await db.contacts.find(query, {"_id": 0}).sort("createdAt", -1).to_list(limit)
        return submissions
    except Exception as e:
        logging.error(f"Error fetching footer submissions: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")


@api_router.get("/admin/submissions/contact")
async def get_contact_submissions_admin(authorization: Optional[str] = Header(None), limit: int = 100, search: Optional[str] = None):
    """Get contact form submissions (contact page, sales & general enquiry)"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        query = {"type": {"$in": ["contact_us", "contact_sales", "general_enquiry"]}}
        if search:
            query["$or"] = [
                {"firstName": {"$regex": search, "$options": "i"}},
                {"lastName": {"$regex": search, "$options": "i"}},
                {"email": {"$regex": search, "$options": "i"}},
                {"company": {"$regex": search, "$options": "i"}}
            ]
        
        submissions = await db.contacts.find(query, {"_id": 0}).sort("createdAt", -1).to_list(limit)
        return submissions
    except Exception as e:
        logging.error(f"Error fetching contact submissions: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")


@api_router.get("/admin/submissions/careers")
async def get_career_applications_admin(authorization: Optional[str] = Header(None), limit: int = 100, search: Optional[str] = None, status: Optional[str] = None, start_date: Optional[str] = None, end_date: Optional[str] = None):
    """Get career applications with optional date range filter"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        query = {}
        if status:
            query["status"] = status
        if search:
            query["$or"] = [
                {"firstName": {"$regex": search, "$options": "i"}},
                {"lastName": {"$regex": search, "$options": "i"}},
                {"email": {"$regex": search, "$options": "i"}},
                {"jobTitle": {"$regex": search, "$options": "i"}}
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
        
        applications = await db.job_applications.find(query, {"_id": 0}).sort("appliedAt", -1).to_list(limit)
        return applications
    except Exception as e:
        logging.error(f"Error fetching career applications: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch applications")


@api_router.get("/admin/submission/{submission_id}")
async def get_submission_detail(submission_id: str, form_type: str, authorization: Optional[str] = Header(None)):
    """Get a single submission detail and mark as viewed"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
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
    
    try:
        if form_type == "careers":
            # Delete from job_applications and remove resume file
            application = await db.job_applications.find_one({"id": submission_id})
            if application and application.get("resumeCV"):
                resume_path = Path(application["resumeCV"])
                if resume_path.exists():
                    resume_path.unlink()
            result = await db.job_applications.delete_one({"id": submission_id})
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
        
        resume_path = Path(application.get("resumeCV", ""))
        if not resume_path.exists():
            raise HTTPException(status_code=404, detail="Resume file not found")
        
        filename = application.get("resumeFilename", "resume.pdf")
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


@api_router.get("/admin/export/{data_type}")
async def export_data(data_type: str, authorization: Optional[str] = Header(None)):
    """Export data as CSV"""
    token = authorization[7:] if authorization and authorization.startswith("Bearer ") else authorization
    if not token or not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        import csv
        import io
        
        if data_type == "footer":
            # Export footer form submissions
            data = await db.contacts.find({"type": "footer_form"}, {"_id": 0}).sort("createdAt", -1).to_list(10000)
            headers = ["First Name", "Last Name", "Email", "Message", "Created At"]
            rows = [[d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), d.get("message", ""), d.get("createdAt", "")] for d in data]
            filename = "footer_forms_export.csv"
            
        elif data_type == "contact":
            # Export contact form submissions
            data = await db.contacts.find({"type": {"$in": ["contact_us", "contact_sales", "general_enquiry"]}}, {"_id": 0}).sort("createdAt", -1).to_list(10000)
            headers = ["Type", "First Name", "Last Name", "Email", "Company", "Phone", "Message", "Country", "Job Title", "Purpose", "Created At"]
            rows = [[d.get("type", ""), d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), d.get("company", ""), d.get("phone", ""), d.get("message", ""), d.get("country", ""), d.get("jobTitle", ""), d.get("purpose", ""), d.get("createdAt", "")] for d in data]
            filename = "contact_forms_export.csv"
            
        elif data_type == "careers":
            # Export job applications
            data = await db.job_applications.find({}, {"_id": 0}).sort("appliedAt", -1).to_list(10000)
            headers = ["First Name", "Last Name", "Email", "Phone", "Location", "Job Title", "LinkedIn", "Status", "Applied At"]
            rows = [[d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), d.get("phone", ""), d.get("location", ""), d.get("jobTitle", ""), d.get("linkedInProfile", ""), d.get("status", ""), d.get("appliedAt", "")] for d in data]
            filename = "career_applications_export.csv"
            
        elif data_type == "all":
            # Export all data combined
            footer_data = await db.contacts.find({"type": "footer_form"}, {"_id": 0}).to_list(10000)
            contact_data = await db.contacts.find({"type": {"$in": ["contact_us", "contact_sales", "general_enquiry"]}}, {"_id": 0}).to_list(10000)
            career_data = await db.job_applications.find({}, {"_id": 0}).to_list(10000)
            
            headers = ["Source", "Type", "First Name", "Last Name", "Email", "Phone", "Company", "Message", "Job Title", "Status", "Created At"]
            rows = []
            
            for d in footer_data:
                rows.append(["Footer Form", d.get("type", ""), d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), "", "", d.get("message", ""), "", "", d.get("createdAt", "")])
            
            for d in contact_data:
                rows.append(["Contact Form", d.get("type", ""), d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), d.get("phone", ""), d.get("company", ""), d.get("message", ""), d.get("jobTitle", ""), "", d.get("createdAt", "")])
            
            for d in career_data:
                rows.append(["Career Application", "job_application", d.get("firstName", ""), d.get("lastName", ""), d.get("email", ""), d.get("phone", ""), "", "", d.get("jobTitle", ""), d.get("status", ""), d.get("appliedAt", "")])
            
            filename = "all_submissions_export.csv"
        else:
            raise HTTPException(status_code=400, detail="Invalid data type")
        
        # Create CSV in memory
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(headers)
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


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()