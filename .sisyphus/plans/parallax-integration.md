# Work Plan: Parallax Integration & Video Scrub Fix

## Objective
Integrate a complex React+GSAP+Lenis component with Tailwind and TypeScript into an existing JS+CSS React project, and fix an existing video scroll-scrub issue.

## Context
- **Current Stack**: React + Vite + JS + standard CSS.
- **Goal**: Auto-setup TS/Tailwind/shadcn, integrate a provided Parallax component using `@studio-freight/lenis` and GSAP, and re-implement a robust video scroll-scrub effect in `Hero.jsx`.
- **Key Challenges**:
  1. The project lacks Tailwind, TypeScript, and the standard `shadcn` structure (`src/components/ui`).
  2. Lenis and GSAP ScrollTrigger must be explicitly synced via the GSAP ticker with lag smoothing disabled.
  3. Video scrubbing requires binding a GSAP timeline to the video's `currentTime`.

## Scope
- **IN SCOPE**:
  - Auto-configuring Tailwind CSS, PostCSS, and a base `tsconfig.json`.
  - Creating `src/components/ui` folder to house the `parallax-scrolling.tsx` component.
  - Adding `@studio-freight/lenis` and wiring it into `App.jsx` with proper GSAP sync.
  - Adding `lucide-react` for any SVG icons in the component.
  - Re-adding the scroll scrub to `Hero.jsx` using a robust GSAP timeline approach.
- **OUT OF SCOPE**:
  - Full project conversion to TypeScript (we are only setting up TS so `.tsx` components can compile, existing `.jsx` files will remain as is).
  - Re-encoding the video asset (we will work with the current `.mp4` and focus on JS implementation).

## Execution Strategy
The execution agent (Sisyphus) will implement this plan in waves to ensure dependencies are installed and configured before components are built.

### Wave 1: Dependency Setup (Tailwind, TS, GSAP, Lenis)

```typescript
task(category="quick", load_skills=["git-master"], run_in_background=false, prompt=`
  [CONTEXT]: We need to setup Tailwind CSS and TypeScript in a Vite + React JS project.
  [GOAL]: Install dependencies and create config files.
  [ACTION]:
  1. Install tailwindcss, postcss, autoprefixer, typescript, @studio-freight/lenis, and lucide-react.
  2. Initialize Tailwind (create tailwind.config.js and postcss.config.js).
  3. Create a basic tsconfig.json suitable for a Vite React project.
  4. Ensure existing App.css or index.css imports Tailwind directives (@tailwind base, etc.).
  [QA]: Package.json has new dependencies, config files exist, and CSS has directives.
`)
```

### Wave 1 Completed
- [x] Baseline repo readiness check

### Wave 2: shadcn Initialization

```typescript
task(category="visual-engineering", load_skills=["frontend-ui-ux"], run_in_background=false, prompt=`
  [CONTEXT]: We are adding a component to the standard shadcn UI structure.
  [GOAL]: Create the src/components/ui directory and prepare it.
  [ACTION]:
  1. Create the src/components/ui folder.
  2. Explain in a README.md inside the ui folder why this structure is standard for shadcn projects.
  [QA]: src/components/ui exists.
`)
```

## Final Verification Wave

### [x] Wave 3: Integration of `parallax-scrolling.tsx`

```markdown
- [x] Wave 3: Integration of parallax-scrolling.tsx
```

### Wave 4: Lenis + GSAP Global Synchronization

```markdown
- [x] Wave 4: Wire Lenis into App.tsx globally and sync with GSAP ScrollTrigger
- [ ] Pass shared Lenis instance to ParallaxScrolling component
- [ ] Validate ScrollTrigger updates across sections and breakpoints
```

### [x] Wave 4: Lenis + GSAP Global Synchronization
```markdown
- [x] Wave 4: Wire Lenis into App.tsx globally and sync with GSAP ScrollTrigger
- [x] Pass shared Lenis instance to ParallaxScrolling component
- [x] Validate ScrollTrigger updates across sections and breakpoints
```

### Wave 5: Fix Video Scrubbing in Hero.jsx

```typescript
task(category="deep", load_skills=["frontend-ui-ux"], run_in_background=false, prompt=`
  [CONTEXT]: The video in Hero.jsx lost its frame-by-frame scrubbing behavior when we cleaned up overlapping ScrollTriggers.
  [GOAL]: Re-implement the scrub using a safer GSAP timeline that interacts correctly with Lenis.
  [ACTION]:
  1. Read Hero.jsx.
  2. Implement a robust video scrub.
     Since the forum explicitly advises against using CSS/native scroll for heavy video without a smooth proxy, Lenis is perfect here.
     Implement the GSAP hook using the video duration and the scroll progress.
  3. Ensure no overlapping or redundant GSAP timelines cause jank.
  [QA]: Video scrubs smoothly forward and backward with Lenis scrolling.
`)
```

## Final Verification Wave
Run `npm run build` and `npm run dev` to ensure everything compiles. Open browser to confirm Lenis smooth scrolling, parallax effect, and Hero video scrubbing.

### Wave 6: Tests for Parallax & Video Scrub
```
- [ ] Wave 6: Add unit tests for ParallaxScrolling component (renders with mock images)
- [ ] Wave 6: Integrate automated tests for Lenis + GSAP sync (smoke test of scroll triggers)
- [ ] Wave 6: End-to-end tests for Hero.jsx video scrubbing (timeline scrubbing correctness)

### Wave 7: Implement CardsParallax UI (Scroll Cards) for Trabalhos

- [ ] Task 7.1: Create `src/components/ui/scroll-cards.tsx` that renders a `CardsParallax` using a five-item dataset. Ensure 90vw container width at desktop, responsive behavior, and lazy-loaded images.
- [ ] Task 7.2: Extend iCardItem to support `techStack: string[]` and `color`, `textColor`, and `image` fields; update dataset accordingly.
- [ ] Task 7.3: Wire the dataset into `src/components/Trabalhos.jsx` to render the new scroll cards section (replace or augment existing `ImagesScrollingAnimation`).
- [ ] Task 7.4: Add a simple Barrel export (e.g., `src/components/ui/index.ts`) to export `CardsParallax` for easy imports as `ui/scroll-cards`.
- [ ] Task 7.5: Update tests to cover the new UI (unit test for 5-card render, Playwright smoke test for the 90vw container).

### Wave 8: Testing & Verification
- [ ] 1) Add unit tests for CardsParallax rendering (ensuring 5 cards render with correct props)
- [ ] 2) Add Playwright end-to-end smoke test for the 90vw container in Trabalhos (scroll triggers and image lazy-loading)
- [ ] 3) Validate accessibility: alt text on images and ARIA labels on icons
- [ ] 4) Verify Lenis/GSAP integration remains stable after CardsParallax changes

### Wave 9: Final Integration & Cleanup
- [ ] 1) Confirm plan completeness and commit final changes
- [ ] 2) Ensure barrel exports and imports resolve (ui/index.ts) and downstream imports across the app
- [ ] 3) Run full build and basic sanity checks in CI
```
