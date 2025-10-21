import { NotebooksClient } from '@/components/notebooks-client';

export default function NotebooksPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Notebooks</h1>
        <p className="text-sm text-muted-foreground">
          Render executed Jupyter notebooks directly in the browser. Code cells, markdown, and outputs stay intact.
        </p>
      </header>
      <NotebooksClient />
    </div>
  );
}
