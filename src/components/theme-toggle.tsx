'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { ButtonHTMLAttributes } from 'react';

/**
 * Accessible button that toggles between light and dark themes.
 * Styled without any drop shadows to honor the project guidelines.
 */
export function ThemeToggle({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className={`inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-ring/60 ${className ?? ''}`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      {...props}
    >
      {isDark ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'} mode</span>
    </button>
  );
}
