import { ChartsClient } from '@/components/charts-client';

export default function ChartsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3 rounded-3xl border border-border/60 bg-background/70 p-6 backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Visual Analytics</p>
          <h1 className="mt-1 text-3xl font-semibold">Charts</h1>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Visualise uploaded datasets with responsive charts. The server normalises and validates data before streaming to these components so you can trust what you see.
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1">Multi-series ready</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1">Geospatial awareness</span>
        </div>
      </header>
      <ChartsClient />
    </div>
  );
}
