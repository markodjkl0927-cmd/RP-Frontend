'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, UserCheck, UserX } from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { DataTable, DataTableColumn, StatusBadge } from '@/components/ui/DataTable';
import { Alert } from '@/components/ui/Alert';
import { PaginationBar } from '@/components/ui/PaginationBar';

type MemberRow = {
  id: string;
  accountNumber: string;
  accountNumberDisplay: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    dealershipApplications: number;
    careerApplications: number;
  };
};

type MemberDetail = MemberRow & {
  dealershipApplications: { id: string; status: string; createdAt: string }[];
  careerApplications: {
    id: string;
    status: string;
    createdAt: string;
    job: { title: string };
  }[];
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<MemberDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadMembers = useCallback(async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/rp/admin/members', {
        params: {
          page,
          limit: 20,
          q: appliedSearch.trim() || undefined,
          status: statusFilter,
        },
      });
      setMembers(data.members || []);
      setPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 });
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      setError(ex.response?.data?.error || 'Failed to load members');
    } finally {
      setLoading(false);
    }
  }, [appliedSearch, statusFilter]);

  useEffect(() => {
    loadMembers(1);
  }, [loadMembers]);

  const loadDetail = async (id: string) => {
    setDetailLoading(true);
    try {
      const { data } = await api.get(`/rp/admin/members/${id}`);
      setDetail(data.member);
    } catch {
      setDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setDetail(null);
      return;
    }
    setExpandedId(id);
    loadDetail(id);
  };

  const setMemberActive = async (member: MemberRow, isActive: boolean) => {
    const action = isActive ? 'reactivate' : 'deactivate';
    const label = `${member.firstName} ${member.lastName}`;
    if (!confirm(`${isActive ? 'Reactivate' : 'Deactivate'} member account for ${label}?`)) return;

    setUpdatingId(member.id);
    try {
      const { data } = await api.patch(`/rp/admin/members/${member.id}`, { isActive });
      const updated = data.member as MemberRow;
      setMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, ...updated } : m)));
      if (detail?.id === member.id) {
        setDetail((d) => (d ? { ...d, ...updated } : d));
      }
      if (!isActive && statusFilter === 'active') {
        setMembers((prev) => prev.filter((m) => m.id !== member.id));
      }
      if (isActive && statusFilter === 'inactive') {
        setMembers((prev) => prev.filter((m) => m.id !== member.id));
      }
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      alert(ex.response?.data?.error || `Failed to ${action} member`);
    } finally {
      setUpdatingId(null);
    }
  };

  const columns = useMemo<DataTableColumn<MemberRow>[]>(
    () => [
      {
        id: 'expand',
        header: '',
        cellClassName: 'w-10',
        cell: (m) => {
          const open = expandedId === m.id;
          return (
            <button
              type="button"
              onClick={() => toggleExpand(m.id)}
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
        id: 'member',
        header: 'Member',
        cell: (m) => (
          <div>
            <p className="font-medium text-navy-900">
              {m.firstName} {m.lastName}
            </p>
            <p className="mt-0.5 text-xs text-navy-500">{m.email}</p>
          </div>
        ),
      },
      {
        id: 'account',
        header: 'Account',
        cell: (m) => (
          <span className="font-mono text-xs tabular-nums text-navy-700">{m.accountNumberDisplay}</span>
        ),
      },
      {
        id: 'phone',
        header: 'Phone',
        cell: (m) => <span className="text-navy-700">{m.phone || '—'}</span>,
      },
      {
        id: 'applications',
        header: 'Applications',
        cell: (m) => (
          <span className="text-navy-700">
            {m._count.dealershipApplications} dealership · {m._count.careerApplications} career
          </span>
        ),
      },
      {
        id: 'joined',
        header: 'Joined',
        cell: (m) => <span className="whitespace-nowrap tabular-nums text-navy-600">{formatDate(m.createdAt)}</span>,
      },
      {
        id: 'status',
        header: 'Status',
        cell: (m) => <StatusBadge status={m.isActive ? 'ACTIVE' : 'SUSPENDED'} />,
      },
      {
        id: 'actions',
        header: '',
        align: 'right',
        cell: (m) =>
          m.isActive ? (
            <Button
              type="button"
              variant="danger"
              className="h-9 px-3 text-xs"
              loading={updatingId === m.id}
              disabled={updatingId === m.id}
              icon={<UserX className="h-3.5 w-3.5" aria-hidden />}
              onClick={() => setMemberActive(m, false)}
            >
              Deactivate
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              className="h-9 px-3 text-xs"
              loading={updatingId === m.id}
              disabled={updatingId === m.id}
              icon={<UserCheck className="h-3.5 w-3.5" aria-hidden />}
              onClick={() => setMemberActive(m, true)}
            >
              Reactivate
            </Button>
          ),
      },
    ],
    [expandedId, updatingId]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Members"
        description="View member accounts, search by name or email, and deactivate or reactivate access."
      />

      <div className="panel flex flex-col gap-4 p-4 sm:flex-row sm:items-end">
        <Input
          label="Search"
          placeholder="Name, email, or account number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setAppliedSearch(search);
            }
          }}
          className="flex-1"
        />
        <Select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
          className="w-full sm:w-44"
        >
          <option value="all">All members</option>
          <option value="active">Active only</option>
          <option value="inactive">Deactivated</option>
        </Select>
        <Button
          type="button"
          variant="secondary"
          className="h-11 shrink-0"
          onClick={() => setAppliedSearch(search)}
        >
          Search
        </Button>
      </div>

      {error ? <Alert>{error}</Alert> : null}

      {loading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
        </div>
      ) : (
        <>
          <PaginationBar pagination={pagination} onPageChange={loadMembers} noun="member" className="mb-4" />

          <DataTable
            columns={columns}
            data={members}
            getRowId={(m) => m.id}
            emptyMessage="No members match your search."
            expandedRowId={expandedId}
            renderExpandedRow={(m) => {
              if (detailLoading || !detail || detail.id !== m.id) {
                return (
                  <div className="flex items-center justify-center py-6">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
                  </div>
                );
              }

              return (
                <div className="space-y-4 rounded-xl border border-surface-border bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Support overview</p>
                  <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-navy-500">Account</dt>
                      <dd className="mt-1 font-mono text-sm text-navy-900">{detail.accountNumberDisplay}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-navy-500">Last updated</dt>
                      <dd className="mt-1 text-sm text-navy-800">{formatDate(detail.updatedAt)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-navy-500">Dealership apps</dt>
                      <dd className="mt-1 text-sm text-navy-800">{detail._count.dealershipApplications}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-navy-500">Career apps</dt>
                      <dd className="mt-1 text-sm text-navy-800">{detail._count.careerApplications}</dd>
                    </div>
                  </dl>

                  {detail.dealershipApplications.length > 0 ? (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-navy-500">
                        Recent dealership applications
                      </p>
                      <ul className="space-y-1 text-sm text-navy-700">
                        {detail.dealershipApplications.map((app) => (
                          <li key={app.id}>
                            {formatDate(app.createdAt)} — <StatusBadge status={app.status} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {detail.careerApplications.length > 0 ? (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-navy-500">
                        Recent career applications
                      </p>
                      <ul className="space-y-1 text-sm text-navy-700">
                        {detail.careerApplications.map((app) => (
                          <li key={app.id}>
                            {formatDate(app.createdAt)} — {app.job.title} — <StatusBadge status={app.status} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {!detail.isActive ? (
                    <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                      This account is deactivated. The member cannot sign in until reactivated.
                    </p>
                  ) : null}
                </div>
              );
            }}
          />

          <PaginationBar pagination={pagination} onPageChange={loadMembers} noun="member" className="mt-4" />
        </>
      )}
    </div>
  );
}
