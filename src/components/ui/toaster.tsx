'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { useToast, useToastState } from './use-toast';

export function Toaster() {
  const toasts = useToastState();
  const { dismiss } = useToast();

  if (!toasts.length) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-end px-4 sm:px-6">
      <div className="flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            aria-live="assertive"
            className={clsx(
              'pointer-events-auto overflow-hidden rounded-2xl border border-border/60 bg-background/95 backdrop-blur',
              'shadow-none ring-1 ring-border/80',
              toast.variant === 'success' && 'border-emerald-400/70 ring-emerald-500/40',
              toast.variant === 'warning' && 'border-amber-400/70 ring-amber-500/40',
              toast.variant === 'destructive' && 'border-destructive/70 ring-destructive/40'
            )}
          >
            <div className="flex items-start gap-3 px-4 py-3">
              <div className="flex-1">
                {toast.title ? (
                  <p className="text-sm font-semibold text-foreground">{toast.title}</p>
                ) : null}
                {toast.description ? (
                  <p className="mt-1 text-sm text-muted-foreground">{toast.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-background/70 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
