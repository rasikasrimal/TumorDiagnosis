#!/usr/bin/env bash
# Minimal shadcn/ui bootstrap aligned with the local component library.
set -euo pipefail

npx shadcn-ui@3.4.0 init \
  --tailwind-config tailwind.config.ts \
  --src-dir src \
  --components "button,input,textarea,tabs,switch,checkbox,label,popover,scroll-area,separator,sheet" \
  --yes
