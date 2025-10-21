"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ColumnMultiSelect } from "@/components/forms/ColumnMultiSelect";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export type CorrelationControlsProps = {
  options: string[];
  selected: string[];
  standardize: boolean;
};

export function CorrelationControls({ options, selected, standardize }: CorrelationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const key = useMemo(() => selected.join(","), [selected]);

  const updateParams = (next: URLSearchParams) => {
    const query = next.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  };

  const handleSelect = (values: string[]) => {
    const limit = values.slice(0, 12);
    const params = new URLSearchParams(searchParams.toString());
    if (limit.length === options.length) {
      params.delete("features");
    } else {
      params.set("features", limit.join(","));
    }
    updateParams(params);
  };

  const handleStandardize = (value: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("standardize", "1");
    } else {
      params.delete("standardize");
    }
    updateParams(params);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label className="mb-2 block text-xs uppercase tracking-wide text-[rgb(var(--muted))]">Feature subset</Label>
        <ColumnMultiSelect key={key} options={options} selected={selected} onChange={handleSelect} />
        <p className="mt-2 text-xs text-[rgb(var(--muted))]">Select up to 12 features for clarity.</p>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-md border border-[rgb(var(--border))] px-3 py-2">
        <div>
          <div className="text-sm font-medium text-[rgb(var(--fg))]">Standardize</div>
          <div className="text-xs text-[rgb(var(--muted))]">Normalize before computing correlations.</div>
        </div>
        <Switch checked={standardize} onCheckedChange={(value) => handleStandardize(Boolean(value))} />
      </div>
    </div>
  );
}
