'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Download } from 'lucide-react';
import api from '@/lib/api';
import { CareerStatusControl, CareerStatus } from '@/components/admin/CareerStatusControl';
import {
  DealershipStatusControl,
  DealershipStatus,
} from '@/components/admin/DealershipStatusControl';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { DataTable, DataTableColumn } from '@/components/ui/DataTable';
import { PaginationBar, PaginationInfo } from '@/components/ui/PaginationBar';
import { formatDealershipAnswer } from '@/lib/dealership-questionnaire';

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
  { key: 'legalBusinessName', label: 'Legal business name' },
  { key: 'contactTitle', label: 'Contact title' },
  { key: 'website', label: 'Website' },
  { key: 'businessAddress', label: 'Street address' },
  { key: 'zipCode', label: 'ZIP code' },
  { key: 'yearsInBusiness', label: 'Years in business' },
  { key: 'numberOfLocations', label: 'Number of locations' },
  { key: 'hoursOfOperation', label: 'Hours of operation' },
  { key: 'monthlyVolume', label: 'Est. monthly fuel volume' },
  { key: 'currentFuelBrands', label: 'Current fuel brands' },
  { key: 'storageCapacity', label: 'Storage capacity' },
  { key: 'employeeCount', label: 'Employees' },
  { key: 'priorRpRelationship', label: 'Prior R&P relationship' },
  { key: 'additionalInfo', label: 'Additional information' },
  { key: 'agreeTerms', label: 'Agreed to be contacted' },
  { key: 'agreeAccurate', label: 'Confirmed accuracy' },
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
  const [dealershipPagination, setDealershipPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [careerPagination, setCareerPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [dealershipSearch, setDealershipSearch] = useState('');
  const [appliedDealershipSearch, setAppliedDealershipSearch] = useState('');
  const [dealershipStatusFilter, setDealershipStatusFilter] = useState('ALL');
  const [careerSearch, setCareerSearch] = useState('');
  const [appliedCareerSearch, setAppliedCareerSearch] = useState('');
  const [careerStatusFilter, setCareerStatusFilter] = useState('ALL');
  const [expandedDealershipId, setExpandedDealershipId] = useState<string | null>(null);
  const [expandedCareerId, setExpandedCareerId] = useState<string | null>(null);
  const [updatingDealershipId, setUpdatingDealershipId] = useState<string | null>(null);
  const [updatingCareerId, setUpdatingCareerId] = useState<string | null>(null);
  const [dealershipStatusErrors, setDealershipStatusErrors] = useState<Record<string, string>>({});
  const [careerStatusErrors, setCareerStatusErrors] = useState<Record<string, string>>({});

  const loadDealership = useCallback(
    async (page = 1) => {
      const { data } = await api.get('/rp/admin/dealership-applications', {
        params: {
          page,
          limit: 20,
          q: appliedDealershipSearch.trim() || undefined,
          status: dealershipStatusFilter,
        },
      });
      setDealership(data.applications || []);
      setDealershipPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 });
    },
    [appliedDealershipSearch, dealershipStatusFilter]
  );

  const loadCareers = useCallback(
    async (page = 1) => {
      const { data } = await api.get('/rp/admin/career-applications', {
        params: {
          page,
          limit: 20,
          q: appliedCareerSearch.trim() || undefined,
          status: careerStatusFilter,
        },
      });
      setCareers(data.applications || []);
      setCareerPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 });
    },
    [appliedCareerSearch, careerStatusFilter]
  );

  useEffect(() => {
    loadDealership(1);
  }, [loadDealership]);

  useEffect(() => {
    loadCareers(1);
  }, [loadCareers]);

  const updateDealershipStatus = async (id: string, status: DealershipStatus) => {
    setUpdatingDealershipId(id);
    setDealershipStatusErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    try {
      const { data } = await api.patch(`/rp/admin/dealership-applications/${id}`, { status });
      const updated = data.application as DealershipApplication;
      setDealership((prev) =>
        prev.map((app) =>
          app.id === id
            ? {
                ...app,
                status: updated.status,
                member: updated.member ?? app.member,
              }
            : app
        )
      );
      if (dealershipStatusFilter !== 'ALL' && updated.status !== dealershipStatusFilter) {
        loadDealership(dealershipPagination.page);
      }
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      setDealershipStatusErrors((prev) => ({
        ...prev,
        [id]: ex.response?.data?.error || 'Failed to update status',
      }));
    } finally {
      setUpdatingDealershipId(null);
    }
  };

  const updateCareerStatus = async (id: string, status: CareerStatus) => {
    setUpdatingCareerId(id);
    setCareerStatusErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    try {
      const { data } = await api.patch(`/rp/admin/career-applications/${id}`, { status });
      const updated = data.application as CareerApplication;
      setCareers((prev) =>
        prev.map((app) =>
          app.id === id
            ? {
                ...app,
                status: updated.status,
                job: updated.job ?? app.job,
                member: updated.member ?? app.member,
              }
            : app
        )
      );
      if (careerStatusFilter !== 'ALL' && updated.status !== careerStatusFilter) {
        loadCareers(careerPagination.page);
      }
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      setCareerStatusErrors((prev) => ({
        ...prev,
        [id]: ex.response?.data?.error || 'Failed to update status',
      }));
    } finally {
      setUpdatingCareerId(null);
    }
  };

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
        cell: (app) => (
          <span className="text-navy-700">
            {formatDealershipAnswer('dealershipType', app.answers.dealershipType as string)}
          </span>
        ),
      },
      {
        id: 'status',
        header: 'Status',
        cell: (app) => (
          <DealershipStatusControl
            applicationId={app.id}
            status={app.status}
            updating={updatingDealershipId === app.id}
            error={dealershipStatusErrors[app.id]}
            onStatusChange={updateDealershipStatus}
            compact
          />
        ),
      },
    ],
    [expandedDealershipId, updatingDealershipId, dealershipStatusErrors]
  );

  const careerColumns = useMemo<DataTableColumn<CareerApplication>[]>(
    () => [
      {
        id: 'expand',
        header: '',
        cellClassName: 'w-10',
        cell: (app) => {
          const open = expandedCareerId === app.id;
          return (
            <button
              type="button"
              onClick={() => setExpandedCareerId(open ? null : app.id)}
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
        cell: (app) => (
          <CareerStatusControl
            applicationId={app.id}
            status={app.status}
            updating={updatingCareerId === app.id}
            error={careerStatusErrors[app.id]}
            onStatusChange={updateCareerStatus}
            compact
          />
        ),
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
            className="inline-flex items-center gap-1.5 font-semibold text-purple-600 transition-colors hover:text-purple-500"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        ),
      },
    ],
    [expandedCareerId, updatingCareerId, careerStatusErrors]
  );

  return (
    <div className="space-y-10">
      <PageHeader title="Applications" description="Dealership and career submissions from members." />

      <section>
        <div className="mb-4">
          <h2 className="font-display text-lg font-semibold text-navy-900">Dealership program</h2>
          <p className="mt-1 text-sm text-navy-500">Expand a row for full details and status actions.</p>
        </div>

        <div className="panel mb-4 flex flex-col gap-4 p-4 sm:flex-row sm:items-end">
          <Input
            label="Search dealership"
            placeholder="Member name, email, or account"
            value={dealershipSearch}
            onChange={(e) => setDealershipSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setAppliedDealershipSearch(dealershipSearch);
              }
            }}
            className="flex-1"
          />
          <Select
            label="Status"
            value={dealershipStatusFilter}
            onChange={(e) => setDealershipStatusFilter(e.target.value)}
            className="w-full sm:w-44"
          >
            <option value="ALL">All statuses</option>
            <option value="NEW">New</option>
            <option value="UNDER_REVIEW">Under review</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </Select>
          <Button
            type="button"
            variant="secondary"
            className="h-11 shrink-0"
            onClick={() => setAppliedDealershipSearch(dealershipSearch)}
          >
            Search
          </Button>
        </div>

        <PaginationBar
          pagination={dealershipPagination}
          onPageChange={loadDealership}
          noun="submission"
          className="mb-4"
        />

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
                value: formatDealershipAnswer(key, answers[key] as string | boolean | undefined),
              })),
            ];
            return (
              <div className="space-y-4">
                <DealershipStatusControl
                  applicationId={app.id}
                  status={app.status}
                  updating={updatingDealershipId === app.id}
                  error={dealershipStatusErrors[app.id]}
                  onStatusChange={updateDealershipStatus}
                />
                <div className="rounded-xl border border-surface-border bg-white p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-500">
                    Application details
                  </p>
                  <DetailGrid items={items} />
                </div>
              </div>
            );
          }}
        />

        <PaginationBar
          pagination={dealershipPagination}
          onPageChange={loadDealership}
          noun="submission"
          className="mt-4"
        />
      </section>

      <section>
        <div className="mb-4">
          <h2 className="font-display text-lg font-semibold text-navy-900">Career applications</h2>
          <p className="mt-1 text-sm text-navy-500">Expand a row for hiring actions and cover letter.</p>
        </div>

        <div className="panel mb-4 flex flex-col gap-4 p-4 sm:flex-row sm:items-end">
          <Input
            label="Search careers"
            placeholder="Applicant, job title, or account"
            value={careerSearch}
            onChange={(e) => setCareerSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setAppliedCareerSearch(careerSearch);
              }
            }}
            className="flex-1"
          />
          <Select
            label="Status"
            value={careerStatusFilter}
            onChange={(e) => setCareerStatusFilter(e.target.value)}
            className="w-full sm:w-44"
          >
            <option value="ALL">All statuses</option>
            <option value="NEW">New</option>
            <option value="UNDER_REVIEW">Under review</option>
            <option value="INTERVIEW">Interview</option>
            <option value="HIRED">Hired</option>
            <option value="REJECTED">Rejected</option>
          </Select>
          <Button
            type="button"
            variant="secondary"
            className="h-11 shrink-0"
            onClick={() => setAppliedCareerSearch(careerSearch)}
          >
            Search
          </Button>
        </div>

        <PaginationBar pagination={careerPagination} onPageChange={loadCareers} noun="application" className="mb-4" />

        <DataTable
          columns={careerColumns}
          data={careers}
          getRowId={(app) => app.id}
          emptyMessage="No submissions yet."
          expandedRowId={expandedCareerId}
          renderExpandedRow={(app) => (
            <div className="space-y-4">
              <CareerStatusControl
                applicationId={app.id}
                status={app.status}
                updating={updatingCareerId === app.id}
                error={careerStatusErrors[app.id]}
                onStatusChange={updateCareerStatus}
              />
              <div className="rounded-xl border border-surface-border bg-white p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-500">Application details</p>
                <DetailGrid
                  items={[
                    { label: 'Position', value: app.job.title },
                    { label: 'Applicant email', value: app.member.email },
                    { label: 'Applicant phone', value: formatAnswerValue(app.member.phone || undefined) },
                    {
                      label: 'Cover letter',
                      value: app.coverLetter?.trim() ? app.coverLetter : '—',
                    },
                  ]}
                />
                <a
                  href={`${apiBase.replace(/\/api$/, '')}${app.resumeUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 transition-colors hover:text-purple-500"
                >
                  <Download className="h-4 w-4" />
                  Download resume
                </a>
              </div>
            </div>
          )}
        />

        <PaginationBar pagination={careerPagination} onPageChange={loadCareers} noun="application" className="mt-4" />
      </section>
    </div>
  );
}
