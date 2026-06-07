'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = () => api.get('/rp/admin/careers').then((res) => setJobs(res.data.jobs || []));

  useEffect(() => {
    load();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/rp/admin/careers/${editingId}`, form);
    } else {
      await api.post('/rp/admin/careers', form);
    }
    setForm(empty);
    setEditingId(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this job?')) return;
    await api.delete(`/rp/admin/careers/${id}`);
    load();
  };

  return (
    <div>
      <PageHeader title="Careers" description="Job listings visible on the member careers page." />

      <form onSubmit={save} className="panel mb-8 space-y-4 p-6">
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
        <Button type="submit">{editingId ? 'Update job' : 'Publish job'}</Button>
      </form>

      <ul className="space-y-3">
        {jobs.map((job) => (
          <li key={job.id} className="panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-navy-900">{job.title}</p>
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
    </div>
  );
}
