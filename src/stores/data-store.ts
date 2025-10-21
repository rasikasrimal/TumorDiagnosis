import type { DatasetRecord, NotebookRecord } from '@/types/data';

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

export function saveDataset(record: DatasetRecord) {
  store.datasets.set(record.id, record);
}

export function listDatasets(): DatasetRecord[] {
  return Array.from(store.datasets.values()).sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
}

export function getDataset(id: string): DatasetRecord | undefined {
  return store.datasets.get(id);
}

export function saveNotebook(record: NotebookRecord) {
  store.notebooks.set(record.id, record);
}

export function listNotebooks(): NotebookRecord[] {
  return Array.from(store.notebooks.values()).sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
}

export function getNotebook(id: string): NotebookRecord | undefined {
  return store.notebooks.get(id);
}
