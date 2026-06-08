'use client';

type Props = {
  answers: Record<string, string | boolean>;
};

const ROWS: { key: string; label: string }[] = [
  { key: 'companyName', label: 'Company' },
  { key: 'contactName', label: 'Contact' },
  { key: 'contactEmail', label: 'Email' },
  { key: 'contactPhone', label: 'Phone' },
  { key: 'businessAddress', label: 'Address' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'yearsInBusiness', label: 'Years in business' },
  { key: 'dealershipType', label: 'Dealership type' },
  { key: 'monthlyVolume', label: 'Monthly volume' },
];

function formatValue(key: string, value: string | boolean | undefined) {
  if (value === undefined || value === null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

export function DealershipReviewSummary({ answers }: Props) {
  return (
    <div className="rounded-md border border-surface-border bg-surface-muted/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Review your answers</p>
      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        {ROWS.map(({ key, label }) => (
          <div key={key}>
            <dt className="text-xs text-navy-500">{label}</dt>
            <dd className="mt-0.5 text-sm font-medium text-navy-900">{formatValue(key, answers[key])}</dd>
          </div>
        ))}
      </dl>
      {answers.additionalInfo ? (
        <div className="mt-4 border-t border-surface-border pt-4">
          <dt className="text-xs text-navy-500">About your business</dt>
          <dd className="mt-1 text-sm leading-relaxed text-navy-800">{String(answers.additionalInfo)}</dd>
        </div>
      ) : null}
    </div>
  );
}
