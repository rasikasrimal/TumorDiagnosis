import type { DatasetRow } from '@/types/data';

/**
 * Removes rows that are completely empty and normalises field names.
 */
export function cleanDataset(rows: DatasetRow[]): DatasetRow[] {
  return rows
    .map((row) => normalizeKeys(row))
    .filter((row) => Object.values(row).some((value) => value !== null && value !== ''));
}

function normalizeKeys(row: DatasetRow): DatasetRow {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [key.trim().replace(/\s+/g, '_').toLowerCase(), value])
  );
}

export function detectNumericFields(rows: DatasetRow[]): string[] {
  if (!rows.length) return [];
  const firstRow = rows[0];
  return Object.keys(firstRow).filter((key) => rows.every((row) => typeof row[key] === 'number' || row[key] === null));
}

export function countMissingValues(rows: DatasetRow[]): number {
  return rows.reduce((acc, row) => {
    return (
      acc +
      Object.values(row).reduce((rowAcc, value) => {
        return rowAcc + (value === null || value === '' ? 1 : 0);
      }, 0)
    );
  }, 0);
}
