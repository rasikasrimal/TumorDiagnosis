"use client";

import { Button } from "@/components/ui/button";
import { PrinterIcon } from "@/components/icons";

export function PrintButton() {
  return (
    <Button variant="outline" onClick={() => window.print()} className="gap-2">
      <PrinterIcon className="h-4 w-4" />
      Print report
    </Button>
  );
}
