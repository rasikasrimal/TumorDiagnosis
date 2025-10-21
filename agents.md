# AGENTS.md

## Overview

This document defines the standards, architecture, and development practices for implementing AI-driven chat agents within this project's Next.js + React frontend.  
It complements the frontend and documentation standards outlined in `instructions.md`.

Agents in this context represent modular, autonomous components responsible for handling specific tasks such as chat orchestration, message parsing, data retrieval, and user interface logic.

---

## 1. Agent Architecture

### 1.1 Core Concepts

Each agent should:

- Operate independently but conform to shared state, messaging, and UI interfaces.
- Maintain clarity and reusability, avoiding deep coupling between UI and logic.
- Be designed for extendability (for example, future integration with tool APIs or streaming responses).
- Follow frontend visual and coding standards established in `instructions.md`.

### 1.2 Agent Types

| Agent Type | Purpose | Example |
| --- | --- | --- |
| Chat Agent | Manages conversation flow, context, and message streaming. | User-AI message orchestration. |
| UI Agent | Handles rendering, animation, and state transitions. | Chat bubbles, composer feedback, and loading skeletons. |
| Tool Agent | Integrates with external APIs or data sources. | Search, database fetchers, or knowledge tools. |
| State Agent | Manages Zustand stores for shared data. | Session state, theme mode, or conversation logs. |
| System Agent | Provides lifecycle management, logging, and coordination. | Startup, cleanup, and error boundaries. |

---

## 2. Directory Layout

Agents follow the same directory structure and conventions as the broader frontend project.

```text
/src
  /agents/
    /chat/                     # Conversation orchestrator
      chatAgent.ts             # Handles user-AI chat logic
    /ui/                       # Animation and UI feedback agents
      uiAgent.ts               # Animation, modals, and visual responses
    /tool/                     # API integration agents
      toolAgent.ts             # Communication with backend or tools
    /state/                    # Zustand-powered shared states
      stateAgent.ts            # Application state management
    /system/                   # Boot, teardown, error handling
      systemAgent.ts
  /components/                 # UI building blocks
  /hooks/                      # React hooks (including useAgent hooks)
  /lib/                        # Helper functions for agents
  /stores/                     # Shared Zustand stores
  /types/                      # Agent interfaces and TypeScript types
```

---

## 3. Agent Interface Specification

Each agent module must export a standard interface to ensure consistency:

```typescript
export interface Agent {
  id: string;                     // Unique agent identifier
  type: 'chat' | 'ui' | 'tool' | 'state' | 'system';
  initialize?: () => Promise<void>;
  handleEvent?: (event: AgentEvent) => Promise<AgentResponse>;
  teardown?: () => void;
}
```

Event Interface Example:

```typescript
export interface AgentEvent {
  name: string;
  payload?: unknown;
}
```

Response Interface Example:

```typescript
export interface AgentResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}
```

---

## 4. Coding Standards

Follow the frontend code editing rules from `instructions.md`:

- Clarity and Reuse: Keep each agent's logic modular and decoupled.
- Consistency: Use shared styles and utilities from `/lib` and `/styles`.
- Simplicity: Minimize nested logic and branching.
- No Shadows: Enforce `shadow-none` and use borders or rings for focus and elevation cues.
- Version Control: Adopt the most recent stable release of Next.js, React, Tailwind, and Zustand within one sprint of release.

---

## 5. UI and Interaction Rules

Agents that render or control UI must adhere to these UX best practices:

- Use semantic components from Radix and shadcn/ui.
- Maintain a 4px spacing rhythm across layout and components.
- Support ring-based focus states and ensure accessibility compliance.
- Avoid shadows; rely on contrast, border, or translate-based motion.
- For streaming responses, use `animate-pulse` or skeleton placeholders.

---

## 6. Communication Between Agents

Agents may communicate through a central dispatcher (for example, Zustand or an event bus). Example communication pattern:

```typescript
// dispatch.ts
export const dispatchEvent = (event: AgentEvent) => {
  for (const agent of registeredAgents) {
    if (agent.handleEvent) {
      agent.handleEvent(event);
    }
  }
};
```

Guidelines:

- Avoid direct cross-imports between agents.
- Use shared events or stores for coordination.
- Handle errors gracefully; log through the `systemAgent`.

---

## 7. Testing Standards

Testing follows templates from `/docs/04-testing/`:

| Test Type         | Description                                       |
| ----------------- | ------------------------------------------------- |
| Unit Tests        | Validate isolated agent functions and responses.  |
| Integration Tests | Verify communication between multiple agents.     |
| E2E Tests         | Simulate real user flows across agents and UI.    |
| Regression Tests  | Run after major dependency or architecture changes. |

Each agent module should include a minimal test file:

```text
/tests/unit/agents/chatAgent.test.ts
/tests/integration/agents/toolAgent.integration.test.ts
```

Refer to:

- `docs/04-testing/test-plan.md`
- `docs/04-testing/test-cases.md`

---

## 8. Versioning and Maintenance

- Maintain semantic versioning for each agent module if distributed independently.
- Document new agent types or responsibilities in `docs/03-implementation/technical-manual.md`.
- Deprecate outdated agents gracefully with clear comments and changelog entries.
- Always test new agent interactions in staging before merging to `main`.

---

## 9. Documentation References

This file complements:

- `README.md` - Overall system overview.
- `instructions.md` - Frontend standards and style rules.
- `software-design-document.md` - Agent architecture and module relationships.
- `technical-manual.md` - Developer setup and APIs.
- `test-plan.md` and `test-cases.md` - Validation processes.

---

## 10. Summary

The `AGENTS.md` document ensures consistent development of autonomous, modular, and maintainable agents in this workspace.
All contributors must adhere to these standards to guarantee interoperability, scalability, and visual harmony across the chat-oriented frontend.
