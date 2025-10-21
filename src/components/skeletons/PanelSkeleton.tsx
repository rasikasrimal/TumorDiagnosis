export function PanelSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-[rgb(var(--border))] p-3 md:p-4">
      <div className="h-4 w-32 rounded bg-[rgb(var(--border))]" />
      <div className="mt-4 h-40 rounded bg-[rgb(var(--border))]" />
    </div>
  );
}
