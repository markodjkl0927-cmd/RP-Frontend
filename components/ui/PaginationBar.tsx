'use client';

import { Button } from '@/components/ui/Button';

export type PaginationInfo = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type Props = {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  noun?: string;
  className?: string;
};

export function PaginationBar({ pagination, onPageChange, noun = 'results', className = '' }: Props) {
  const { page, total, totalPages } = pagination;

  if (total === 0) return null;

  return (
    <div className={`flex flex-col items-center justify-between gap-3 sm:flex-row ${className}`}>
      <p className="text-sm text-navy-500">
        {total} {noun}
        {total === 1 ? '' : 's'}
        {totalPages > 1 ? ` · Page ${page} of ${totalPages}` : ''}
      </p>
      {totalPages > 1 ? (
        <div className="flex gap-2">
          <Button type="button" variant="secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            Previous
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
