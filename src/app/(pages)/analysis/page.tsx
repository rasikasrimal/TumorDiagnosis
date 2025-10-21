import { ChartsClient } from '@/components/charts-client';
import { SparklesIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';

export default function AnalysisPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-4 rounded-3xl border border-border/60 bg-background/80 p-6 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Visual analytics</p>
            <h1 className="mt-1 text-3xl font-semibold">Analysis</h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            <SparklesIcon className="h-4 w-4" aria-hidden />
            Auto-refreshed KPIs
          </span>
        </div>
        <p className="max-w-3xl text-base text-muted-foreground">
          Compare trends, correlations, and geographic patterns in a single dashboard. Charts respond instantly to dataset changes, ensuring reliable storytelling.
        </p>
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <PresentationChartLineIcon className="h-4 w-4" aria-hidden />
          <span>Time series · Distribution · Scatter</span>
        </div>
      </header>
      <ChartsClient />
    </div>
  );
}
