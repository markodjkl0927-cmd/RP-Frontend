'use client';

import { Search } from 'lucide-react';
import { Select } from '@/components/ui/Select';

type Props = {
  query: string;
  department: string;
  location: string;
  departments: string[];
  locations: string[];
  onQueryChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  resultCount: number;
};

export function JobFilters({
  query,
  department,
  location,
  departments,
  locations,
  onQueryChange,
  onDepartmentChange,
  onLocationChange,
  resultCount,
}: Props) {
  return (
    <div className="rounded-md border border-surface-border bg-white p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_minmax(140px,180px)_minmax(140px,180px)] lg:items-end">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">Search roles</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Job title or keyword"
              className="input-field pl-10"
            />
          </div>
        </div>
        <Select label="Department" value={department} onChange={(e) => onDepartmentChange(e.target.value)}>
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
        <Select label="Location" value={location} onChange={(e) => onLocationChange(e.target.value)}>
          <option value="">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </Select>
      </div>
      <p className="mt-3 text-xs text-navy-500">
        Showing {resultCount} role{resultCount === 1 ? '' : 's'}
      </p>
    </div>
  );
}
