import * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement>;

const createIcon = (path: React.ReactNode) =>
  React.forwardRef<SVGSVGElement, IconProps>(({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {path}
    </svg>
  ));

export const MenuIcon = createIcon(
  <>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </>
);

export const FilterIcon = createIcon(
  <>
    <path d="M4 5h16l-6 7v5l-4 2v-7z" />
  </>
);

export const MoonIcon = createIcon(
  <>
    <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
  </>
);

export const SunIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </>
);

export const ChevronDownIcon = createIcon(
  <polyline points="6 9 12 15 18 9" />
);

export const AdjustmentsIcon = createIcon(
  <>
    <line x1="6" y1="4" x2="6" y2="20" />
    <line x1="18" y1="4" x2="18" y2="20" />
    <line x1="6" y1="10" x2="12" y2="10" />
    <line x1="12" y1="14" x2="18" y2="14" />
    <circle cx="12" cy="10" r="2" />
    <circle cx="12" cy="14" r="2" />
  </>
);

export const PrinterIcon = createIcon(
  <>
    <rect x="6" y="9" width="12" height="8" rx="2" />
    <polyline points="6 9 6 5 18 5 18 9" />
    <line x1="6" y1="13" x2="6" y2="13" />
  </>
);

export const DownloadIcon = createIcon(
  <>
    <path d="M12 3v12" />
    <polyline points="6 11 12 17 18 11" />
    <path d="M5 21h14" />
  </>
);

export const DashboardIcon = createIcon(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </>
);

export const CompassIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <polygon points="14 10 12 16 10 14 8 8" />
  </>
);

export const GridIcon = createIcon(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </>
);

export const FileTextIcon = createIcon(
  <>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="14 3 14 9 20 9" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </>
);
