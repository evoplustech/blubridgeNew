"""
Test suite for Job Application API endpoints
Tests: POST /api/job-applications/submit, GET /api/job-applications
"""
import pytest
import requests
import os
import io
import tempfile

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://rapid-design-updates.preview.emergentagent.com')

class TestJobApplicationSubmit:
    """Tests for POST /api/job-applications/submit endpoint"""
    
    def test_submit_valid_application_with_pdf(self):
        """Test submitting a valid job application with PDF resume"""
        # Create a mock PDF file
        pdf_content = b'%PDF-1.4 mock pdf content for testing'
        files = {
            'resume': ('test_resume.pdf', io.BytesIO(pdf_content), 'application/pdf')
        }
        data = {
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'john.doe@example.com',
            'phone': '+919876543210',
            'location': 'Mumbai, India',
            'jobTitle': 'AI Systems Engineer'
        }
        
        response = requests.post(f"{BASE_URL}/api/job-applications/submit", data=data, files=files)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        result = response.json()
        assert result.get('success') == True
        assert 'id' in result
        assert result.get('message') == 'Application submitted successfully!'
        
        # Store application ID for later verification
        self.application_id = result['id']
        print(f"✓ Application submitted successfully with ID: {self.application_id}")
    
    def test_submit_application_with_linkedin(self):
        """Test submitting application with optional LinkedIn profile"""
        pdf_content = b'%PDF-1.4 mock pdf content'
        files = {
            'resume': ('resume_linkedin.pdf', io.BytesIO(pdf_content), 'application/pdf')
        }
        data = {
            'firstName': 'Jane',
            'lastName': 'Smith',
            'email': 'jane.smith@example.com',
            'phone': '9876543211',
            'location': 'Bangalore, India',
            'jobTitle': 'AI Systems Engineer',
            'linkedInProfile': 'https://linkedin.com/in/janesmith'
        }
        
        response = requests.post(f"{BASE_URL}/api/job-applications/submit", data=data, files=files)
        
        assert response.status_code == 200
        result = response.json()
        assert result.get('success') == True
        print("✓ Application with LinkedIn profile submitted successfully")
    
    def test_submit_application_with_doc_file(self):
        """Test submitting application with DOC file"""
        doc_content = b'Mock DOC file content for testing'
        files = {
            'resume': ('resume.doc', io.BytesIO(doc_content), 'application/msword')
        }
        data = {
            'firstName': 'Test',
            'lastName': 'User',
            'email': 'test.user@example.com',
            'phone': '1234567890',
            'location': 'Delhi, India',
            'jobTitle': 'Software Engineer'
        }
        
        response = requests.post(f"{BASE_URL}/api/job-applications/submit", data=data, files=files)
        
        assert response.status_code == 200
        result = response.json()
        assert result.get('success') == True
        print("✓ Application with DOC file submitted successfully")
    
    def test_submit_application_with_docx_file(self):
        """Test submitting application with DOCX file"""
        docx_content = b'Mock DOCX file content for testing'
        files = {
            'resume': ('resume.docx', io.BytesIO(docx_content), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        }
        data = {
            'firstName': 'Another',
            'lastName': 'Tester',
            'email': 'another.tester@example.com',
            'phone': '9988776655',
            'location': 'Chennai, India',
            'jobTitle': 'Data Scientist'
        }
        
        response = requests.post(f"{BASE_URL}/api/job-applications/submit", data=data, files=files)
        
        assert response.status_code == 200
        result = response.json()
        assert result.get('success') == True
        print("✓ Application with DOCX file submitted successfully")


class TestJobApplicationValidation:
    """Tests for form validation on job application submit"""
    
    def test_validation_first_name_too_short(self):
        """Test validation: First name must be at least 2 characters"""
        pdf_content = b'%PDF-1.4 mock pdf'
        files = {
            'resume': ('test.pdf', io.BytesIO(pdf_content), 'application/pdf')
        }
        data = {
            'firstName': 'J',  # Too short
            'lastName': 'Doe',
            'email': 'j.doe@example.com',
            'phone': '9876543210',
            'location': 'Mumbai',
            'jobTitle': 'Engineer'
        }
        
        response = requests.post(f"{BASE_URL}/api/job-applications/submit", data=data, files=files)
        
        assert response.status_code == 400
        result = response.json()
        assert result.get('success') == False
        assert 'errors' in result
        assert 'firstName' in result['errors']
        print("✓ First name validation works correctly")
    
    def test_validation_last_name_too_short(self):
        """Test validation: Last name must be at least 2 characters"""
        pdf_content = b'%PDF-1.4 mock pdf'
        files = {
            'resume': ('test.pdf', io.BytesIO(pdf_content), 'application/pdf')
        }
        data = {
            'firstName': 'John',
            'lastName': 'D',  # Too short
            'email': 'john.d@example.com',
            'phone': '9876543210',
            'location': 'Mumbai',
            'jobTitle': 'Engineer'
        }
        
        response = requests.post(f"{BASE_URL}/api/job-applications/submit", data=data, files=files)
        
        assert response.status_code == 400
        result = response.json()
        assert result.get('success') == False
        assert 'errors' in result
        assert 'lastName' in result['errors']
        print("✓ Last name validation works correctly")
    
    def test_validation_invalid_email(self):
        """Test validation: Email must be valid format"""
        pdf_content = b'%PDF-1.4 mock pdf'
        files = {
            'resume': ('test.pdf', io.BytesIO(pdf_content), 'application/pdf')
        }
        data = {
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'invalid-email',  # Invalid email
            'phone': '9876543210',
            'location': 'Mumbai',
            'jobTitle': 'Engineer'
        }
        
        response = requests.post(f"{BASE_URL}/api/job-applications/submit", data=data, files=files)
        
        assert response.status_code == 400
        result = response.json()
        assert result.get('success') == False
        assert 'errors' in result
        assert 'email' in result['errors']
        print("✓ Email validation works correctly")
    
    def test_validation_phone_too_short(self):
        """Test validation: Phone must be 10-15 digits"""
        pdf_content = b'%PDF-1.4 mock pdf'
        files = {
            'resume': ('test.pdf', io.BytesIO(pdf_content), 'application/pdf')
        }
        data = {
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'john.doe@example.com',
            'phone': '12345',  # Too short (less than 10 digits)
            'location': 'Mumbai',
            'jobTitle': 'Engineer'
        }
        
        response = requests.post(f"{BASE_URL}/api/job-applications/submit", data=data, files=files)
        
        assert response.status_code == 400
        result = response.json()
        assert result.get('success') == False
        assert 'errors' in result
        assert 'phone' in result['errors']
        print("✓ Phone validation (too short) works correctly")
    
    def test_validation_phone_too_long(self):
        """Test validation: Phone must be 10-15 digits"""
        pdf_content = b'%PDF-1.4 mock pdf'
        files = {
            'resume': ('test.pdf', io.BytesIO(pdf_content), 'application/pdf')
        }
        data = {
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'john.doe@example.com',
            'phone': '1234567890123456',  # Too long (more than 15 digits)
            'location': 'Mumbai',
            'jobTitle': 'Engineer'
        }
        
        response = requests.post(f"{BASE_URL}/api/job-applications/submit", data=data, files=files)
        
        assert response.status_code == 400
        result = response.json()
        assert result.get('success') == False
        assert 'errors' in result
        assert 'phone' in result['errors']
        print("✓ Phone validation (too long) works correctly")
    
    def test_validation_missing_location(self):
        """Test validation: Location is required"""
        pdf_content = b'%PDF-1.4 mock pdf'
        files = {
            'resume': ('test.pdf', io.BytesIO(pdf_content), 'application/pdf')
        }
        data = {
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'john.doe@example.com',
            'phone': '9876543210',
            'location': '',  # Empty location
            'jobTitle': 'Engineer'
        }
        
        response = requests.post(f"{BASE_URL}/api/job-applications/submit", data=data, files=files)
        
        assert response.status_code == 400
        result = response.json()
        assert result.get('success') == False
        assert 'errors' in result
        assert 'location' in result['errors']
        print("✓ Location validation works correctly")
    
    def test_validation_invalid_file_type(self):
        """Test validation: Only PDF, DOC, DOCX allowed"""
        txt_content = b'This is a text file, not allowed'
        files = {
            'resume': ('resume.txt', io.BytesIO(txt_content), 'text/plain')
        }
        data = {
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'john.doe@example.com',
            'phone': '9876543210',
            'location': 'Mumbai',
            'jobTitle': 'Engineer'
        }
        
        response = requests.post(f"{BASE_URL}/api/job-applications/submit", data=data, files=files)
        
        assert response.status_code == 400
        result = response.json()
        assert result.get('success') == False
        assert 'errors' in result
        assert 'resume' in result['errors']
        print("✓ File type validation works correctly")


class TestGetJobApplications:
    """Tests for GET /api/job-applications endpoint"""
    
    def test_get_all_applications(self):
        """Test retrieving all job applications"""
        response = requests.get(f"{BASE_URL}/api/job-applications")
        
        assert response.status_code == 200
        result = response.json()
        assert isinstance(result, list)
        print(f"✓ Retrieved {len(result)} job applications")
        
        # Verify structure of returned applications
        if len(result) > 0:
            app = result[0]
            assert 'id' in app
            assert 'firstName' in app
            assert 'lastName' in app
            assert 'email' in app
            assert 'phone' in app
            assert 'location' in app
            assert 'jobTitle' in app
            assert 'appliedAt' in app
            assert 'status' in app
            print("✓ Application structure is correct")
    
    def test_get_applications_with_status_filter(self):
        """Test filtering applications by status"""
        response = requests.get(f"{BASE_URL}/api/job-applications?status=pending")
        
        assert response.status_code == 200
        result = response.json()
        assert isinstance(result, list)
        
        # All returned applications should have pending status
        for app in result:
            assert app.get('status') == 'pending'
        print(f"✓ Status filter works correctly, found {len(result)} pending applications")
    
    def test_get_applications_with_limit(self):
        """Test limiting number of returned applications"""
        response = requests.get(f"{BASE_URL}/api/job-applications?limit=5")
        
        assert response.status_code == 200
        result = response.json()
        assert isinstance(result, list)
        assert len(result) <= 5
        print(f"✓ Limit parameter works correctly, returned {len(result)} applications")


class TestSubmitAndVerify:
    """End-to-end test: Submit application and verify it's saved"""
    
    def test_submit_and_retrieve_application(self):
        """Submit an application and verify it can be retrieved"""
        # Submit application
        pdf_content = b'%PDF-1.4 mock pdf for e2e test'
        files = {
            'resume': ('e2e_test_resume.pdf', io.BytesIO(pdf_content), 'application/pdf')
        }
        unique_email = f'e2e.test.{os.urandom(4).hex()}@example.com'
        data = {
            'firstName': 'E2E',
            'lastName': 'TestUser',
            'email': unique_email,
            'phone': '9999888877',
            'location': 'Test City, Test Country',
            'jobTitle': 'AI Systems Engineer',
            'linkedInProfile': 'https://linkedin.com/in/e2etest'
        }
        
        submit_response = requests.post(f"{BASE_URL}/api/job-applications/submit", data=data, files=files)
        
        assert submit_response.status_code == 200
        submit_result = submit_response.json()
        assert submit_result.get('success') == True
        application_id = submit_result['id']
        print(f"✓ Application submitted with ID: {application_id}")
        
        # Retrieve and verify
        get_response = requests.get(f"{BASE_URL}/api/job-applications/{application_id}")
        
        assert get_response.status_code == 200
        app = get_response.json()
        
        # Verify all fields match
        assert app['id'] == application_id
        assert app['firstName'] == 'E2E'
        assert app['lastName'] == 'TestUser'
        assert app['email'] == unique_email.lower()  # Email is lowercased
        assert app['phone'] == '9999888877'
        assert app['location'] == 'Test City, Test Country'
        assert app['jobTitle'] == 'AI Systems Engineer'
        assert app['linkedInProfile'] == 'https://linkedin.com/in/e2etest'
        assert app['status'] == 'pending'
        assert 'appliedAt' in app
        assert 'resumeFilename' in app
        print("✓ Application data verified successfully")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
