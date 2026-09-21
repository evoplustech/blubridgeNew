import React from 'react';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';

export const consultationName = item => item.full_name || [item.first_name, item.last_name].filter(Boolean).join(' ');
const consent = value => value == null ? 'Not recorded' : value ? 'Yes' : 'No';

export const ConsultationDetail = ({ enquiry, onClose, onDelete, busy, error }) => {
  if (!enquiry) return null;
  const fields = [
    ['full-name', 'Full name', consultationName(enquiry)], ['email', 'Work email', enquiry.company_email],
    ['company', 'Company', enquiry.company], ['phone', 'Phone', enquiry.phone],
    ['job-title', 'Job title / Role', enquiry.role], ['country', 'Country', enquiry.country],
    ['city', 'City', enquiry.city], ['budget', 'Budget', enquiry.budget || 'Not sure yet / Not provided'],
    ['services', 'AI services', enquiry.services?.join(', ')],
    ['description', 'What would you like to achieve?', enquiry.project_details],
    ['privacy', 'Privacy consent', consent(enquiry.privacy_consent)],
    ['marketing', 'BluBridge updates', consent(enquiry.marketing_consent)],
    ['source', 'Source page', enquiry.source], ['status', 'Status', enquiry.status === 'viewed' ? 'Viewed' : 'New'],
    ['submitted', 'Submitted', new Date(enquiry.created_at).toLocaleString()],
  ];
  return <Dialog open={Boolean(enquiry)} onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent aria-describedby={undefined} className="max-w-[calc(100%_-_2rem)] sm:max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg" data-testid="admin-git-detail-modal" closeTestId="admin-git-detail-close">
      <DialogHeader><DialogTitle className="pr-6 leading-snug" data-testid="admin-git-detail-heading">AI Consultation Enquiry Details</DialogTitle></DialogHeader>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(([key, label, value]) => <div key={key} className={`min-w-0${['services', 'description'].includes(key) ? ' sm:col-span-2' : ''}`}>
          <dt className="text-xs text-gray-500">{label}</dt>
          <dd className="mt-1 text-sm text-[#0B1F3B] whitespace-pre-wrap [overflow-wrap:anywhere]" data-testid={`admin-git-detail-${key}`}>{value || 'Not provided'}</dd>
        </div>)}
      </dl>
      {error && <p role="alert" className="text-sm text-red-600" data-testid="admin-git-detail-error">{error}</p>}
      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" onClick={onClose} data-testid="admin-git-detail-dismiss">Close</Button>
        <Button variant="destructive" onClick={() => onDelete(enquiry.id)} disabled={busy} data-testid="admin-git-detail-delete">Delete</Button>
      </div>
    </DialogContent>
  </Dialog>;
};