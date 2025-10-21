'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChartBarIcon, HomeIcon, TableCellsIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/components/theme-toggle';
import { AuthStatus } from '@/components/navigation/auth-status';
import { clsx } from 'clsx';

const links = [
  { href: '/', label: 'Overview', icon: HomeIcon },
  { href: '/charts', label: 'Charts', icon: ChartBarIcon },
  { href: '/explorer', label: 'Explorer', icon: TableCellsIcon },
  { href: '/notebooks', label: 'Notebooks', icon: DocumentTextIcon }
];

/**
 * Fixed sidebar navigation that collapses on smaller screens.
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col gap-6 border-r border-border bg-background/80 p-4">
      <div>
        <Link href="/" className="block text-lg font-semibold tracking-tight">
          Insights Studio
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">
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
                'flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring',
                active
                  ? 'bg-secondary text-secondary-foreground'
                  : 'hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" aria-hidden />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3 border-t border-dashed border-border pt-4">
        <AuthStatus />
        <ThemeToggle />
      </div>
    </aside>
  );
}
