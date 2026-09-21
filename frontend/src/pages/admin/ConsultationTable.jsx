import React from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { consultationName } from './ConsultationDetail';

const columns = 'grid grid-cols-1 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)_80px] gap-4';
export const ConsultationTable = ({ state }) => <div role="table" aria-label="AI consultation enquiries" className="border-y border-gray-200" data-testid="admin-git-table">
  <div role="row" className={`${columns} hidden md:grid bg-gray-50 p-4 text-xs font-semibold text-gray-500`}>
    {['Contact', 'Company / Role', 'AI services / Budget', 'Date / Status', 'Actions'].map(label => <div role="columnheader" key={label}>{label}</div>)}
  </div>
  <div role="rowgroup" className="divide-y divide-gray-200">
    {state.loading ? <p role="status" className="p-8 text-center text-gray-500" data-testid="admin-git-loading">Loading…</p> : !state.result.data.length ? <p className="p-8 text-center text-gray-500" data-testid="admin-git-empty">No enquiries found</p> : state.result.data.map(item => <div role="row" key={item.id} className={`${columns} p-4 bg-white text-sm [overflow-wrap:anywhere]`} data-testid={`admin-git-row-${item.id}`}>
      <div role="cell" className="min-w-0">
        <p className="font-medium text-[#0B1F3B]" data-testid={`admin-git-name-${item.id}`}>{consultationName(item)}</p>
        <p className="text-gray-500 mt-1" data-testid={`admin-git-email-${item.id}`}>{item.company_email}</p>
      </div>
      <div role="cell" className="min-w-0 text-gray-600">
        <p data-testid={`admin-git-company-${item.id}`}>{item.company || '—'}</p>
        <p className="mt-1" data-testid={`admin-git-role-${item.id}`}>{item.role || '—'}</p>
      </div>
      <div role="cell" className="min-w-0 text-gray-600">
        <p data-testid={`admin-git-services-${item.id}`}>{item.services?.join(', ') || 'Not recorded'}</p>
        <p className="mt-1 text-[#0B1F3B]" data-testid={`admin-git-budget-${item.id}`}>{item.budget || 'Not provided'}</p>
      </div>
      <div role="cell" className="min-w-0 text-gray-500">
        <p data-testid={`admin-git-date-${item.id}`}>{new Date(item.created_at).toLocaleString()}</p>
        <p className={`mt-1 ${item.status === 'viewed' ? 'text-gray-500' : 'text-emerald-700'}`} data-testid={`admin-git-status-${item.id}`}>{item.status === 'viewed' ? 'Viewed' : 'New'}</p>
      </div>
      <div role="cell" className="flex gap-1">
        <Button variant="ghost" size="icon" title="View enquiry" aria-label={`View enquiry from ${consultationName(item)}`} disabled={state.busy} onClick={() => state.view(item.id)} data-testid={`admin-git-view-${item.id}`}><Eye className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" title="Delete enquiry" aria-label={`Delete enquiry from ${consultationName(item)}`} disabled={state.busy} onClick={() => state.remove(item.id)} data-testid={`admin-git-delete-${item.id}`}><Trash2 className="w-4 h-4 text-red-600" /></Button>
      </div>
    </div>)}
  </div>
</div>;