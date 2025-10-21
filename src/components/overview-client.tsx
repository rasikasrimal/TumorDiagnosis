'use client';

import { useDatasets } from '@/hooks/use-datasets';
import { UploadDatasetForm } from '@/components/upload-dataset-form';
import { KpiCard } from '@/components/cards/kpi-card';
import { SummaryCard } from '@/components/cards/summary-card';
import { EmptyState } from '@/components/empty-state';
import { ArrowPathIcon, TableCellsIcon } from '@heroicons/react/24/outline';

export function OverviewClient() {
  const { datasets, isLoading, error, refresh } = useDatasets();
  const primaryDataset = datasets[0];

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-2xl border border-border/60 bg-muted/40" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Failed to load datasets"
        description={error.message}
        action={
          <button onClick={() => refresh()} className="rounded-full border border-border/60 px-3 py-2 text-sm hover:bg-muted/40">
            Retry
          </button>
        }
      />
    );
  }

  if (!primaryDataset) {
    return (
      <div className="space-y-6">
        <EmptyState
          title="Upload your first dataset"
          description="Import CSV or JSON data to unlock charting, table exploration, and derived KPIs."
        />
        <UploadDatasetForm onComplete={() => refresh()} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Rows"
          value={primaryDataset.kpis.totalRows.toLocaleString()}
          changeLabel="Numeric columns"
          changeValue={primaryDataset.kpis.numericColumns.toString()}
          icon={<TableCellsIcon className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="Missing values"
          value={primaryDataset.kpis.missingValues.toLocaleString()}
          changeLabel="Last refresh"
          changeValue={new Date(primaryDataset.kpis.lastUpdated).toLocaleString()}
        />
        <KpiCard
          title="Fields"
          value={primaryDataset.fields.length.toString()}
          changeLabel="Geo features"
          changeValue={primaryDataset.geoPoints.length.toString()}
        />
        <KpiCard
          title="Datasets"
          value={datasets.length.toString()}
          changeLabel="Latest upload"
          changeValue={new Date(primaryDataset.uploadedAt).toLocaleDateString()}
          icon={<ArrowPathIcon className="h-5 w-5 text-muted-foreground" />}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <SummaryCard
          title="Active dataset"
          description={`Currently highlighting ${primaryDataset.name} with ${primaryDataset.rowCount.toLocaleString()} rows. Use the explorer to pivot through fields or refresh with a new upload.`}
          action={
            <button className="rounded-full border border-border/60 px-3 py-2 text-sm transition-colors hover:bg-muted/40" onClick={() => refresh()}>
              Refresh data
            </button>
          }
        />
        <SummaryCard
          title="Upload new dataset"
          description="Kick off a new analysis run by importing structured CSV or JSON files. All parsing happens server-side before streaming to the client."
          action={<UploadDatasetForm onComplete={() => refresh()} />}
        />
        <SummaryCard
          title="Next steps"
          description="Review charts, interrogate tables, and annotate notebooks. Authentication hooks are ready for integration with your identity provider."
        />
      </section>

      <section className="space-y-3 rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold">Available datasets</h3>
            <p className="text-sm text-muted-foreground">Switch between uploaded datasets on the charts and explorer pages.</p>
          </div>
          <button
            type="button"
            onClick={() => refresh()}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-2 text-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-ring/60"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Refresh
          </button>
        </header>
        <ul className="space-y-3">
          {datasets.map((dataset) => (
            <li key={dataset.id} className="rounded-2xl border border-border/60 bg-background/80 px-4 py-3 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{dataset.name}</p>
                  <p className="text-xs text-muted-foreground">{dataset.rowCount.toLocaleString()} rows • {dataset.fields.length} fields</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  Uploaded {new Date(dataset.uploadedAt).toLocaleString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
