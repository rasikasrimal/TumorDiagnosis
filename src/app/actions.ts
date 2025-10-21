"use server";

import { getCancerData } from "@/lib/csv";
import type { CancerRow } from "@/types/cancer";

export type FetchFilters = {
  diagnosis?: "All" | "Benign" | "Malignant";
  search?: string;
  features?: string[];
};

export async function fetchFilteredRows({ diagnosis = "All", search = "", features = [] }: FetchFilters) {
  const rows = await getCancerData();
  const normalizedSearch = search.toLowerCase();
  return rows.filter((row) => {
    const matchesDiagnosis =
      diagnosis === "All" || (diagnosis === "Benign" ? row.diagnosis === "B" : row.diagnosis === "M");
    if (!matchesDiagnosis) return false;
    if (!normalizedSearch) return true;
    if (row.id.toLowerCase().includes(normalizedSearch)) return true;
    return features.some((feature) => String(row[feature] ?? "").toLowerCase().includes(normalizedSearch));
  }) as CancerRow[];
}
