## Plan: Tailwind + TypeScript + Shadcn scaffolding

```markdown
## 1. TASK
- [ ] Wave 1: Baseline repo readiness and scaffolding for Tailwind, TS, and shadcn UI

## 2. EXPECTED OUTCOME
- [ ] Files created/modified: tailwind.config.js, postcss.config.js, tsconfig.json (optional), src/globals.css, src/components/ui directory with README
- [ ] Functionality: Project can compile TSX files; Tailwind directives present in CSS; UI scaffold present
- [ ] Verification: tailwind.config.js exists; postcss.config.js exists; tsconfig.json exists or rationale documented; src/globals.css includes Tailwind directives

## 3. REQUIRED TOOLS
- [tool]: Create config files using standard templates; ensure content paths cover src/**/*.{ts,tsx,js,jsx}
- context7: Reference shadcn UI scaffolding steps for a Vite + React project
- ast-grep: Not required for this wave; file scaffolding only

## 4. MUST DO
- Create Tailwind config and PostCSS config with standard setup
- Create tsconfig.json with minimal viable TypeScript support for TSX
- Create src/globals.css containing Tailwind directives
- Create src/components/ui directory for shadcn UI scaffolding; add a README explaining structure
- Ensure the repo builds (no breaking changes)

## 5. MUST NOT DO
- Do NOT modify existing JS components beyond scaffolding; do not remove existing logic
- Do NOT overspec the UI; keep scaffolding minimal
- Do NOT skip verification steps

## 6. CONTEXT
### Notepad Paths
- READ: .sisyphus/notepads/{plan-name}/*.md
- WRITE: Append findings to notepads under the corresponding plan

### Inherited Wisdom
- Tailwind + shadcn scaffolding requires a UI directory (src/components/ui) to host TSX components
- Lenis integration is planned separately once scaffolding exists

### PLAN RATIONALE
- Establish a solid UI scaffolding foundation, enabling consistent design tokens and fast UI development

### Dependencies
- This wave relies on Tailwind, PostCSS, TS tooling; Lenis/GSAP wiring occurs in subsequent waves

### Acceptance Criteria
- Tailwind config and PostCSS config exist
- tsconfig.json exists or rationale provided for using TS selectively
- src/globals.css contains Tailwind directives
- src/components/ui directory exists with a README explaining the shadcn-style architecture
```
