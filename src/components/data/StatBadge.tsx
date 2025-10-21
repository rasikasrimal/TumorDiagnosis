import { cn } from "@/lib/utils";

export type StatBadgeProps = {
  label: string;
  value: number;
  percentage?: number;
  tone?: "benign" | "malignant" | "default";
  className?: string;
};

export function StatBadge({ label, value, percentage, tone = "default", className }: StatBadgeProps) {
  const toneClass =
    tone === "benign"
      ? "border-[rgb(var(--benign))] text-[rgb(var(--benign))]"
      : tone === "malignant"
      ? "border-[rgb(var(--malignant))] text-[rgb(var(--malignant))]"
      : "border-[rgb(var(--border))] text-[rgb(var(--muted))]";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        toneClass,
        className
      )}
    >
      <span>{label}</span>
      <span className="text-sm font-semibold text-[rgb(var(--fg))]">{value}</span>
      {percentage !== undefined ? <span className="text-[rgb(var(--muted))]">({percentage.toFixed(1)}%)</span> : null}
    </span>
  );
}
