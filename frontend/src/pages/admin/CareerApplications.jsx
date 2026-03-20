import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import Pagination from './Pagination';
import { Search, Eye, Trash2, RefreshCw, User, Download, Briefcase, X, FileText, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const CareerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, page, limit]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      const url = `${API_URL}/api/admin/submissions/careers?${params.toString()}`;
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const result = await response.json();
        setApplications(result.data);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchApplications();
  };

  const handleDateFilter = () => {
    setPage(1);
    fetchApplications();
  };

  const clearDateFilter = () => {
    setStartDate('');
    setEndDate('');
    setPage(1);
    setTimeout(() => fetchApplications(), 0);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const viewApplication = async (application) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(
        `${API_URL}/api/admin/submission/${application.id}?form_type=careers`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      if (response.ok) {
        const data = await response.json();
        setSelectedApplication(data);
        setShowDetail(true);
        setApplications(prev => prev.map(a => 
          a.id === application.id ? { ...a, status: data.status } : a
        ));
      }
    } catch (err) {
      console.error('Error viewing application:', err);
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(
        `${API_URL}/api/admin/submission/${id}?form_type=careers`,
        { 
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` } 
        }
      );
      
      if (response.ok) {
        setApplications(prev => prev.filter(a => a.id !== id));
        if (selectedApplication?.id === id) {
          setShowDetail(false);
          setSelectedApplication(null);
        }
      }
    } catch (err) {
      console.error('Error deleting application:', err);
    }
  };

  const downloadResume = async (applicationId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(
        `${API_URL}/api/admin/resume/${applicationId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition 
          ? contentDisposition.split('filename=')[1]?.replace(/"/g, '') 
          : 'resume.pdf';
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    } catch (err) {
      console.error('Error downloading resume:', err);
    }
  };

  const updateStatus = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(
        `${API_URL}/api/job-applications/${applicationId}/status?status=${newStatus}`,
        { 
          method: 'PATCH',
          headers: { 'Authorization': `Bearer ${token}` } 
        }
      );
      
      if (response.ok) {
        setApplications(prev => prev.map(a => 
          a.id === applicationId ? { ...a, status: newStatus } : a
        ));
        if (selectedApplication?.id === applicationId) {
          setSelectedApplication(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const exportToCSV = async (exportAll = true) => {
    setExporting(true);
    try {
      if (exportAll) {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/api/admin/export/careers`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          const dateStr = new Date().toISOString().split('T')[0];
          a.download = `career_applications_all_${dateStr}.csv`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        }
      } else {
        if (applications.length === 0) { alert('No data to export'); setExporting(false); return; }
        const headers = ['First Name','Last Name','Email','Phone','Job Title','LinkedIn','Portfolio','Status','Applied Date'];
        const rows = applications.map(app => [
          app.firstName || '', app.lastName || '', app.email || '', app.phone || '',
          app.jobTitle || '', app.linkedIn || '', app.portfolio || '',
          app.status || 'pending', app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : ''
        ]);
        const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const dateStr = new Date().toISOString().split('T')[0];
        a.download = `career_applications_page${page}_${dateStr}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    } catch (err) {
      console.error('Error exporting:', err);
    } finally {
      setExporting(false);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'reviewed': return 'bg-blue-100 text-blue-700';
      case 'shortlisted': return 'bg-emerald-100 text-emerald-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'hired': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F3B]">Career Applications</h1>
            <p className="text-[#6B7280] mt-1">Manage job applications and resumes</p>
          </div>
          <div className="flex gap-2">
            <div className="relative group">
              <Button variant="outline" size="sm" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100" disabled={exporting}>
                <Download className="w-4 h-4 mr-2" />
                {exporting ? 'Exporting...' : 'Export CSV'}
              </Button>
              <div className="absolute right-0 top-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg hidden group-hover:block z-10 min-w-[180px]">
                <button onClick={() => exportToCSV(true)} className="w-full text-left px-4 py-2.5 text-sm text-[#374151] hover:bg-[#F3F4F6] rounded-t-lg" data-testid="export-all-btn">
                  Export All Data
                </button>
                <button onClick={() => exportToCSV(false)} className="w-full text-left px-4 py-2.5 text-sm text-[#374151] hover:bg-[#F3F4F6] rounded-b-lg border-t border-[#E5E7EB]" data-testid="export-page-btn">
                  Export Current Page
                </button>
              </div>
            </div>
            <Button onClick={fetchApplications} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex items-center gap-2 text-[#0B1F3B] font-medium">
              <Calendar className="w-5 h-5 text-[#328CC1]" />
              <span>Filter by Date Range</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#6B7280]">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full sm:w-44"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#6B7280]">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full sm:w-44"
                />
              </div>
              <div className="flex items-end gap-2">
                <Button onClick={handleDateFilter} size="sm">
                  Apply Filter
                </Button>
                {(startDate || endDate) && (
                  <Button onClick={clearDateFilter} variant="outline" size="sm">
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Status Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or job title..."
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-md border border-[#E5E7EB] bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#328CC1]"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="text-sm text-[#6B7280]">
          Showing {applications.length} of {total} application{total !== 1 ? 's' : ''}
          {(startDate || endDate) && (
            <span className="ml-2 text-[#328CC1]">
              ({startDate && `From: ${startDate}`}{startDate && endDate && ' - '}{endDate && `To: ${endDate}`})
            </span>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b border-[#E5E7EB]">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Applicant</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Job Title</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Resume</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-[#6B7280]">
                      Loading...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-[#6B7280]">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  applications.map((application) => (
                    <tr key={application.id} className="hover:bg-[#F8F9FA]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="font-medium text-[#0B1F3B]">
                            {application.firstName || ''} {application.lastName || ''}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#6B7280]" />
                          <span className="text-[#0B1F3B]">{application.jobTitle || '-'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#6B7280]">{application.email}</td>
                      <td className="px-6 py-4 text-[#6B7280] text-sm">{formatDate(application.appliedAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(application.status)}`}>
                          {application.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {application.resumeCV ? (
                          <button
                            onClick={() => downloadResume(application.id)}
                            className="flex items-center gap-1 text-[#328CC1] hover:text-[#0B1F3B] text-sm font-medium"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        ) : (
                          <span className="text-[#9CA3AF] text-sm">No file</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => viewApplication(application)}
                            className="p-2 text-[#6B7280] hover:text-[#328CC1] hover:bg-[#F3F4F6] rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteApplication(application.id)}
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
        {showDetail && selectedApplication && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
                <h2 className="text-lg font-semibold text-[#0B1F3B]">Application Details</h2>
                <button
                  onClick={() => setShowDetail(false)}
                  className="p-2 hover:bg-[#F3F4F6] rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] uppercase">First Name</label>
                    <p className="mt-1 text-[#0B1F3B] font-medium">{selectedApplication.firstName || '-'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] uppercase">Last Name</label>
                    <p className="mt-1 text-[#0B1F3B] font-medium">{selectedApplication.lastName || '-'}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Email</label>
                  <p className="mt-1 text-[#0B1F3B]">{selectedApplication.email}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Phone</label>
                  <p className="mt-1 text-[#0B1F3B]">{selectedApplication.phone || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Job Title</label>
                  <p className="mt-1 text-[#0B1F3B] font-medium">{selectedApplication.jobTitle || '-'}</p>
                </div>
                {selectedApplication.linkedIn && (
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] uppercase">LinkedIn</label>
                    <a 
                      href={selectedApplication.linkedIn} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-1 block text-[#328CC1] hover:underline"
                    >
                      {selectedApplication.linkedIn}
                    </a>
                  </div>
                )}
                {selectedApplication.portfolio && (
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] uppercase">Portfolio</label>
                    <a 
                      href={selectedApplication.portfolio} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-1 block text-[#328CC1] hover:underline"
                    >
                      {selectedApplication.portfolio}
                    </a>
                  </div>
                )}
                {selectedApplication.coverLetter && (
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] uppercase">Cover Letter</label>
                    <p className="mt-1 text-[#0B1F3B] whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] uppercase">Applied</label>
                    <p className="mt-1 text-[#0B1F3B]">{formatDate(selectedApplication.appliedAt)}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] uppercase">Status</label>
                    <select
                      value={selectedApplication.status || 'pending'}
                      onChange={(e) => updateStatus(selectedApplication.id, e.target.value)}
                      className="mt-1 h-9 px-3 rounded-md border border-[#E5E7EB] bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#328CC1] w-full"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                      <option value="hired">Hired</option>
                    </select>
                  </div>
                </div>
                {selectedApplication.resumeCV && (
                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <label className="text-xs font-medium text-[#6B7280] uppercase">Resume</label>
                    <div className="mt-2 flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-lg">
                      <FileText className="w-8 h-8 text-[#328CC1]" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#0B1F3B]">
                          {selectedApplication.resumeFilename || 'Resume'}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => downloadResume(selectedApplication.id)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-[#E5E7EB] flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowDetail(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => deleteApplication(selectedApplication.id)}
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

export default CareerApplications;
