import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { MailX, Plus, X, RotateCcw, Search } from 'lucide-react';

import { adminFetch as fetch } from './secureApi';
import { API_ORIGIN } from '../../apiOrigin';

const ENDPOINT = `${API_ORIGIN}/api/admin/blocked-email-domains`;

// Personal email providers rejected on the consulting enquiry form. Changes apply immediately, no redeploy.
export const BlockedEmailDomains = ({ notify }) => {
  const [domains, setDomains] = useState([]);
  const [defaults, setDefaults] = useState([]);
  const [entry, setEntry] = useState('');
  const [filter, setFilter] = useState('');
  const [busy, setBusy] = useState(false);
  // Guards against overwriting the stored list with empty state when it failed to load.
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const response = await fetch(ENDPOINT);
    if (!response.ok) return notify({ type: 'error', text: 'Failed to load blocked email domains' });
    const data = await response.json();
    setDomains(data.domains);
    setDefaults(data.defaults);
    setLoaded(true);
  };

  useEffect(() => { load().catch(() => notify({ type: 'error', text: 'Failed to load blocked email domains' })); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const save = async (next, text) => {
    if (!loaded) return notify({ type: 'error', text: 'Blocked domains are still loading' });
    setBusy(true);
    try {
      const response = await fetch(ENDPOINT, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domains: next }),
      });
      const data = await response.json();
      if (!response.ok) return notify({ type: 'error', text: data.detail || 'Failed to update blocked domains' });
      setDomains(data.domains);
      notify({ type: 'success', text });
    } catch {
      notify({ type: 'error', text: 'Failed to connect to server' });
    } finally {
      setBusy(false);
    }
  };

  const add = event => {
    event.preventDefault();
    const domain = entry.trim().toLowerCase().replace(/^@/, '');
    if (!domain) return;
    if (domains.includes(domain)) return notify({ type: 'error', text: `${domain} is already blocked` });
    setEntry('');
    return save([...domains, domain], `${domain} is now blocked`);
  };

  const remove = domain => save(domains.filter(value => value !== domain), `${domain} is allowed again`);

  const visible = domains.filter(domain => domain.includes(filter.trim().toLowerCase()));

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-6" data-testid="blocked-domains-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#0B1F3B] rounded-lg flex items-center justify-center">
          <MailX className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#0B1F3B]">Blocked Email Domains</h2>
          <p className="text-sm text-[#6B7280]">Personal email providers rejected on the consulting form — applies instantly</p>
        </div>
      </div>

      <form onSubmit={add} className="flex flex-col sm:flex-row gap-3 mb-4">
        <Input
          value={entry}
          onChange={event => setEntry(event.target.value)}
          placeholder="example-mail.com"
          className="border-[#E5E7EB] focus:border-[#328CC1]"
          data-testid="blocked-domain-input"
        />
        <Button type="submit" disabled={busy || !loaded || !entry.trim()} className="bg-[#0B1F3B] hover:bg-[#162B4D] text-white shrink-0" data-testid="blocked-domain-add">
          <Plus className="w-4 h-4 mr-2" /> Block Domain
        </Button>
      </form>

      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={filter}
            onChange={event => setFilter(event.target.value)}
            placeholder="Search blocked domains"
            className="pl-9 border-[#E5E7EB] focus:border-[#328CC1]"
            data-testid="blocked-domain-search"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={busy || !loaded}
          onClick={() => save(defaults, 'Default provider list restored')}
          className="border-[#E5E7EB] text-[#374151] shrink-0"
          data-testid="blocked-domain-reset"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Restore Defaults
        </Button>
      </div>

      <p className="text-sm text-[#6B7280] mb-3" data-testid="blocked-domain-count">
        {loaded ? `${domains.length} blocked ${domains.length === 1 ? 'domain' : 'domains'}` : 'Loading blocked domains…'}
        {loaded && filter.trim() && ` · ${visible.length} shown`}
      </p>

      <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto p-1" data-testid="blocked-domain-list">
        {visible.map(domain => (
          <span key={domain} className="inline-flex items-center gap-1.5 bg-[#F3F4F6] text-[#374151] text-sm rounded-full pl-3 pr-1.5 py-1" data-testid={`blocked-domain-${domain}`}>
            {domain}
            <button
              type="button"
              onClick={() => remove(domain)}
              disabled={busy}
              aria-label={`Unblock ${domain}`}
              className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#E5E7EB] disabled:opacity-50"
              data-testid={`blocked-domain-remove-${domain}`}
            >
              <X className="w-3.5 h-3.5 text-[#6B7280]" />
            </button>
          </span>
        ))}
        {loaded && !visible.length && <p className="text-sm text-[#6B7280]" data-testid="blocked-domain-empty">No domains match this search.</p>}
      </div>
    </div>
  );
};
