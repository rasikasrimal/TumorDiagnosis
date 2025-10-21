"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@/components/icons";

export type ColumnMultiSelectProps = {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
};

export function ColumnMultiSelect({ options, selected, onChange }: ColumnMultiSelectProps) {
  const summary = useMemo(() => {
    if (!selected.length) return "Select columns";
    if (selected.length === options.length) return "All columns";
    if (selected.length === 1) return selected[0];
    return `${selected.length} columns`;
  }, [options.length, selected]);

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (value: string, nextChecked: boolean) => {
    if (nextChecked) {
      onChange([...selected, value]);
    } else {
      onChange(selected.filter((item) => item !== value));
    }
  };

  const reset = () => onChange(options);

  return (
    <div ref={containerRef} className="relative inline-flex w-full max-w-xs">
      <Button
        type="button"
        variant="outline"
        className="min-w-[180px] justify-between"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {summary}
        <ChevronDownIcon className="h-4 w-4" />
      </Button>
      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-3 shadow-none">
          <div className="mb-2 flex items-center justify-between text-xs text-[rgb(var(--muted))]">
            <span>Visible columns</span>
            <button
              type="button"
              className="text-[rgb(var(--accent))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
              onClick={reset}
            >
              Reset
            </button>
          </div>
          <div className="flex max-h-60 flex-col gap-2 overflow-auto pr-1">
            {options.map((option) => (
              <label key={option} className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={selected.includes(option)}
                  onCheckedChange={(next) => toggle(option, next)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
