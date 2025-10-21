'use client';

import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter, ZAxis } from 'recharts';
import type { ScatterPoint } from '@/types/data';

interface ScatterChartCardProps {
  data: ScatterPoint[];
  xKey: string;
  yKey: string;
  sizeKey?: string;
  title: string;
  description?: string;
}

export function ScatterChartCard({ data, xKey, yKey, sizeKey, title, description }: ScatterChartCardProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
      <header>
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </header>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" />
            <XAxis dataKey={xKey} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} type="number" />
            <YAxis dataKey={yKey} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} type="number" />
            {sizeKey ? <ZAxis dataKey={sizeKey} range={[60, 400]} /> : null}
            <Tooltip
              cursor={{ strokeDasharray: '2 2' }}
              contentStyle={{
                background: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 12
              }}
            />
            <Scatter data={data} fill="hsl(var(--accent))" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
