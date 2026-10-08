import React from 'react';
import { Eye, Trash2, ChevronDown, CheckSquare, Square } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { Button } from '../../components/ui/button';
import { consultationName } from './ConsultationDetail';

const columns = 'grid grid-cols-[28px_minmax(0,1fr)] md:grid-cols-[28px_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)_96px] gap-4';
const boxCls = 'w-4 h-4 mt-0.5 accent-[#0B1F3B] cursor-pointer disabled:cursor-not-allowed';

const BulkMenu = ({ state, allOn }) => {
  const n = state.checked.length;
  const off = state.loading || state.busy || !state.result.data.length;
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button size="sm" variant="outline" disabled={off} className="h-8 px-2.5 text-xs font-semibold text-gray-600" aria-label="Bulk actions" data-testid="admin-git-bulk-menu">
        Actions{n > 0 && <span className="ml-1.5 rounded-full bg-[#0B1F3B] px-1.5 text-[10px] leading-4 text-white" data-testid="admin-git-selected-count">{n}</span>}<ChevronDown className="w-3.5 h-3.5 ml-1" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-52">
      <DropdownMenuItem disabled={allOn} onSelect={() => !allOn && state.toggleAll()} data-testid="admin-git-bulk-select-all"><CheckSquare className="w-4 h-4 mr-2" />Select all on this page</DropdownMenuItem>
      <DropdownMenuItem disabled={!n} onSelect={state.clearChecked} data-testid="admin-git-bulk-deselect-all"><Square className="w-4 h-4 mr-2" />Deselect all</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem disabled={!n} onSelect={() => setTimeout(state.removeChecked, 0)} className="text-red-700 focus:text-red-700 focus:bg-red-50" data-testid="admin-git-bulk-delete"><Trash2 className="w-4 h-4 mr-2" />Delete selected ({n})</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>;
};

export const ConsultationTable = ({ state }) => {
  const rows = state.result.data;
  const allOn = rows.length > 0 && state.checked.length === rows.length;
  return <div role="table" aria-label="AI consulting enquiries" className="border-y border-gray-200" data-testid="admin-git-table">
  <div role="row" className={`${columns} bg-gray-50 p-4 text-xs font-semibold text-gray-500`}>
    <div role="columnheader"><input type="checkbox" className={boxCls} checked={allOn} disabled={state.loading || state.busy || !rows.length}
      ref={el => { if (el) el.indeterminate = state.checked.length > 0 && !allOn; }} onChange={state.toggleAll}
      aria-label={allOn ? 'Deselect all enquiries on this page' : 'Select all enquiries on this page'} title={allOn ? 'Deselect all' : 'Select all'} data-testid="admin-git-select-all" /></div>
    {['Contact', 'Company / Role', 'AI services / Budget', 'Date / Status'].map(label => <div role="columnheader" key={label} className="hidden md:block">{label}</div>)}
    <div role="columnheader" className="flex justify-end md:justify-start -my-1.5"><BulkMenu state={state} allOn={allOn} /></div>
  </div>
  <div role="rowgroup" className="divide-y divide-gray-200">
    {state.loading ? <p role="status" className="p-8 text-center text-gray-500" data-testid="admin-git-loading">Loading…</p> : !state.result.data.length ? <p className="p-8 text-center text-gray-500" data-testid="admin-git-empty">No enquiries found</p> : state.result.data.map(item => <div role="row" key={item.id} aria-selected={state.checked.includes(item.id)} className={`${columns} p-4 text-sm [overflow-wrap:anywhere] ${state.checked.includes(item.id) ? 'bg-[#0B1F3B]/[0.03]' : 'bg-white'}`} data-testid={`admin-git-row-${item.id}`}>
      <div role="cell" className="row-span-5 md:row-span-1"><input type="checkbox" className={boxCls} checked={state.checked.includes(item.id)} disabled={state.busy} onChange={() => state.toggleChecked(item.id)}
        aria-label={`Select enquiry from ${consultationName(item)}`} data-testid={`admin-git-select-${item.id}`} /></div>
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
        {item.budget_type && <p className="mt-1 text-xs" data-testid={`admin-git-budget-type-${item.id}`}>{item.budget_type === 'monthly' ? 'Monthly budget' : 'Project budget'}</p>}
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
};