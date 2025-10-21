"use client";

import { cn } from "@/lib/utils";

export type ToggleOption = {
  label: string;
  value: string;
};

type ToggleGroupProps = {
  options: ToggleOption[];
  value: string[];
  onChange: (next: string[]) => void;
};

export function ToggleGroup({ options, value, onChange }: ToggleGroupProps) {
  const toggle = (target: string) => {
    if (value.includes(target)) {
      onChange(value.filter((item) => item !== target));
    } else {
      onChange([...value, target]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => toggle(option.value)}
          className={cn(
            "rounded-md border border-[rgb(var(--border))] px-3 py-1.5 text-sm transition hover:ring-1 hover:ring-[rgb(var(--border))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]",
            value.includes(option.value) ? "bg-[rgb(var(--accent))]/10" : ""
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
