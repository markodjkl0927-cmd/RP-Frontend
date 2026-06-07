'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = () => {
    api.get('/rp/admin/locations', { params: { limit: 100 } }).then((res) => setLocations(res.data.locations || []));
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/rp/admin/locations/${editingId}`, form);
    } else {
      await api.post('/rp/admin/locations', form);
    }
    setForm(empty);
    setEditingId(null);
    load();
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
    await api.delete(`/rp/admin/locations/${id}`);
    load();
  };

  return (
    <div>
      <PageHeader title="Fuel locations" description="Stations shown in the member station locator." />

      <form onSubmit={save} className="panel mb-8 grid gap-4 p-6 sm:grid-cols-2">
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

      <div className="panel overflow-hidden">
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
                    {loc.name ? (
                      <span className="font-medium text-navy-800">{loc.name}</span>
                    ) : null}
                    {loc.name ? ' — ' : ''}
                    {loc.address}
                  </td>
                  <td className="px-5 py-3 space-x-3">
                    <button type="button" onClick={() => startEdit(loc)} className="font-medium text-purple-600 hover:text-purple-500">
                      Edit
                    </button>
                    <button type="button" onClick={() => remove(loc.id)} className="font-medium text-red-600 hover:text-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
