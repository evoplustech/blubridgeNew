from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone
import httpx
import asyncio


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
    
    type: Literal["contact_sales", "general_enquiry", "contact_us"]
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
            "contact_us": "Contact Us"
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
        
        return {"message": "Contact form submitted successfully", "id": form.id}
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit form")


# NEW: Unified Contact Submission Endpoint
@api_router.post("/contacts/submit")
async def submit_unified_contact(submission: ContactSubmission):
    """
    Unified contact submission endpoint.
    Requires 'type' field: contact_sales, general_enquiry, or contact_us
    """
    try:
        # Build document with only non-null fields
        doc = {"type": submission.type}
        
        # Add all provided fields (exclude None values)
        submission_dict = submission.model_dump()
        for key, value in submission_dict.items():
            if value is not None:
                if isinstance(value, datetime):
                    doc[key] = value.isoformat()
                else:
                    doc[key] = value
        
        # Ensure createdAt is set
        if 'createdAt' not in doc:
            doc['createdAt'] = datetime.now(timezone.utc).isoformat()
        
        # Save to unified 'contacts' collection
        await db.contacts.insert_one(doc)
        
        # Send email notification (non-blocking)
        await send_email_notification(submission.type, doc)
        
        return {"message": "Form submitted successfully", "id": submission.id, "type": submission.type}
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