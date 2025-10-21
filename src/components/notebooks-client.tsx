'use client';

import { useState } from 'react';
import { useNotebooks } from '@/hooks/use-notebooks';
import { UploadNotebookForm } from '@/components/upload-notebook-form';
import { NotebookViewer } from '@/components/notebook-viewer';
import { EmptyState } from '@/components/empty-state';

export function NotebooksClient() {
  const { notebooks, isLoading, error, refresh } = useNotebooks();
  const [activeId, setActiveId] = useState<string | undefined>(() => notebooks[0]?.id);
  const notebook = notebooks.find((entry) => entry.id === activeId) ?? notebooks[0];

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-xl border border-border bg-muted/40" />;
  }

  if (error) {
    return (
      <EmptyState
        title="Failed to load notebooks"
        description={error.message}
        action={
          <button onClick={() => refresh()} className="rounded-md border border-border px-3 py-2 text-sm">
            Retry
          </button>
        }
      />
    );
  }

  if (!notebook) {
    return (
      <div className="space-y-6">
        <EmptyState
          title="No notebooks yet"
          description="Upload executed Jupyter notebooks to review code, markdown, and outputs."
        />
        <UploadNotebookForm onComplete={() => refresh()} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,280px)_1fr]">
        <aside className="space-y-4 rounded-xl border border-border bg-background/60 p-5">
          <div>
            <h2 className="text-base font-semibold">Notebook library</h2>
            <p className="text-sm text-muted-foreground">Select a notebook to render below. Upload new files at any time.</p>
          </div>
          <UploadNotebookForm onComplete={() => refresh()} />
          <ul className="space-y-2">
            {notebooks.map((entry) => (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(entry.id)}
                  className={`w-full rounded-md border border-border px-3 py-2 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${notebook.id === entry.id ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'}`}
                >
                  <span className="block font-medium">{entry.name}</span>
                  <span className="text-xs text-muted-foreground">Uploaded {new Date(entry.uploadedAt).toLocaleString()}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <NotebookViewer title={notebook.name} cells={notebook.cells} />
      </div>
    </div>
  );
}
