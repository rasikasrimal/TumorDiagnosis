import { getCancerData, getCancerColumns } from "@/lib/csv";
import { corrcoef, standardize as standardizeMatrix } from "@/lib/stats";
import { dropCorrelated } from "@/lib/features";
import { Heatmap } from "@/components/viz/Heatmap";
import { CorrelationControls } from "./Controls";

const parseList = (value?: string | string[]) => {
  if (!value) return [] as string[];
  const input = Array.isArray(value) ? value[0] : value;
  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseBoolean = (value?: string | string[]) => {
  if (!value) return false;
  const input = Array.isArray(value) ? value[0] : value;
  return input === "1" || input === "true";
};

export default async function CorrelationsPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const [rows, columns] = await Promise.all([getCancerData(), getCancerColumns()]);
  if (!rows.length) {
    return (
      <div className="rounded-lg border border-[rgb(var(--border))] p-6 text-sm text-[rgb(var(--muted))]">
        Dataset unavailable. Add <code>data/data.csv</code> to continue.
      </div>
    );
  }

  const requestedFeatures = parseList(searchParams.features);
  const selectedFeatures = (requestedFeatures.length ? requestedFeatures : columns.slice(0, 10)).filter((feature) => columns.includes(feature)).slice(0, 12);
  const standardize = parseBoolean(searchParams.standardize);

  const matrix = rows.map((row) => selectedFeatures.map((feature) => Number(row[feature] ?? 0)));
  const processed = standardize ? standardizeMatrix(matrix) : matrix;
  const correlation = processed.length ? corrcoef(processed) : [];
  const suggestion = correlation.length ? dropCorrelated(selectedFeatures, correlation) : selectedFeatures;

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
      <aside className="rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
        <h1 className="mb-2 text-lg font-semibold text-[rgb(var(--fg))]">Feature selection</h1>
        <p className="mb-4 text-sm text-[rgb(var(--muted))]">Adjust the subset used to compute correlations.</p>
        <CorrelationControls options={columns} selected={selectedFeatures} standardize={standardize} />
      </aside>
      <section className="flex flex-col gap-4">
        <div className="rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[rgb(var(--fg))]">Correlation insights</h2>
              <p className="text-sm text-[rgb(var(--muted))]">
                {selectedFeatures.length} features analysed, standardized: {standardize ? "yes" : "no"}.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase text-[rgb(var(--muted))]">Drop highly correlated</span>
              <div className="flex flex-wrap gap-2">
                {suggestion.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-[rgb(var(--border))] px-3 py-1 text-xs text-[rgb(var(--muted))]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Heatmap matrix={correlation} labels={selectedFeatures} />
      </section>
    </div>
  );
}
