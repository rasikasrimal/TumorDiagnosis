'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChartBarIcon, CircleStackIcon, Cog6ToothIcon, HomeIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/components/theme-toggle';
import { AuthStatus } from '@/components/navigation/auth-status';
import { clsx } from 'clsx';

const links = [
  { href: '/', label: 'Overview', icon: HomeIcon },
  { href: '/datasets', label: 'Datasets', icon: CircleStackIcon },
  { href: '/analysis', label: 'Analysis', icon: ChartBarIcon },
  { href: '/settings', label: 'Settings', icon: Cog6ToothIcon }
];

/**
 * Fixed sidebar navigation that collapses on smaller screens.
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col gap-6 rounded-3xl border border-border/60 bg-background/70 p-6 backdrop-blur">
      <div>
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          Insights Studio
        </Link>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Analytics workspace with secure upload pipeline.
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 rounded-xl border border-border/60 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring/60 backdrop-blur',
                active
                  ? 'bg-secondary/90 text-secondary-foreground'
                  : 'bg-background/60 hover:bg-muted/40 hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" aria-hidden />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3 border-t border-dashed border-border/60 pt-4">
        <AuthStatus />
        <ThemeToggle />
      </div>
    </aside>
  );
}
