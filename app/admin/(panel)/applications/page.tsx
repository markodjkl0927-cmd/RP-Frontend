'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Download } from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable, DataTableColumn, StatusBadge } from '@/components/ui/DataTable';

const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type MemberRef = {
  accountNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
};

type DealershipApplication = {
  id: string;
  status: string;
  createdAt: string;
  answers: Record<string, string | boolean>;
  member: MemberRef;
};

type CareerApplication = {
  id: string;
  status: string;
  createdAt: string;
  coverLetter?: string | null;
  resumeUrl: string;
  job: { title: string };
  member: MemberRef;
};

const DEALERSHIP_DETAIL_FIELDS: { key: string; label: string }[] = [
  { key: 'businessAddress', label: 'Business address' },
  { key: 'yearsInBusiness', label: 'Years in business' },
  { key: 'monthlyVolume', label: 'Est. monthly fuel volume' },
  { key: 'additionalInfo', label: 'Additional information' },
  { key: 'agreeTerms', label: 'Agreed to be contacted' },
];

function formatAccountNumber(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 10) return value;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatAnswerValue(value: string | boolean | undefined) {
  if (value === undefined || value === null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

function DetailGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ label, value }) => (
        <div key={label}>
          <dt className="text-xs font-semibold uppercase tracking-wide text-navy-500">{label}</dt>
          <dd className="mt-1 text-sm text-navy-800 whitespace-pre-wrap">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function AdminApplicationsPage() {
  const [dealership, setDealership] = useState<DealershipApplication[]>([]);
  const [careers, setCareers] = useState<CareerApplication[]>([]);
  const [expandedDealershipId, setExpandedDealershipId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api.get('/rp/admin/dealership-applications'),
      api.get('/rp/admin/career-applications'),
    ]).then(([d, c]) => {
      setDealership(d.data.applications || []);
      setCareers(c.data.applications || []);
    });
  }, []);

  const dealershipColumns = useMemo<DataTableColumn<DealershipApplication>[]>(
    () => [
      {
        id: 'expand',
        header: '',
        cellClassName: 'w-10',
        cell: (app) => {
          const open = expandedDealershipId === app.id;
          return (
            <button
              type="button"
              onClick={() => setExpandedDealershipId(open ? null : app.id)}
              className="rounded-lg p-1 text-navy-500 transition-colors hover:bg-surface-muted hover:text-navy-800"
              aria-expanded={open}
              aria-label={open ? 'Collapse details' : 'Expand details'}
            >
              {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          );
        },
      },
      {
        id: 'submitted',
        header: 'Submitted',
        cell: (app) => <span className="whitespace-nowrap tabular-nums text-navy-600">{formatDate(app.createdAt)}</span>,
      },
      {
        id: 'member',
        header: 'Member',
        cell: (app) => (
          <div>
            <p className="font-medium text-navy-900">
              {app.member.firstName} {app.member.lastName}
            </p>
            <p className="mt-0.5 text-xs text-navy-500">{app.member.email}</p>
          </div>
        ),
      },
      {
        id: 'account',
        header: 'Account',
        cell: (app) => (
          <span className="font-mono text-xs tabular-nums text-navy-600">
            {formatAccountNumber(app.member.accountNumber)}
          </span>
        ),
      },
      {
        id: 'company',
        header: 'Company',
        cell: (app) => (
          <span className="font-medium text-navy-900">{formatAnswerValue(app.answers.companyName as string)}</span>
        ),
      },
      {
        id: 'contact',
        header: 'Contact',
        cell: (app) => (
          <div>
            <p className="text-navy-800">{formatAnswerValue(app.answers.contactName as string)}</p>
            <p className="mt-0.5 text-xs text-navy-500">{formatAnswerValue(app.answers.contactPhone as string)}</p>
          </div>
        ),
      },
      {
        id: 'location',
        header: 'Location',
        cell: (app) => (
          <span className="whitespace-nowrap text-navy-700">
            {formatAnswerValue(app.answers.city as string)}, {formatAnswerValue(app.answers.state as string)}
          </span>
        ),
      },
      {
        id: 'type',
        header: 'Type',
        cell: (app) => <span className="text-navy-700">{formatAnswerValue(app.answers.dealershipType as string)}</span>,
      },
      {
        id: 'status',
        header: 'Status',
        cell: (app) => <StatusBadge status={app.status} />,
      },
    ],
    [expandedDealershipId]
  );

  const careerColumns = useMemo<DataTableColumn<CareerApplication>[]>(
    () => [
      {
        id: 'submitted',
        header: 'Submitted',
        cell: (app) => <span className="whitespace-nowrap tabular-nums text-navy-600">{formatDate(app.createdAt)}</span>,
      },
      {
        id: 'job',
        header: 'Position',
        cell: (app) => <span className="font-medium text-navy-900">{app.job.title}</span>,
      },
      {
        id: 'member',
        header: 'Applicant',
        cell: (app) => (
          <div>
            <p className="font-medium text-navy-900">
              {app.member.firstName} {app.member.lastName}
            </p>
            <p className="mt-0.5 text-xs text-navy-500">{app.member.email}</p>
          </div>
        ),
      },
      {
        id: 'account',
        header: 'Account',
        cell: (app) => (
          <span className="font-mono text-xs tabular-nums text-navy-600">
            {formatAccountNumber(app.member.accountNumber)}
          </span>
        ),
      },
      {
        id: 'cover',
        header: 'Cover letter',
        cell: (app) =>
          app.coverLetter ? (
            <p className="max-w-xs truncate text-navy-700" title={app.coverLetter}>
              {app.coverLetter}
            </p>
          ) : (
            <span className="text-navy-400">—</span>
          ),
      },
      {
        id: 'status',
        header: 'Status',
        cell: (app) => <StatusBadge status={app.status} />,
      },
      {
        id: 'resume',
        header: 'Resume',
        align: 'right',
        cell: (app) => (
          <a
            href={`${apiBase.replace(/\/api$/, '')}${app.resumeUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-gold-600 transition-colors hover:text-gold-500"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-10">
      <PageHeader title="Applications" description="Dealership and career submissions from members." />

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">Dealership program</h2>
            <p className="mt-1 text-sm text-navy-500">
              {dealership.length} submission{dealership.length === 1 ? '' : 's'}. Expand a row for full details.
            </p>
          </div>
        </div>
        <DataTable
          columns={dealershipColumns}
          data={dealership}
          getRowId={(app) => app.id}
          emptyMessage="No submissions yet."
          expandedRowId={expandedDealershipId}
          renderExpandedRow={(app) => {
            const answers = app.answers;
            const items = [
              { label: 'Contact email', value: formatAnswerValue(answers.contactEmail as string) },
              { label: 'Member phone', value: formatAnswerValue(app.member.phone || undefined) },
              ...DEALERSHIP_DETAIL_FIELDS.map(({ key, label }) => ({
                label,
                value: formatAnswerValue(answers[key] as string | boolean | undefined),
              })),
            ];
            return (
              <div className="rounded-xl border border-surface-border bg-white p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-500">Application details</p>
                <DetailGrid items={items} />
              </div>
            );
          }}
        />
      </section>

      <section>
        <div className="mb-4">
          <h2 className="font-display text-lg font-semibold text-navy-900">Career applications</h2>
          <p className="mt-1 text-sm text-navy-500">
            {careers.length} application{careers.length === 1 ? '' : 's'}.
          </p>
        </div>
        <DataTable
          columns={careerColumns}
          data={careers}
          getRowId={(app) => app.id}
          emptyMessage="No submissions yet."
        />
      </section>
    </div>
  );
}
