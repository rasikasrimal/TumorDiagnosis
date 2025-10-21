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

const palette = ['#2563eb', '#0891b2', '#16a34a', '#f97316', '#9333ea'];

export function LineChartCard({ data, xKey, lineKeys, title, description }: LineChartCardProps) {
  return (
    <section className="space-y-3 rounded-xl border border-border bg-background/60 p-5">
      <header>
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </header>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
            <XAxis dataKey={xKey} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
            <YAxis stroke="var(--muted-foreground)" tickLine={false} axisLine={false} allowDecimals />
            <Tooltip contentStyle={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 12 }} />
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
