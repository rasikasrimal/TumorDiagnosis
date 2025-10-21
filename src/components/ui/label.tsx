import * as React from "react";
import { cn } from "@/lib/utils";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium text-[rgb(var(--fg))]", className)} {...props} />
));
Label.displayName = "Label";
