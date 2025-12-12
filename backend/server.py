from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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

# Contact Form Endpoint
@api_router.post("/contact")
async def submit_contact_form(form: ContactForm):
    try:
        doc = form.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.contact_forms.insert_one(doc)
        return {"message": "Contact form submitted successfully", "id": form.id}
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit form")

@api_router.get("/contact/submissions")
async def get_contact_submissions():
    submissions = await db.contact_forms.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for submission in submissions:
        if isinstance(submission['created_at'], str):
            submission['created_at'] = datetime.fromisoformat(submission['created_at'])
    return submissions

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