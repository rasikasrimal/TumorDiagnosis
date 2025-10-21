"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ConfusionMatrix } from "@/components/viz/ConfusionMatrix";

export type MetricsPayload = {
  accuracy: number;
  f1: number;
  precision?: number;
  recall?: number;
  matrix: number[][];
};

type ModelMetricsPanelProps = {
  initial: MetricsPayload;
};

export function ModelMetricsPanel({ initial }: ModelMetricsPanelProps) {
  const [metrics, setMetrics] = useState<MetricsPayload>(initial);
  const [input, setInput] = useState(`{
  "accuracy": 0.94,
  "f1": 0.92,
  "precision": 0.93,
  "recall": 0.91,
  "matrix": [[85, 5], [3, 50]]
}`);
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(input) as MetricsPayload;
      if (!parsed.matrix || !Array.isArray(parsed.matrix) || parsed.matrix.length < 2) {
        throw new Error("Matrix must be a 2x2 array");
      }
      setMetrics({ ...metrics, ...parsed });
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[rgb(var(--fg))]">Model metrics</h3>
          <p className="text-sm text-[rgb(var(--muted))]">Paste new metrics JSON to update this section.</p>
        </div>
        <Button variant="outline" onClick={handleApply}>
          Apply JSON
        </Button>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Metric label="Accuracy" value={metrics.accuracy} />
        <Metric label="F1 Score" value={metrics.f1} />
        <Metric label="Precision" value={metrics.precision ?? 0} />
        <Metric label="Recall" value={metrics.recall ?? 0} />
      </div>
      <div className="mt-4">
        <ConfusionMatrix matrix={metrics.matrix} />
      </div>
      <div className="mt-4">
        <Textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-h-[140px]"
          aria-label="Metrics JSON"
        />
        {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
      </div>
    </div>
  );
}

type MetricProps = {
  label: string;
  value: number;
};

function Metric({ label, value }: MetricProps) {
  return (
    <div className="rounded-md border border-[rgb(var(--border))] px-3 py-2">
      <div className="text-xs uppercase text-[rgb(var(--muted))]">{label}</div>
      <div className="text-xl font-semibold text-[rgb(var(--fg))]">{value.toFixed(2)}</div>
    </div>
  );
}
