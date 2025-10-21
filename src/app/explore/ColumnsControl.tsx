"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ColumnMultiSelect } from "@/components/forms/ColumnMultiSelect";

export type ColumnsControlProps = {
  options: string[];
  selected: string[];
};

export function ColumnsControl({ options, selected }: ColumnsControlProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentKey = useMemo(() => selected.join(","), [selected]);

  const handleChange = (values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (values.length === options.length) {
      params.delete("columns");
    } else {
      params.set("columns", values.join(","));
    }
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  };

  return <ColumnMultiSelect key={currentKey} options={options} selected={selected} onChange={handleChange} />;
}
