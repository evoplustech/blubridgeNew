import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import Pagination from './Pagination';
import { Search, Eye, Trash2, RefreshCw, Mail, User, Calendar, X, Download } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

import { adminFetch as fetch } from './secureApi';
const API_URL = process.env.REACT_APP_BACKEND_URL;

const FooterForms = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, [page, limit]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      if (search) params.append('search', search);
      const url = `${API_URL}/api/admin/submissions/footer?${params.toString()}`;
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const result = await response.json();
        setSubmissions(result.data);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      }
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchSubmissions();
  };

  const handlePageChange = (newPage) => { setPage(newPage); };
  const handleLimitChange = (newLimit) => { setLimit(newLimit); setPage(1); };

  const exportToCSV = async () => {
    setExporting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/admin/export/footer`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `footer_forms_all_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    } catch (err) { console.error('Error exporting:', err); }
    finally { setExporting(false); }
  };

  const viewSubmission = async (submission) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(
        `${API_URL}/api/admin/submission/${submission.id}?form_type=footer`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      if (response.ok) {
        const data = await response.json();
        setSelectedSubmission(data);
        setShowDetail(true);
        // Update local state to show as viewed
        setSubmissions(prev => prev.map(s => 
          s.id === submission.id ? { ...s, status: 'viewed' } : s
        ));
      }
    } catch (err) {
      console.error('Error viewing submission:', err);
    }
  };

  const deleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(
        `${API_URL}/api/admin/submission/${id}?form_type=footer`,
        { 
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` } 
        }
      );
      
      if (response.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
        if (selectedSubmission?.id === id) {
          setShowDetail(false);
          setSelectedSubmission(null);
        }
      }
    } catch (err) {
      console.error('Error deleting submission:', err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F3B]">Footer Form Submissions</h1>
            <p className="text-[#6B7280] mt-1">Manage submissions from the global footer form</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportToCSV} variant="outline" size="sm" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100" disabled={exporting}>
              <Download className="w-4 h-4 mr-2" />
              {exporting ? 'Exporting...' : 'Export All CSV'}
            </Button>
            <Button onClick={fetchSubmissions} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b border-[#E5E7EB]">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-[#6B7280]">
                      Loading...
                    </td>
                  </tr>
                ) : submissions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-[#6B7280]">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-[#F8F9FA]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#E5E7EB] rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-[#6B7280]" />
                          </div>
                          <span className="font-medium text-[#0B1F3B]">
                            {submission.firstName || ''} {submission.lastName || ''}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#6B7280]">{submission.email}</td>
                      <td className="px-6 py-4 text-[#6B7280] text-sm">{formatDate(submission.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                          submission.status === 'viewed' 
                            ? 'bg-gray-100 text-gray-600' 
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {submission.status === 'viewed' ? 'Viewed' : 'New'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => viewSubmission(submission)}
                            className="p-2 text-[#6B7280] hover:text-[#328CC1] hover:bg-[#F3F4F6] rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteSubmission(submission.id)}
                            className="p-2 text-[#6B7280] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          limit={limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />

        {/* Detail Modal */}
        {showDetail && selectedSubmission && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
                <h2 className="text-lg font-semibold text-[#0B1F3B]">Submission Details</h2>
                <button
                  onClick={() => setShowDetail(false)}
                  className="p-2 hover:bg-[#F3F4F6] rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Name</label>
                  <p className="mt-1 text-[#0B1F3B] font-medium">
                    {selectedSubmission.firstName || ''} {selectedSubmission.lastName || ''}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Email</label>
                  <p className="mt-1 text-[#0B1F3B]">{selectedSubmission.email}</p>
                </div>
                {selectedSubmission.message && (
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] uppercase">Message</label>
                    <p className="mt-1 text-[#0B1F3B] whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                )}
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Submitted</label>
                  <p className="mt-1 text-[#0B1F3B]">{formatDate(selectedSubmission.createdAt)}</p>
                </div>
              </div>
              <div className="p-6 border-t border-[#E5E7EB] flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowDetail(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => deleteSubmission(selectedSubmission.id)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default FooterForms;
