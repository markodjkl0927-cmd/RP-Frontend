'use client';

import { useCallback, useEffect, useState } from 'react';
import api from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { PaginationBar, PaginationInfo } from '@/components/ui/PaginationBar';
import { Alert } from '@/components/ui/Alert';

type Job = {
  id: string;
  title: string;
  description: string;
  location?: string | null;
  department?: string | null;
  isActive: boolean;
};

const empty = { title: '', description: '', location: '', department: '', isActive: true };

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/rp/admin/careers', {
          params: {
            page,
            limit: 20,
            q: appliedSearch.trim() || undefined,
            status: statusFilter,
          },
        });
        setJobs(data.jobs || []);
        setPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 });
      } catch (err: unknown) {
        const ex = err as { response?: { data?: { error?: string } } };
        setError(ex.response?.data?.error || 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    },
    [appliedSearch, statusFilter]
  );

  useEffect(() => {
    load(1);
  }, [load]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/rp/admin/careers/${editingId}`, form);
      } else {
        await api.post('/rp/admin/careers', form);
      }
      setForm(empty);
      setEditingId(null);
      load(pagination.page);
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      alert(ex.response?.data?.error || 'Failed to save job');
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this job?')) return;
    try {
      await api.delete(`/rp/admin/careers/${id}`);
      load(pagination.page);
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      alert(ex.response?.data?.error || 'Failed to delete job');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Careers" description="Job listings visible on the member careers page." />

      <form onSubmit={save} className="panel space-y-4 p-6">
        <Input label="Job title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">Description</label>
          <textarea
            required
            rows={6}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="input-field min-h-[140px] py-3"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input
            label="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-navy-700">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="h-4 w-4 rounded border-navy-300 text-purple-600"
          />
          Visible to members
        </label>
        <div className="flex flex-wrap gap-2">
          <Button type="submit">{editingId ? 'Update job' : 'Publish job'}</Button>
          {editingId ? (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setEditingId(null);
                setForm(empty);
              }}
            >
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="panel flex flex-col gap-4 p-4 sm:flex-row sm:items-end">
        <Input
          label="Search jobs"
          placeholder="Title, location, or department"
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
          label="Visibility"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
          className="w-full sm:w-44"
        >
          <option value="all">All listings</option>
          <option value="active">Active only</option>
          <option value="inactive">Hidden only</option>
        </Select>
        <Button type="button" variant="secondary" className="h-11 shrink-0" onClick={() => setAppliedSearch(search)}>
          Search
        </Button>
      </div>

      {error ? <Alert>{error}</Alert> : null}

      {loading ? (
        <div className="flex min-h-[20vh] items-center justify-center rounded-md border border-surface-border bg-white">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
        </div>
      ) : (
        <>
          <PaginationBar pagination={pagination} onPageChange={load} noun="job" />

          {jobs.length === 0 ? (
            <p className="panel py-10 text-center text-sm text-navy-500">No jobs match your search.</p>
          ) : (
            <ul className="space-y-3">
              {jobs.map((job) => (
                <li key={job.id} className="panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-navy-900">{job.title}</p>
                    <p className="mt-1 text-xs text-navy-500">
                      {[job.department, job.location].filter(Boolean).join(' · ') || 'No department or location'}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-navy-500">
                      {job.isActive ? (
                        <span className="text-emerald-600">Active</span>
                      ) : (
                        <span className="text-navy-400">Hidden</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setEditingId(job.id);
                        setForm({
                          title: job.title,
                          description: job.description,
                          location: job.location || '',
                          department: job.department || '',
                          isActive: job.isActive,
                        });
                      }}
                    >
                      Edit
                    </Button>
                    <Button type="button" variant="danger" onClick={() => remove(job.id)}>
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <PaginationBar pagination={pagination} onPageChange={load} noun="job" className="pt-2" />
        </>
      )}
    </div>
  );
}
