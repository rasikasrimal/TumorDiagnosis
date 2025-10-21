'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import type { ChartPoint } from '@/types/data';

interface BarChartCardProps {
  data: ChartPoint[];
  xKey: string;
  barKeys: string[];
  title: string;
  description?: string;
}

const palette = ['#2563eb', '#10b981', '#f97316', '#ec4899', '#6366f1'];

export function BarChartCard({ data, xKey, barKeys, title, description }: BarChartCardProps) {
  return (
    <section className="space-y-3 rounded-xl border border-border bg-background/60 p-5">
      <header>
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </header>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
            <XAxis dataKey={xKey} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
            <YAxis stroke="var(--muted-foreground)" tickLine={false} axisLine={false} allowDecimals />
            <Tooltip contentStyle={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 12 }} />
            <Legend />
            {barKeys.map((key, index) => (
              <Bar key={key} dataKey={key} fill={palette[index % palette.length]} radius={6} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
