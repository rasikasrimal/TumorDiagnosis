'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { AuthStatus } from '@/components/navigation/auth-status';

const links = [
  { href: '/', label: 'Overview' },
  { href: '/charts', label: 'Charts' },
  { href: '/explorer', label: 'Explorer' },
  { href: '/notebooks', label: 'Notebooks' }
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          Insights Studio
        </Link>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-ring/60"
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div id="mobile-nav-menu" className="space-y-2 border-t border-border/60 bg-background/80 px-4 py-3 text-sm backdrop-blur">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block rounded-lg border border-transparent px-2 py-2 ${pathname === href ? 'border-border/60 bg-secondary/90 text-secondary-foreground' : 'hover:bg-muted/40'}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="border-t border-dashed border-border/60 pt-3">
            <AuthStatus />
          </div>
          <ThemeToggle className="w-full justify-center" />
        </div>
      ) : null}
    </div>
  );
}
