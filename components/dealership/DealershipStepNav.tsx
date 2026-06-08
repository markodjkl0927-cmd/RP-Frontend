'use client';

import { Building2, Check, ClipboardCheck, MapPinned } from 'lucide-react';
import clsx from 'clsx';

const STEPS = [
  { id: 1, title: 'Company', description: 'Business & contact', icon: Building2 },
  { id: 2, title: 'Location', description: 'Address & operations', icon: MapPinned },
  { id: 3, title: 'Review', description: 'Program fit & submit', icon: ClipboardCheck },
] as const;

export function DealershipStepNav({ current }: { current: number }) {
  return (
    <ol className="space-y-1">
      {STEPS.map(({ id, title, description, icon: Icon }) => {
        const done = id < current;
        const active = id === current;

        return (
          <li
            key={id}
            className={clsx(
              'flex items-start gap-3 rounded-md px-3 py-3 transition-colors',
              active && 'bg-purple-50',
              done && 'opacity-90'
            )}
          >
            <span
              className={clsx(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-sm font-bold',
                done && 'border-purple-200 bg-purple-600 text-white',
                active && 'border-purple-300 bg-white text-purple-700',
                !done && !active && 'border-surface-border bg-white text-navy-400'
              )}
            >
              {done ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <Icon className="h-4 w-4" strokeWidth={1.75} />}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className={clsx('text-sm font-semibold', active ? 'text-navy-900' : 'text-navy-600')}>{title}</p>
              <p className="text-xs text-navy-500">{description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export const DEALERSHIP_STEP_META = STEPS;
