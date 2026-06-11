'use client';

import { formatDealershipAnswer, getDealershipReviewFields } from '@/lib/dealership-questionnaire';

type Props = {
  answers: Record<string, string | boolean>;
};

export function DealershipReviewSummary({ answers }: Props) {
  const fields = getDealershipReviewFields();

  return (
    <div className="rounded-md border border-surface-border bg-surface-muted/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Review your answers</p>
      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <dt className="text-xs text-navy-500">{label}</dt>
            <dd className="mt-0.5 text-sm font-medium text-navy-900">{formatDealershipAnswer(key, answers[key])}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
