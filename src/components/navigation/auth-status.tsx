'use client';

import { useEffect, useState } from 'react';

/**
 * Placeholder component for authentication integration.
 * Replace with your identity provider (NextAuth, Auth0, custom, etc.).
 */
export function AuthStatus() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUser({ name: 'Analyst' });
      setLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Checking access&hellip;</p>;
  }

  if (!user) {
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full border border-dashed border-border/60 bg-background/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40"
      >
        Connect authentication
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm">
      <span className="font-medium">{user.name}</span>
      <span className="text-xs uppercase tracking-wide text-muted-foreground">Viewer</span>
    </div>
  );
}
