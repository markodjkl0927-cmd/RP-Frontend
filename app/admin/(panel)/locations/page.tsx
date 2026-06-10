'use client';

import { useCallback, useEffect, useState } from 'react';
import api from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PaginationBar, PaginationInfo } from '@/components/ui/PaginationBar';
import { Alert } from '@/components/ui/Alert';

type Location = {
  id: string;
  state: string;
  city: string;
  address: string;
  name?: string | null;
  phone?: string | null;
};

const empty = { state: '', city: '', address: '', name: '', phone: '' };

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/rp/admin/locations', {
          params: {
            page,
            limit: 20,
            q: appliedSearch.trim() || undefined,
          },
        });
        setLocations(data.locations || []);
        setPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 });
      } catch (err: unknown) {
        const ex = err as { response?: { data?: { error?: string } } };
        setError(ex.response?.data?.error || 'Failed to load locations');
      } finally {
        setLoading(false);
      }
    },
    [appliedSearch]
  );

  useEffect(() => {
    load(1);
  }, [load]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/rp/admin/locations/${editingId}`, form);
      } else {
        await api.post('/rp/admin/locations', form);
      }
      setForm(empty);
      setEditingId(null);
      load(pagination.page);
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      alert(ex.response?.data?.error || 'Failed to save location');
    }
  };

  const startEdit = (loc: Location) => {
    setEditingId(loc.id);
    setForm({
      state: loc.state,
      city: loc.city,
      address: loc.address,
      name: loc.name || '',
      phone: loc.phone || '',
    });
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this location?')) return;
    try {
      await api.delete(`/rp/admin/locations/${id}`);
      load(pagination.page);
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      alert(ex.response?.data?.error || 'Failed to delete location');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Fuel locations" description="Stations shown in the member station locator." />

      <form onSubmit={save} className="panel grid gap-4 p-6 sm:grid-cols-2">
        <Input
          label="State"
          required
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />
        <Input label="City" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <Input
          label="Address"
          required
          className="sm:col-span-2"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <Input label="Station name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <div className="flex flex-wrap gap-2 sm:col-span-2">
          <Button type="submit">{editingId ? 'Update location' : 'Add location'}</Button>
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
          label="Search stations"
          placeholder="State, city, address, or name"
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
          <PaginationBar pagination={pagination} onPageChange={load} noun="location" />

          <div className="panel overflow-hidden">
            {locations.length === 0 ? (
              <p className="py-10 text-center text-sm text-navy-500">No locations match your search.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-surface-border bg-surface-muted text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
                      <th className="px-5 py-3">State</th>
                      <th className="px-5 py-3">City</th>
                      <th className="px-5 py-3">Address</th>
                      <th className="px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {locations.map((loc) => (
                      <tr key={loc.id} className="hover:bg-surface-muted/50">
                        <td className="px-5 py-3 font-medium text-navy-900">{loc.state}</td>
                        <td className="px-5 py-3 text-navy-600">{loc.city}</td>
                        <td className="px-5 py-3 text-navy-600">
                          {loc.name ? <span className="font-medium text-navy-800">{loc.name}</span> : null}
                          {loc.name ? ' — ' : ''}
                          {loc.address}
                        </td>
                        <td className="space-x-3 px-5 py-3">
                          <button
                            type="button"
                            onClick={() => startEdit(loc)}
                            className="font-medium text-purple-600 hover:text-purple-500"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(loc.id)}
                            className="font-medium text-red-600 hover:text-red-500"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <PaginationBar pagination={pagination} onPageChange={load} noun="location" className="pt-2" />
        </>
      )}
    </div>
  );
}
