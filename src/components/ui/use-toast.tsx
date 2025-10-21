'use client';

import * as React from 'react';

export type ToastVariant = 'default' | 'success' | 'warning' | 'destructive';

export interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toasts: Required<ToastOptions>[];
  toast: (options: ToastOptions) => string;
  dismiss: (id?: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Required<ToastOptions>[]>([]);

  const dismiss = React.useCallback((id?: string) => {
    if (typeof id === 'string') {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    } else {
      setToasts([]);
    }
  }, []);

  const toast = React.useCallback(
    ({ duration = 4000, variant = 'default', ...options }: ToastOptions) => {
      const id = options.id ?? generateId();
      const record: Required<ToastOptions> = {
        id,
        title: options.title ?? '',
        description: options.description ?? '',
        duration,
        variant
      };
      setToasts((current) => [...current.filter((toast) => toast.id !== id), record]);

      if (duration > 0 && typeof window !== 'undefined') {
        window.setTimeout(() => dismiss(id), duration);
      }

      return id;
    },
    [dismiss]
  );

  const value = React.useMemo<ToastContextValue>(
    () => ({ toasts, toast, dismiss }),
    [dismiss, toast, toasts]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  const { toast, dismiss } = context;
  return { toast, dismiss };
}

export function useToastState() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToastState must be used within a ToastProvider');
  }
  return context.toasts;
}
