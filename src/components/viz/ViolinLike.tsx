"use client";

import { useMemo } from "react";
import { describe } from "@/lib/stats";
import type { Diagnosis } from "@/types/cancer";

const gaussianKernel = (u: number) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * u * u);

const kernelDensity = (values: number[], samples: number[], bandwidth: number) =>
  samples.map((sample) => {
    if (!values.length) {
      return { x: sample, y: 0 };
    }
    const density =
      values.reduce((acc, value) => acc + gaussianKernel((sample - value) / bandwidth), 0) /
      (values.length * bandwidth || 1);
    return { x: sample, y: density };
  });

type ViolinProps = {
  feature: string;
  values: Array<{ diagnosis: Diagnosis; value: number }>;
  showBox?: boolean;
};

export function ViolinLike({ feature, values, showBox = false }: ViolinProps) {
  const grouped = useMemo(() => {
    const malignant = values.filter((value) => value.diagnosis === "M").map((v) => v.value);
    const benign = values.filter((value) => value.diagnosis === "B").map((v) => v.value);
    return { malignant, benign };
  }, [values]);

  const densityData = useMemo(() => {
    const allValues = values.map((v) => v.value);
    const min = allValues.length ? Math.min(...allValues) : 0;
    const max = allValues.length ? Math.max(...allValues) : 1;
    const samples = Array.from({ length: 40 }, (_, index) => min + ((max - min) * index) / 39);
    const bandwidth = (max - min) / 15 || 1;
    return {
      malignant: kernelDensity(grouped.malignant, samples, bandwidth),
      benign: kernelDensity(grouped.benign, samples, bandwidth),
      samples
    };
  }, [grouped.benign, grouped.malignant, values]);

  const summaries = useMemo(
    () => ({
      malignant: describe(grouped.malignant),
      benign: describe(grouped.benign)
    }),
    [grouped]
  );

  const maxDensity = Math.max(
    ...densityData.malignant.map((point) => point.y),
    ...densityData.benign.map((point) => point.y),
    0.001
  );

  const width = 260;
  const height = 200;

  const domainSpan = densityData.samples.at(-1)! - densityData.samples[0] || 1;
  const scaleX = (value: number) => ((value - densityData.samples[0]) / domainSpan) * width;
  const scaleY = (value: number) => (value / maxDensity) * (width / 4);

  const toPath = (data: { x: number; y: number }[], direction: 1 | -1) => {
    if (!data.length) return "";
    const coords = data.map((point) => `${scaleX(point.x)},${height / 2 + direction * scaleY(point.y)}`);
    const mirrored = [...data].reverse().map((point) => `${scaleX(point.x)},${height / 2}`);
    return `M${coords[0]}L${coords.slice(1).join("L")}L${mirrored.join("L")}Z`;
  };

  return (
    <div className="rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
      <div className="mb-2 flex items-center justify-between text-xs text-[rgb(var(--muted))]">
        <span>{feature}</span>
        <span>Standardized distribution</span>
      </div>
      <svg role="img" aria-label={`${feature} distribution`} width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="violin-m" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--malignant))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="rgb(var(--malignant))" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="violin-b" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--benign))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="rgb(var(--benign))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="transparent" />
        <path d={toPath(densityData.malignant, 1)} fill="url(#violin-m)" stroke="rgb(var(--malignant))" strokeWidth={1.5} />
        <path d={toPath(densityData.benign, -1)} fill="url(#violin-b)" stroke="rgb(var(--benign))" strokeWidth={1.5} />
        {showBox ? (
          <g>
            <line
              x1={scaleX(summaries.malignant.median)}
              x2={scaleX(summaries.malignant.median)}
              y1={height / 2}
              y2={height}
              stroke="rgb(var(--malignant))"
              strokeWidth={2}
            />
            <line
              x1={scaleX(summaries.benign.median)}
              x2={scaleX(summaries.benign.median)}
              y1={0}
              y2={height / 2}
              stroke="rgb(var(--benign))"
              strokeWidth={2}
            />
          </g>
        ) : null}
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-[rgb(var(--muted))]">
        <div>
          <span className="font-semibold text-[rgb(var(--malignant))]">Malignant</span>
          <div className="mt-1 flex flex-wrap gap-2">
            <span>μ {summaries.malignant.mean.toFixed(2)}</span>
            <span>σ {summaries.malignant.std.toFixed(2)}</span>
          </div>
        </div>
        <div>
          <span className="font-semibold text-[rgb(var(--benign))]">Benign</span>
          <div className="mt-1 flex flex-wrap gap-2">
            <span>μ {summaries.benign.mean.toFixed(2)}</span>
            <span>σ {summaries.benign.std.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
