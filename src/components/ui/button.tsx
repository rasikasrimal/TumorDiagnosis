import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center select-none whitespace-nowrap " +
    "rounded-md border border-[rgb(var(--border))] " +
    "bg-[rgb(var(--bg))] text-[rgb(var(--fg))] " +
    "hover:ring-1 hover:ring-[rgb(var(--border))] " +
    "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] shadow-none",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-transparent",
        ghost: "bg-transparent border-transparent",
        link: "border-transparent underline-offset-4 hover:underline"
      },
      size: {
        xs: "h-7 px-2.5 text-xs gap-1",
        sm: "h-8 px-3 text-sm gap-1.5",
        md: "h-9 px-3.5 text-sm gap-2",
        lg: "h-10 px-4 text-base gap-2"
      },
      icon: {
        true: "px-0 aspect-square",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      icon: false
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: boolean;
}

export function Button({ className, icon, size, variant, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ size, variant, icon }), className)}
      {...props}
    />
  );
}
