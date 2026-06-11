import Link from 'next/link';
import { ArrowRight, Briefcase, Handshake } from 'lucide-react';
import clsx from 'clsx';

import { ApplicationStatusRibbon } from '@/components/applications/ApplicationStatusRibbon';
import { formatApplicationDate } from '@/lib/application-status';

export type TrackedApplication = {
  id: string;
  kind: 'career' | 'dealership';
  status: string;
  createdAt: string;
  title: string;
  subtitle: string;
  meta: string;
  jobId?: string;
  jobActive?: boolean;
};

export function ApplicationListRow({ application }: { application: TrackedApplication }) {
  const Icon = application.kind === 'career' ? Briefcase : Handshake;

  return (
    <article className="flex flex-col gap-3 border-b border-surface-border px-4 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div
          className={clsx(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-md ring-1 ring-inset',
            application.kind === 'career'
              ? 'bg-purple-50 text-purple-600 ring-purple-100'
              : 'bg-amber-50 text-amber-700 ring-amber-100'
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-semibold text-navy-900">{application.title}</h3>
            <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy-500">
              {application.kind}
            </span>
          </div>
          <p className="mt-0.5 truncate text-sm text-navy-500">{application.subtitle}</p>
          <p className="mt-1 text-xs text-navy-400">
            {application.meta} · Applied {formatApplicationDate(application.createdAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <ApplicationStatusRibbon status={application.status} type={application.kind} />
        {application.kind === 'career' && application.jobId && application.jobActive ? (
          <Link
            href={`/careers/${application.jobId}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-500"
          >
            View job
            <ArrowRight className="h-3 w-3" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
