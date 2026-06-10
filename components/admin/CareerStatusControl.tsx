'use client';

import clsx from 'clsx';
import { Calendar, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/DataTable';

export const CAREER_STATUSES = ['NEW', 'UNDER_REVIEW', 'INTERVIEW', 'HIRED', 'REJECTED'] as const;
export type CareerStatus = (typeof CAREER_STATUSES)[number];

const STATUS_LABELS: Record<CareerStatus, string> = {
  NEW: 'New',
  UNDER_REVIEW: 'Under review',
  INTERVIEW: 'Interview',
  HIRED: 'Hired',
  REJECTED: 'Rejected',
};

type Props = {
  applicationId: string;
  status: string;
  updating: boolean;
  error?: string;
  onStatusChange: (id: string, status: CareerStatus) => void;
  compact?: boolean;
};

export function CareerStatusControl({
  applicationId,
  status,
  updating,
  error,
  onStatusChange,
  compact = false,
}: Props) {
  const normalized = (status.toUpperCase() as CareerStatus) || 'NEW';
  const isAllowed = CAREER_STATUSES.includes(normalized);

  if (compact) {
    return (
      <div className="min-w-[9rem]">
        <select
          value={isAllowed ? normalized : 'NEW'}
          disabled={updating}
          onChange={(e) => onStatusChange(applicationId, e.target.value as CareerStatus)}
          className={clsx(
            'w-full rounded-lg border border-surface-border bg-white px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy-800',
            'focus:outline-none focus:ring-2 focus:ring-purple-400/40 disabled:opacity-60'
          )}
          aria-label="Application status"
        >
          {CAREER_STATUSES.map((value) => (
            <option key={value} value={value}>
              {STATUS_LABELS[value]}
            </option>
          ))}
        </select>
        {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-surface-border bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Hiring status</p>
          <div className="mt-2">
            <StatusBadge status={normalized} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            className="h-9 px-3 text-xs"
            loading={updating}
            disabled={updating || normalized === 'INTERVIEW'}
            icon={<Calendar className="h-3.5 w-3.5" aria-hidden />}
            onClick={() => onStatusChange(applicationId, 'INTERVIEW')}
          >
            Interview
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="h-9 px-3 text-xs"
            loading={updating}
            disabled={updating || normalized === 'HIRED'}
            icon={<Check className="h-3.5 w-3.5" aria-hidden />}
            onClick={() => onStatusChange(applicationId, 'HIRED')}
          >
            Hire
          </Button>
          <Button
            type="button"
            variant="danger"
            className="h-9 px-3 text-xs"
            loading={updating}
            disabled={updating || normalized === 'REJECTED'}
            icon={<X className="h-3.5 w-3.5" aria-hidden />}
            onClick={() => onStatusChange(applicationId, 'REJECTED')}
          >
            Reject
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-navy-600">Set status</label>
        <select
          value={isAllowed ? normalized : 'NEW'}
          disabled={updating}
          onChange={(e) => onStatusChange(applicationId, e.target.value as CareerStatus)}
          className="select-field h-10 text-sm"
        >
          {CAREER_STATUSES.map((value) => (
            <option key={value} value={value}>
              {STATUS_LABELS[value]}
            </option>
          ))}
        </select>
      </div>

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      {updating ? <p className="mt-2 text-xs text-navy-500">Saving…</p> : null}
    </div>
  );
}
