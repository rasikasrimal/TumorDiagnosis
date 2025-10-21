import { cn } from "@/lib/utils";

export type MetricCardProps = {
  label: string;
  value: string | number;
  description?: string;
  className?: string;
};

export function MetricCard({ label, value, description, className }: MetricCardProps) {
  return (
    <div
      tabIndex={0}
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-[rgb(var(--border))] p-3 md:p-4 transition focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] hover:ring-1 hover:ring-[rgb(var(--border))]",
        className
      )}
    >
      <span className="text-xs uppercase tracking-wide text-[rgb(var(--muted))]">{label}</span>
      <span className="text-2xl font-semibold text-[rgb(var(--fg))]">{value}</span>
      {description ? <span className="text-sm text-[rgb(var(--muted))]">{description}</span> : null}
    </div>
  );
}
