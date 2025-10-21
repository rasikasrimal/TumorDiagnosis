import Link from "next/link";
import { getCancerData, getCancerColumns } from "@/lib/csv";
import { MetricCard } from "@/components/data/MetricCard";
import { StatBadge } from "@/components/data/StatBadge";
import { Bar } from "@/components/viz/Bar";
import { DataTable } from "@/components/data/DataTable";

export default async function DashboardPage() {
  const [rows, columns] = await Promise.all([getCancerData(), getCancerColumns()]);

  if (!rows.length) {
    return (
      <div className="rounded-lg border border-[rgb(var(--border))] p-6 text-sm text-[rgb(var(--muted))]">
        <h2 className="mb-2 text-lg font-semibold text-[rgb(var(--fg))]">Dataset unavailable</h2>
        <p>Please ensure <code>data/data.csv</code> is present to explore the dashboard.</p>
      </div>
    );
  }

  const malignant = rows.filter((row) => row.diagnosis === "M").length;
  const benign = rows.filter((row) => row.diagnosis === "B").length;
  const total = rows.length;

  const classData = [
    { name: "Malignant", value: malignant, fill: "rgb(var(--malignant))" },
    { name: "Benign", value: benign, fill: "rgb(var(--benign))" }
  ];

  const previewRows = rows.slice(0, 10);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[rgb(var(--fg))]">Dataset overview</h1>
            <p className="text-sm text-[rgb(var(--muted))]">
              Parsed from the Breast Cancer Wisconsin (Diagnostic) dataset with {columns.length} features.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StatBadge label="Malignant" value={malignant} percentage={(malignant / total) * 100} tone="malignant" />
            <StatBadge label="Benign" value={benign} percentage={(benign / total) * 100} tone="benign" />
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <MetricCard label="Total Samples" value={total} />
          <MetricCard label="Feature Columns" value={columns.length} description="Standard numeric predictors" />
          <MetricCard label="ID Range" value={`${rows[0].id} - ${rows.at(-1)?.id}`} />
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold text-[rgb(var(--fg))]">Class balance</h2>
        <Bar data={classData} />
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold text-[rgb(var(--fg))]">Schema preview</h2>
        <div className="rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {columns.map((column) => (
              <span key={column} className="rounded-md border border-[rgb(var(--border))] px-3 py-2 text-xs">
                {column}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section>
        <DataTable
          title="Sample rows"
          rows={previewRows}
          columns={columns}
          emptyLabel="No preview available"
          controls={
            <Link
              href="/explore"
              className="rounded-md border border-[rgb(var(--border))] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
            >
              View all
            </Link>
          }
        />
      </section>
    </div>
  );
}
