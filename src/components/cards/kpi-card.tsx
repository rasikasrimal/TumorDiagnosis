import type { ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  changeLabel?: string;
  changeValue?: string;
  icon?: ReactNode;
}

/**
 * Compact key performance indicator card with optional change indicator.
 */
export function KpiCard({ title, value, changeLabel, changeValue, icon }: KpiCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-background/60 p-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-semibold">{value}</div>
      {changeLabel && changeValue ? (
        <p className="text-xs text-muted-foreground">
          {changeLabel}: <span className="font-medium text-foreground">{changeValue}</span>
        </p>
      ) : null}
    </article>
  );
}
