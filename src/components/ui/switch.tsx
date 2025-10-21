"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
  className?: string;
};

export function Switch({ checked = false, onCheckedChange, className }: SwitchProps) {
  const toggle = () => onCheckedChange?.(!checked);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={toggle}
      className={cn(
        "relative inline-flex h-5 w-9 items-center rounded-full border border-[rgb(var(--border))] bg-transparent transition focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]",
        checked ? "bg-[rgb(var(--accent))]" : "",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-[rgb(var(--border))] transition",
          checked ? "translate-x-4 bg-[rgb(var(--bg))]" : "translate-x-0"
        )}
      />
    </button>
  );
}
