"use client";

import { create } from "zustand";

export type DiagnosisFilter = "All" | "Benign" | "Malignant";

type FiltersState = {
  selectedFeatures: string[];
  diagnosisFilter: DiagnosisFilter;
  standardize: boolean;
  search: string;
  setFeatures: (features: string[]) => void;
  setDiagnosis: (diagnosis: DiagnosisFilter) => void;
  setStandardize: (value: boolean) => void;
  setSearch: (value: string) => void;
  reset: () => void;
};

const initialState = {
  selectedFeatures: [] as string[],
  diagnosisFilter: "All" as DiagnosisFilter,
  standardize: false,
  search: ""
};

export const useFilters = create<FiltersState>((set) => ({
  ...initialState,
  setFeatures: (features) => set(() => ({ selectedFeatures: features })),
  setDiagnosis: (diagnosis) => set(() => ({ diagnosisFilter: diagnosis })),
  setStandardize: (value) => set(() => ({ standardize: value })),
  setSearch: (value) => set(() => ({ search: value })),
  reset: () => set(() => ({ ...initialState }))
}));
