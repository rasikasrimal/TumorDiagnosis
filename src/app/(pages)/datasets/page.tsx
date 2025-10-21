import { ExplorerClient } from '@/components/explorer-client';
import { TableCellsIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function DatasetsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-4 rounded-3xl border border-border/60 bg-background/80 p-6 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Data grid</p>
            <h1 className="mt-1 text-3xl font-semibold">Datasets</h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            <ArrowUpTrayIcon className="h-4 w-4" aria-hidden />
            Upload CSV or JSON
          </span>
        </div>
        <p className="max-w-3xl text-base text-muted-foreground">
          Explore every record with instant filtering, keyboard navigation, and responsive tables. All data remains scoped to your session for safe prototyping.
        </p>
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <TableCellsIcon className="h-4 w-4" aria-hidden />
          <span>Sortable columns · In-memory queries</span>
        </div>
      </header>
      <ExplorerClient />
    </div>
  );
}
