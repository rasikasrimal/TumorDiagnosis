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

const toNums = (arr: unknown[] | undefined | null): number[] =>
  (arr ?? [])
    .map((value) => Number(value))
    .filter((num) => Number.isFinite(num));

const isFiniteNum = (value: unknown): value is number => Number.isFinite(Number(value));

function finiteSummary(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const q = (p: number) => {
    const idx = (sorted.length - 1) * p;
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    const w = idx - lo;
    return sorted[lo] * (1 - w) + sorted[hi] * w;
  };
  return {
    min: sorted[0],
    q1: q(0.25),
    median: q(0.5),
    q3: q(0.75),
    max: sorted[sorted.length - 1]
  };
}

type ViolinProps = {
  feature: string;
  values: Array<{ diagnosis: Diagnosis; value: number }>;
  showBox?: boolean;
};

export function ViolinLike({ feature, values, showBox = false }: ViolinProps) {
  const grouped = useMemo(() => {
    const malignantRaw = values.filter((value) => value.diagnosis === "M").map((v) => v.value);
    const benignRaw = values.filter((value) => value.diagnosis === "B").map((v) => v.value);
    return {
      malignant: toNums(malignantRaw),
      benign: toNums(benignRaw)
    };
  }, [values]);

  const benignVals = grouped.benign;
  const malignantVals = grouped.malignant;

  if (!benignVals.length && !malignantVals.length) {
    return (
      <div className="rounded-lg border border-[rgb(var(--border))] p-3 md:p-4 text-sm text-[rgb(var(--muted))]">
        <div className="flex h-full items-center justify-center text-center">
          No data available for {feature}.
        </div>
      </div>
    );
  }

  const allValues = [...benignVals, ...malignantVals];
  const minX = Math.min(...allValues);
  const maxX = Math.max(...allValues);
  if (!Number.isFinite(minX) || !Number.isFinite(maxX) || minX === Infinity || maxX === -Infinity) {
    return null;
  }

  const pad = minX === maxX ? Math.max(1, Math.abs(minX) * 0.01 + 1) : 0;
  const domainMin = minX - pad;
  const domainMax = maxX + pad;
  const domainSpan = domainMax - domainMin;

  if (!Number.isFinite(domainSpan) || domainSpan <= 0) {
    return null;
  }

  const sampleCount = 40;
  const samples = Array.from(
    { length: sampleCount },
    (_, index) => domainMin + (domainSpan * index) / (sampleCount - 1 || 1)
  );
  const bandwidth = domainSpan / 15 || 1;

  const malignantDensity = kernelDensity(malignantVals, samples, bandwidth);
  const benignDensity = kernelDensity(benignVals, samples, bandwidth);

  const maxDensity = Math.max(
    0.001,
    ...malignantDensity.map((point) => point.y),
    ...benignDensity.map((point) => point.y)
  );

  const width = 260;
  const height = 200;

  const scaleX = (value: number) => ((value - domainMin) / domainSpan) * width;
  const scaleY = (value: number) => (value / maxDensity) * (width / 4);

  const sumM = malignantVals.length ? finiteSummary(malignantVals) : null;
  const sumB = benignVals.length ? finiteSummary(benignVals) : null;
  const malignantSummary = describe(malignantVals);
  const benignSummary = describe(benignVals);

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
        <path d={toPath(malignantDensity, 1)} fill="url(#violin-m)" stroke="rgb(var(--malignant))" strokeWidth={1.5} />
        <path d={toPath(benignDensity, -1)} fill="url(#violin-b)" stroke="rgb(var(--benign))" strokeWidth={1.5} />
        {showBox ? (
          <g>
            {sumM && isFiniteNum(sumM.median) ? (
              <line
                x1={scaleX(sumM.median)}
                x2={scaleX(sumM.median)}
                y1={height / 2}
                y2={height}
                stroke="rgb(var(--malignant))"
                strokeWidth={2}
              />
            ) : null}
            {sumB && isFiniteNum(sumB.median) ? (
              <line
                x1={scaleX(sumB.median)}
                x2={scaleX(sumB.median)}
                y1={0}
                y2={height / 2}
                stroke="rgb(var(--benign))"
                strokeWidth={2}
              />
            ) : null}
          </g>
        ) : null}
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-[rgb(var(--muted))]">
        <div>
          <span className="font-semibold text-[rgb(var(--malignant))]">Malignant</span>
          <div className="mt-1 flex flex-wrap gap-2">
            <span>μ {malignantSummary.mean.toFixed(2)}</span>
            <span>σ {malignantSummary.std.toFixed(2)}</span>
          </div>
        </div>
        <div>
          <span className="font-semibold text-[rgb(var(--benign))]">Benign</span>
          <div className="mt-1 flex flex-wrap gap-2">
            <span>μ {benignSummary.mean.toFixed(2)}</span>
            <span>σ {benignSummary.std.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
