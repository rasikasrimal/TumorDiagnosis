## Code Editing Rules

### Guiding Principles

- Clarity and Reuse: Keep components modular and reusable; factor shared patterns into common building blocks.
- Consistency: Apply a unified design system for colors, typography, and spacing.
- Simplicity: Prefer focused components and straightforward styling or logic.
- Demo-Oriented: Make it easy to prototype streaming, multi-turn conversations, and tool integrations.
- Visual Quality: Maintain polished spacing, padding, and hover states to meet OSS quality expectations.

### Visual Constraints

- No shadows of any kind (box-shadow, drop-shadow, inner shadows, text shadows).
- Use borders, contrast, and layout for elevation cues.
- Rely on ring utilities for focus states (for example `focus:ring`, `ring-1` on hover).
- Override default shadows from third-party components with `shadow-none`.
- Motion can use scale, translate, opacity, or blur; avoid shadow-based feedback.
- Always use the most recent stable release of each core dependency; evaluate and adopt new stable versions within one sprint of release.

### Stack Defaults

- Framework: Next.js 15.5.2 (TypeScript)
- Styling: Tailwind CSS 4.1.13
- UI Components: shadcn/ui 3.4.0
- Icons: Lucide 0.452.0
- State Management: Zustand 5.0.0
