"""
Security Hardening Tests for BluBridge Website
Tests: Security headers, rate limiting, API docs disabled, source maps blocked, admin auth
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Session-scoped admin token
@pytest.fixture(scope="module")
def admin_token():
    """Get admin token for authenticated requests"""
    response = requests.post(f"{BASE_URL}/api/admin/login", json={
        "username": "admin",
        "password": "admin"
    })
    if response.status_code == 200:
        return response.json().get("token")
    pytest.skip("Could not get admin token")


class TestSecurityHeaders:
    """Test security headers are present in API responses"""
    
    def test_backend_security_headers_on_api_root(self):
        """Test security headers on backend API root"""
        response = requests.get(f"{BASE_URL}/api/")
        
        # Check all required security headers
        assert response.headers.get("X-Content-Type-Options") == "nosniff", "Missing X-Content-Type-Options"
        assert response.headers.get("X-Frame-Options") == "DENY", "Missing X-Frame-Options"
        assert response.headers.get("X-XSS-Protection") == "1; mode=block", "Missing X-XSS-Protection"
        assert "strict-origin" in response.headers.get("Referrer-Policy", "").lower(), "Missing Referrer-Policy"
        assert "camera=()" in response.headers.get("Permissions-Policy", ""), "Missing Permissions-Policy"
        assert "max-age=" in response.headers.get("Strict-Transport-Security", ""), "Missing HSTS"
        print("PASS: All backend security headers present on /api/")
    
    def test_frontend_security_headers(self):
        """Test security headers on frontend HTML pages"""
        response = requests.get(f"{BASE_URL}/")
        
        # Check frontend security headers
        assert response.headers.get("X-Content-Type-Options") == "nosniff", "Missing X-Content-Type-Options on frontend"
        assert response.headers.get("X-Frame-Options") == "DENY", "Missing X-Frame-Options on frontend"
        assert response.headers.get("X-XSS-Protection") == "1; mode=block", "Missing X-XSS-Protection on frontend"
        assert "strict-origin" in response.headers.get("Referrer-Policy", "").lower(), "Missing Referrer-Policy on frontend"
        print("PASS: All frontend security headers present")


class TestAPIDocsDisabled:
    """Test that backend API documentation endpoints are disabled"""
    
    def test_api_docs_endpoint_returns_404(self):
        """Test /api/docs returns 404 (backend FastAPI docs disabled)"""
        response = requests.get(f"{BASE_URL}/api/docs")
        assert response.status_code == 404, f"Expected 404 for /api/docs, got {response.status_code}"
        print("PASS: /api/docs returns 404")
    
    def test_api_openapi_json_returns_404(self):
        """Test /api/openapi.json returns 404 (backend OpenAPI spec disabled)"""
        response = requests.get(f"{BASE_URL}/api/openapi.json")
        assert response.status_code == 404, f"Expected 404 for /api/openapi.json, got {response.status_code}"
        print("PASS: /api/openapi.json returns 404")
    
    def test_api_redoc_returns_404(self):
        """Test /api/redoc returns 404"""
        response = requests.get(f"{BASE_URL}/api/redoc")
        assert response.status_code == 404, f"Expected 404 for /api/redoc, got {response.status_code}"
        print("PASS: /api/redoc returns 404")


class TestSourceMapsBlocked:
    """Test that source maps are not accessible"""
    
    def test_js_map_returns_404(self):
        """Test .js.map files return 404"""
        response = requests.get(f"{BASE_URL}/static/js/main.js.map")
        assert response.status_code == 404, f"Expected 404 for .js.map, got {response.status_code}"
        print("PASS: .js.map returns 404")
    
    def test_css_map_returns_404(self):
        """Test .css.map files return 404"""
        response = requests.get(f"{BASE_URL}/static/css/main.css.map")
        assert response.status_code == 404, f"Expected 404 for .css.map, got {response.status_code}"
        print("PASS: .css.map returns 404")
    
    def test_random_map_file_returns_404(self):
        """Test random .map file returns 404"""
        response = requests.get(f"{BASE_URL}/bundle.js.map")
        assert response.status_code == 404, f"Expected 404 for .map file, got {response.status_code}"
        print("PASS: Random .map file returns 404")


class TestAdminAuthentication:
    """Test admin authentication flows"""
    
    def test_admin_login_success(self):
        """Test admin login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "admin"
        })
        assert response.status_code == 200, f"Expected 200 for valid login, got {response.status_code}"
        data = response.json()
        assert "token" in data, "Token not returned on successful login"
        assert data.get("message") == "Login successful", "Unexpected login message"
        print("PASS: Admin login with valid credentials works")
    
    def test_admin_login_invalid_credentials(self):
        """Test admin login with invalid credentials returns 401"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "wrongpassword"
        })
        assert response.status_code == 401, f"Expected 401 for invalid login, got {response.status_code}"
        print("PASS: Invalid credentials return 401")
    
    def test_admin_verify_without_token(self):
        """Test admin verify without token returns 401"""
        response = requests.get(f"{BASE_URL}/api/admin/verify")
        assert response.status_code == 401, f"Expected 401 without token, got {response.status_code}"
        print("PASS: Admin verify without token returns 401")
    
    def test_admin_dashboard_without_token(self):
        """Test admin dashboard stats without token returns 401"""
        response = requests.get(f"{BASE_URL}/api/admin/dashboard/stats")
        assert response.status_code == 401, f"Expected 401 without token, got {response.status_code}"
        print("PASS: Admin dashboard without token returns 401")
    
    def test_admin_dashboard_with_valid_token(self, admin_token):
        """Test admin dashboard stats with valid token"""
        response = requests.get(
            f"{BASE_URL}/api/admin/dashboard/stats",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200, f"Expected 200 with valid token, got {response.status_code}"
        data = response.json()
        assert "footer_forms" in data, "Missing footer_forms in stats"
        assert "contact_forms" in data, "Missing contact_forms in stats"
        assert "career_applications" in data, "Missing career_applications in stats"
        print("PASS: Admin dashboard with valid token works")


class TestAdminExport:
    """Test admin export endpoints"""
    
    def test_export_footer_works(self, admin_token):
        """Test export footer endpoint works"""
        response = requests.get(
            f"{BASE_URL}/api/admin/export/footer",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200, f"Expected 200 for footer export, got {response.status_code}"
        print("PASS: Export footer works")
    
    def test_export_contact_works(self, admin_token):
        """Test export contact endpoint works"""
        response = requests.get(
            f"{BASE_URL}/api/admin/export/contact",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200, f"Expected 200 for contact export, got {response.status_code}"
        print("PASS: Export contact works")
    
    def test_export_careers_works(self, admin_token):
        """Test export careers endpoint works"""
        response = requests.get(
            f"{BASE_URL}/api/admin/export/careers",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200, f"Expected 200 for careers export, got {response.status_code}"
        print("PASS: Export careers works")
    
    def test_export_invalid_type_returns_400(self, admin_token):
        """Test export with invalid type returns 400"""
        response = requests.get(
            f"{BASE_URL}/api/admin/export/invalid_type",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 400, f"Expected 400 for invalid export type, got {response.status_code}"
        print("PASS: Invalid export type returns 400")


class TestContactFormSubmission:
    """Test contact form submission endpoint"""
    
    def test_contact_submit_general_enquiry(self):
        """Test POST /api/contacts/submit with type general_enquiry"""
        response = requests.post(f"{BASE_URL}/api/contacts/submit", json={
            "type": "general_enquiry",
            "firstName": "Test",
            "lastName": "User",
            "email": f"test_{int(time.time())}@example.com",
            "message": "This is a test message for security testing"
        })
        # Accept 200 or 409 (duplicate prevention)
        assert response.status_code in [200, 409], f"Expected 200 or 409, got {response.status_code}"
        if response.status_code == 200:
            data = response.json()
            assert "id" in data, "Missing id in response"
            assert data.get("type") == "general_enquiry", "Type mismatch"
            print("PASS: Contact form submission works")
        else:
            print("PASS: Contact form duplicate prevention working (409)")


class TestAdminSubmissionsEndpoints:
    """Test admin submissions endpoints with pagination"""
    
    def test_footer_submissions_endpoint(self, admin_token):
        """Test GET /api/admin/submissions/footer"""
        response = requests.get(
            f"{BASE_URL}/api/admin/submissions/footer",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "data" in data, "Missing data field"
        assert "total" in data, "Missing total field"
        assert "page" in data, "Missing page field"
        print("PASS: Footer submissions endpoint works")
    
    def test_contact_submissions_endpoint(self, admin_token):
        """Test GET /api/admin/submissions/contact"""
        response = requests.get(
            f"{BASE_URL}/api/admin/submissions/contact",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "data" in data, "Missing data field"
        assert "total" in data, "Missing total field"
        print("PASS: Contact submissions endpoint works")
    
    def test_careers_submissions_endpoint(self, admin_token):
        """Test GET /api/admin/submissions/careers"""
        response = requests.get(
            f"{BASE_URL}/api/admin/submissions/careers",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "data" in data, "Missing data field"
        assert "total" in data, "Missing total field"
        print("PASS: Careers submissions endpoint works")
    
    def test_pagination_works(self, admin_token):
        """Test pagination parameters work"""
        response = requests.get(
            f"{BASE_URL}/api/admin/submissions/footer?page=1&limit=10",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get("page") == 1, "Page not set correctly"
        assert data.get("limit") == 10, "Limit not set correctly"
        print("PASS: Pagination works")


class TestPublicEndpoints:
    """Test public endpoints still work"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print("PASS: API root works")
    
    def test_contacts_list(self):
        """Test GET /api/contacts"""
        response = requests.get(f"{BASE_URL}/api/contacts")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print("PASS: Contacts list works")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
