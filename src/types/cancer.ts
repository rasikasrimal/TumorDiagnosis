export type Diagnosis = "M" | "B";

export type CancerRow = {
  id: string;
  diagnosis: Diagnosis;
  [feature: string]: string | number;
};

export type FeatureName = Exclude<keyof CancerRow, "id" | "diagnosis"> extends string
  ? Exclude<keyof CancerRow, "id" | "diagnosis">
  : string;

export type CancerDatasetSummary = {
  total: number;
  malignant: number;
  benign: number;
  features: string[];
};
