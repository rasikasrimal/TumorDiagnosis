"use client";

import { ResponsiveContainer, LineChart, Line as RechartsLine, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

type LineDatum = {
  name: string;
  value: number;
};

type LineProps = {
  data: LineDatum[];
  color?: string;
};

export function Line({ data, color = "rgb(var(--accent))" }: LineProps) {
  return (
    <div className="h-64 rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="rgb(var(--border))" vertical={false} />
          <XAxis dataKey="name" stroke="rgb(var(--muted))" tickLine={false} axisLine={false} />
          <YAxis stroke="rgb(var(--muted))" tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ stroke: "rgb(var(--border))" }}
            contentStyle={{ borderRadius: 8, border: `1px solid rgb(var(--border))`, boxShadow: "none" }}
          />
          <RechartsLine type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
