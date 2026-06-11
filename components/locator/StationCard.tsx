'use client';

import { ExternalLink, Fuel, MapPin, Phone } from 'lucide-react';

export type Station = {
  id: string;
  name?: string | null;
  address: string;
  phone?: string | null;
  city: string;
  state: string;
  latitude?: number | null;
  longitude?: number | null;
};

function directionsUrl(station: Station) {
  const query = [station.address, station.city, station.state].filter(Boolean).join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function StationCard({
  station,
  selected = false,
  onSelect,
}: {
  station: Station;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const title = station.name || 'R&P Fuel Station';

  return (
    <article
      id={`station-${station.id}`}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (!onSelect) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      className={`flex h-full flex-col rounded-md border bg-white p-5 transition-colors ${
        selected
          ? 'border-purple-400 ring-2 ring-purple-200'
          : 'border-surface-border hover:border-purple-200'
      } ${onSelect ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-purple-50 text-purple-600">
          <Fuel className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-navy-900">{title}</h3>
          <p className="mt-1 text-sm text-navy-600">{station.address}</p>
          <p className="mt-0.5 text-sm text-navy-500">
            {station.city}, {station.state}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-surface-border pt-4">
        {station.phone ? (
          <a
            href={`tel:${station.phone.replace(/\s/g, '')}`}
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 transition-colors hover:text-purple-700"
          >
            <Phone className="h-4 w-4 text-purple-600" />
            {station.phone}
          </a>
        ) : null}
        <a
          href={directionsUrl(station)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="inline-flex items-center gap-1.5 rounded-md bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-purple-700"
        >
          <MapPin className="h-3.5 w-3.5" />
          Get directions
          <ExternalLink className="h-3 w-3 opacity-80" />
        </a>
      </div>
    </article>
  );
}
