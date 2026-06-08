'use client';

import { MapPin, RotateCcw } from 'lucide-react';
import { Select } from '@/components/ui/Select';

type Props = {
  states: string[];
  cities: string[];
  state: string;
  city: string;
  loadingStates: boolean;
  loadingCities: boolean;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onClear: () => void;
  stationCount: number;
};

export function LocatorFilters({
  states,
  cities,
  state,
  city,
  loadingStates,
  loadingCities,
  onStateChange,
  onCityChange,
  onClear,
  stationCount,
}: Props) {
  const hasSelection = Boolean(state || city);

  return (
    <div className="rounded-md border border-surface-border bg-white p-5 lg:sticky lg:top-20">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-purple-50 text-purple-600">
          <MapPin className="h-4 w-4" strokeWidth={1.75} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-navy-900">Search by location</h2>
          <p className="text-xs text-navy-500">Select a state, then a city</p>
        </div>
      </div>

      <div className="space-y-4">
        <Select
          label="State"
          value={state}
          onChange={(e) => onStateChange(e.target.value)}
          disabled={loadingStates}
        >
          <option value="">All states</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>

        <Select
          label="City"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          disabled={!state || loadingCities}
        >
          <option value="">{state ? 'Select city' : 'Choose a state first'}</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      {state && city ? (
        <div className="mt-5 rounded-md border border-surface-border bg-surface-muted px-3 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Selected area</p>
          <p className="mt-1 text-sm font-semibold text-navy-900">
            {city}, {state}
          </p>
          <p className="mt-1 text-xs text-navy-500">
            {stationCount} station{stationCount === 1 ? '' : 's'} found
          </p>
        </div>
      ) : null}

      {hasSelection ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-surface-border px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-surface-muted"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear filters
        </button>
      ) : null}

      <p className="mt-5 text-xs leading-relaxed text-navy-400">
        Stations are managed by R&P Global Energies. New locations appear here as they are added by admin.
      </p>
    </div>
  );
}
