'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { ChartPoint } from '@/types/data';

interface LineChartCardProps {
  data: ChartPoint[];
  xKey: string;
  lineKeys: string[];
  title: string;
  description?: string;
}

const palette = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--secondary))',
  'hsl(var(--ring))',
  'hsl(var(--muted-foreground))'
];

export function LineChartCard({ data, xKey, lineKeys, title, description }: LineChartCardProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
      <header>
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </header>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" />
            <XAxis dataKey={xKey} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} allowDecimals />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 12
              }}
            />
            <Legend />
            {lineKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                strokeWidth={2}
                dot={false}
                stroke={palette[index % palette.length]}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
