import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Settings, Lock, Download, FileText, MessageSquare, Briefcase, Database, AlertCircle, CheckCircle, Trash2, RefreshCw } from 'lucide-react';

import { adminFetch as fetch } from './secureApi';
const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [username, setUsername] = useState('');
  const [exportLoading, setExportLoading] = useState('');
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [cleanupResults, setCleanupResults] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/admin/settings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (newPassword.length < 12) {
      setMessage({ type: 'error', text: 'Password must be at least 12 characters' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/admin/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: data.detail || 'Failed to change password' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to connect to server' });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (dataType) => {
    setExportLoading(dataType);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/admin/export/${dataType}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${dataType}_export.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      } else {
        setMessage({ type: 'error', text: 'Failed to export data' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to export data' });
    } finally {
      setExportLoading('');
    }
  };

  const handleCleanupDuplicates = async () => {
    if (!window.confirm('This will remove duplicate records from the database. Are you sure you want to proceed?')) {
      return;
    }

    setCleanupLoading(true);
    setCleanupResults(null);
    setMessage({ type: '', text: '' });
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/admin/cleanup-duplicates`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (response.ok) {
        setCleanupResults(data.details);
        setMessage({ type: 'success', text: data.message });
      } else {
        setMessage({ type: 'error', text: data.detail || 'Failed to cleanup duplicates' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to connect to server' });
    } finally {
      setCleanupLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3B]">Settings</h1>
          <p className="text-[#6B7280] mt-1">Manage your admin account and export data</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'error' 
              ? 'bg-red-50 border border-red-200 text-red-700' 
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}>
            {message.type === 'error' ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Password Change Section */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#0B1F3B] rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#0B1F3B]">Change Password</h2>
                <p className="text-sm text-[#6B7280]">Update your admin password</p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  Current Username
                </label>
                <Input
                  type="text"
                  value={username}
                  disabled
                  className="bg-[#F3F4F6] border-[#E5E7EB]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  Current Password
                </label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="border-[#E5E7EB] focus:border-[#328CC1]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  New Password
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 12 characters)"
                  className="border-[#E5E7EB] focus:border-[#328CC1]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="border-[#E5E7EB] focus:border-[#328CC1]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0B1F3B] hover:bg-[#162B4D] text-white"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </div>

          {/* Export Data Section */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#328CC1] rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#0B1F3B]">Export Data</h2>
                <p className="text-sm text-[#6B7280]">Download submissions as CSV</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Export Footer Forms */}
              <button
                onClick={() => handleExport('footer')}
                disabled={exportLoading === 'footer'}
                className="w-full flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg hover:bg-[#E5E7EB] transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div className="text-left">
                    <span className="font-medium text-[#374151] block">Footer Forms</span>
                    <span className="text-xs text-[#6B7280]">Newsletter & footer submissions</span>
                  </div>
                </div>
                <Download className={`w-4 h-4 text-[#6B7280] ${exportLoading === 'footer' ? 'animate-bounce' : ''}`} />
              </button>

              {/* Export Contact Forms */}
              <button
                onClick={() => handleExport('contact')}
                disabled={exportLoading === 'contact'}
                className="w-full flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg hover:bg-[#E5E7EB] transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  <div className="text-left">
                    <span className="font-medium text-[#374151] block">Contact Forms</span>
                    <span className="text-xs text-[#6B7280]">Sales, enquiry & contact submissions</span>
                  </div>
                </div>
                <Download className={`w-4 h-4 text-[#6B7280] ${exportLoading === 'contact' ? 'animate-bounce' : ''}`} />
              </button>

              {/* Export Career Applications */}
              <button
                onClick={() => handleExport('careers')}
                disabled={exportLoading === 'careers'}
                className="w-full flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg hover:bg-[#E5E7EB] transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-purple-500" />
                  <div className="text-left">
                    <span className="font-medium text-[#374151] block">Career Applications</span>
                    <span className="text-xs text-[#6B7280]">Job applications & resumes</span>
                  </div>
                </div>
                <Download className={`w-4 h-4 text-[#6B7280] ${exportLoading === 'careers' ? 'animate-bounce' : ''}`} />
              </button>

              {/* Export All Data */}
              <button
                onClick={() => handleExport('all')}
                disabled={exportLoading === 'all'}
                className="w-full flex items-center justify-between p-4 bg-[#0B1F3B] rounded-lg hover:bg-[#162B4D] transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-white" />
                  <div className="text-left">
                    <span className="font-medium text-white block">Export All Data</span>
                    <span className="text-xs text-white/70">Combined CSV with all submissions</span>
                  </div>
                </div>
                <Download className={`w-4 h-4 text-white ${exportLoading === 'all' ? 'animate-bounce' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#6B7280]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#0B1F3B]">Account Information</h2>
              <p className="text-sm text-[#6B7280]">Your admin account details</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F8F9FA] rounded-lg">
              <span className="text-sm text-[#6B7280]">Username</span>
              <p className="font-medium text-[#0B1F3B] mt-1">{username || 'admin'}</p>
            </div>
            <div className="p-4 bg-[#F8F9FA] rounded-lg">
              <span className="text-sm text-[#6B7280]">Role</span>
              <p className="font-medium text-[#0B1F3B] mt-1">Administrator</p>
            </div>
          </div>
        </div>

        {/* Database Maintenance Section */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#0B1F3B]">Database Maintenance</h2>
              <p className="text-sm text-[#6B7280]">Clean up duplicate records from the database</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> This action will scan all collections and remove duplicate records. 
                Only the first (oldest) record will be kept for each unique submission.
              </p>
            </div>

            <Button
              onClick={handleCleanupDuplicates}
              disabled={cleanupLoading}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {cleanupLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Cleaning up...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Cleanup Duplicate Records
                </>
              )}
            </Button>

            {cleanupResults && (
              <div className="mt-4 p-4 bg-[#F8F9FA] rounded-lg space-y-2">
                <h3 className="font-medium text-[#0B1F3B]">Cleanup Results:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded border border-[#E5E7EB]">
                    <span className="text-xs text-[#6B7280] block">Contacts</span>
                    <span className="font-medium text-[#0B1F3B]">
                      {cleanupResults.contacts?.duplicates_removed || 0} removed
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded border border-[#E5E7EB]">
                    <span className="text-xs text-[#6B7280] block">Job Applications</span>
                    <span className="font-medium text-[#0B1F3B]">
                      {cleanupResults.job_applications?.duplicates_removed || 0} removed
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded border border-[#E5E7EB]">
                    <span className="text-xs text-[#6B7280] block">Footer Forms</span>
                    <span className="font-medium text-[#0B1F3B]">
                      {cleanupResults.footer_forms?.duplicates_removed || 0} removed
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
