'use client';

import { type DragEvent, useEffect, useRef, useState } from 'react';
import {
  ArrowUpTrayIcon,
  DocumentArrowUpIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { useToast } from '@/components/ui/use-toast';

interface UploadDatasetFormProps {
  onComplete?: () => void;
  lastUpload?: {
    name: string;
    rowCount: number;
    fieldCount: number;
    refreshedAt: string;
  };
}

export function UploadDatasetForm({ onComplete, lastUpload }: UploadDatasetFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const progressTimerRef = useRef<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'dragging' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [fileName, setFileName] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        window.clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  function updateProgress(value: number) {
    setProgress(value);
  }

  function startProgressLoop() {
    updateProgress(12);
    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current);
    }
    progressTimerRef.current = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 90) {
          return current;
        }
        return current + 6;
      });
    }, 180);
  }

  function stopProgressLoop() {
    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }

  async function handleUpload(file: File) {
    const body = new FormData();
    body.append('file', file);

    try {
      setStatus('uploading');
      setFileName(file.name);
      setMessage('Uploading dataset…');
      startProgressLoop();
      const res = await fetch('/api/upload/dataset', {
        method: 'POST',
        body
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Upload failed');
      }
      setStatus('success');
      setMessage('Dataset processed successfully.');
      updateProgress(100);
      toast({
        title: 'Dataset uploaded',
        description: `${file.name} is ready to explore.`,
        variant: 'success'
      });
      window.setTimeout(() => {
        updateProgress(0);
      }, 600);
      onComplete?.();
    } catch (error) {
      setStatus('error');
      const description = error instanceof Error ? error.message : 'Upload failed';
      setMessage(description);
      toast({ title: 'Upload failed', description, variant: 'destructive' });
      updateProgress(0);
    } finally {
      stopProgressLoop();
    }
  }

  async function handleFileSelection(files: FileList | null) {
    const file = files?.[0];
    if (!file) {
      setStatus('error');
      setMessage('Please choose a CSV or JSON file.');
      return;
    }
    await handleUpload(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function handleBrowseClick() {
    fileInputRef.current?.click();
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setStatus('idle');
    handleFileSelection(event.dataTransfer.files);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (status !== 'uploading') {
      setStatus('dragging');
    }
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (status === 'dragging') {
      setStatus('idle');
    }
  }

  const lastUploadText = lastUpload
    ? `Last upload: ${lastUpload.name}, ${lastUpload.rowCount.toLocaleString()} rows • ${lastUpload.fieldCount} fields — refreshed ${new Date(
        lastUpload.refreshedAt
      ).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
    : 'No uploads yet. New data stays in-memory for rapid iteration.';

  const isUploading = status === 'uploading';
  const helperText = status === 'dragging' ? 'Release to upload.' : message;

  return (
    <section className="space-y-4 rounded-3xl border border-border/60 bg-background/80 p-5 backdrop-blur">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Upload dataset</p>
        <p className="text-base text-muted-foreground">
          Drop CSV or JSON files to refresh the active workspace. Data stays within this session for analysis.
        </p>
      </header>
      <div
        role="button"
        tabIndex={0}
        onClick={handleBrowseClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleBrowseClick();
          }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        aria-label="Upload a dataset"
        className={`border-2 border-dashed ${
          status === 'dragging' ? 'border-accent bg-accent/10' : 'border-border/70'
        } rounded-2xl p-6 text-center transition-colors hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
      >
        <DocumentArrowUpIcon className="mx-auto mb-3 h-8 w-8 text-muted-foreground" aria-hidden />
        <p className="text-sm text-foreground">Drop CSV or JSON here, or</p>
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowUpTrayIcon className="h-4 w-4" aria-hidden />
            Browse files
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Accepted formats: CSV, JSON. Stored in memory only.</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        name="file"
        accept=".csv,.json,application/json,text/csv"
        className="hidden"
        onChange={(event) => handleFileSelection(event.target.files)}
      />
      {isUploading ? (
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-muted/50">
            <div
              className="h-full rounded-full bg-accent transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Processing {fileName}</p>
        </div>
      ) : null}
      {helperText ? (
        <p
          className={`text-sm ${
            status === 'error' ? 'text-destructive' : status === 'dragging' ? 'text-accent' : 'text-muted-foreground'
          }`}
          aria-live="polite"
        >
          {helperText}
        </p>
      ) : null}
      <div className="flex items-start gap-2 rounded-xl border border-dashed border-border/70 bg-muted/20 p-3 text-left">
        <InformationCircleIcon className="mt-0.5 h-5 w-5 text-muted-foreground" aria-hidden />
        <p className="text-xs text-muted-foreground">{lastUploadText}</p>
      </div>
    </section>
  );
}
