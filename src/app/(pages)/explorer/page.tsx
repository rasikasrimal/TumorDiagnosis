import { ExplorerClient } from '@/components/explorer-client';

export default function ExplorerPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Explorer</h1>
        <p className="text-sm text-muted-foreground">
          Dive into row-level details with filtering and sorting tools. Datasets remain in-memory for rapid prototyping.
        </p>
      </header>
      <ExplorerClient />
    </div>
  );
}
