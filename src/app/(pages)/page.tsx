import { OverviewClient } from '@/components/overview-client';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-6 backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Workspace</p>
          <h1 className="mt-1 text-3xl font-semibold">Overview</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Upload datasets, monitor KPIs, and jump into deeper analysis. All uploads are processed on the server with type-safe utilities so your dashboards stay reliable.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
            Live pipeline
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden />
            KPI snapshots
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
            Notebook playback
          </span>
        </div>
      </header>
      <OverviewClient />
    </div>
  );
}
