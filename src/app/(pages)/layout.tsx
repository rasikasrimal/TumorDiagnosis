import type { ReactNode } from 'react';
import { Sidebar } from '@/components/navigation/sidebar';
import { MobileNav } from '@/components/navigation/mobile-nav';

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="lg:hidden">
        <MobileNav />
      </div>
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 lg:px-8">
        <div className="hidden w-64 shrink-0 lg:block">
          <Sidebar />
        </div>
        <main className="flex-1 space-y-6">{children}</main>
      </div>
    </div>
  );
}
