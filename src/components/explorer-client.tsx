'use client';

import { useState } from 'react';
import { useDatasets } from '@/hooks/use-datasets';
import { DataTable } from '@/components/data-table';
import { EmptyState } from '@/components/empty-state';

export function ExplorerClient() {
  const { datasets, isLoading, error } = useDatasets();
  const [activeId, setActiveId] = useState<string | undefined>(() => datasets[0]?.id);
  const dataset = datasets.find((entry) => entry.id === activeId) ?? datasets[0];

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-2xl border border-border/60 bg-muted/40" />;
  }

  if (error) {
    return <EmptyState title="Failed to load datasets" description={error.message} />;
  }

  if (!dataset) {
    return <EmptyState title="No datasets yet" description="Upload data to explore rows and fields." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">Dataset explorer</h2>
          <p className="text-sm text-muted-foreground">Interact with raw rows. Sorting and filtering happen client-side for quick iteration.</p>
        </div>
        <select
          value={dataset.id}
          onChange={(event) => setActiveId(event.target.value)}
          className="w-full rounded-md border border-border/60 bg-background/60 px-3 py-2 text-sm backdrop-blur focus:outline-none focus:ring-2 focus:ring-ring/60 sm:w-64"
        >
          {datasets.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-background/70 p-4 backdrop-blur">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Rows</p>
          <p className="text-lg font-semibold">{dataset.rowCount.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/70 p-4 backdrop-blur">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Fields</p>
          <p className="text-lg font-semibold">{dataset.fields.length}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/70 p-4 backdrop-blur">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Uploaded</p>
          <p className="text-lg font-semibold">{new Date(dataset.uploadedAt).toLocaleString()}</p>
        </div>
      </div>

      <DataTable data={dataset.data} />
    </div>
  );
}
