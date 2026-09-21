import React from 'react';
import { Search, Download, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useConsultationEnquiries } from './useConsultationEnquiries';
import { ConsultationTable } from './ConsultationTable';
import { ConsultationDetail } from './ConsultationDetail';

export default function GetInTouchForms() {
  const state = useConsultationEnquiries();
  return <AdminLayout>
    <div className="space-y-6 min-w-0" data-testid="admin-get-in-touch-page">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3B]" data-testid="admin-ai-consultation-heading">AI Consultation Enquiry</h1>
          <p className="text-[#6B7280] mt-1" data-testid="admin-ai-consultation-description">Manage AI consultation enquiries</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={state.exportCSV} variant="outline" size="sm" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100" disabled={state.exporting} data-testid="admin-git-export"><Download className="w-4 h-4 mr-2" />{state.exporting ? 'Exporting…' : 'Export All CSV'}</Button>
          <Button onClick={state.refresh} variant="outline" size="sm" disabled={state.loading} data-testid="admin-git-refresh"><RefreshCw className="w-4 h-4 mr-2" />Refresh</Button>
        </div>
      </div>
      <form onSubmit={state.handleSearch} className="flex gap-2">
        <div className="relative flex-1 min-w-0 max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input aria-label="Search AI consultation enquiries" value={state.search} onChange={e => state.setSearch(e.target.value)} placeholder="Search name, email, company or service…" className="pl-9" data-testid="admin-git-search" />
        </div>
        <Button type="submit" data-testid="admin-git-search-btn">Search</Button>
      </form>
      {state.error && !state.selected && <p role="alert" className="text-sm text-red-600" data-testid="admin-git-error">{state.error}</p>}
      <ConsultationTable state={state} />
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
        <p data-testid="admin-git-total">{state.result.total} enquiries</p>
        <div className="flex flex-wrap items-center gap-2">
          <select aria-label="Enquiries per page" value={state.limit} onChange={e => { state.setLimit(Number(e.target.value)); state.setPage(1); }} className="border rounded px-2 py-2 bg-white" data-testid="admin-git-page-size">{[10, 25, 50].map(size => <option key={size} value={size}>{size} per page</option>)}</select>
          <Button variant="outline" size="icon" aria-label="Previous page" disabled={state.loading || state.page <= 1} onClick={() => state.setPage(p => p - 1)} data-testid="admin-git-previous"><ChevronLeft className="w-4 h-4" /></Button>
          <span data-testid="admin-git-page-number">{state.page} / {Math.max(1, state.result.totalPages)}</span>
          <Button variant="outline" size="icon" aria-label="Next page" disabled={state.loading || state.page >= state.result.totalPages} onClick={() => state.setPage(p => p + 1)} data-testid="admin-git-next"><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>
      <ConsultationDetail enquiry={state.selected} onClose={() => state.setSelected(null)} onDelete={state.remove} busy={state.busy} error={state.error} />
    </div>
  </AdminLayout>;
}