'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDatasets } from '@/hooks/use-datasets';
import { useNotebooks } from '@/hooks/use-notebooks';
import { UploadDatasetForm } from '@/components/upload-dataset-form';
import { KpiCard } from '@/components/cards/kpi-card';
import { EmptyState } from '@/components/empty-state';
import {
  ArrowPathIcon,
  ChartBarIcon,
  CircleStackIcon,
  ClockIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ACTIVE_DATASET_STORAGE_KEY = 'insights-active-dataset';
const COMPACT_MODE_STORAGE_KEY = 'insights-compact-mode';

export function OverviewClient() {
  const { datasets, isLoading, error, refresh } = useDatasets();
  const { notebooks, isLoading: notebooksLoading, error: notebooksError } = useNotebooks();
  const { toast } = useToast();
  const [activeDatasetId, setActiveDatasetId] = useState<string | null>(null);
  const [compactMode, setCompactMode] = useState(false);
  const [datasetQuery, setDatasetQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedDataset = window.localStorage.getItem(ACTIVE_DATASET_STORAGE_KEY);
    const storedCompact = window.localStorage.getItem(COMPACT_MODE_STORAGE_KEY);
    if (storedDataset) {
      setActiveDatasetId(storedDataset);
    }
    if (storedCompact) {
      setCompactMode(storedCompact === 'true');
    }
  }, []);

  useEffect(() => {
    if (!datasets.length) {
      return;
    }
    setActiveDatasetId((current) => {
      if (current && datasets.some((dataset) => dataset.id === current)) {
        return current;
      }
      return datasets[0]?.id ?? null;
    });
  }, [datasets]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (activeDatasetId) {
      window.localStorage.setItem(ACTIVE_DATASET_STORAGE_KEY, activeDatasetId);
    }
  }, [activeDatasetId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(COMPACT_MODE_STORAGE_KEY, compactMode ? 'true' : 'false');
  }, [compactMode]);

  const activeDataset = datasets.find((dataset) => dataset.id === activeDatasetId) ?? datasets[0];
  const lastRefreshedText = activeDataset?.kpis.lastUpdated
    ? new Date(activeDataset.kpis.lastUpdated).toLocaleString()
    : 'Awaiting first upload';

  const filteredDatasets = useMemo(() => {
    const search = datasetQuery.trim().toLowerCase();
    if (!search) {
      return datasets;
    }
    return datasets.filter((dataset) => dataset.name.toLowerCase().includes(search));
  }, [datasets, datasetQuery]);

  async function handleRefreshClick(showToast = true) {
    try {
      setRefreshing(true);
      await refresh();
      if (showToast) {
        toast({ title: 'Datasets refreshed', description: 'Latest metrics and uploads are synced.', variant: 'success' });
      }
    } catch (refreshError) {
      toast({
        title: 'Refresh failed',
        description:
          refreshError instanceof Error ? refreshError.message : 'Unable to refresh datasets at the moment.',
        variant: 'warning'
      });
    } finally {
      setRefreshing(false);
    }
  }

  function handleSetActiveDataset(id: string) {
    setActiveDatasetId(id);
    const dataset = datasets.find((entry) => entry.id === id);
    if (dataset) {
      toast({ title: 'Active dataset updated', description: `${dataset.name} is now highlighted for analysis.`, variant: 'success' });
    }
  }

  function toggleCompactMode() {
    setCompactMode((current) => !current);
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-40 animate-pulse rounded-3xl border border-border/60 bg-muted/40" />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-32 animate-pulse rounded-2xl border border-border/60 bg-muted/40" />
              ))}
            </div>
            <div className="h-64 animate-pulse rounded-2xl border border-border/60 bg-muted/40" />
            <div className="h-72 animate-pulse rounded-2xl border border-border/60 bg-muted/40" />
          </div>
          <div className="space-y-6">
            <div className="h-64 animate-pulse rounded-2xl border border-border/60 bg-muted/40" />
            <div className="h-48 animate-pulse rounded-2xl border border-border/60 bg-muted/40" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Failed to load datasets"
        description={error.message}
        action={
          <button
            type="button"
            onClick={() => void handleRefreshClick()}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Retry
          </button>
        }
      />
    );
  }

  const stackSpacing = compactMode ? 'space-y-4' : 'space-y-6';
  const gridGap = compactMode ? 'gap-4' : 'gap-6';
  const cardGap = compactMode ? 'gap-3' : 'gap-4';
  const notebook = notebooks[0];

  return (
    <div className="space-y-6">
      <header className="space-y-4 rounded-3xl border border-border/60 bg-background/80 p-6 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Workspace</p>
            <h1 className="mt-1 text-3xl font-semibold">Insights Studio</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <ClockIcon className="h-4 w-4" />
            <span>Last refreshed: {lastRefreshedText}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li className="font-medium text-foreground">Overview</li>
              <li aria-hidden>›</li>
              <li>{activeDataset ? activeDataset.name : 'No dataset selected'}</li>
            </ol>
          </nav>
          <button
            type="button"
            onClick={toggleCompactMode}
            aria-pressed={compactMode}
            className={clsx(
              'inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2 text-sm font-medium transition-colors',
              'hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
            )}
          >
            <Cog6ToothIcon className="h-4 w-4" />
            {compactMode ? 'Compact mode enabled' : 'Compact mode'}
          </button>
        </div>
        <p className="max-w-3xl text-base text-muted-foreground">
          Upload datasets, monitor KPIs, and jump into deeper analysis. All uploads stay in-memory and are validated for fast, repeatable insights.
        </p>
      </header>

      {!activeDataset ? (
        <div className={clsx('grid', gridGap, 'xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]')}>
          <div className={clsx('space-y-6', stackSpacing)}>
            <EmptyState
              title="Upload your first dataset"
              description="Import CSV or JSON data to unlock charting, table exploration, and derived KPIs."
            />
            <UploadDatasetForm onComplete={() => void handleRefreshClick(false)} />
          </div>
          <aside className={clsx('space-y-6', stackSpacing)}>
            <Card className="insights-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Workflow tips</CardTitle>
                <CardDescription>
                  Upload a dataset to enable the charts, explorer, and notebook playback panels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Use the drag-and-drop zone to add CSV or JSON files. Each upload remains private to this workspace.</p>
                <p>Once processed, explore summaries on this page, pivot rows in Datasets, and replay notebooks under Analysis.</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      ) : (
        <div className={clsx('grid', gridGap, 'xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]')}>
          <div className={clsx('space-y-6', stackSpacing)}>
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Key metrics</h2>
                <SparklesIcon className="h-5 w-5 text-muted-foreground" aria-hidden />
              </div>
              <div className={clsx('grid grid-cols-2 md:grid-cols-4', compactMode ? 'gap-3' : 'gap-4')}>
                <KpiCard
                  title="Rows"
                  value={activeDataset.kpis.totalRows.toLocaleString()}
                  description={`${activeDataset.fields.length} total fields`}
                  icon={<CircleStackIcon className="h-4 w-4" aria-hidden />}
                />
                <KpiCard
                  title="Numeric columns"
                  value={activeDataset.kpis.numericColumns.toString()}
                  description={`${activeDataset.numericFields.length} profiled metrics`}
                  icon={<ChartBarIcon className="h-4 w-4" aria-hidden />}
                />
                <KpiCard
                  title="Missing values"
                  value={activeDataset.kpis.missingValues.toLocaleString()}
                  description={
                    activeDataset.kpis.missingValues === 0
                      ? 'Healthy dataset'
                      : 'Consider cleaning before analysis'
                  }
                  tone={activeDataset.kpis.missingValues === 0 ? 'success' : 'warning'}
                  icon={<ExclamationTriangleIcon className="h-4 w-4" aria-hidden />}
                />
                <KpiCard
                  title="Datasets"
                  value={datasets.length.toString()}
                  description={`Latest upload: ${new Date(activeDataset.uploadedAt).toLocaleDateString()}`}
                  icon={<TableCellsIcon className="h-4 w-4" aria-hidden />}
                />
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">Dataset overview</h2>
                <button
                  type="button"
                  onClick={() => void handleRefreshClick()}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ArrowPathIcon className={clsx('h-4 w-4', refreshing ? 'animate-spin' : undefined)} aria-hidden />
                  Refresh
                </button>
              </div>
              <Card className="insights-fade-in">
                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl font-semibold">Active dataset</CardTitle>
                  <CardDescription>
                    Currently highlighting <span className="font-medium text-foreground">{activeDataset.name}</span> with{' '}
                    {activeDataset.rowCount.toLocaleString()} rows. Use the Datasets tab to interrogate fields or pivot rows.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-3">
                    <p className="text-xs font-medium uppercase text-muted-foreground">Geo features</p>
                    <p className="mt-2 text-sm text-foreground">{activeDataset.geoPoints.length}</p>
                  </div>
                  <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-3">
                    <p className="text-xs font-medium uppercase text-muted-foreground">Sample size</p>
                    <p className="mt-2 text-sm text-foreground">{activeDataset.sample.length} preview rows</p>
                  </div>
                  <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-3">
                    <p className="text-xs font-medium uppercase text-muted-foreground">Last updated</p>
                    <p className="mt-2 text-sm text-foreground">{lastRefreshedText}</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className={clsx('grid', 'lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]', compactMode ? 'gap-3' : 'gap-4')}>
              <UploadDatasetForm
                onComplete={() => void handleRefreshClick(false)}
                lastUpload={{
                  name: activeDataset.name,
                  rowCount: activeDataset.rowCount,
                  fieldCount: activeDataset.fields.length,
                  refreshedAt: activeDataset.kpis.lastUpdated
                }}
              />
              <div className="space-y-4">
                <Card className="insights-fade-in">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Next steps</CardTitle>
                    <CardDescription>Keep momentum with these recommended follow-ups.</CardDescription>
                  </CardHeader>
                  <CardContent className={clsx('grid md:grid-cols-3', cardGap)}>
                    {[
                      {
                        title: 'Review charts',
                        description: 'Explore visual dashboards and KPIs',
                        icon: <ChartBarIcon className="h-5 w-5" aria-hidden />
                      },
                      {
                        title: 'Interrogate tables',
                        description: 'Drill into record-level data',
                        icon: <TableCellsIcon className="h-5 w-5" aria-hidden />
                      },
                      {
                        title: 'Annotate notebooks',
                        description: 'Document and share insights',
                        icon: <DocumentTextIcon className="h-5 w-5" aria-hidden />
                      }
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground transition-colors hover:bg-muted/20"
                      >
                        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground">
                          {item.icon}
                        </div>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="pt-3">
                    <a
                      href="/analysis"
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Continue analysis
                      <SparklesIcon className="h-4 w-4" aria-hidden />
                    </a>
                  </CardFooter>
                </Card>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">Available datasets</h2>
                  <p className="text-base text-muted-foreground">Search, refresh, or mark a dataset as the active workspace.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-accent">
                    <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" aria-hidden />
                    <input
                      value={datasetQuery}
                      onChange={(event) => setDatasetQuery(event.target.value)}
                      placeholder="Search datasets"
                      className="w-40 bg-transparent text-sm outline-none"
                      aria-label="Search datasets"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => void handleRefreshClick()}
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <ArrowPathIcon className={clsx('h-4 w-4', refreshing ? 'animate-spin' : undefined)} aria-hidden />
                    Refresh
                  </button>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left font-medium">Dataset</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium">Rows</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium">Fields</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium">Uploaded</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDatasets.length ? (
                      filteredDatasets.map((dataset) => {
                        const isActive = activeDataset?.id === dataset.id;
                        return (
                          <tr
                            key={dataset.id}
                            className={clsx(
                              'border-t border-border/60 text-sm transition-colors hover:bg-muted/30',
                              isActive && 'bg-accent/10'
                            )}
                          >
                            <td className="px-4 py-3 text-sm font-medium text-foreground">{dataset.name}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{dataset.rowCount.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{dataset.fields.length}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {new Date(dataset.uploadedAt).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {isActive ? (
                                <span className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                                  Active
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleSetActiveDataset(dataset.id)}
                                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                >
                                  Set active
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-sm text-muted-foreground">
                          No datasets match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className={clsx('space-y-6', stackSpacing)}>
            <Card className="insights-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Field insights</CardTitle>
                <CardDescription>Understand the feature mix within {activeDataset.name}.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-3">
                  <p className="text-xs font-medium uppercase text-muted-foreground">Numeric coverage</p>
                  <p className="mt-2 text-sm text-foreground">
                    {activeDataset.numericFields.length} numeric fields (
                    {Math.round((activeDataset.numericFields.length / Math.max(activeDataset.fields.length, 1)) * 100)}%)
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">Key fields</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeDataset.fields.slice(0, 8).map((field) => (
                      <span
                        key={field}
                        className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {field}
                      </span>
                    ))}
                    {activeDataset.fields.length > 8 ? (
                      <span className="text-xs text-muted-foreground">+ {activeDataset.fields.length - 8} more</span>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="insights-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Notebook playback</CardTitle>
                <CardDescription>Quick glance at the most recent executed notebook.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {notebooksLoading ? (
                  <div className="h-32 animate-pulse rounded-xl border border-border/60 bg-muted/30" />
                ) : notebooksError ? (
                  <p className="text-destructive">{notebooksError.message}</p>
                ) : notebook ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{notebook.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded {new Date(notebook.uploadedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-3">
                      <p className="text-xs font-medium uppercase text-muted-foreground">Preview</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {notebook.cells.slice(0, 2).map((cell) => cell.type).join(' · ')}
                      </p>
                    </div>
                    <a
                      href="/analysis"
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Open in notebooks
                      <DocumentTextIcon className="h-4 w-4" aria-hidden />
                    </a>
                  </div>
                ) : (
                  <p>No notebooks uploaded yet. Add one from the Analysis tab to replay code and outputs.</p>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}
