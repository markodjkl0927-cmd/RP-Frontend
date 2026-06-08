'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase, MapPin } from 'lucide-react';

export type JobListItem = {
  id: string;
  title: string;
  location?: string | null;
  department?: string | null;
};

export function JobCard({ job }: { job: JobListItem }) {
  return (
    <article className="group flex h-full flex-col rounded-md border border-surface-border bg-white p-5 transition-colors hover:border-purple-200">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-purple-50 text-purple-600">
          <Briefcase className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-navy-900 group-hover:text-purple-800">{job.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.location ? (
              <span className="inline-flex items-center gap-1 rounded-md border border-surface-border bg-surface-muted px-2 py-0.5 text-xs font-medium text-navy-600">
                <MapPin className="h-3 w-3 text-purple-600" />
                {job.location}
              </span>
            ) : null}
            {job.department ? (
              <span className="rounded-md border border-surface-border bg-surface-muted px-2 py-0.5 text-xs font-medium text-navy-600">
                {job.department}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-surface-border pt-4">
        <Link
          href={`/careers/${job.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 transition-colors group-hover:text-purple-700"
        >
          View & apply
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
