import clsx from 'clsx';
import { formatApplicationStatus } from '@/lib/application-status';

const RIBBON_STYLES: Record<string, string> = {
  NEW: 'bg-amber-50 text-amber-800 ring-amber-200/80',
  UNDER_REVIEW: 'bg-sky-50 text-sky-800 ring-sky-200/80',
  INTERVIEW: 'bg-violet-50 text-violet-800 ring-violet-200/80',
  APPROVED: 'bg-emerald-50 text-emerald-800 ring-emerald-200/80',
  HIRED: 'bg-emerald-50 text-emerald-800 ring-emerald-200/80',
  REJECTED: 'bg-red-50 text-red-800 ring-red-200/80',
};

type Props = {
  status: string;
  type: 'dealership' | 'career';
};

export function ApplicationStatusRibbon({ status, type }: Props) {
  const normalized = status.toUpperCase();

  return (
    <span
      className={clsx(
        'inline-flex shrink-0 items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset',
        RIBBON_STYLES[normalized] || 'bg-navy-50 text-navy-700 ring-surface-border'
      )}
    >
      {formatApplicationStatus(status, type)}
    </span>
  );
}
