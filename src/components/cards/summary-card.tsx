interface SummaryCardProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function SummaryCard({ title, description, action }: SummaryCardProps) {
  return (
    <section className="flex flex-col justify-between gap-3 rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {action ? <div className="pt-2">{action}</div> : null}
    </section>
  );
}
