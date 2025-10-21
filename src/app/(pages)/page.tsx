import { OverviewClient } from '@/components/overview-client';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Upload datasets, monitor KPIs, and jump into deeper analysis. All uploads are processed on the server with type-safe utilities.
        </p>
      </header>
      <OverviewClient />
    </div>
  );
}
