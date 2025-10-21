'use client';

import { useState } from 'react';
import { useDatasets } from '@/hooks/use-datasets';
import { LineChartCard } from '@/components/charts/line-chart';
import { BarChartCard } from '@/components/charts/bar-chart';
import { ScatterChartCard } from '@/components/charts/scatter-chart';
import { HeatmapChart } from '@/components/charts/heatmap-chart';
import { MapChart } from '@/components/charts/map-chart';
import { buildLineChart, buildBarChart, buildScatterChart, buildHeatmap, extractGeoPoints } from '@/lib/chart-data';
import { EmptyState } from '@/components/empty-state';

export function ChartsClient() {
  const { datasets, isLoading, error } = useDatasets();
  const [activeId, setActiveId] = useState<string | undefined>(() => datasets[0]?.id);
  const dataset = datasets.find((entry) => entry.id === activeId) ?? datasets[0];

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-2xl border border-border/60 bg-muted/40" />;
  }

  if (error) {
    return <EmptyState title="Failed to load charts" description={error.message} />;
  }

  if (!dataset) {
    return <EmptyState title="No datasets" description="Upload a dataset on the overview page to unlock visualisations." />;
  }

  const line = buildLineChart(dataset.data);
  const bar = buildBarChart(dataset.data);
  const scatter = buildScatterChart(dataset.data);
  const heatmap = buildHeatmap(dataset.data);
  const geo = extractGeoPoints(dataset.data);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">Dataset selection</h2>
          <p className="text-sm text-muted-foreground">Choose an uploaded dataset to drive the charts below.</p>
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

      <div className="grid gap-6 xl:grid-cols-2">
        {line ? (
          <LineChartCard
            data={line.points}
            xKey={line.xKey}
            lineKeys={line.series}
            title="Trend analysis"
            description="Multi-series line chart built from numeric columns."
          />
        ) : (
          <EmptyState title="Line chart unavailable" description="Need at least one numeric column to plot trends." />
        )}
        {bar ? (
          <BarChartCard
            data={bar.points}
            xKey={bar.xKey}
            barKeys={bar.series}
            title="Category distribution"
            description="Average value per category across the dataset."
          />
        ) : (
          <EmptyState title="Bar chart unavailable" description="Requires a categorical and numeric column." />
        )}
        {scatter ? (
          <ScatterChartCard
            data={scatter.points}
            xKey={scatter.xKey}
            yKey={scatter.yKey}
            sizeKey={scatter.sizeKey}
            title="Scatter correlations"
            description="Plot pairwise relationships across numeric columns."
          />
        ) : (
          <EmptyState title="Scatter chart unavailable" description="Provide at least two numeric columns." />
        )}
        {heatmap ? (
          <HeatmapChart
            data={heatmap.points}
            xCategories={heatmap.xCategories}
            yCategories={heatmap.yCategories}
            title="Heatmap density"
            description="Cross-tabulate two categorical columns to reveal density patterns."
          />
        ) : (
          <EmptyState title="Heatmap unavailable" description="Requires two categorical fields." />
        )}
        {geo.length ? (
          <MapChart
            points={geo}
            title="Geospatial coverage"
            description="Visualise latitude and longitude points if supplied."
          />
        ) : (
          <EmptyState title="Map unavailable" description="Include latitude and longitude columns to enable mapping." />
        )}
      </div>
    </div>
  );
}
