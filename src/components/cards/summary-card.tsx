interface SummaryCardProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function SummaryCard({ title, description, action }: SummaryCardProps) {
  return (
    <section className="flex flex-col justify-between gap-3 rounded-xl border border-border bg-background/60 p-5">
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {action ? <div className="pt-2">{action}</div> : null}
    </section>
  );
}
