"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
};

export function Checkbox({ checked = false, onCheckedChange, className }: CheckboxProps) {
  return (
    <label className={cn("relative inline-flex h-5 w-5 cursor-pointer items-center justify-center", className)}>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(event) => onCheckedChange?.(event.target.checked)}
      />
      <span
        className={cn(
          "flex h-full w-full items-center justify-center rounded border border-[rgb(var(--border))] bg-transparent transition peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[rgb(var(--accent))]",
          checked ? "bg-[rgb(var(--accent))] text-white" : ""
        )}
      >
        {checked ? <span className="text-xs font-bold">✓</span> : null}
      </span>
    </label>
  );
}
