'use client';

import { Heart, Rocket, Users } from 'lucide-react';

const highlights = [
  {
    icon: Rocket,
    title: 'Grow with R&P',
    text: 'Join a petroleum marketing and energy company building a national member network.',
  },
  {
    icon: Users,
    title: 'Collaborative teams',
    text: 'Work alongside operations, partnerships, and member services professionals.',
  },
  {
    icon: Heart,
    title: 'Member-first culture',
    text: 'We focus on service quality across fuel, partnerships, and digital member tools.',
  },
];

export function CareersProgramPanel({ jobCount }: { jobCount: number }) {
  return (
    <div className="rounded-md border border-surface-border bg-white p-5 lg:sticky lg:top-20">
      <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Careers</p>
      <h2 className="mt-1 font-display text-lg font-semibold text-navy-900">Work at R&P Global Energies</h2>
      <p className="mt-2 text-sm leading-relaxed text-navy-500">
        Explore open roles publicly. Sign in with your member account when you are ready to upload a resume and
        apply.
      </p>

      <div className="mt-5 rounded-md border border-purple-100 bg-purple-50/60 px-4 py-3">
        <p className="text-2xl font-bold tabular-nums text-navy-900">{jobCount}</p>
        <p className="text-xs font-medium text-navy-600">
          open position{jobCount === 1 ? '' : 's'} right now
        </p>
      </div>

      <ul className="mt-6 space-y-4">
        {highlights.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-purple-50 text-purple-600">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy-900">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-navy-500">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
