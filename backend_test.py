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
BACKEND_URL = "https://ui-polish-project-4.preview.emergentagent.com/api"

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
        
        # Test 1: Contact form with "general" interest
        general_payload = {
            "firstName": "TestGeneral",
            "lastName": "User",
            "email": "testgeneral@test.com",
            "company": "Test Company",
            "message": "This is a test general enquiry",
            "interest": "general"
        }
        
        general_submission_id = None
        try:
            response = requests.post(f"{BACKEND_URL}/contact", json=general_payload, timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "id" in data and data["message"] == "Contact form submitted successfully":
                    general_submission_id = data["id"]
                    self.log_test("Contact Form General Interest", True, 
                                "Successfully submitted contact form with general interest")
                else:
                    self.log_test("Contact Form General Interest", False, 
                                "Missing required fields or incorrect message in response", data)
            else:
                self.log_test("Contact Form General Interest", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Contact Form General Interest", False, f"Request failed: {str(e)}")
        
        # Test 2: Contact form with "sales" interest
        sales_payload = {
            "firstName": "TestSales",
            "lastName": "Lead",
            "email": "testsales@test.com",
            "company": "Sales Company",
            "message": "This is a test sales enquiry",
            "interest": "sales"
        }
        
        sales_submission_id = None
        try:
            response = requests.post(f"{BACKEND_URL}/contact", json=sales_payload, timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "id" in data and data["message"] == "Contact form submitted successfully":
                    sales_submission_id = data["id"]
                    self.log_test("Contact Form Sales Interest", True, 
                                "Successfully submitted contact form with sales interest")
                else:
                    self.log_test("Contact Form Sales Interest", False, 
                                "Missing required fields or incorrect message in response", data)
            else:
                self.log_test("Contact Form Sales Interest", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Contact Form Sales Interest", False, f"Request failed: {str(e)}")
        
        # Test 3: Verify submissions were stored
        try:
            response = requests.get(f"{BACKEND_URL}/contact/submissions", timeout=30)
            if response.status_code == 200:
                submissions = response.json()
                if isinstance(submissions, list):
                    # Look for our test submissions
                    general_found = False
                    sales_found = False
                    
                    for submission in submissions:
                        if (submission.get("firstName") == "TestGeneral" and 
                            submission.get("email") == "testgeneral@test.com" and
                            submission.get("interest") == "general"):
                            general_found = True
                        elif (submission.get("firstName") == "TestSales" and 
                              submission.get("email") == "testsales@test.com" and
                              submission.get("interest") == "sales"):
                            sales_found = True
                    
                    if general_found and sales_found:
                        self.log_test("Contact Submissions Verification", True, 
                                    "Both general and sales submissions found in database")
                    elif general_found:
                        self.log_test("Contact Submissions Verification", False, 
                                    "Only general submission found, sales submission missing")
                    elif sales_found:
                        self.log_test("Contact Submissions Verification", False, 
                                    "Only sales submission found, general submission missing")
                    else:
                        self.log_test("Contact Submissions Verification", False, 
                                    "Neither test submission found in database")
                else:
                    self.log_test("Contact Submissions Verification", False, 
                                "Response is not a list", type(submissions))
            else:
                self.log_test("Contact Submissions Verification", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Contact Submissions Verification", False, f"Request failed: {str(e)}")
        
        # Test 4: Invalid email in contact form
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
    
    def test_restructured_contact_form_apis(self):
        """Test the new restructured contact form APIs"""
        print("\n=== Testing Restructured Contact Form APIs ===")
        
        # Test 1: POST /api/contacts/submit with type "contact_sales"
        sales_payload = {
            "type": "contact_sales",
            "firstName": "SalesTest",
            "lastName": "User",
            "email": "salestest@company.com",
            "company": "TestCorp",
            "country": "UK",
            "jobTitle": "VP Engineering",
            "purpose": "pricing",
            "useCase": "Training",
            "gpuType": "A100",
            "expectedGpuCount": "50",
            "projectStartTimeline": "Q2 2025",
            "heardAbout": "Google",
            "message": "Looking for GPU clusters"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contacts/submit", json=sales_payload, timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "type" in data and data["type"] == "contact_sales" and "message" in data and "id" in data:
                    self.log_test("Contact Sales Submission", True, 
                                "Successfully submitted contact_sales form with all fields")
                else:
                    self.log_test("Contact Sales Submission", False, 
                                "Missing required fields or incorrect type in response", data)
            else:
                self.log_test("Contact Sales Submission", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Contact Sales Submission", False, f"Request failed: {str(e)}")
        
        # Test 2: POST /api/contacts/submit with type "general_enquiry"
        enquiry_payload = {
            "type": "general_enquiry",
            "firstName": "EnquiryTest",
            "lastName": "User",
            "email": "enquiry@test.com",
            "company": "TestStartup",
            "message": "General question about services"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contacts/submit", json=enquiry_payload, timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "type" in data and data["type"] == "general_enquiry" and "message" in data and "id" in data:
                    self.log_test("General Enquiry Submission", True, 
                                "Successfully submitted general_enquiry form")
                else:
                    self.log_test("General Enquiry Submission", False, 
                                "Missing required fields or incorrect type in response", data)
            else:
                self.log_test("General Enquiry Submission", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("General Enquiry Submission", False, f"Request failed: {str(e)}")
        
        # Test 3: POST /api/contacts/submit with type "contact_us"
        contact_us_payload = {
            "type": "contact_us",
            "firstName": "Footer",
            "lastName": "Test",
            "email": "footer@test.com",
            "message": "Testing footer form"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contacts/submit", json=contact_us_payload, timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "type" in data and data["type"] == "contact_us" and "message" in data and "id" in data:
                    self.log_test("Contact Us Submission", True, 
                                "Successfully submitted contact_us form")
                else:
                    self.log_test("Contact Us Submission", False, 
                                "Missing required fields or incorrect type in response", data)
            else:
                self.log_test("Contact Us Submission", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Contact Us Submission", False, f"Request failed: {str(e)}")
        
        # Test 4: GET /api/contacts - should return array of contact submissions with "type" field
        try:
            response = requests.get(f"{BACKEND_URL}/contacts", timeout=30)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check if our test submissions are present and have type field
                    has_type_field = True
                    test_submissions_found = 0
                    
                    for contact in data:
                        if "type" not in contact:
                            has_type_field = False
                        
                        # Check for our test submissions
                        if (contact.get("email") == "salestest@company.com" and 
                            contact.get("type") == "contact_sales"):
                            test_submissions_found += 1
                        elif (contact.get("email") == "enquiry@test.com" and 
                              contact.get("type") == "general_enquiry"):
                            test_submissions_found += 1
                        elif (contact.get("email") == "footer@test.com" and 
                              contact.get("type") == "contact_us"):
                            test_submissions_found += 1
                    
                    if has_type_field and test_submissions_found >= 2:
                        self.log_test("Get All Contacts", True, 
                                    f"Successfully retrieved contacts array with type fields, found {test_submissions_found} test submissions")
                    elif not has_type_field:
                        self.log_test("Get All Contacts", False, 
                                    "Some contacts missing 'type' field")
                    else:
                        self.log_test("Get All Contacts", False, 
                                    f"Only found {test_submissions_found} of expected test submissions")
                else:
                    self.log_test("Get All Contacts", False, 
                                "Response is not an array", type(data))
            else:
                self.log_test("Get All Contacts", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Get All Contacts", False, f"Request failed: {str(e)}")
        
        # Test 5: GET /api/contacts?type=contact_sales - should return only contact_sales submissions
        try:
            response = requests.get(f"{BACKEND_URL}/contacts?type=contact_sales", timeout=30)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    all_sales_type = True
                    sales_found = False
                    
                    for contact in data:
                        if contact.get("type") != "contact_sales":
                            all_sales_type = False
                        if contact.get("email") == "salestest@company.com":
                            sales_found = True
                    
                    if all_sales_type and sales_found:
                        self.log_test("Get Contacts by Type", True, 
                                    f"Successfully filtered contacts by type=contact_sales, found {len(data)} submissions")
                    elif not all_sales_type:
                        self.log_test("Get Contacts by Type", False, 
                                    "Response contains non-contact_sales submissions")
                    else:
                        self.log_test("Get Contacts by Type", False, 
                                    "Test contact_sales submission not found in filtered results")
                else:
                    self.log_test("Get Contacts by Type", False, 
                                "Response is not an array", type(data))
            else:
                self.log_test("Get Contacts by Type", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Get Contacts by Type", False, f"Request failed: {str(e)}")
        
        # Test 6: Validation - Missing type field (should fail)
        missing_type_payload = {
            "firstName": "Test",
            "email": "test@test.com"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contacts/submit", json=missing_type_payload, timeout=30)
            if response.status_code == 422:  # Validation error
                self.log_test("Validation Missing Type", True, 
                            "Correctly rejected submission with missing type field")
            else:
                self.log_test("Validation Missing Type", False, 
                            f"Expected 422 validation error, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Validation Missing Type", False, f"Request failed: {str(e)}")
        
        # Test 7: Validation - Invalid type (should fail)
        invalid_type_payload = {
            "type": "invalid",
            "email": "test@test.com"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contacts/submit", json=invalid_type_payload, timeout=30)
            if response.status_code == 422:  # Validation error
                self.log_test("Validation Invalid Type", True, 
                            "Correctly rejected submission with invalid type field")
            else:
                self.log_test("Validation Invalid Type", False, 
                            f"Expected 422 validation error, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Validation Invalid Type", False, f"Request failed: {str(e)}")
        
        # Test 8: Legacy endpoint still works (backward compatibility)
        legacy_payload = {
            "firstName": "Legacy",
            "lastName": "Test",
            "email": "legacy@test.com",
            "message": "Legacy endpoint test",
            "interest": "sales"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contact", json=legacy_payload, timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "id" in data:
                    self.log_test("Legacy Endpoint Compatibility", True, 
                                "Legacy /api/contact endpoint still working for backward compatibility")
                else:
                    self.log_test("Legacy Endpoint Compatibility", False, 
                                "Legacy endpoint response missing required fields", data)
            else:
                self.log_test("Legacy Endpoint Compatibility", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Legacy Endpoint Compatibility", False, f"Request failed: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for BluBrg Website")
        print(f"Backend URL: {BACKEND_URL}")
        print("=" * 60)
        
        # Run all test suites
        self.test_api_root()
        self.test_restructured_contact_form_apis()  # New restructured contact form tests
        self.test_newsletter_subscription()
        self.test_contact_form()  # Legacy contact form tests
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