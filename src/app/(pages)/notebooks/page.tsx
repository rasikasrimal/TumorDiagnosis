import { NotebooksClient } from '@/components/notebooks-client';

export default function NotebooksPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3 rounded-3xl border border-border/60 bg-background/70 p-6 backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Reproducibility</p>
          <h1 className="mt-1 text-3xl font-semibold">Notebooks</h1>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Render executed Jupyter notebooks directly in the browser. Code cells, markdown, and outputs stay intact so every teammate can replay an analysis.
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1">Syntax highlighted</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1">Rich outputs</span>
        </div>
      </header>
      <NotebooksClient />
    </div>
  );
}
