"""
Test suite for Admin Panel API endpoints
Tests: Admin login, verify, dashboard stats, submissions management
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://layoutrescue.preview.emergentagent.com')

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin"


class TestAdminLogin:
    """Tests for POST /api/admin/login endpoint"""
    
    def test_login_with_valid_credentials(self):
        """Test admin login with correct credentials"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        result = response.json()
        assert "token" in result
        assert result.get("message") == "Login successful"
        assert len(result["token"]) > 20  # Token should be a reasonable length
        print(f"✓ Admin login successful, token received")
    
    def test_login_with_invalid_username(self):
        """Test admin login with wrong username"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": "wronguser", "password": ADMIN_PASSWORD}
        )
        
        assert response.status_code == 401
        result = response.json()
        assert "detail" in result
        print("✓ Invalid username correctly rejected")
    
    def test_login_with_invalid_password(self):
        """Test admin login with wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": "wrongpassword"}
        )
        
        assert response.status_code == 401
        result = response.json()
        assert "detail" in result
        print("✓ Invalid password correctly rejected")
    
    def test_login_with_empty_credentials(self):
        """Test admin login with empty credentials"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": "", "password": ""}
        )
        
        assert response.status_code == 401
        print("✓ Empty credentials correctly rejected")


class TestAdminVerify:
    """Tests for GET /api/admin/verify endpoint"""
    
    @pytest.fixture
    def admin_token(self):
        """Get a valid admin token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        return response.json()["token"]
    
    def test_verify_valid_token(self, admin_token):
        """Test token verification with valid token"""
        response = requests.get(
            f"{BASE_URL}/api/admin/verify",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        result = response.json()
        assert result.get("valid") == True
        assert result.get("message") == "Token is valid"
        print("✓ Valid token verified successfully")
    
    def test_verify_invalid_token(self):
        """Test token verification with invalid token"""
        response = requests.get(
            f"{BASE_URL}/api/admin/verify",
            headers={"Authorization": "Bearer invalid_token_12345"}
        )
        
        assert response.status_code == 401
        print("✓ Invalid token correctly rejected")
    
    def test_verify_no_token(self):
        """Test token verification without token"""
        response = requests.get(f"{BASE_URL}/api/admin/verify")
        
        assert response.status_code == 401
        print("✓ Missing token correctly rejected")


class TestAdminDashboardStats:
    """Tests for GET /api/admin/dashboard/stats endpoint"""
    
    @pytest.fixture
    def admin_token(self):
        """Get a valid admin token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        return response.json()["token"]
    
    def test_get_dashboard_stats(self, admin_token):
        """Test getting dashboard statistics"""
        response = requests.get(
            f"{BASE_URL}/api/admin/dashboard/stats",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        result = response.json()
        
        # Verify structure
        assert "footer_forms" in result
        assert "contact_forms" in result
        assert "career_applications" in result
        assert "total_submissions" in result
        
        # Verify nested structure
        assert "total" in result["footer_forms"]
        assert "new" in result["footer_forms"]
        assert "total" in result["contact_forms"]
        assert "new" in result["contact_forms"]
        assert "total" in result["career_applications"]
        assert "new" in result["career_applications"]
        
        # Verify values are integers
        assert isinstance(result["footer_forms"]["total"], int)
        assert isinstance(result["total_submissions"], int)
        
        print(f"✓ Dashboard stats retrieved: {result['total_submissions']} total submissions")
    
    def test_get_dashboard_stats_unauthorized(self):
        """Test getting dashboard stats without auth"""
        response = requests.get(f"{BASE_URL}/api/admin/dashboard/stats")
        
        assert response.status_code == 401
        print("✓ Unauthorized access correctly rejected")


class TestAdminFooterSubmissions:
    """Tests for GET /api/admin/submissions/footer endpoint"""
    
    @pytest.fixture
    def admin_token(self):
        """Get a valid admin token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        return response.json()["token"]
    
    def test_get_footer_submissions(self, admin_token):
        """Test getting footer form submissions"""
        response = requests.get(
            f"{BASE_URL}/api/admin/submissions/footer",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        result = response.json()
        assert isinstance(result, list)
        
        if len(result) > 0:
            submission = result[0]
            assert "id" in submission
            assert "email" in submission
            assert "type" in submission
            assert submission["type"] == "contact_us"
        
        print(f"✓ Retrieved {len(result)} footer submissions")
    
    def test_get_footer_submissions_with_limit(self, admin_token):
        """Test getting footer submissions with limit"""
        response = requests.get(
            f"{BASE_URL}/api/admin/submissions/footer?limit=2",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        result = response.json()
        assert len(result) <= 2
        print(f"✓ Limit parameter works correctly")
    
    def test_get_footer_submissions_with_search(self, admin_token):
        """Test searching footer submissions"""
        response = requests.get(
            f"{BASE_URL}/api/admin/submissions/footer?search=test",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        result = response.json()
        assert isinstance(result, list)
        print(f"✓ Search parameter works correctly")


class TestAdminContactSubmissions:
    """Tests for GET /api/admin/submissions/contact endpoint"""
    
    @pytest.fixture
    def admin_token(self):
        """Get a valid admin token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        return response.json()["token"]
    
    def test_get_contact_submissions(self, admin_token):
        """Test getting contact form submissions"""
        response = requests.get(
            f"{BASE_URL}/api/admin/submissions/contact",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        result = response.json()
        assert isinstance(result, list)
        
        if len(result) > 0:
            submission = result[0]
            assert "id" in submission
            assert "email" in submission
            assert "type" in submission
            assert submission["type"] in ["contact_sales", "general_enquiry"]
        
        print(f"✓ Retrieved {len(result)} contact submissions")


class TestAdminCareerApplications:
    """Tests for GET /api/admin/submissions/careers endpoint"""
    
    @pytest.fixture
    def admin_token(self):
        """Get a valid admin token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        return response.json()["token"]
    
    def test_get_career_applications(self, admin_token):
        """Test getting career applications"""
        response = requests.get(
            f"{BASE_URL}/api/admin/submissions/careers",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        result = response.json()
        assert isinstance(result, list)
        
        if len(result) > 0:
            app = result[0]
            assert "id" in app
            assert "firstName" in app
            assert "lastName" in app
            assert "email" in app
            assert "jobTitle" in app
            assert "status" in app
        
        print(f"✓ Retrieved {len(result)} career applications")
    
    def test_get_career_applications_with_status_filter(self, admin_token):
        """Test filtering career applications by status"""
        response = requests.get(
            f"{BASE_URL}/api/admin/submissions/careers?status=pending",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        result = response.json()
        
        for app in result:
            assert app.get("status") == "pending"
        
        print(f"✓ Status filter works correctly")


class TestAdminLogout:
    """Tests for POST /api/admin/logout endpoint"""
    
    def test_logout_with_valid_token(self):
        """Test logout with valid token"""
        # First login
        login_response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        token = login_response.json()["token"]
        
        # Verify token works
        verify_response = requests.get(
            f"{BASE_URL}/api/admin/verify",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert verify_response.status_code == 200
        
        # Logout
        logout_response = requests.post(
            f"{BASE_URL}/api/admin/logout",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert logout_response.status_code == 200
        assert logout_response.json().get("message") == "Logged out successfully"
        
        # Verify token no longer works
        verify_after_logout = requests.get(
            f"{BASE_URL}/api/admin/verify",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert verify_after_logout.status_code == 401
        
        print("✓ Logout works correctly, token invalidated")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
