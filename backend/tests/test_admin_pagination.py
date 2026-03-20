"""
Admin Pagination API Tests
Tests for server-side pagination on admin endpoints:
- /api/admin/submissions/careers
- /api/admin/submissions/contact
- /api/admin/submissions/footer
- Export endpoints fetching ALL records
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestAdminPagination:
    """Test admin pagination endpoints"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup - get admin token"""
        self.session = requests.Session()
        self.session.headers.update({"Content-Type": "application/json"})
        
        # Login to get token
        response = self.session.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "admin"
        })
        if response.status_code == 200:
            self.token = response.json().get("token")
            self.session.headers.update({"Authorization": f"Bearer {self.token}"})
        else:
            pytest.skip(f"Admin login failed: {response.status_code}")
    
    # ==================== CAREER APPLICATIONS PAGINATION ====================
    
    def test_careers_default_pagination(self):
        """Test careers endpoint returns paginated data with default limit 50"""
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/careers")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        # Verify paginated response structure
        assert "data" in data, "Response should have 'data' field"
        assert "total" in data, "Response should have 'total' field"
        assert "page" in data, "Response should have 'page' field"
        assert "limit" in data, "Response should have 'limit' field"
        assert "totalPages" in data, "Response should have 'totalPages' field"
        
        # Verify default values
        assert data["page"] == 1, f"Default page should be 1, got {data['page']}"
        assert data["limit"] == 50, f"Default limit should be 50, got {data['limit']}"
        
        # Verify data array length is <= limit
        assert len(data["data"]) <= data["limit"], "Data array length should be <= limit"
        
        print(f"Careers: Total={data['total']}, Page={data['page']}, Limit={data['limit']}, TotalPages={data['totalPages']}, DataLen={len(data['data'])}")
    
    def test_careers_pagination_page2(self):
        """Test careers endpoint page 2"""
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/careers?page=2&limit=50")
        assert response.status_code == 200
        
        data = response.json()
        assert data["page"] == 2, f"Page should be 2, got {data['page']}"
        print(f"Careers Page 2: DataLen={len(data['data'])}")
    
    def test_careers_pagination_limit_100(self):
        """Test careers endpoint with limit 100"""
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/careers?limit=100")
        assert response.status_code == 200
        
        data = response.json()
        assert data["limit"] == 100, f"Limit should be 100, got {data['limit']}"
        assert len(data["data"]) <= 100, "Data length should be <= 100"
        print(f"Careers Limit 100: DataLen={len(data['data'])}")
    
    def test_careers_pagination_limit_200(self):
        """Test careers endpoint with limit 200"""
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/careers?limit=200")
        assert response.status_code == 200
        
        data = response.json()
        assert data["limit"] == 200, f"Limit should be 200, got {data['limit']}"
        assert len(data["data"]) <= 200, "Data length should be <= 200"
        print(f"Careers Limit 200: DataLen={len(data['data'])}")
    
    def test_careers_total_pages_calculation(self):
        """Test that totalPages is correctly calculated"""
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/careers?limit=50")
        assert response.status_code == 200
        
        data = response.json()
        expected_total_pages = (data["total"] + 49) // 50  # Ceiling division
        assert data["totalPages"] == expected_total_pages, f"TotalPages calculation wrong: expected {expected_total_pages}, got {data['totalPages']}"
        print(f"Careers: Total={data['total']}, TotalPages={data['totalPages']} (expected {expected_total_pages})")
    
    # ==================== CONTACT FORMS PAGINATION ====================
    
    def test_contact_default_pagination(self):
        """Test contact endpoint returns paginated data with default limit 50"""
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/contact")
        assert response.status_code == 200
        
        data = response.json()
        # Verify paginated response structure
        assert "data" in data, "Response should have 'data' field"
        assert "total" in data, "Response should have 'total' field"
        assert "page" in data, "Response should have 'page' field"
        assert "limit" in data, "Response should have 'limit' field"
        assert "totalPages" in data, "Response should have 'totalPages' field"
        
        assert data["page"] == 1
        assert data["limit"] == 50
        print(f"Contact: Total={data['total']}, Page={data['page']}, Limit={data['limit']}, TotalPages={data['totalPages']}, DataLen={len(data['data'])}")
    
    def test_contact_pagination_page2(self):
        """Test contact endpoint page 2"""
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/contact?page=2&limit=50")
        assert response.status_code == 200
        
        data = response.json()
        assert data["page"] == 2
        print(f"Contact Page 2: DataLen={len(data['data'])}")
    
    def test_contact_pagination_limit_100(self):
        """Test contact endpoint with limit 100"""
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/contact?limit=100")
        assert response.status_code == 200
        
        data = response.json()
        assert data["limit"] == 100
        print(f"Contact Limit 100: DataLen={len(data['data'])}")
    
    # ==================== FOOTER FORMS PAGINATION ====================
    
    def test_footer_default_pagination(self):
        """Test footer endpoint returns paginated data with default limit 50"""
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/footer")
        assert response.status_code == 200
        
        data = response.json()
        # Verify paginated response structure
        assert "data" in data, "Response should have 'data' field"
        assert "total" in data, "Response should have 'total' field"
        assert "page" in data, "Response should have 'page' field"
        assert "limit" in data, "Response should have 'limit' field"
        assert "totalPages" in data, "Response should have 'totalPages' field"
        
        assert data["page"] == 1
        assert data["limit"] == 50
        print(f"Footer: Total={data['total']}, Page={data['page']}, Limit={data['limit']}, TotalPages={data['totalPages']}, DataLen={len(data['data'])}")
    
    def test_footer_pagination_page2(self):
        """Test footer endpoint page 2"""
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/footer?page=2&limit=50")
        assert response.status_code == 200
        
        data = response.json()
        assert data["page"] == 2
        print(f"Footer Page 2: DataLen={len(data['data'])}")
    
    def test_footer_pagination_limit_100(self):
        """Test footer endpoint with limit 100"""
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/footer?limit=100")
        assert response.status_code == 200
        
        data = response.json()
        assert data["limit"] == 100
        print(f"Footer Limit 100: DataLen={len(data['data'])}")
    
    # ==================== EXPORT ENDPOINTS (ALL RECORDS) ====================
    
    def test_export_careers_all_records(self):
        """Test careers export fetches ALL records, not just current page"""
        # First get total count
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/careers?limit=1")
        assert response.status_code == 200
        total = response.json()["total"]
        
        # Export should return all records
        export_response = self.session.get(f"{BASE_URL}/api/admin/export/careers")
        assert export_response.status_code == 200
        assert "text/csv" in export_response.headers.get("content-type", "")
        
        # Count CSV rows (minus header)
        csv_content = export_response.text
        csv_lines = [line for line in csv_content.strip().split('\n') if line]
        csv_data_rows = len(csv_lines) - 1  # Minus header
        
        print(f"Export Careers: Total={total}, CSV Rows={csv_data_rows}")
        # Export should have all records
        assert csv_data_rows == total, f"Export should have {total} rows, got {csv_data_rows}"
    
    def test_export_contact_all_records(self):
        """Test contact export fetches ALL records"""
        # First get total count
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/contact?limit=1")
        assert response.status_code == 200
        total = response.json()["total"]
        
        # Export should return all records
        export_response = self.session.get(f"{BASE_URL}/api/admin/export/contact")
        assert export_response.status_code == 200
        assert "text/csv" in export_response.headers.get("content-type", "")
        
        csv_content = export_response.text
        csv_lines = [line for line in csv_content.strip().split('\n') if line]
        csv_data_rows = len(csv_lines) - 1
        
        print(f"Export Contact: Total={total}, CSV Rows={csv_data_rows}")
        assert csv_data_rows == total, f"Export should have {total} rows, got {csv_data_rows}"
    
    def test_export_footer_all_records(self):
        """Test footer export fetches ALL records"""
        # First get total count
        response = self.session.get(f"{BASE_URL}/api/admin/submissions/footer?limit=1")
        assert response.status_code == 200
        total = response.json()["total"]
        
        # Export should return all records
        export_response = self.session.get(f"{BASE_URL}/api/admin/export/footer")
        assert export_response.status_code == 200
        assert "text/csv" in export_response.headers.get("content-type", "")
        
        csv_content = export_response.text
        csv_lines = [line for line in csv_content.strip().split('\n') if line]
        csv_data_rows = len(csv_lines) - 1
        
        print(f"Export Footer: Total={total}, CSV Rows={csv_data_rows}")
        assert csv_data_rows == total, f"Export should have {total} rows, got {csv_data_rows}"
    
    # ==================== DASHBOARD STATS ====================
    
    def test_dashboard_stats_shows_correct_totals(self):
        """Test dashboard stats shows correct total counts"""
        response = self.session.get(f"{BASE_URL}/api/admin/dashboard/stats")
        assert response.status_code == 200
        
        stats = response.json()
        assert "career_applications" in stats
        assert "contact_forms" in stats
        assert "footer_forms" in stats
        assert "total_submissions" in stats
        
        # Get actual totals from each endpoint
        careers_resp = self.session.get(f"{BASE_URL}/api/admin/submissions/careers?limit=1")
        contact_resp = self.session.get(f"{BASE_URL}/api/admin/submissions/contact?limit=1")
        footer_resp = self.session.get(f"{BASE_URL}/api/admin/submissions/footer?limit=1")
        
        careers_total = careers_resp.json()["total"]
        contact_total = contact_resp.json()["total"]
        footer_total = footer_resp.json()["total"]
        
        assert stats["career_applications"]["total"] == careers_total, f"Dashboard careers total mismatch: {stats['career_applications']['total']} vs {careers_total}"
        assert stats["contact_forms"]["total"] == contact_total, f"Dashboard contact total mismatch: {stats['contact_forms']['total']} vs {contact_total}"
        assert stats["footer_forms"]["total"] == footer_total, f"Dashboard footer total mismatch: {stats['footer_forms']['total']} vs {footer_total}"
        
        expected_total = careers_total + contact_total + footer_total
        assert stats["total_submissions"] == expected_total, f"Total submissions mismatch: {stats['total_submissions']} vs {expected_total}"
        
        print(f"Dashboard Stats: Careers={careers_total}, Contact={contact_total}, Footer={footer_total}, Total={expected_total}")
    
    # ==================== PUBLIC FRONTEND NOT AFFECTED ====================
    
    def test_public_homepage_loads(self):
        """Test that public homepage is not affected"""
        # Test without auth headers
        public_session = requests.Session()
        response = public_session.get(BASE_URL)
        assert response.status_code == 200, f"Homepage should load, got {response.status_code}"
        print("Public homepage loads correctly")


class TestAdminLogin:
    """Test admin login"""
    
    def test_admin_login_success(self):
        """Test admin login with correct credentials"""
        session = requests.Session()
        response = session.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "admin"
        })
        assert response.status_code == 200, f"Login failed: {response.status_code}"
        
        data = response.json()
        assert "token" in data, "Response should have token"
        assert data.get("message") == "Login successful"
        print(f"Admin login successful, token received")
    
    def test_admin_login_wrong_password(self):
        """Test admin login with wrong password"""
        session = requests.Session()
        response = session.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "wrongpassword"
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("Wrong password correctly rejected with 401")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
