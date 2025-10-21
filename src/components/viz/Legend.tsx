import { cn } from "@/lib/utils";

export type LegendItem = {
  label: string;
  color: string;
};

type LegendProps = {
  items: LegendItem[];
  className?: string;
};

export function Legend({ items, className }: LegendProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3 text-xs text-[rgb(var(--muted))]", className)}>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border border-[rgb(var(--border))]" style={{ backgroundColor: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
