import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Lock, User, AlertCircle } from 'lucide-react';
import { adminFetch as fetch } from './secureApi';

const API_URL = process.env.REACT_APP_BACKEND_URL || window.location.origin;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/verify`);
      if (response.ok) {
        navigate('/admin/dashboard');
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch (err) {
      localStorage.removeItem('adminToken');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/admin/dashboard');
      } else {
        setError(data.detail || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f1f9] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0B1F3B]">BluBridge</h1>
          <p className="text-[#6B7280] mt-2">Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-8">
          <h2 className="text-xl font-semibold text-[#0B1F3B] mb-6 text-center">Sign In</h2>

          {error && (
            <div role="alert" data-testid="admin-login-error" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-username" className="block text-sm font-medium text-[#374151] mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <Input
                  type="text"
                  id="admin-username"
                  data-testid="admin-login-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-11 border-[#E5E7EB] focus:border-[#328CC1] focus:ring-[#328CC1]"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-[#374151] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <Input
                  type="password"
                  id="admin-password"
                  data-testid="admin-login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 border-[#E5E7EB] focus:border-[#328CC1] focus:ring-[#328CC1]"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              data-testid="admin-login-submit"
              disabled={loading}
              className="w-full h-11 bg-[#0B1F3B] hover:bg-[#162B4D] text-white font-medium"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        <p className="text-center text-[#9CA3AF] text-sm mt-6">
          © 2025 BluBridge. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
