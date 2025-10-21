'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface UploadNotebookFormProps {
  onComplete?: () => void;
}

export function UploadNotebookForm({ onComplete }: UploadNotebookFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = form.elements.namedItem('file') as HTMLInputElement | null;
    const file = fileInput?.files?.[0];
    if (!file) {
      setStatus('error');
      setMessage('Please choose an .ipynb file.');
      return;
    }

    const body = new FormData();
    body.append('file', file);

    try {
      setStatus('loading');
      setMessage('Uploading…');
      const res = await fetch('/api/upload/notebook', {
        method: 'POST',
        body
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Upload failed');
      }
      setStatus('success');
      setMessage('Notebook ingested.');
      form.reset();
      onComplete?.();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Upload failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-border/60 bg-background/70 p-6 backdrop-blur">
      <div>
        <h3 className="text-base font-semibold">Upload notebook</h3>
        <p className="text-sm text-muted-foreground">Drop in executed Jupyter notebooks to review code and outputs.</p>
      </div>
      <input
        type="file"
        name="file"
        accept=".ipynb,application/x-ipynb+json"
        className="w-full rounded-md border border-border/60 bg-background/60 px-3 py-2 text-sm backdrop-blur file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-2 file:text-sm file:font-medium"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-ring/60"
        disabled={status === 'loading'}
      >
        <ArrowUpTrayIcon className="h-4 w-4" />
        {status === 'loading' ? 'Processing…' : 'Upload notebook'}
      </button>
      {message ? (
        <p className={`text-xs ${status === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}>{message}</p>
      ) : null}
    </form>
  );
}
