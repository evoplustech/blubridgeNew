#!/usr/bin/env python3
"""
Backend API Testing Suite for BluBrg Website
Tests all backend API endpoints for functionality and data integrity
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL from frontend/.env
BACKEND_URL = "https://aicompute.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'details': details,
            'timestamp': datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        if not success:
            self.failed_tests.append(result)
            
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details:
            print(f"   Details: {details}")
    
    def test_newsletter_subscription(self):
        """Test Newsletter Subscription API"""
        print("\n=== Testing Newsletter Subscription API ===")
        
        # Test 1: Valid subscription
        test_email = f"test.user.{uuid.uuid4().hex[:8]}@blubrg.com"
        payload = {
            "email": test_email,
            "firstName": "John",
            "lastName": "Doe"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/newsletter/subscribe", json=payload, timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "id" in data:
                    self.log_test("Newsletter Valid Subscription", True, 
                                f"Successfully subscribed {test_email}")
                else:
                    self.log_test("Newsletter Valid Subscription", False, 
                                "Missing required fields in response", data)
            else:
                self.log_test("Newsletter Valid Subscription", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Newsletter Valid Subscription", False, f"Request failed: {str(e)}")
        
        # Test 2: Duplicate email prevention
        try:
            response = requests.post(f"{BACKEND_URL}/newsletter/subscribe", json=payload, timeout=30)
            if response.status_code == 400:
                data = response.json()
                if "already subscribed" in data.get("detail", "").lower():
                    self.log_test("Newsletter Duplicate Prevention", True, 
                                "Correctly prevented duplicate subscription")
                else:
                    self.log_test("Newsletter Duplicate Prevention", False, 
                                "Wrong error message for duplicate", data)
            else:
                self.log_test("Newsletter Duplicate Prevention", False, 
                            f"Expected 400, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Newsletter Duplicate Prevention", False, f"Request failed: {str(e)}")
        
        # Test 3: Invalid email format
        invalid_payload = {
            "email": "invalid-email",
            "firstName": "Test",
            "lastName": "User"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/newsletter/subscribe", json=invalid_payload, timeout=30)
            if response.status_code == 422:  # Pydantic validation error
                self.log_test("Newsletter Invalid Email", True, 
                            "Correctly rejected invalid email format")
            else:
                self.log_test("Newsletter Invalid Email", False, 
                            f"Expected 422, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Newsletter Invalid Email", False, f"Request failed: {str(e)}")
    
    def test_contact_form(self):
        """Test Contact Form API"""
        print("\n=== Testing Contact Form API ===")
        
        # Test 1: Complete form submission
        complete_payload = {
            "firstName": "Jane",
            "lastName": "Smith",
            "email": f"jane.smith.{uuid.uuid4().hex[:8]}@company.com",
            "company": "Tech Corp",
            "phone": "+1-555-0123",
            "message": "I'm interested in your AI data centre solutions for our enterprise needs.",
            "interest": "enterprise"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contact", json=complete_payload, timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "id" in data:
                    self.log_test("Contact Form Complete", True, 
                                "Successfully submitted complete contact form")
                else:
                    self.log_test("Contact Form Complete", False, 
                                "Missing required fields in response", data)
            else:
                self.log_test("Contact Form Complete", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Contact Form Complete", False, f"Request failed: {str(e)}")
        
        # Test 2: Minimal required fields only
        minimal_payload = {
            "firstName": "Bob",
            "lastName": "Johnson",
            "email": f"bob.johnson.{uuid.uuid4().hex[:8]}@email.com",
            "message": "Quick question about your services."
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contact", json=minimal_payload, timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "id" in data:
                    self.log_test("Contact Form Minimal", True, 
                                "Successfully submitted minimal contact form")
                else:
                    self.log_test("Contact Form Minimal", False, 
                                "Missing required fields in response", data)
            else:
                self.log_test("Contact Form Minimal", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Contact Form Minimal", False, f"Request failed: {str(e)}")
        
        # Test 3: Invalid email in contact form
        invalid_contact_payload = {
            "firstName": "Test",
            "lastName": "User",
            "email": "not-an-email",
            "message": "Test message"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contact", json=invalid_contact_payload, timeout=30)
            if response.status_code == 422:  # Pydantic validation error
                self.log_test("Contact Form Invalid Email", True, 
                            "Correctly rejected invalid email in contact form")
            else:
                self.log_test("Contact Form Invalid Email", False, 
                            f"Expected 422, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Contact Form Invalid Email", False, f"Request failed: {str(e)}")
    
    def test_blog_posts_list(self):
        """Test Blog Posts List API"""
        print("\n=== Testing Blog Posts List API ===")
        
        try:
            response = requests.get(f"{BACKEND_URL}/blog/posts", timeout=30)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) >= 3:
                        # Check if posts have required fields
                        required_fields = ['title', 'slug', 'excerpt', 'content', 'image', 'author', 'created_at']
                        all_posts_valid = True
                        missing_fields = []
                        
                        for i, post in enumerate(data[:3]):  # Check first 3 posts
                            for field in required_fields:
                                if field not in post:
                                    all_posts_valid = False
                                    missing_fields.append(f"Post {i+1} missing '{field}'")
                        
                        if all_posts_valid:
                            self.log_test("Blog Posts List", True, 
                                        f"Successfully retrieved {len(data)} blog posts with all required fields")
                        else:
                            self.log_test("Blog Posts List", False, 
                                        "Posts missing required fields", missing_fields)
                    else:
                        self.log_test("Blog Posts List", False, 
                                    f"Expected at least 3 posts, got {len(data)}")
                else:
                    self.log_test("Blog Posts List", False, 
                                "Response is not a list", type(data))
            else:
                self.log_test("Blog Posts List", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Blog Posts List", False, f"Request failed: {str(e)}")
    
    def test_blog_post_by_slug(self):
        """Test Blog Post by Slug API"""
        print("\n=== Testing Blog Post by Slug API ===")
        
        # First, get the list of posts to find valid slugs
        valid_slugs = []
        try:
            response = requests.get(f"{BACKEND_URL}/blog/posts", timeout=30)
            if response.status_code == 200:
                posts = response.json()
                valid_slugs = [post.get('slug') for post in posts if post.get('slug')]
        except:
            pass
        
        # Test 1: Valid slug (try the specific one mentioned in requirements)
        test_slug = "building-tomorrows-ai-data-centres"
        
        try:
            response = requests.get(f"{BACKEND_URL}/blog/posts/{test_slug}", timeout=30)
            if response.status_code == 200:
                data = response.json()
                required_fields = ['title', 'slug', 'excerpt', 'content', 'image', 'author']
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    self.log_test("Blog Post Valid Slug", True, 
                                f"Successfully retrieved post with slug '{test_slug}'")
                else:
                    self.log_test("Blog Post Valid Slug", False, 
                                f"Post missing required fields: {missing_fields}")
            elif response.status_code == 404:
                # Try with any available slug if the specific one doesn't exist
                if valid_slugs:
                    test_slug = valid_slugs[0]
                    response = requests.get(f"{BACKEND_URL}/blog/posts/{test_slug}", timeout=30)
                    if response.status_code == 200:
                        self.log_test("Blog Post Valid Slug", True, 
                                    f"Successfully retrieved post with available slug '{test_slug}'")
                    else:
                        self.log_test("Blog Post Valid Slug", False, 
                                    f"Failed to retrieve post even with valid slug: {response.status_code}")
                else:
                    self.log_test("Blog Post Valid Slug", False, 
                                f"Specific slug '{test_slug}' not found and no other posts available")
            else:
                self.log_test("Blog Post Valid Slug", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Blog Post Valid Slug", False, f"Request failed: {str(e)}")
        
        # Test 2: Invalid slug (should return 404)
        invalid_slug = "non-existent-blog-post-slug-12345"
        
        try:
            response = requests.get(f"{BACKEND_URL}/blog/posts/{invalid_slug}", timeout=30)
            if response.status_code == 404:
                self.log_test("Blog Post Invalid Slug", True, 
                            "Correctly returned 404 for invalid slug")
            else:
                self.log_test("Blog Post Invalid Slug", False, 
                            f"Expected 404, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Blog Post Invalid Slug", False, f"Request failed: {str(e)}")
    
    def test_api_root(self):
        """Test API root endpoint"""
        print("\n=== Testing API Root Endpoint ===")
        
        try:
            response = requests.get(f"{BACKEND_URL}/", timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_test("API Root", True, "API root endpoint responding correctly")
                else:
                    self.log_test("API Root", False, "Unexpected response format", data)
            else:
                self.log_test("API Root", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("API Root", False, f"Request failed: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for BluBrg Website")
        print(f"Backend URL: {BACKEND_URL}")
        print("=" * 60)
        
        # Run all test suites
        self.test_api_root()
        self.test_newsletter_subscription()
        self.test_contact_form()
        self.test_blog_posts_list()
        self.test_blog_post_by_slug()
        
        # Print summary
        print("\n" + "=" * 60)
        print("🏁 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = total_tests - len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['message']}")
                if test['details']:
                    print(f"    Details: {test['details']}")
        else:
            print("\n🎉 All tests passed!")
        
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)