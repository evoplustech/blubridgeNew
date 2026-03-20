import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

const Pagination = ({ page, totalPages, total, limit, onPageChange, onLimitChange }) => {
  if (total === 0) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4" data-testid="pagination-controls">
      <div className="flex items-center gap-3 text-sm text-[#6B7280]">
        <span>Showing {start}-{end} of {total}</span>
        <span className="text-[#D1D5DB]">|</span>
        <div className="flex items-center gap-1.5">
          <span>Rows:</span>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="h-8 px-2 rounded border border-[#E5E7EB] bg-white text-[#374151] text-sm focus:outline-none focus:ring-1 focus:ring-[#328CC1]"
            data-testid="page-size-selector"
          >
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="h-8 w-8 p-0"
          data-testid="pagination-prev"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {getPageNumbers().map((p) => (
          <Button
            key={p}
            variant={p === page ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(p)}
            className={`h-8 w-8 p-0 text-xs ${p === page ? 'bg-[#0B1F3B] text-white' : ''}`}
            data-testid={`pagination-page-${p}`}
          >
            {p}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="h-8 w-8 p-0"
          data-testid="pagination-next"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
