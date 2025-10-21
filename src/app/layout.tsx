import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Tumor Diagnostics Analytics",
  description: "Interactive EDA for breast cancer diagnostics"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
