import { getCancerData, getCancerColumns } from "@/lib/csv";
import { corrcoef } from "@/lib/stats";
import { FEATURE_SHORTLIST } from "@/lib/features";
import { StatBadge } from "@/components/data/StatBadge";
import { ModelMetricsPanel } from "./ModelMetricsPanel";
import { PrintButton } from "./PrintButton";

const parseList = (value?: string | string[]) => {
  if (!value) return [] as string[];
  const input = Array.isArray(value) ? value[0] : value;
  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export default async function ReportPage({
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

  const total = rows.length;
  const malignant = rows.filter((row) => row.diagnosis === "M").length;
  const benign = total - malignant;

  const requested = parseList(searchParams.features);
  const selectedFeatures = (requested.length ? requested : FEATURE_SHORTLIST.filter((feature) => columns.includes(feature)).slice(0, 6)).filter((feature) => columns.includes(feature));

  const matrix = rows.map((row) => selectedFeatures.map((feature) => Number(row[feature] ?? 0)));
  const correlations = matrix.length ? corrcoef(matrix) : [];

  const correlationPairs = [] as Array<{ pair: [string, string]; value: number }>;
  for (let i = 0; i < correlations.length; i += 1) {
    for (let j = i + 1; j < correlations.length; j += 1) {
      correlationPairs.push({ pair: [selectedFeatures[i], selectedFeatures[j]], value: correlations[i][j] ?? 0 });
    }
  }
  const topCorrelations = correlationPairs
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
    .slice(0, 3);

  const metrics = {
    accuracy: 0.94,
    f1: 0.92,
    precision: 0.93,
    recall: 0.91,
    matrix: [
      [85, 5],
      [3, 50]
    ]
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4 border border-[rgb(var(--border))] p-4">
        <div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--fg))]">Tumor Diagnostics Summary</h1>
          <p className="text-sm text-[rgb(var(--muted))]">
            Printable brief generated from the current exploratory filters.
          </p>
        </div>
        <PrintButton />
      </header>
      <section className="rounded-lg border border-[rgb(var(--border))] p-4">
        <h2 className="text-lg font-semibold text-[rgb(var(--fg))]">Class balance</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <StatBadge label="Malignant" value={malignant} percentage={(malignant / total) * 100} tone="malignant" />
          <StatBadge label="Benign" value={benign} percentage={(benign / total) * 100} tone="benign" />
          <StatBadge label="Total" value={total} tone="default" />
        </div>
        <p className="mt-4 text-sm text-[rgb(var(--muted))]">
          The dataset maintains a {((malignant / total) * 100).toFixed(1)}% share of malignant cases, aiding balanced evaluation of models.
        </p>
      </section>
      <section className="rounded-lg border border-[rgb(var(--border))] p-4">
        <h2 className="text-lg font-semibold text-[rgb(var(--fg))]">Feature focus</h2>
        <p className="text-sm text-[rgb(var(--muted))]">Highlighting the top predictive signals selected in the explorer.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {selectedFeatures.map((feature) => (
            <div key={feature} className="rounded-md border border-[rgb(var(--border))] px-3 py-2 text-sm">
              {feature}
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-[rgb(var(--border))] p-4">
        <h2 className="text-lg font-semibold text-[rgb(var(--fg))]">Correlation highlights</h2>
        {topCorrelations.length ? (
          <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--muted))]">
            {topCorrelations.map((item) => (
              <li key={item.pair.join("-")} className="rounded-md border border-[rgb(var(--border))] px-3 py-2">
                <span className="font-medium text-[rgb(var(--fg))]">{item.pair[0]}</span> &amp; <span className="font-medium text-[rgb(var(--fg))]">{item.pair[1]}</span>
                <span className="ml-2 text-xs uppercase">Correlation {item.value.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-[rgb(var(--muted))]">Select more than one feature to summarize correlations.</p>
        )}
      </section>
      <ModelMetricsPanel initial={metrics} />
    </div>
  );
}
