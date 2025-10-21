"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-lg border border-[rgb(var(--border))] p-6 text-center">
      <h1 className="text-2xl font-semibold text-[rgb(var(--fg))]">Something went wrong</h1>
      <p className="mt-2 text-sm text-[rgb(var(--muted))]">
        We could not load this view. Try refreshing the page to continue.
      </p>
      <div className="mt-4 flex justify-center">
        <Button variant="outline" onClick={reset}>
          Retry
        </Button>
      </div>
    </div>
  );
}
