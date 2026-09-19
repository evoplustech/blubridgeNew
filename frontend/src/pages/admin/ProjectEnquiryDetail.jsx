import React from 'react';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';

export const ProjectEnquiryDetail = ({ enquiry, onClose, onDelete, busy, error }) => {
  if (!enquiry) return null;
  const fields = [
    ['full-name', 'Full name', enquiry.full_name], ['email', 'Email', enquiry.email],
    ['phone', 'Phone', enquiry.phone], ['company', 'Company', enquiry.company],
    ['job-title', 'Job title', enquiry.job_title], ['country', 'Country', enquiry.country],
    ['city', 'City', enquiry.city], ['budget', 'Budget', enquiry.budget || 'Not provided'],
    ['message', 'Message', enquiry.message], ['privacy', 'Privacy consent', enquiry.privacy_consent ? 'Yes' : 'No'],
    ['marketing', 'Marketing updates', enquiry.marketing_consent ? 'Opted in' : 'No'],
    ['submitted', 'Submitted', new Date(enquiry.created_at).toLocaleString()],
  ];
  return (
    <Dialog open={Boolean(enquiry)} onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent aria-describedby={undefined} className="max-w-[calc(100%_-_2rem)] sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-lg" data-testid="admin-project-detail-modal" closeTestId="admin-project-detail-close">
        <DialogHeader><DialogTitle data-testid="admin-project-detail-title">Project enquiry</DialogTitle></DialogHeader>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(([key, label, value]) => <div key={key} className={key === 'message' ? 'sm:col-span-2 min-w-0' : 'min-w-0'}>
            <dt className="text-xs text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-[#0B1F3B] whitespace-pre-wrap [overflow-wrap:anywhere]" data-testid={`admin-project-detail-${key}`}>{value || '—'}</dd>
          </div>)}
        </dl>
        {error && <p role="alert" className="text-sm text-red-600" data-testid="admin-project-detail-error">{error}</p>}
        <div className="flex justify-end gap-2 border-t pt-4">
          <Button variant="outline" onClick={onClose} data-testid="admin-project-detail-dismiss">Close</Button>
          <Button variant="destructive" disabled={busy} onClick={() => onDelete(enquiry.id)} data-testid="admin-project-detail-delete">Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};