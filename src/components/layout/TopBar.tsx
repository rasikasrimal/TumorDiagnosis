"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFilters } from "@/store/useFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { FilterIcon, MenuIcon } from "@/components/icons";

export function TopBar({ onMenu }: { onMenu: () => void }) {
  const { search, setSearch, diagnosisFilter, selectedFeatures } = useFilters();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const current = searchParams.toString();
    const handle = setTimeout(() => {
      const params = new URLSearchParams(current);
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      const query = params.toString();
      if (query !== current) {
        router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [search, pathname, router, searchParams]);

  return (
    <header className="flex items-center gap-4 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 py-3">
      <div className="flex items-center gap-2 lg:hidden">
        <Button variant="outline" className="h-10 w-10" onClick={onMenu} aria-label="Open navigation">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="hidden flex-col lg:flex">
        <span className="text-xs uppercase text-[rgb(var(--muted))]">Breast Cancer EDA</span>
        <span className="text-lg font-semibold">Tumor Diagnostics Analytics</span>
      </div>
      <div className="flex flex-1 items-center gap-3">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search patient id or feature"
          className="max-w-lg"
          aria-label="Search"
        />
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-md border border-[rgb(var(--border))] px-3 py-2 text-xs font-medium text-[rgb(var(--muted))] sm:flex">
            <FilterIcon className="h-4 w-4" />
            <span>{diagnosisFilter}</span>
            <span aria-hidden="true">•</span>
            <span>{selectedFeatures.length} features</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
