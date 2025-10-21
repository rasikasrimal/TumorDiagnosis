import type { ReactNode } from 'react';
import { Sidebar } from '@/components/navigation/sidebar';
import { MobileNav } from '@/components/navigation/mobile-nav';

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen px-4 pb-10 text-foreground sm:px-6 lg:px-12">
      <div className="lg:hidden">
        <MobileNav />
      </div>
      <div className="mx-auto flex w-full max-w-7xl gap-6 py-6 lg:py-10">
        <div className="hidden w-64 shrink-0 lg:block">
          <Sidebar />
        </div>
        <main className="flex-1 space-y-6 rounded-3xl border border-border/60 bg-background/70 p-6 backdrop-blur lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
