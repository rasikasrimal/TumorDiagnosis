'use client';

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import type { GeoPoint } from '@/types/data';

interface MapChartProps {
  points: GeoPoint[];
  title: string;
  description?: string;
}

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export function MapChart({ points, title, description }: MapChartProps) {
  return (
    <section className="space-y-3 rounded-xl border border-border bg-background/60 p-5">
      <header>
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </header>
      <div className="h-96">
        <ComposableMap projectionConfig={{ scale: 145 }} className="h-full w-full">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className="fill-muted stroke-border stroke-[0.5px]"
                />
              ))
            }
          </Geographies>
          {points.map((point) => (
            <Marker key={point.id} coordinates={[point.longitude, point.latitude]}>
              <circle r={4} className="fill-primary stroke-background stroke-[1.5px]" />
              <text
                textAnchor="middle"
                y={-10}
                className="text-xs font-medium fill-foreground"
              >
                {point.label ?? point.id}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </section>
  );
}
