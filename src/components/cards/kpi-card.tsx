import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Tone = 'neutral' | 'success' | 'warning' | 'danger';

interface KpiCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  tone?: Tone;
  className?: string;
}

const toneMap: Record<Tone, string> = {
  neutral: 'text-foreground',
  success: 'text-emerald-600 dark:text-emerald-400',
  warning: 'text-amber-600 dark:text-amber-400',
  danger: 'text-destructive'
};

export function KpiCard({ title, value, description, icon, tone = 'neutral', className }: KpiCardProps) {
  return (
    <Card
      className={clsx(
        'insights-fade-in border-border/70 bg-background/90 transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent/70 focus-within:-translate-y-0.5',
        className
      )}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground/80">{title}</CardTitle>
          {icon ? <span className="rounded-full border border-border/60 bg-muted/40 p-2 text-muted-foreground">{icon}</span> : null}
        </div>
        <div className={clsx('text-3xl font-semibold leading-tight', toneMap[tone])}>{value}</div>
        {description ? <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription> : null}
      </CardHeader>
    </Card>
  );
}
