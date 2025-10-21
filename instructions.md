# Frontend Standards

Guidelines for building and maintaining the chat-oriented frontend in this workspace.

---

## Stack Snapshot

- Frameworks: Next.js 15.5.2 (TypeScript) with React 18.3.1 and HTML
- Styling / UI: Tailwind CSS 4.1.13, shadcn/ui 3.4.0, Radix Themes (current stable ~3.0.x)
- Icons: Material Symbols (latest), Heroicons (latest 2.1.x), Lucide 0.452.0
- Animation: Framer Motion 11.3.16 or Motion One 10.17.x
- Fonts: Sans-serif family (Inter, Geist, Mona Sans, IBM Plex Sans, Manrope)

### Latest Versions

| Technology | Latest Version | Notes |
| --- | --- | --- |
| Next.js (TypeScript/React Framework) | 15.5.2 | Latest stable release noted in the Oct 2025 blog roundup. |
| React / React DOM | 18.3.1 | Current GA release; upgrade immediately when a new stable lands. |
| Tailwind CSS | 4.1.13 | Current v4 minor with redesigned config flow. |
| shadcn/ui | 3.4.0 | Latest tag from the component library monorepo. |
| Radix Primitives | 1.1.3 | Monolithic `@radix-ui/primitive` release. |

---

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

Directory layout:

```text
/src
  /app
    /api/<route>/route.ts         # API endpoints
    /(pages)                      # Page routes
  /components/                    # UI building blocks
  /hooks/                         # Reusable React hooks
  /lib/                           # Utilities (fetchers, helpers)
  /stores/                        # Zustand stores
  /types/                         # Shared TypeScript types
  /styles/                        # Tailwind configuration
```

### Component Defaults

- Cards, modals, popovers, and tooltips: `shadow-none`; use borders and rings for layering.
- Buttons: Use rings or `translate-y-[1px]` for active states; no shadows.
- Inputs and selects: Apply `ring-1` focus states and clear border treatments; no shadows.

---

## UI and UX Best Practices

- **Hierarchy & Typography:** Cap the system at four or five text sizes/weights. Reserve `text-xl` for hero or headline elements, lean on `text-base` for body copy, and use `text-xs` for captions, status pills, and timestamps.
- **Color System:** Anchor the palette with a single neutral family (zinc or stone) and layer no more than two accent hues. Derive semantic tokens (`bg-muted`, `text-primary`, `border-accent`) so themes stay consistent across pages.
- **Spacing & Layout:** Keep the 4px rhythm everywhere; padding, margin, and gap utilities should be multiples of four. Prefer fixed-height regions with internal scrolling for chat logs, sidebars, and history panes to preserve header/composer alignment.
- **States & Feedback:** Use skeletons or `animate-pulse` rows while conversations stream. Communicate interactivity with ring utilities, subtle background shifts, or 1-2px translations; avoid shadows entirely.
- **Accessibility & Semantics:** Leverage semantic landmarks (`<main>`, `<nav>`, `<section>`) and accessible primitives from Radix/shadcn. Ensure focus-visible states meet contrast ratios and that live regions announce streaming responses when required.

---

## Documentation Structure

```text
project-root/
|- README.md                  # Introduction, setup, architecture overview
|- LICENSE.md                 # Project license terms
|- CODE_OF_CONDUCT.md         # Community behavior expectations
|- CONTRIBUTING.md            # Contribution workflow and conventions
|- SECURITY.md                # Security policy and disclosure process
|- SUPPORT.md                 # How to get help or report issues
|- CHANGELOG.md               # Release history and notable changes
|- docs/
|  |- 00-overview/
|  |  |- project-proposal.md          # Concept note, objectives, high-level scope
|  |  |- feasibility-study.md         # Technical, operational, economic viability
|  |  |- project-plan.md              # Timeline, milestones, responsibilities
|  |- 01-requirements/
|  |  |- srs.md                       # Functional & non-functional requirements
|  |  |- user-stories.md              # User narratives and acceptance criteria
|  |  |- requirements-traceability-matrix.md # Mapping between requirements and validation
|  |- 02-design/
|  |  |- software-design-document.md  # Modules, interfaces, system behavior
|  |  |- system-architecture.md       # Architecture strategy and deployment view
|  |  |- database-design.md           # Schema definitions, ER modeling
|  |  |- interface-design.md          # UI structure, navigation flows
|  |- 03-implementation/
|  |  |- configuration-management-plan.md # Versioning, build, and release controls
|  |  |- technical-manual.md          # Developer setup, APIs, dependencies
|  |- 04-testing/
|  |  |- test-plan.md                 # Strategy, scope, environments
|  |  |- test-cases.md                # Individual tests with expected outcomes
|  |- 05-operations/
|  |  |- deployment-guide.md          # Steps to deploy, configure, and rollback
|  |  |- maintenance-support-plan.md  # Post-launch upkeep and escalation paths
|  |  |- user-manual.md               # End-user installation and usage guidance
|  |  |- training-material.md         # Internal education resources
|  |  |- release-notes.md             # Feature, fix, and known issue summaries
|  |- 06-management/
|     |- risk-management.md           # Identified risks with mitigation plans
|     |- project-closure-report.md    # Outcomes, metrics, lessons learned
|- .github/
|  |- ISSUE_TEMPLATE/
|  |  |- bug_report.yml               # Template for logging defects
|  |  |- feature_request.yml          # Template for proposing enhancements
|  |- PULL_REQUEST_TEMPLATE.md        # Checklist and prompts for PR submissions
|  |- workflows/
|     |- ci.yml                       # Main CI pipeline for format, lint, build, and test on PRs
|- tests/
|  |- unit/                          # Fast checks for isolated logic
|  |- integration/                   # Validates interaction between modules
|  |- e2e/                           # End-to-end user journey coverage
|  |- regression/                    # Guards against functional regressions
|  |- performance/                   # Load, stress, and benchmarking suites
```

---

## Notes

- Remove or override any third-party shadows with `shadow-none`.
- Favor reusable primitives over large page-specific components.
- Document new patterns in `docs/03-development` to keep contributors aligned.

---

## Testing Templates

### Test Plan Template (`docs/04-testing/test-plan.md`)

**Project Name:**  
**Version:**  
**Module / Feature:**  
**Prepared By:**  
**Date:**  

1. **Introduction**  
   Describe the purpose and objectives of the test plan, what will be tested, and the overall approach.

2. **Test Objectives**  
   Example goals:
   - Ensure all functional requirements are met.  
   - Validate performance, reliability, and usability.  
   - Identify and resolve defects before release.

3. **Scope**
   - **In-Scope:** Features, modules, or flows covered during this cycle.  
   - **Out-of-Scope:** Items excluded from testing.

4. **Test Strategy**  
   Outline the testing approach, for example:
   - Unit Testing -> Automated by developers  
   - Integration Testing -> Manual and automated API validation  
   - System Testing -> End-to-end workflow checks  
   - Regression Testing -> After every build deployment  
   - UAT -> Final validation by business users

5. **Test Environment**  
   Document operating systems, databases, tools, and URLs (QA, staging, etc.).

6. **Test Deliverables**  
   Typical outputs: test plan, test cases, data files, execution report, defect report, summary report.

7. **Schedule**

   | Activity | Start Date | End Date | Owner |
   | --- | --- | --- | --- |
   | Test Design | | | |
   | Environment Setup | | | |
   | Test Execution | | | |
   | Retesting / Regression | | | |
   | Test Closure | | | |

8. **Entry Criteria**  
   Conditions before testing starts (e.g., code deployed to QA, test data ready, docs available).

9. **Exit Criteria**  
   Conditions to finish testing (e.g., all cases executed, no critical defects open, summary approved).

10. **Risk and Mitigation**

    | Risk | Impact | Mitigation Strategy |
    | --- | --- | --- |
    | | | |

11. **Tools and Automation**  
    List tools and frameworks (e.g., Selenium, Cypress, JMeter, Jenkins, TestRail, Jira).

12. **Metrics and Reporting**  
    Define measurement (execution percentage, defect density, coverage, pass/fail ratio).

13. **Test Closure**  
    Outline closure steps: final summary, close defects, run retrospective.

### Test Cases Template (`docs/04-testing/test-cases.md`)

**Project Name:**  
**Module / Feature:**  
**Prepared By:**  
**Date:**  
**Version:**  

1. **Introduction**  
   Briefly describe the functionality covered by these test cases.

2. **Test Case Summary**

   | Test Case ID | Test Scenario | Test Type | Priority | Status |
   | --- | --- | --- | --- | --- |
   | TC001 | Verify user login with valid credentials | Functional | High | Ready |
   | TC002 | Verify error message on invalid password | Functional | Medium | Ready |

3. **Detailed Test Cases**

   - **Test Case ID:** TC001  
     - Scenario: Verify user login with valid credentials  
     - Preconditions: User account exists  
     - Test Data: `user1@example.com` / `Pass@123`  
     - Steps:  
       1. Navigate to login page  
       2. Enter valid credentials  
       3. Click "Login"  
     - Expected Result: User is redirected to the dashboard.  
     - Actual Result: _(fill after execution)_  
     - Status: Pass / Fail / Blocked / Not Run  
     - Comments: _(optional)_

   - **Test Case ID:** TC002  
     - Scenario: Verify error message on invalid password  
     - Preconditions: User account exists  
     - Test Data: `user1@example.com` / `Wrong@123`  
     - Steps:  
       1. Navigate to login page  
       2. Enter username and invalid password  
       3. Click "Login"  
     - Expected Result: Error message "Invalid username or password."  
     - Actual Result: _(fill after execution)_  
     - Status: Pass / Fail / Blocked / Not Run  
     - Comments: _(optional)_

4. **Traceability Matrix**

   | Requirement ID | Test Case ID(s) | Remarks |
   | --- | --- | --- |
   | REQ-001 | TC001, TC002 | Login functionality validated |

5. **Test Data**  
   Enumerate required datasets (user accounts, payment credentials, API tokens, etc.).

6. **Execution Summary**

   | Total Test Cases | Passed | Failed | Blocked | Not Run |
   | --- | --- | --- | --- | --- |
   | 50 | 45 | 3 | 1 | 1 |

7. **Defect Reference**

   | Test Case ID | Defect ID | Severity | Status | Comments |
   | --- | --- | --- | --- | --- |
   | TC010 | BUG-123 | High | Fixed | Retested successfully |

8. **Notes / Observations**  
   Capture environment issues, special cases, or follow-ups.
