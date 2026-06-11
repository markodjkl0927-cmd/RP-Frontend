'use client';

import { useEffect, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import type { Station } from './StationCard';

export type MappableStation = Station & { latitude: number; longitude: number };

function hasCoords(station: Station): station is MappableStation {
  return typeof station.latitude === 'number' && typeof station.longitude === 'number';
}

function createMarkerIcon(selected: boolean) {
  return L.divIcon({
    className: 'rp-station-marker',
    html: `<span class="rp-station-marker__dot${selected ? ' rp-station-marker__dot--selected' : ''}"></span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

function FitBounds({ stations }: { stations: MappableStation[] }) {
  const map = useMap();

  useEffect(() => {
    if (stations.length === 0) {
      map.setView([39.8283, -98.5795], 4);
      return;
    }
    if (stations.length === 1) {
      map.setView([stations[0].latitude, stations[0].longitude], 13);
      return;
    }
    const bounds = L.latLngBounds(
      stations.map((station) => [station.latitude, station.longitude] as [number, number])
    );
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
  }, [stations, map]);

  return null;
}

function FlyToSelected({ station }: { station: MappableStation | null }) {
  const map = useMap();

  useEffect(() => {
    if (!station) return;
    map.flyTo([station.latitude, station.longitude], Math.max(map.getZoom(), 13), { duration: 0.5 });
  }, [station, map]);

  return null;
}

type Props = {
  stations: Station[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
};

export function StationMap({ stations, selectedId, onSelect }: Props) {
  const mappable = useMemo(() => stations.filter(hasCoords), [stations]);
  const missingCount = stations.length - mappable.length;
  const selected = mappable.find((station) => station.id === selectedId) ?? null;

  return (
    <div className="relative overflow-hidden rounded-md border border-surface-border bg-white">
      <MapContainer center={[39.8283, -98.5795]} zoom={4} className="station-map h-[360px] w-full" scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds stations={mappable} />
        <FlyToSelected station={selected} />
        {mappable.map((station) => {
          const isSelected = station.id === selectedId;
          return (
            <Marker
              key={station.id}
              position={[station.latitude, station.longitude]}
              icon={createMarkerIcon(isSelected)}
              eventHandlers={{
                click: () => onSelect?.(station.id),
              }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-navy-900">{station.name || 'R&P Fuel Station'}</p>
                  <p className="mt-1 text-navy-600">{station.address}</p>
                  <p className="text-navy-500">
                    {station.city}, {station.state}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {missingCount > 0 ? (
        <p className="border-t border-surface-border bg-surface-muted px-3 py-2 text-xs text-navy-500">
          {missingCount} station{missingCount === 1 ? '' : 's'} not shown on the map (coordinates pending).
        </p>
      ) : null}
    </div>
  );
}
