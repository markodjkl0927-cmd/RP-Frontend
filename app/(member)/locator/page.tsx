'use client';

import { useEffect, useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { Select } from '@/components/ui/Select';

type Location = {
  id: string;
  name?: string | null;
  address: string;
  phone?: string | null;
  city: string;
  state: string;
};

export default function LocatorPage() {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/rp/locator/states').then((res) => setStates(res.data.states || [])).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!state) {
      setCities([]);
      setCity('');
      return;
    }
    api.get('/rp/locator/cities', { params: { state } }).then((res) => setCities(res.data.cities || []));
    setCity('');
  }, [state]);

  useEffect(() => {
    if (!state || !city) {
      setLocations([]);
      return;
    }
    api.get('/rp/locator/locations', { params: { state, city } }).then((res) => setLocations(res.data.locations || []));
  }, [state, city]);

  return (
    <div>
      <PageHeader
        title="Station locator"
        description="Find R&P fuel station addresses by state and city."
      />

      <div className="panel mb-8 grid gap-4 p-6 sm:grid-cols-2">
        <Select label="State" value={state} onChange={(e) => setState(e.target.value)} disabled={loading}>
          <option value="">Select state</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
        <Select label="City" value={city} onChange={(e) => setCity(e.target.value)} disabled={!state}>
          <option value="">Select city</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      {state && city && locations.length === 0 ? (
        <p className="text-center text-sm text-navy-500 py-8">No stations listed for this area yet.</p>
      ) : null}

      <ul className="space-y-3">
        {locations.map((loc) => (
          <li key={loc.id} className="panel flex gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <MapPin className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-semibold text-navy-900">{loc.name || 'R&P Fuel Station'}</p>
              <p className="mt-1 text-sm text-navy-600">{loc.address}</p>
              <p className="text-sm text-navy-500">
                {loc.city}, {loc.state}
              </p>
              {loc.phone ? (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-navy-600">
                  <Phone className="h-4 w-4" />
                  {loc.phone}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
