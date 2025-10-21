"use client";

import { useMemo } from "react";
import { Legend } from "./Legend";

const interpolateColor = (value: number) => {
  const clamped = Math.max(-1, Math.min(1, value));
  const ratio = (clamped + 1) / 2; // 0 to 1
  const r = Math.round(37 + ratio * (239 - 37));
  const g = Math.round(99 + ratio * (68 - 99));
  const b = Math.round(235 + ratio * (68 - 235));
  return `rgb(${r}, ${g}, ${b})`;
};

type HeatmapProps = {
  matrix: number[][];
  labels: string[];
  onHover?: (row: number, col: number, value: number) => void;
};

export function Heatmap({ matrix, labels, onHover }: HeatmapProps) {
  const size = matrix.length;

  const entries = useMemo(() => {
    const cells: Array<{ row: number; col: number; value: number }> = [];
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        cells.push({ row, col, value: matrix[row][col] ?? 0 });
      }
    }
    return cells;
  }, [matrix, size]);

  const dimension = Math.min(560, Math.max(200, size * 44));
  const cellSize = dimension / size;

  return (
    <div className="rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[rgb(var(--fg))]">Correlation Heatmap</h3>
        <Legend
          items={[
            { label: "-1", color: interpolateColor(-1) },
            { label: "0", color: interpolateColor(0) },
            { label: "+1", color: interpolateColor(1) }
          ]}
        />
      </div>
      {size === 0 ? (
        <div className="p-6 text-sm text-[rgb(var(--muted))]">Select at least one feature to render the matrix.</div>
      ) : (
        <div className="overflow-auto">
          <svg
            width={dimension + 120}
            height={dimension + 80}
            role="img"
            aria-label="Correlation heatmap"
            className="focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
            tabIndex={0}
          >
            {entries.map((cell) => (
              <g key={`${cell.row}-${cell.col}`} transform={`translate(${cell.col * cellSize + 80}, ${cell.row * cellSize + 40})`}>
                <rect
                  width={cellSize - 2}
                  height={cellSize - 2}
                  fill={interpolateColor(cell.value)}
                  stroke="rgb(var(--border))"
                  rx={4}
                  aria-label={`${labels[cell.row]} vs ${labels[cell.col]} ${cell.value.toFixed(2)}`}
                  onMouseEnter={() => onHover?.(cell.row, cell.col, cell.value)}
                >
                  <title>
                    {labels[cell.row]} vs {labels[cell.col]}: {cell.value.toFixed(2)}
                  </title>
                </rect>
                {cell.row === size - 1 ? (
                  <text
                    x={(cellSize - 2) / 2}
                    y={cellSize + 14}
                    textAnchor="middle"
                    fontSize="10"
                    fill="rgb(var(--muted))"
                  >
                    {labels[cell.col]}
                  </text>
                ) : null}
                {cell.col === 0 ? (
                  <text
                    x={-6}
                    y={(cellSize - 2) / 2}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize="10"
                    fill="rgb(var(--muted))"
                  >
                    {labels[cell.row]}
                  </text>
                ) : null}
              </g>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}
