"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFilters, type DiagnosisFilter } from "@/store/useFilters";
import { SegmentedControl } from "@/components/data/SegmentedControl";
import { Switch } from "@/components/ui/switch";
import { ColumnMultiSelect } from "@/components/forms/ColumnMultiSelect";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AdjustmentsIcon } from "@/components/icons";

export type FiltersPanelProps = {
  features: string[];
  selectedFeatures: string[];
  diagnosis: DiagnosisFilter;
  standardize: boolean;
  defaultFeatures: string[];
};

export function FiltersPanel({ features, selectedFeatures, diagnosis, standardize, defaultFeatures }: FiltersPanelProps) {
  const { setFeatures, setDiagnosis, setStandardize, reset, selectedFeatures: storeFeatures, diagnosisFilter, standardize: storeStandardize } =
    useFilters();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const initialKey = useMemo(() => `${selectedFeatures.join("|")}-${diagnosis}-${standardize}`, [selectedFeatures, diagnosis, standardize]);

  useEffect(() => {
    setFeatures(selectedFeatures);
    setDiagnosis(diagnosis);
    setStandardize(standardize);
  }, [initialKey, setDiagnosis, setFeatures, setStandardize]);

  const updateQuery = (params: URLSearchParams) => {
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  };

  const handleDiagnosisChange = (value: DiagnosisFilter) => {
    setDiagnosis(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete("diagnosis");
    } else {
      params.set("diagnosis", value);
    }
    updateQuery(params);
  };

  const handleFeaturesChange = (values: string[]) => {
    setFeatures(values);
    const params = new URLSearchParams(searchParams.toString());
    if (values.length === features.length) {
      params.delete("features");
    } else {
      params.set("features", values.join(","));
    }
    updateQuery(params);
  };

  const handleStandardizeChange = (value: boolean) => {
    setStandardize(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("standardize", "1");
    } else {
      params.delete("standardize");
    }
    updateQuery(params);
  };

  const handleReset = () => {
    reset();
    setFeatures(defaultFeatures);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("diagnosis");
    params.delete("features");
    params.delete("standardize");
    updateQuery(params);
  };

  const content = (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="diagnosis-filter" className="mb-2 block text-xs uppercase tracking-wide text-[rgb(var(--muted))]">
          Diagnosis
        </Label>
        <SegmentedControl
          options={[
            { label: "All", value: "All" as DiagnosisFilter },
            { label: "Benign", value: "Benign" as DiagnosisFilter },
            { label: "Malignant", value: "Malignant" as DiagnosisFilter }
          ]}
          value={diagnosisFilter}
          onChange={handleDiagnosisChange}
          className="w-full"
        />
      </div>
      <div className="flex items-center justify-between gap-2 rounded-md border border-[rgb(var(--border))] px-3 py-2">
        <div>
          <div className="text-sm font-medium text-[rgb(var(--fg))]">Standardize</div>
          <div className="text-xs text-[rgb(var(--muted))]">Z-score normalize selected features</div>
        </div>
        <Switch checked={storeStandardize} onCheckedChange={(value) => handleStandardizeChange(Boolean(value))} />
      </div>
      <div>
        <Label htmlFor="feature-select" className="mb-2 block text-xs uppercase tracking-wide text-[rgb(var(--muted))]">
          Features
        </Label>
        <ColumnMultiSelect options={features} selected={storeFeatures.length ? storeFeatures : selectedFeatures} onChange={handleFeaturesChange} />
        <p className="mt-2 text-xs text-[rgb(var(--muted))]">Select up to 12 features for dense visualizations.</p>
      </div>
      <Button variant="outline" size="xs" className="justify-center" onClick={handleReset}>
        Reset filters
      </Button>
    </div>
  );

  return (
    <aside className="rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
      <div className="flex items-center justify-between md:block">
        <div className="flex items-center gap-2 text-sm font-semibold text-[rgb(var(--fg))]">
          <AdjustmentsIcon className="h-4 w-4" /> Filters
        </div>
        <Button
          variant="outline"
          size="xs"
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="filters-panel"
        >
          {open ? "Hide" : "Show"}
        </Button>
      </div>
      <div id="filters-panel" className={open ? "mt-4" : "mt-4 hidden md:block"}>
        {content}
      </div>
    </aside>
  );
}
