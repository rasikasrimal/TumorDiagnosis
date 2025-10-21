export default function NotFound() {
  return (
    <div className="rounded-lg border border-[rgb(var(--border))] p-6 text-center">
      <h1 className="text-2xl font-semibold text-[rgb(var(--fg))]">Page not found</h1>
      <p className="mt-2 text-sm text-[rgb(var(--muted))]">
        We could not find the view you were looking for. Use the navigation to continue exploring the dataset.
      </p>
    </div>
  );
}
