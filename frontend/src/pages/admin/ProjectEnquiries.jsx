import React from 'react';
import { Search, Download, RefreshCw, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useProjectEnquiries } from './useProjectEnquiries';
import { ProjectEnquiryDetail } from './ProjectEnquiryDetail';

const columns = 'grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_80px] gap-4';

export default function ProjectEnquiries() {
  const state = useProjectEnquiries();
  const { result, loading, error, selected, busy } = state;
  return (
    <AdminLayout>
      <div className="space-y-6 min-w-0" data-testid="admin-project-enquiries-page">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#0B1F3B]" data-testid="admin-project-heading">Project Enquiries</h1>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={state.exportCSV} disabled={state.exporting} data-testid="admin-project-export"><Download className="w-4 h-4 mr-2" />{state.exporting ? 'Exporting…' : 'Export All CSV'}</Button>
            <Button variant="outline" size="sm" onClick={state.refresh} disabled={loading} data-testid="admin-project-refresh"><RefreshCw className="w-4 h-4 mr-2" />Refresh</Button>
          </div>
        </div>
        <form onSubmit={state.handleSearch} className="flex gap-2">
          <div className="relative flex-1 min-w-0 max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input aria-label="Search project enquiries" placeholder="Search name, email, company or budget" className="pl-9" value={state.search} onChange={e => state.setSearch(e.target.value)} data-testid="admin-project-search" />
          </div>
          <Button type="submit" data-testid="admin-project-search-submit">Search</Button>
        </form>
        {error && !selected && <p role="alert" className="text-sm text-red-600" data-testid="admin-project-error">{error}</p>}
        <div role="table" aria-label="Project enquiries" className="border-y border-gray-200" data-testid="admin-project-table">
          <div role="row" className={`${columns} hidden md:grid bg-gray-50 p-4 text-xs font-semibold text-gray-500`}>
            {['Contact', 'Company', 'Budget', 'Received', 'Actions'].map(label => <div role="columnheader" key={label}>{label}</div>)}
          </div>
          <div role="rowgroup" className="divide-y divide-gray-200">
            {loading ? <p className="p-8 text-center text-gray-500" role="status" data-testid="admin-project-loading">Loading…</p> : !result.data.length ? <p className="p-8 text-center text-gray-500" data-testid="admin-project-empty">No enquiries found</p> : result.data.map(item => (
              <div role="row" key={item.id} className={`${columns} p-4 bg-white text-sm [overflow-wrap:anywhere]`} data-testid={`admin-project-row-${item.id}`}>
                <div role="cell" className="min-w-0">
                  <p className="font-medium text-[#0B1F3B]" data-testid={`admin-project-name-${item.id}`}>{item.full_name}</p>
                  <p className="text-gray-500 mt-1" data-testid={`admin-project-email-${item.id}`}>{item.email}</p>
                </div>
                <div role="cell" className="min-w-0 text-gray-600" data-testid={`admin-project-company-${item.id}`}>{item.company}</div>
                <div role="cell" className="min-w-0">
                  <span className="md:hidden text-xs text-gray-500 block mb-1">Budget</span>
                  <p className="font-medium text-[#0B1F3B]" data-testid={`admin-project-budget-${item.id}`}>{item.budget || 'Not provided'}</p>
                </div>
                <div role="cell" className="min-w-0 text-gray-500">
                  <p data-testid={`admin-project-date-${item.id}`}>{new Date(item.created_at).toLocaleDateString()}</p>
                  <p className={item.status === 'viewed' ? 'mt-1 text-gray-500' : 'mt-1 text-emerald-700'} data-testid={`admin-project-status-${item.id}`}>{item.status === 'viewed' ? 'Viewed' : 'New'}</p>
                </div>
                <div role="cell" className="flex gap-1">
                  <Button variant="ghost" size="icon" title="View enquiry" aria-label={`View enquiry from ${item.full_name}`} disabled={busy} onClick={() => state.view(item.id)} data-testid={`admin-project-view-${item.id}`}><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" title="Delete enquiry" aria-label={`Delete enquiry from ${item.full_name}`} disabled={busy} onClick={() => state.remove(item.id)} data-testid={`admin-project-delete-${item.id}`}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
          <p data-testid="admin-project-total">{result.total} enquiries</p>
          <div className="flex flex-wrap items-center gap-2">
            <select aria-label="Enquiries per page" value={state.limit} onChange={e => { state.setLimit(Number(e.target.value)); state.setPage(1); }} className="border rounded px-2 py-2 bg-white" data-testid="admin-project-page-size">
              {[10, 25, 50].map(size => <option key={size} value={size}>{size} per page</option>)}
            </select>
            <Button variant="outline" size="icon" aria-label="Previous page" disabled={loading || state.page <= 1} onClick={() => state.setPage(p => p - 1)} data-testid="admin-project-previous"><ChevronLeft className="w-4 h-4" /></Button>
            <span data-testid="admin-project-page-number">{state.page} / {Math.max(1, result.totalPages)}</span>
            <Button variant="outline" size="icon" aria-label="Next page" disabled={loading || state.page >= result.totalPages} onClick={() => state.setPage(p => p + 1)} data-testid="admin-project-next"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
        <ProjectEnquiryDetail enquiry={selected} onClose={() => state.setSelected(null)} onDelete={state.remove} busy={busy} error={error} />
      </div>
    </AdminLayout>
  );
}