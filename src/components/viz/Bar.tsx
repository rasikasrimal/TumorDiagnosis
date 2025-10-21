"use client";

import {
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export type BarDatum = {
  name: string;
  value: number;
  fill?: string;
};

type BarProps = {
  data: BarDatum[];
  color?: string;
};

export function Bar({ data, color = "rgb(var(--accent))" }: BarProps) {
  return (
    <div className="h-64 rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <CartesianGrid stroke="rgb(var(--border))" vertical={false} />
          <XAxis dataKey="name" stroke="rgb(var(--muted))" tickLine={false} axisLine={false} />
          <YAxis stroke="rgb(var(--muted))" tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(148, 163, 184, 0.15)" }}
            contentStyle={{ borderRadius: 8, border: `1px solid rgb(var(--border))`, boxShadow: "none" }}
          />
          <RechartsBar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
