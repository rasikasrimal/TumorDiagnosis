"use client";

import { cn } from "@/lib/utils";

export type SegmentedOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function SegmentedControl<T extends string>({ options, value, onChange, className }: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-[rgb(var(--border))] p-1",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "min-w-[90px] rounded-sm px-3 py-1.5 text-sm font-medium transition hover:ring-1 hover:ring-[rgb(var(--border))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]",
            value === option.value ? "bg-[rgb(var(--accent))]/10" : ""
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
