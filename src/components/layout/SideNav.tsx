"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CompassIcon, DashboardIcon, FileTextIcon, GridIcon } from "@/components/icons";

const navItems = [
  { href: "/", label: "Dashboard", icon: DashboardIcon },
  { href: "/explore", label: "Explore", icon: CompassIcon },
  { href: "/correlations", label: "Correlations", icon: GridIcon },
  { href: "/report", label: "Report", icon: FileTextIcon }
];

export function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md border border-[rgb(var(--border))] px-3 py-2 text-sm font-medium transition hover:ring-1 hover:ring-[rgb(var(--border))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]",
              active ? "bg-[rgb(var(--accent))]/10" : ""
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
