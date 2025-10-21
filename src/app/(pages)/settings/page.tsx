import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AdjustmentsHorizontalIcon,
  BellAlertIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-4 rounded-3xl border border-border/60 bg-background/80 p-6 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Workspace controls</p>
            <h1 className="mt-1 text-3xl font-semibold">Settings</h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            <AdjustmentsHorizontalIcon className="h-4 w-4" aria-hidden />
            Tailor your studio
          </span>
        </div>
        <p className="max-w-3xl text-base text-muted-foreground">
          Configure workspace behaviour, manage alerts, and control how uploaded data is retained. These settings apply to the current Insights Studio session.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="insights-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Workspace preferences</CardTitle>
            <CardDescription>Toggle themes and interface density to suit your environment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/70 p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Theme</p>
                <p className="text-sm text-muted-foreground">Switch between light and dark appearance instantly.</p>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/70 p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Compact mode</p>
                <p className="text-sm text-muted-foreground">Control component spacing for smaller viewports.</p>
              </div>
              <span className="text-xs text-muted-foreground">Use the toggle on the Overview page</span>
            </div>
          </CardContent>
        </Card>

        <Card className="insights-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Notifications</CardTitle>
            <CardDescription>Decide which events trigger toast alerts and email digests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/70 p-4">
              <BellAlertIcon className="mt-1 h-5 w-5 text-muted-foreground" aria-hidden />
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">Upload notifications</p>
                  <p>Show a toast after datasets or notebooks finish processing.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Refresh reminders</p>
                  <p>Surface warnings when datasets go stale for more than 24 hours.</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Manage notification channels
            </button>
          </CardContent>
        </Card>

        <Card className="insights-fade-in lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Data retention</CardTitle>
            <CardDescription>Control how long in-memory datasets stay available in the studio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/70 p-4">
              <ShieldCheckIcon className="mt-1 h-5 w-5 text-muted-foreground" aria-hidden />
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Default retention</p>
                <p>Uploads persist for the duration of this session and are discarded when the server restarts.</p>
                <p>Trigger a manual reset below to clear cached datasets and notebooks immediately.</p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-destructive/60 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
            >
              <ArrowPathIcon className="h-4 w-4" aria-hidden />
              Reset workspace cache
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
