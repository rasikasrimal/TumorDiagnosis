import type { CancerRow } from "@/types/cancer";
import { DownloadButton } from "./DownloadButton";

export type DataTableProps = {
  rows: CancerRow[];
  columns: string[];
  visibleColumns?: string[];
  title?: string;
  controls?: React.ReactNode;
  emptyLabel?: string;
};

export function DataTable({ rows, columns, visibleColumns, title, controls, emptyLabel }: DataTableProps) {
  const headers = visibleColumns?.length ? visibleColumns : columns;
  const exportHeaders = ["id", "diagnosis", ...headers];
  const exportRows = rows.map((row) => {
    const record: Record<string, string | number> = {
      id: row.id,
      diagnosis: row.diagnosis
    };
    headers.forEach((header) => {
      record[header] = row[header];
    });
    return record;
  });

  return (
    <section className="rounded-lg border border-[rgb(var(--border))]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgb(var(--border))] px-3 py-3 md:px-4">
        <div>
          {title ? <h3 className="text-sm font-semibold uppercase tracking-wide text-[rgb(var(--muted))]">{title}</h3> : null}
          <p className="text-xs text-[rgb(var(--muted))]">{rows.length} rows</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {controls}
          <DownloadButton rows={exportRows} columns={exportHeaders} />
        </div>
      </div>
      {rows.length === 0 ? (
        <div className="p-6 text-sm text-[rgb(var(--muted))]">
          {emptyLabel ?? "No rows match the current filters."}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
                <th className="border-r border-[rgb(var(--border))] px-3 py-3 font-semibold text-[rgb(var(--muted))]">ID</th>
                <th className="border-r border-[rgb(var(--border))] px-3 py-3 font-semibold text-[rgb(var(--muted))]">Diagnosis</th>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="border-r border-[rgb(var(--border))] px-3 py-3 font-semibold text-[rgb(var(--muted))]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={`${row.id}-${index}`}
                  className="border-b border-[rgb(var(--border))] odd:bg-[rgb(var(--bg))] even:bg-[rgb(var(--bg))]/60"
                >
                  <td className="px-3 py-2 font-mono text-xs">{row.id}</td>
                  <td className="px-3 py-2 text-sm font-medium text-[rgb(var(--fg))]">
                    {row.diagnosis === "M" ? "Malignant" : "Benign"}
                  </td>
                  {headers.map((header) => (
                    <td key={header} className="px-3 py-2 text-sm text-[rgb(var(--fg))]">
                      {typeof row[header] === "number" ? Number(row[header]).toFixed(3) : row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
