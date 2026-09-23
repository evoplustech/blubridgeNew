import React from 'react';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { consultationDetailSections } from './consultationDetailFields';
import './ConsultationDetail.css';

export { consultationName } from './consultationDetailFields';

const DetailSection = ({ section }) => <section className="consultation-detail-section" aria-labelledby={`admin-git-detail-section-${section.key}-heading`} data-testid={`admin-git-detail-section-${section.key}`}>
  <h3 id={`admin-git-detail-section-${section.key}-heading`} data-testid={`admin-git-detail-section-${section.key}-heading`}>{section.title}</h3>
  <dl className="consultation-detail-grid">
    {section.fields.map(([key, label, value, fullWidth]) => <div key={key} className={`consultation-detail-field${fullWidth ? ' consultation-detail-field-wide' : ''}`}>
      <dt data-testid={`admin-git-detail-${key}-label`}>{label}</dt>
      <dd className={value ? undefined : 'consultation-detail-missing'} data-testid={`admin-git-detail-${key}`}>{value || 'Not provided'}</dd>
    </div>)}
  </dl>
</section>;

export const ConsultationDetail = ({ enquiry, onClose, onDelete, busy, error }) => {
  if (!enquiry) return null;
  return <Dialog open={Boolean(enquiry)} onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent aria-describedby={undefined} className="consultation-detail-modal" data-testid="admin-git-detail-modal" closeTestId="admin-git-detail-close">
      <DialogHeader className="consultation-detail-header" data-testid="admin-git-detail-header">
        <DialogTitle data-testid="admin-git-detail-heading">AI Consulting Enquiry Details</DialogTitle>
      </DialogHeader>
      <div className="consultation-detail-body" role="region" aria-label="Enquiry details" tabIndex={0} data-testid="admin-git-detail-body">
        {consultationDetailSections(enquiry).map(section => <DetailSection key={section.key} section={section} />)}
      </div>
      <footer className="consultation-detail-footer" data-testid="admin-git-detail-footer">
        {error && <p role="alert" className="consultation-detail-error" data-testid="admin-git-detail-error">{error}</p>}
        <div className="consultation-detail-actions">
          <Button variant="outline" onClick={onClose} data-testid="admin-git-detail-dismiss">Close</Button>
          <Button variant="destructive" onClick={() => onDelete(enquiry.id)} disabled={busy} data-testid="admin-git-detail-delete">Delete</Button>
        </div>
      </footer>
    </DialogContent>
  </Dialog>;
};