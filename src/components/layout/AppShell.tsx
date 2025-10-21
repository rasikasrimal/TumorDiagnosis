"use client";

import { useState } from "react";
import { SideNav } from "./SideNav";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      <TopBar onMenu={() => setOpen(true)} />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 py-6 lg:block">
          <SideNav />
        </aside>
        <main className="flex-1 bg-[rgb(var(--bg))] px-4 pb-8 pt-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">{children}</div>
        </main>
      </div>
      {open ? (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-64 border-r border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 text-lg font-semibold">Navigate</div>
            <SideNav onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
