#!/usr/bin/env python3
"""
Verify data persistence in MongoDB for BluBrg backend
"""

import requests
import json

BACKEND_URL = "https://design-sprint-2.preview.emergentagent.com/api"

def verify_data_persistence():
    print("🔍 Verifying Data Persistence in MongoDB")
    print("=" * 50)
    
    # Check newsletter subscribers
    try:
        response = requests.get(f"{BACKEND_URL}/newsletter/subscribers", timeout=30)
        if response.status_code == 200:
            subscribers = response.json()
            print(f"✅ Newsletter Subscribers: {len(subscribers)} records found")
            if subscribers:
                latest = subscribers[0]
                print(f"   Latest: {latest.get('firstName')} {latest.get('lastName')} ({latest.get('email')})")
        else:
            print(f"❌ Newsletter Subscribers: HTTP {response.status_code}")
    except Exception as e:
        print(f"❌ Newsletter Subscribers: {str(e)}")
    
    # Check contact form submissions
    try:
        response = requests.get(f"{BACKEND_URL}/contact/submissions", timeout=30)
        if response.status_code == 200:
            submissions = response.json()
            print(f"✅ Contact Submissions: {len(submissions)} records found")
            if submissions:
                latest = submissions[0]
                print(f"   Latest: {latest.get('firstName')} {latest.get('lastName')} from {latest.get('company', 'N/A')}")
        else:
            print(f"❌ Contact Submissions: HTTP {response.status_code}")
    except Exception as e:
        print(f"❌ Contact Submissions: {str(e)}")
    
    # Check blog posts
    try:
        response = requests.get(f"{BACKEND_URL}/blog/posts", timeout=30)
        if response.status_code == 200:
            posts = response.json()
            print(f"✅ Blog Posts: {len(posts)} records found")
            if posts:
                for i, post in enumerate(posts[:3], 1):
                    print(f"   {i}. {post.get('title')} (slug: {post.get('slug')})")
        else:
            print(f"❌ Blog Posts: HTTP {response.status_code}")
    except Exception as e:
        print(f"❌ Blog Posts: {str(e)}")

if __name__ == "__main__":
    verify_data_persistence()