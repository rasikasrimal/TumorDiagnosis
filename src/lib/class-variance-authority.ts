export type VariantMap = Record<string, Record<string, string>>;

type VariantInput<V extends VariantMap> = {
  [K in keyof V]?: keyof V[K] | boolean | null | undefined;
};

type DefaultVariants<V extends VariantMap> = {
  [K in keyof V]?: keyof V[K];
};

type CvaOptions<V extends VariantMap> = {
  variants?: V;
  defaultVariants?: DefaultVariants<V>;
};

type InferProps<T> = T extends (props?: infer P) => any ? NonNullable<P> : never;

export type VariantProps<T> = InferProps<T>;

function normalizeVariant(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value);
}

export function cva<V extends VariantMap>(base: string, options: CvaOptions<V> = {}) {
  const variants = options.variants ?? ({} as V);
  const defaultVariants = options.defaultVariants ?? ({} as DefaultVariants<V>);

  return (props?: VariantInput<V>) => {
    const classes: string[] = [base].filter(Boolean);
    const merged: Record<string, unknown> = { ...defaultVariants, ...(props ?? {}) };

    (Object.keys(variants) as Array<keyof V>).forEach((key) => {
      const map = variants[key];
      if (!map) return;
      const raw = merged[key as string];
      const normalized = normalizeVariant(raw);
      if (!normalized) return;
      const selected = map[normalized as keyof V[typeof key]];
      if (selected) {
        classes.push(selected);
      }
    });

    return classes.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  };
}

export default cva;
