import { useEffect, useState } from 'react';

import { adminFetch as fetch } from './secureApi';
const API_URL = process.env.REACT_APP_BACKEND_URL;
const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}/api/admin/${path}`, { ...options, headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } });
  if (!response.ok) throw new Error(response.status === 401 ? 'Your session has expired. Please sign in again.' : 'Unable to complete this request. Please try again.');
  return response;
};

export const useConsultationEnquiries = () => {
  const [result, setResult] = useState({ data: [], total: 0, totalPages: 0 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [revision, setRevision] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const refresh = () => setRevision(value => value + 1);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError('');
    const params = new URLSearchParams({ page, limit, search: query });
    request(`submissions/get-in-touch?${params}`, { signal: controller.signal })
      .then(response => response.json()).then(data => {
        if (controller.signal.aborted) return;
        if (page > Math.max(1, data.totalPages)) setPage(Math.max(1, data.totalPages));
        else setResult(data);
      }).catch(err => { if (err.name !== 'AbortError') setError(err.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [page, limit, query, revision]);

  const handleSearch = e => { e.preventDefault(); setPage(1); setQuery(search.trim()); refresh(); };
  const view = async id => {
    setBusy(true); setError('');
    try {
      const response = await request(`submission/${id}?form_type=get_in_touch`);
      const data = await response.json(); setSelected(data);
      setResult(prev => ({ ...prev, data: prev.data.map(item => item.id === id ? data : item) }));
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  const remove = async id => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    setBusy(true); setError('');
    try {
      await request(`submission/${id}?form_type=get_in_touch`, { method: 'DELETE' });
      setSelected(null); refresh();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  const exportCSV = async () => {
    setExporting(true); setError('');
    try {
      const response = await request('export/get_in_touch');
      const url = URL.createObjectURL(await response.blob());
      const a = document.createElement('a'); a.href = url;
      a.download = `ai_consulting_enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) { setError(err.message); }
    finally { setExporting(false); }
  };
  return { result, page, setPage, limit, setLimit, search, setSearch, selected, setSelected, loading, busy, exporting, error, refresh, handleSearch, view, remove, exportCSV };
};