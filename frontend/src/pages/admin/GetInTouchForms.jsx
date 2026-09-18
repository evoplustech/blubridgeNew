import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import Pagination from './Pagination';
import { Search, Eye, Trash2, RefreshCw, User, X, Download } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const GetInTouchForms = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [exporting, setExporting] = useState(false);

  useEffect(() => { fetchSubmissions(); }, [page, limit]);

  const authHeaders = () => ({ 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` });

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit });
      if (search) params.append('search', search);
      const response = await fetch(`${API_URL}/api/admin/submissions/get-in-touch?${params}`, { headers: authHeaders() });
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

  const handleSearch = (e) => { e.preventDefault(); setPage(1); fetchSubmissions(); };

  const exportToCSV = async () => {
    setExporting(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/export/get_in_touch`, { headers: authHeaders() });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `get_in_touch_${new Date().toISOString().split('T')[0]}.csv`;
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
      const response = await fetch(`${API_URL}/api/admin/submission/${submission.id}?form_type=get_in_touch`, { headers: authHeaders() });
      if (response.ok) {
        const data = await response.json();
        setSelected(data);
        setShowDetail(true);
        setSubmissions(prev => prev.map(s => s.id === submission.id ? { ...s, status: 'viewed' } : s));
      }
    } catch (err) {
      console.error('Error viewing submission:', err);
    }
  };

  const deleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/submission/${id}?form_type=get_in_touch`, { method: 'DELETE', headers: authHeaders() });
      if (response.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
        setTotal(t => Math.max(0, t - 1));
        if (selected?.id === id) { setShowDetail(false); setSelected(null); }
      }
    } catch (err) {
      console.error('Error deleting submission:', err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const th = 'text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider';

  return (
    <AdminLayout>
      <div className="space-y-6" data-testid="admin-get-in-touch-page">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F3B]">Get in Touch Enquiries</h1>
            <p className="text-[#6B7280] mt-1">Manage enquiries submitted from the Get in Touch page</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportToCSV} variant="outline" size="sm" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100" disabled={exporting} data-testid="admin-git-export">
              <Download className="w-4 h-4 mr-2" />
              {exporting ? 'Exporting...' : 'Export All CSV'}
            </Button>
            <Button onClick={fetchSubmissions} variant="outline" size="sm" data-testid="admin-git-refresh">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email or role..." className="pl-10" data-testid="admin-git-search" />
          </div>
          <Button type="submit" data-testid="admin-git-search-btn">Search</Button>
        </form>

        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="admin-git-table">
              <thead className="bg-[#F8F9FA] border-b border-[#E5E7EB]">
                <tr>
                  <th className={th}>Name</th>
                  <th className={th}>Company Email</th>
                  <th className={th}>Role</th>
                  <th className={th}>Updates</th>
                  <th className={th}>Date</th>
                  <th className={th}>Status</th>
                  <th className={`${th} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {loading ? (
                  <tr><td colSpan="7" className="px-6 py-12 text-center text-[#6B7280]">Loading...</td></tr>
                ) : submissions.length === 0 ? (
                  <tr><td colSpan="7" className="px-6 py-12 text-center text-[#6B7280]">No enquiries found</td></tr>
                ) : (
                  submissions.map((s) => (
                    <tr key={s.id} className="hover:bg-[#F8F9FA]" data-testid={`admin-git-row-${s.id}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#E5E7EB] rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-[#6B7280]" />
                          </div>
                          <span className="font-medium text-[#0B1F3B]">{s.first_name} {s.last_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#6B7280]">{s.company_email}</td>
                      <td className="px-6 py-4 text-[#6B7280]">{s.role || '-'}</td>
                      <td className="px-6 py-4 text-[#6B7280] text-sm">{s.marketing_consent ? 'Yes' : 'No'}</td>
                      <td className="px-6 py-4 text-[#6B7280] text-sm">{formatDate(s.created_at)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${s.status === 'viewed' ? 'bg-gray-100 text-gray-600' : 'bg-emerald-100 text-emerald-700'}`}>
                          {s.status === 'viewed' ? 'Viewed' : 'New'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => viewSubmission(s)} className="p-2 text-[#6B7280] hover:text-[#328CC1] hover:bg-[#F3F4F6] rounded-lg transition-colors" title="View" data-testid={`admin-git-view-${s.id}`}>
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteSubmission(s.id)} className="p-2 text-[#6B7280] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete" data-testid={`admin-git-delete-${s.id}`}>
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

        <Pagination page={page} totalPages={totalPages} total={total} limit={limit} onPageChange={setPage} onLimitChange={(l) => { setLimit(l); setPage(1); }} />

        {showDetail && selected && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-testid="admin-git-detail-modal">
            <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
                <h2 className="text-lg font-semibold text-[#0B1F3B]">Enquiry Details</h2>
                <button onClick={() => setShowDetail(false)} className="p-2 hover:bg-[#F3F4F6] rounded-lg" data-testid="admin-git-detail-close">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] uppercase">First Name</label>
                    <p className="mt-1 text-[#0B1F3B] font-medium">{selected.first_name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] uppercase">Last Name</label>
                    <p className="mt-1 text-[#0B1F3B] font-medium">{selected.last_name}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Company Email</label>
                  <p className="mt-1 text-[#0B1F3B]">{selected.company_email}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Role</label>
                  <p className="mt-1 text-[#0B1F3B]">{selected.role || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6B7280] uppercase">Project Details</label>
                  <p className="mt-1 text-[#0B1F3B] whitespace-pre-wrap">{selected.project_details}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] uppercase">Marketing Updates</label>
                    <p className="mt-1 text-[#0B1F3B]">{selected.marketing_consent ? 'Opted in' : 'No'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#6B7280] uppercase">Submitted</label>
                    <p className="mt-1 text-[#0B1F3B]">{formatDate(selected.created_at)}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-[#E5E7EB] flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowDetail(false)}>Close</Button>
                <Button onClick={() => deleteSubmission(selected.id)} className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default GetInTouchForms;
