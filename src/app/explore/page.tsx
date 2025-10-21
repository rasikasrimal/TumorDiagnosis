import Link from "next/link";
import type { DiagnosisFilter } from "@/store/useFilters";
import { getCancerData, getCancerColumns } from "@/lib/csv";
import { standardize as standardizeMatrix } from "@/lib/stats";
import { FEATURE_SHORTLIST } from "@/lib/features";
import { ViolinLike } from "@/components/viz/ViolinLike";
import { ScatterPlot } from "@/components/viz/Scatter";
import { DataTable } from "@/components/data/DataTable";
import { FiltersPanel } from "./FiltersPanel";
import { ColumnsControl } from "./ColumnsControl";

const parseList = (value?: string | string[]): string[] => {
  if (!value) return [];
  const input = Array.isArray(value) ? value[0] : value;
  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseDiagnosis = (value?: string): DiagnosisFilter => {
  if (value === "Benign" || value === "Malignant") return value;
  return "All";
};

const parseBoolean = (value?: string) => value === "1" || value === "true";

export default async function ExplorePage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const [rows, columns] = await Promise.all([getCancerData(), getCancerColumns()]);
  if (!rows.length) {
    return (
      <div className="rounded-lg border border-[rgb(var(--border))] p-6 text-sm text-[rgb(var(--muted))]">
        Dataset unavailable. Add <code>data/data.csv</code> to explore features.
      </div>
    );
  }

  const availableFeatures = columns;
  const defaultFeatures = FEATURE_SHORTLIST.filter((feature) => availableFeatures.includes(feature)).slice(0, 6);
  const selectedFromQuery = parseList(searchParams.features).filter((feature) => availableFeatures.includes(feature));
  const selectedFeatures = (selectedFromQuery.length ? selectedFromQuery : defaultFeatures.length ? defaultFeatures : availableFeatures.slice(0, 6)).slice(0, 12);

  const diagnosisFilter = parseDiagnosis(searchParams.diagnosis as string | undefined);
  const standardize = parseBoolean(searchParams.standardize as string | undefined);
  const searchValue = (searchParams.search as string | undefined)?.toLowerCase() ?? "";

  const filteredRows = rows.filter((row) => {
    const matchesDiagnosis =
      diagnosisFilter === "All" || (diagnosisFilter === "Benign" ? row.diagnosis === "B" : row.diagnosis === "M");
    if (!matchesDiagnosis) return false;
    if (!searchValue) return true;
    if (row.id.toLowerCase().includes(searchValue)) return true;
    return selectedFeatures.some((feature) => String(row[feature] ?? "").toLowerCase().includes(searchValue));
  });

  const matrix = filteredRows.map((row) => selectedFeatures.map((feature) => Number(row[feature] ?? 0)));
  const processedMatrix = standardize ? standardizeMatrix(matrix) : matrix;

  const violinData = selectedFeatures.map((feature, featureIndex) => ({
    feature,
    values: filteredRows.map((row, rowIndex) => ({
      diagnosis: row.diagnosis,
      value: processedMatrix[rowIndex]?.[featureIndex] ?? 0
    }))
  }));

  const pairFeatures = selectedFeatures.slice(0, 2);
  const scatterData = pairFeatures.length === 2
    ? filteredRows.map((row, rowIndex) => ({
        id: row.id,
        diagnosis: row.diagnosis,
        x: processedMatrix[rowIndex]?.[0] ?? 0,
        y: processedMatrix[rowIndex]?.[1] ?? 0
      }))
    : [];

  const tableColumns = (() => {
    const requested = parseList(searchParams.columns).filter((feature) => availableFeatures.includes(feature));
    if (!requested.length) {
      return selectedFeatures.length ? selectedFeatures : availableFeatures;
    }
    return requested;
  })();

  const view = (searchParams.view as string | undefined) ?? "distributions";

  const makeViewLink = (target: string) => {
    const params = new URLSearchParams(
      Object.entries(searchParams)
        .map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
        .filter(([key, value]) => value !== undefined && key !== "view") as [string, string][]
    );
    if (target !== "distributions") {
      params.set("view", target);
    }
    const query = params.toString();
    return `${query ? `?${query}` : ""}`;
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
      <FiltersPanel
        features={availableFeatures}
        selectedFeatures={selectedFeatures}
        diagnosis={diagnosisFilter}
        standardize={standardize}
        defaultFeatures={defaultFeatures.length ? defaultFeatures : availableFeatures.slice(0, 6)}
      />
      <section className="flex flex-col gap-4">
        <div
          role="tablist"
          aria-label="Explore views"
          className="flex flex-wrap items-center gap-2 rounded-md border border-[rgb(var(--border))] p-1"
        >
          {[
            { key: "distributions", label: "Distributions" },
            { key: "pairs", label: "Pairs" },
            { key: "table", label: "Table" }
          ].map((tab) => (
            <Link
              key={tab.key}
              href={makeViewLink(tab.key)}
              scroll={false}
              role="tab"
              aria-selected={view === tab.key || (!view && tab.key === "distributions")}
              className={`rounded-sm px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] ${
                view === tab.key || (!view && tab.key === "distributions") ? "bg-[rgb(var(--accent))]/10" : ""
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        {view === "distributions" || view === undefined ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {violinData.map((item) => (
              <ViolinLike key={item.feature} feature={item.feature} values={item.values} showBox={standardize} />
            ))}
          </div>
        ) : null}
        {view === "pairs" ? (
          pairFeatures.length === 2 ? (
            <ScatterPlot data={scatterData} xLabel={pairFeatures[0]} yLabel={pairFeatures[1]} />
          ) : (
            <div className="rounded-lg border border-[rgb(var(--border))] p-6 text-sm text-[rgb(var(--muted))]">
              Select at least two features to render the scatter plot.
            </div>
          )
        ) : null}
        {view === "table" ? (
          <DataTable
            title="Filtered rows"
            rows={filteredRows}
            columns={availableFeatures}
            visibleColumns={tableColumns}
            emptyLabel={filteredRows.length ? undefined : "Reset filters to see rows."}
            controls={
              <ColumnsControl options={availableFeatures} selected={tableColumns} />
            }
          />
        ) : null}
      </section>
    </div>
  );
}
