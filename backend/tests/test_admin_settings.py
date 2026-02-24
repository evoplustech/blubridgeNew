"""
Test Admin Settings Page Functionality
- Admin login, password change validation, data export

Tests cover:
- Admin login with valid credentials
- Password change validations (wrong current, mismatch, too short)
- Export endpoints (footer, contact, careers, all)
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestAdminLogin:
    """Admin authentication tests"""
    
    def test_admin_login_success(self):
        """Test admin login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "adminpass"
        })
        assert response.status_code == 200
        data = response.json()
        assert "token" in data
        assert "message" in data
        assert data["message"] == "Login successful"
        assert len(data["token"]) > 0
    
    def test_admin_login_invalid_credentials(self):
        """Test admin login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
        assert data["detail"] == "Invalid credentials"
    
    def test_admin_login_wrong_username(self):
        """Test admin login with wrong username"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "wronguser",
            "password": "adminpass"
        })
        assert response.status_code == 401


class TestAdminSettings:
    """Admin settings endpoint tests"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin token for authenticated requests"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "adminpass"
        })
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Admin login failed")
    
    def test_get_admin_settings(self, admin_token):
        """Test getting admin settings"""
        response = requests.get(
            f"{BASE_URL}/api/admin/settings",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "username" in data
        assert data["username"] == "admin"
    
    def test_get_settings_unauthorized(self):
        """Test getting settings without auth"""
        response = requests.get(f"{BASE_URL}/api/admin/settings")
        assert response.status_code == 401


class TestPasswordChange:
    """Password change validation tests"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin token for authenticated requests"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "adminpass"
        })
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Admin login failed")
    
    def test_password_change_wrong_current_password(self, admin_token):
        """Test password change with wrong current password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/change-password",
            headers={
                "Authorization": f"Bearer {admin_token}",
                "Content-Type": "application/json"
            },
            json={
                "currentPassword": "wrongpassword",
                "newPassword": "newpass123",
                "confirmPassword": "newpass123"
            }
        )
        assert response.status_code == 400
        data = response.json()
        assert "detail" in data
        assert data["detail"] == "Current password is incorrect"
    
    def test_password_change_password_mismatch(self, admin_token):
        """Test password change with mismatched new passwords"""
        response = requests.post(
            f"{BASE_URL}/api/admin/change-password",
            headers={
                "Authorization": f"Bearer {admin_token}",
                "Content-Type": "application/json"
            },
            json={
                "currentPassword": "adminpass",
                "newPassword": "newpass123",
                "confirmPassword": "differentpass"
            }
        )
        assert response.status_code == 400
        data = response.json()
        assert "detail" in data
        assert data["detail"] == "New passwords do not match"
    
    def test_password_change_too_short(self, admin_token):
        """Test password change with password too short"""
        response = requests.post(
            f"{BASE_URL}/api/admin/change-password",
            headers={
                "Authorization": f"Bearer {admin_token}",
                "Content-Type": "application/json"
            },
            json={
                "currentPassword": "adminpass",
                "newPassword": "abc",
                "confirmPassword": "abc"
            }
        )
        assert response.status_code == 400
        data = response.json()
        assert "detail" in data
        assert data["detail"] == "Password must be at least 6 characters"
    
    def test_password_change_unauthorized(self):
        """Test password change without auth"""
        response = requests.post(
            f"{BASE_URL}/api/admin/change-password",
            headers={"Content-Type": "application/json"},
            json={
                "currentPassword": "adminpass",
                "newPassword": "newpass123",
                "confirmPassword": "newpass123"
            }
        )
        assert response.status_code == 401


class TestDataExport:
    """Data export endpoint tests"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin token for authenticated requests"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "adminpass"
        })
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Admin login failed")
    
    def test_export_footer_forms(self, admin_token):
        """Test exporting footer forms as CSV"""
        response = requests.get(
            f"{BASE_URL}/api/admin/export/footer",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        # Check CSV headers
        content = response.text
        assert "First Name" in content
        assert "Email" in content
    
    def test_export_contact_forms(self, admin_token):
        """Test exporting contact forms as CSV"""
        response = requests.get(
            f"{BASE_URL}/api/admin/export/contact",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        assert "Type" in content
        assert "Email" in content
    
    def test_export_career_applications(self, admin_token):
        """Test exporting career applications as CSV"""
        response = requests.get(
            f"{BASE_URL}/api/admin/export/careers",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        assert "First Name" in content
        assert "Job Title" in content
    
    def test_export_all_data(self, admin_token):
        """Test exporting all data as CSV"""
        response = requests.get(
            f"{BASE_URL}/api/admin/export/all",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        assert "Source" in content
        assert "Type" in content
    
    def test_export_invalid_type(self, admin_token):
        """Test exporting with invalid data type"""
        response = requests.get(
            f"{BASE_URL}/api/admin/export/invalid",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 400
        data = response.json()
        assert "detail" in data
        assert data["detail"] == "Invalid data type"
    
    def test_export_unauthorized(self):
        """Test export without auth"""
        response = requests.get(f"{BASE_URL}/api/admin/export/footer")
        assert response.status_code == 401


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
