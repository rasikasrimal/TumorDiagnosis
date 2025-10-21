import type { DatasetKpis, DatasetRow } from '@/types/data';
import { countMissingValues, detectNumericFields } from '@/lib/data-cleaning';

export function computeKpis(rows: DatasetRow[]): DatasetKpis {
  const numericFields = detectNumericFields(rows);
  return {
    totalRows: rows.length,
    numericColumns: numericFields.length,
    missingValues: countMissingValues(rows),
    lastUpdated: new Date().toISOString()
  };
}
