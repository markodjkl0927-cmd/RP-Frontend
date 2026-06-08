'use client';

import { Fuel, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

import { gridStagger, riseSpring } from '@/lib/motion';
import { Station, StationCard } from './StationCard';

type Props = {
  state: string;
  city: string;
  locations: Station[];
  loading: boolean;
};

function ResultsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-40 animate-pulse rounded-md border border-surface-border bg-white" />
      ))}
    </div>
  );
}

export function LocatorResults({ state, city, locations, loading }: Props) {
  if (!state || !city) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-md border border-dashed border-surface-border bg-white px-6 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-md bg-purple-50 text-purple-600">
          <Search className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">Find an R&P station</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-navy-500">
          Choose a state and city in the filters to browse fuel stations in the R&P network. You can call a
          station directly or open directions in Google Maps.
        </p>
      </div>
    );
  }

  if (loading) {
    return <ResultsSkeleton />;
  }

  if (locations.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-md border border-surface-border bg-white px-6 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-md bg-navy-50 text-navy-500">
          <MapPin className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">No stations in this area yet</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-navy-500">
          There are no R&P fuel stations listed for {city}, {state}. Try another city or check back later as
          new locations are added.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Results</p>
          <h2 className="mt-1 font-display text-xl font-semibold text-navy-900">
            {locations.length} station{locations.length === 1 ? '' : 's'} in {city}, {state}
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-surface-border bg-white px-3 py-1.5 text-xs font-semibold text-navy-600">
          <Fuel className="h-3.5 w-3.5 text-purple-600" />
          R&P fuel network
        </span>
      </div>

      <motion.div
        variants={gridStagger}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2"
      >
        {locations.map((loc) => (
          <motion.div key={loc.id} variants={riseSpring} className="h-full">
            <StationCard station={loc} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
