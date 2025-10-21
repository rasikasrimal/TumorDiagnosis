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
    <div className="border-b border-border bg-background/80">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-base font-semibold">
          Insights Studio
        </Link>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div id="mobile-nav-menu" className="space-y-2 border-t border-border px-4 py-3 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block rounded-md px-2 py-2 ${pathname === href ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="border-t border-dashed border-border pt-3">
            <AuthStatus />
          </div>
          <ThemeToggle className="w-full justify-center" />
        </div>
      ) : null}
    </div>
  );
}
