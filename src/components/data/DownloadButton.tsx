"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@/components/icons";

export type DownloadButtonProps = {
  rows: Array<Record<string, string | number>>;
  columns: string[];
  filename?: string;
};

const toCsv = (columns: string[], rows: Array<Record<string, string | number>>) => {
  const header = columns.join(",");
  const lines = rows.map((row) =>
    columns
      .map((col) => {
        const raw = row[col];
        if (raw === undefined || raw === null) return "";
        if (typeof raw === "number") return raw.toString();
        const value = String(raw);
        if (value.includes(",") || value.includes("\"")) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
      .join(",")
  );
  return [header, ...lines].join("\n");
};

export function DownloadButton({ rows, columns, filename = "subset.csv" }: DownloadButtonProps) {
  const handleDownload = () => {
    const csv = toCsv(columns, rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" size="xs" onClick={handleDownload} className="gap-1.5">
      <DownloadIcon className="h-4 w-4" />
      Export CSV
    </Button>
  );
}
