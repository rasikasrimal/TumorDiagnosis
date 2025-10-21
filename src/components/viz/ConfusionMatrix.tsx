import { cn } from "@/lib/utils";

export type ConfusionMatrixProps = {
  matrix: number[][]; // [[tp, fn],[fp, tn]] or general 2x2 with actual rows predicted cols
  labels?: [string, string];
};

export function ConfusionMatrix({ matrix, labels = ["Malignant", "Benign"] }: ConfusionMatrixProps) {
  const totals = {
    col0: (matrix[0]?.[0] ?? 0) + (matrix[1]?.[0] ?? 0),
    col1: (matrix[0]?.[1] ?? 0) + (matrix[1]?.[1] ?? 0)
  };
  return (
    <div className="rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
      <div className="mb-3 text-sm font-semibold text-[rgb(var(--fg))]">Confusion Matrix</div>
      <div className="grid grid-cols-[auto_repeat(2,minmax(0,1fr))] gap-px bg-[rgb(var(--border))]">
        <div className="bg-[rgb(var(--bg))] p-2 text-xs text-[rgb(var(--muted))]" />
        <div className="bg-[rgb(var(--bg))] p-2 text-xs font-semibold text-[rgb(var(--muted))]">Predicted {labels[0]}</div>
        <div className="bg-[rgb(var(--bg))] p-2 text-xs font-semibold text-[rgb(var(--muted))]">Predicted {labels[1]}</div>
        <div className="bg-[rgb(var(--bg))] p-2 text-xs font-semibold text-[rgb(var(--muted))]">Actual {labels[0]}</div>
        {matrix[0]?.map((value, index) => (
          <Cell key={`r0c${index}`} value={value} total={Math.max(...matrix[0]) || 1} />
        ))}
        <div className="bg-[rgb(var(--bg))] p-2 text-xs font-semibold text-[rgb(var(--muted))]">Actual {labels[1]}</div>
        {matrix[1]?.map((value, index) => (
          <Cell key={`r1c${index}`} value={value} total={Math.max(...matrix[1]) || 1} />
        ))}
        <div className="bg-[rgb(var(--bg))] p-2 text-xs font-semibold text-[rgb(var(--muted))]">Totals</div>
        <div className="bg-[rgb(var(--bg))] p-2 text-sm">{totals.col0}</div>
        <div className="bg-[rgb(var(--bg))] p-2 text-sm">{totals.col1}</div>
      </div>
    </div>
  );
}

type CellProps = {
  value: number;
  total: number;
};

function Cell({ value, total }: CellProps) {
  const intensity = total ? Math.min(1, value / total) : 0;
  const background = `rgba(37, 99, 235, ${0.15 + intensity * 0.6})`;
  return (
    <div
      className={cn(
        "min-h-[60px] bg-[rgb(var(--bg))] p-3 text-center text-sm font-semibold text-[rgb(var(--fg))]",
        "transition hover:ring-1 hover:ring-[rgb(var(--border))]"
      )}
      style={{ background }}
    >
      {value}
    </div>
  );
}
