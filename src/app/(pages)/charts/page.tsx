import { ChartsClient } from '@/components/charts-client';

export default function ChartsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Charts</h1>
        <p className="text-sm text-muted-foreground">
          Visualise uploaded datasets with responsive charts. The server normalises and validates data before streaming to these components.
        </p>
      </header>
      <ChartsClient />
    </div>
  );
}
