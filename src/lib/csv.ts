import { parse } from 'csv-parse/sync';
import type { DatasetRow } from '@/types/data';

/**
 * Parses CSV content into a collection of rows while trimming headers and
 * coercing numeric values where possible.
 */
export function parseCsv(content: string): DatasetRow[] {
  const records = parse(content, {
    columns: true,
    skipEmptyLines: true,
    trim: true
  }) as Record<string, string>[];

  return records.map((record) => {
    return Object.fromEntries(
      Object.entries(record).map(([key, value]) => [key, coerceValue(value)])
    );
  });
}

function coerceValue(value: string | null): string | number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const numeric = Number(value);
  if (!Number.isNaN(numeric) && value.trim() !== '') {
    return numeric;
  }
  return value;
}
