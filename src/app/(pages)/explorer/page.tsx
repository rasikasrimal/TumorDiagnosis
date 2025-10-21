import { ExplorerClient } from '@/components/explorer-client';

export default function ExplorerPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3 rounded-3xl border border-border/60 bg-background/70 p-6 backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Data Grid</p>
          <h1 className="mt-1 text-3xl font-semibold">Explorer</h1>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Dive into row-level details with filtering and sorting tools. Datasets remain in-memory for rapid prototyping, so every interaction feels instant.
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1">Instant filtering</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1">Keyboard navigation</span>
        </div>
      </header>
      <ExplorerClient />
    </div>
  );
}
