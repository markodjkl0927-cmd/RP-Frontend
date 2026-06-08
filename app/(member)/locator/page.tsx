'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import api from '@/lib/api';
import { LocatorFilters } from '@/components/locator/LocatorFilters';
import { LocatorResults } from '@/components/locator/LocatorResults';
import type { Station } from '@/components/locator/StationCard';

export default function LocatorPage() {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [locations, setLocations] = useState<Station[]>([]);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    api
      .get('/rp/locator/states')
      .then((res) => setStates(res.data.states || []))
      .finally(() => setLoadingStates(false));
  }, []);

  useEffect(() => {
    if (!state) {
      setCities([]);
      setCity('');
      return;
    }
    setLoadingCities(true);
    api
      .get('/rp/locator/cities', { params: { state } })
      .then((res) => setCities(res.data.cities || []))
      .finally(() => setLoadingCities(false));
    setCity('');
  }, [state]);

  useEffect(() => {
    if (!state || !city) {
      setLocations([]);
      return;
    }
    setLoadingLocations(true);
    api
      .get('/rp/locator/locations', { params: { state, city } })
      .then((res) => setLocations(res.data.locations || []))
      .finally(() => setLoadingLocations(false));
  }, [state, city]);

  const clearFilters = () => {
    setState('');
    setCity('');
    setLocations([]);
  };

  return (
    <div>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Fuel network</p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
          Station locator
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-500">
          Browse R&P fuel stations across the United States. Filter by state and city, then get directions or
          call a station directly.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[minmax(260px,300px)_1fr] lg:items-start">
        <LocatorFilters
          states={states}
          cities={cities}
          state={state}
          city={city}
          loadingStates={loadingStates}
          loadingCities={loadingCities}
          onStateChange={setState}
          onCityChange={setCity}
          onClear={clearFilters}
          stationCount={locations.length}
        />

        <LocatorResults
          state={state}
          city={city}
          locations={locations}
          loading={loadingLocations}
        />
      </div>
    </div>
  );
}
