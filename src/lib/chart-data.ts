import type { DatasetRow, HeatmapPoint, GeoPoint, ChartPoint, ScatterPoint } from '@/types/data';

interface LineChartConfig {
  xKey: string;
  series: string[];
  points: ChartPoint[];
}

interface BarChartConfig {
  xKey: string;
  series: string[];
  points: ChartPoint[];
}

interface ScatterChartConfig {
  xKey: string;
  yKey: string;
  sizeKey?: string;
  points: ScatterPoint[];
}

interface HeatmapConfig {
  xCategories: string[];
  yCategories: string[];
  points: HeatmapPoint[];
}

export function buildLineChart(rows: DatasetRow[]): LineChartConfig | null {
  if (!rows.length) return null;
  const keys = Object.keys(rows[0]);
  const temporalKey = inferTemporalKey(rows) ?? keys[0];
  const numericKeys = keys.filter((key) => rows.every((row) => typeof row[key] === 'number' || row[key] === null)).slice(0, 3);
  if (!numericKeys.length) return null;
  const points = rows.map((row, index) => ({
    index,
    [temporalKey]: row[temporalKey] ?? index,
    ...numericKeys.reduce((acc, key) => ({ ...acc, [key]: row[key] ?? 0 }), {})
  }));
  return { xKey: temporalKey, series: numericKeys, points };
}

export function buildBarChart(rows: DatasetRow[]): BarChartConfig | null {
  if (!rows.length) return null;
  const keys = Object.keys(rows[0]);
  const categoricalKey = keys.find((key) => rows.some((row) => typeof row[key] === 'string')) ?? keys[0];
  const numericKey = keys.find((key) => typeof rows[0][key] === 'number');
  if (!categoricalKey || !numericKey) return null;

  const aggregated = new Map<string, { total: number; count: number }>();
  rows.forEach((row) => {
    const category = String(row[categoricalKey] ?? 'unknown');
    const value = typeof row[numericKey] === 'number' ? (row[numericKey] as number) : 0;
    const entry = aggregated.get(category) ?? { total: 0, count: 0 };
    aggregated.set(category, { total: entry.total + value, count: entry.count + 1 });
  });

  const points = Array.from(aggregated.entries()).map(([category, { total, count }]) => ({
    [categoricalKey]: category,
    average: count ? total / count : 0
  }));

  return { xKey: categoricalKey, series: ['average'], points };
}

export function buildScatterChart(rows: DatasetRow[]): ScatterChartConfig | null {
  if (!rows.length) return null;
  const numericKeys = Object.keys(rows[0]).filter((key) => rows.every((row) => typeof row[key] === 'number'));
  if (numericKeys.length < 2) return null;
  const [xKey, yKey, sizeKey] = numericKeys;
  const points = rows
    .filter((row) => typeof row[xKey] === 'number' && typeof row[yKey] === 'number')
    .map((row) => ({
      [xKey]: row[xKey] as number,
      [yKey]: row[yKey] as number,
      ...(sizeKey ? { [sizeKey]: typeof row[sizeKey] === 'number' ? (row[sizeKey] as number) : undefined } : {})
    }));
  return { xKey, yKey, sizeKey, points };
}

export function buildHeatmap(rows: DatasetRow[]): HeatmapConfig | null {
  if (!rows.length) return null;
  const keys = Object.keys(rows[0]);
  const categoricalKeys = keys.filter((key) => rows.some((row) => typeof row[key] === 'string'));
  if (categoricalKeys.length < 2) return null;
  const [xKey, yKey] = categoricalKeys;
  const counts = new Map<string, number>();

  rows.forEach((row) => {
    const x = String(row[xKey] ?? 'unknown');
    const y = String(row[yKey] ?? 'unknown');
    const key = `${x}::${y}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  const xCategories = Array.from(new Set(rows.map((row) => String(row[xKey] ?? 'unknown'))));
  const yCategories = Array.from(new Set(rows.map((row) => String(row[yKey] ?? 'unknown'))));

  const points: HeatmapPoint[] = [];
  xCategories.forEach((x, xi) => {
    yCategories.forEach((y, yi) => {
      const key = `${x}::${y}`;
      points.push({ xIndex: xi, yIndex: yi, value: counts.get(key) ?? 0 });
    });
  });

  return { xCategories, yCategories, points };
}

export function extractGeoPoints(rows: DatasetRow[]): GeoPoint[] {
  if (!rows.length) return [];
  const latKey = Object.keys(rows[0]).find((key) => key.includes('lat'));
  const lonKey = Object.keys(rows[0]).find((key) => key.includes('lon')) ??
    Object.keys(rows[0]).find((key) => key.includes('lng'));
  if (!latKey || !lonKey) return [];
  return rows
    .filter((row) => typeof row[latKey] === 'number' && typeof row[lonKey] === 'number')
    .map((row, index) => ({
      id: `point-${index}`,
      latitude: row[latKey] as number,
      longitude: row[lonKey] as number,
      label: typeof row['name'] === 'string' ? (row['name'] as string) : undefined
    }));
}

function inferTemporalKey(rows: DatasetRow[]): string | null {
  const keys = Object.keys(rows[0]);
  for (const key of keys) {
    if (key.includes('date') || key.includes('time')) {
      return key;
    }
  }
  for (const key of keys) {
    const value = rows[0][key];
    if (typeof value === 'string' && !Number.isNaN(Date.parse(value))) {
      return key;
    }
  }
  return null;
}
