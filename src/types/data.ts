export interface DatasetRecord {
  id: string;
  name: string;
  uploadedAt: string;
  fields: string[];
  rowCount: number;
  sample: DatasetRow[];
  data: DatasetRow[];
  numericFields: string[];
  kpis: DatasetKpis;
  geoPoints: GeoPoint[];
}

export type DatasetRow = Record<string, string | number | boolean | null>;

export interface DatasetKpis {
  totalRows: number;
  numericColumns: number;
  missingValues: number;
  lastUpdated: string;
}

export interface ChartPoint {
  [key: string]: string | number | null;
}

export interface ScatterPoint {
  [key: string]: number;
}

export interface HeatmapPoint {
  xIndex: number;
  yIndex: number;
  value: number;
}

export interface GeoPoint {
  id: string;
  latitude: number;
  longitude: number;
  label?: string;
}

export interface NotebookRecord {
  id: string;
  name: string;
  uploadedAt: string;
  cells: NotebookCell[];
}

export type NotebookCell =
  | {
      id?: string;
      type: 'markdown';
      source: string[];
      html?: string;
    }
  | {
      id?: string;
      type: 'code';
      source: string[];
      language?: string;
      outputs?: NotebookOutput[];
    };

export type NotebookOutput =
  | {
      type: 'stream';
      text: string;
    }
  | {
      type: 'error';
      traceback?: string[];
    }
  | {
      type: 'display_data' | 'execute_result';
      html?: string;
      text?: string;
    };
