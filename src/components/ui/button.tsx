import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "accent" | "outline";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  default:
    "border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--fg))] hover:ring-1 hover:ring-[rgb(var(--border))]",
  accent: "border border-[rgb(var(--accent))] bg-[rgb(var(--accent))] text-white hover:ring-1 hover:ring-[rgb(var(--accent))]",
  outline: "border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--fg))] hover:ring-1 hover:ring-[rgb(var(--border))]"
};

const sizeClasses: Record<Size, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-2 text-base"
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
