import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import type { CancerRow } from "@/types/cancer";

const DATA_PATH = path.join(process.cwd(), "data", "data.csv");

const coerceRow = (row: Record<string, string>): CancerRow => {
  const result: Record<string, string | number> = {};
  Object.entries(row).forEach(([key, value]) => {
    if (key === "id") {
      result[key] = value;
      return;
    }
    if (key === "diagnosis") {
      result[key] = value === "M" ? "M" : "B";
      return;
    }
    const numeric = Number(value);
    result[key] = Number.isFinite(numeric) ? numeric : value;
  });
  return result as CancerRow;
};

const loadCsv = async (): Promise<CancerRow[]> => {
  try {
    const file = await fs.readFile(DATA_PATH, "utf8");
    const lines = file.trim().split(/\r?\n/);
    if (!lines.length) {
      return [];
    }
    const headers = lines[0].split(",").map((header) => header.trim());
    const rows: CancerRow[] = [];
    for (let i = 1; i < lines.length; i += 1) {
      const line = lines[i];
      if (!line) continue;
      const values = line.split(",");
      const record: Record<string, string> = {};
      headers.forEach((header, index) => {
        record[header] = values[index]?.trim() ?? "";
      });
      rows.push(coerceRow(record));
    }
    return rows;
  } catch (error) {
    console.warn("Failed to load data.csv", error);
    return [];
  }
};

export const getCancerData = cache(async (): Promise<CancerRow[]> => {
  const rows = await loadCsv();
  return rows;
});

export const getCancerColumns = cache(async () => {
  const rows = await getCancerData();
  if (!rows.length) {
    return [] as string[];
  }
  return Object.keys(rows[0]).filter((key) => key !== "id" && key !== "diagnosis");
});

export const isDataAvailable = cache(async () => {
  const rows = await getCancerData();
  return rows.length > 0;
});

export { DATA_PATH };
