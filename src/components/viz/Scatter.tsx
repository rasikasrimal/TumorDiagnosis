"use client";

import { ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, ZAxis } from "recharts";

export type ScatterDatum = {
  id: string;
  x: number;
  y: number;
  diagnosis: "M" | "B";
};

type ScatterProps = {
  data: ScatterDatum[];
  xLabel: string;
  yLabel: string;
};

export function ScatterPlot({ data, xLabel, yLabel }: ScatterProps) {
  return (
    <div className="h-[420px] rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid stroke="rgb(var(--border))" />
          <XAxis
            type="number"
            dataKey="x"
            name={xLabel}
            stroke="rgb(var(--muted))"
            axisLine={false}
            tickLine={false}
            label={{ value: xLabel, position: "insideBottomRight", offset: -8, fill: "rgb(var(--muted))" }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yLabel}
            stroke="rgb(var(--muted))"
            axisLine={false}
            tickLine={false}
            label={{ value: yLabel, angle: -90, position: "insideLeft", fill: "rgb(var(--muted))" }}
          />
          <ZAxis type="category" dataKey="diagnosis" range={[50, 120]} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{ borderRadius: 8, border: `1px solid rgb(var(--border))`, boxShadow: "none" }}
          />
          <Scatter data={data.filter((point) => point.diagnosis === "M")} fill="rgb(var(--malignant))" name="Malignant" />
          <Scatter data={data.filter((point) => point.diagnosis === "B")} fill="rgb(var(--benign))" name="Benign" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
