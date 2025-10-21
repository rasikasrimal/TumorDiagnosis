import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import type { DatasetRecord, NotebookRecord } from '@/types/data';
import { parseCsv } from '@/lib/csv';
import { cleanDataset, detectNumericFields } from '@/lib/data-cleaning';
import { computeKpis } from '@/lib/kpis';
import { extractGeoPoints } from '@/lib/chart-data';
import { parseNotebookFile } from '@/lib/notebook';

interface DataStoreShape {
  datasets: Map<string, DatasetRecord>;
  notebooks: Map<string, NotebookRecord>;
}

declare global {
  // eslint-disable-next-line no-var
  var __INSIGHTS_STORE__: DataStoreShape | undefined;
}

const store: DataStoreShape = globalThis.__INSIGHTS_STORE__ ?? {
  datasets: new Map<string, DatasetRecord>(),
  notebooks: new Map<string, NotebookRecord>()
};

if (!globalThis.__INSIGHTS_STORE__) {
  globalThis.__INSIGHTS_STORE__ = store;
}

let seeded = false;

function seedDataIfNeeded() {
  if (seeded) {
    return;
  }

  try {
    if (store.datasets.size === 0) {
      const datasetPath = path.join(process.cwd(), 'data', 'data.csv');
      if (existsSync(datasetPath)) {
        const source = readFileSync(datasetPath, 'utf-8');
        const rows = cleanDataset(parseCsv(source));
        if (rows.length) {
          const stats = statSync(datasetPath);
          const uploadedAt = stats.mtime.toISOString();
          const numericFields = detectNumericFields(rows);
          const kpis = computeKpis(rows);
          const dataset: DatasetRecord = {
            id: 'seed-dataset',
            name: 'data.csv',
            uploadedAt,
            fields: Object.keys(rows[0]),
            rowCount: rows.length,
            sample: rows.slice(0, 20),
            data: rows,
            numericFields,
            kpis: { ...kpis, lastUpdated: uploadedAt },
            geoPoints: extractGeoPoints(rows)
          };
          store.datasets.set(dataset.id, dataset);
        }
      }
    }

    if (store.notebooks.size === 0) {
      const notebookPath = path.join(process.cwd(), 'Learner_Notebook.ipynb');
      if (existsSync(notebookPath)) {
        const source = readFileSync(notebookPath, 'utf-8');
        const stats = statSync(notebookPath);
        const uploadedAt = stats.mtime.toISOString();
        const notebook: NotebookRecord = {
          id: 'seed-notebook',
          name: 'Learner Notebook.ipynb',
          uploadedAt,
          cells: parseNotebookFile(source)
        };
        store.notebooks.set(notebook.id, notebook);
      }
    }
  } catch (error) {
    console.error('Failed to seed initial workspace data', error);
  } finally {
    seeded = true;
  }
}

export function saveDataset(record: DatasetRecord) {
  store.datasets.set(record.id, record);
}

export function listDatasets(): DatasetRecord[] {
  seedDataIfNeeded();
  return Array.from(store.datasets.values()).sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
}

export function getDataset(id: string): DatasetRecord | undefined {
  seedDataIfNeeded();
  return store.datasets.get(id);
}

export function saveNotebook(record: NotebookRecord) {
  store.notebooks.set(record.id, record);
}

export function listNotebooks(): NotebookRecord[] {
  seedDataIfNeeded();
  return Array.from(store.notebooks.values()).sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
}

export function getNotebook(id: string): NotebookRecord | undefined {
  seedDataIfNeeded();
  return store.notebooks.get(id);
}
