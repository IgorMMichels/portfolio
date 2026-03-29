# Wave 7: Implement CardsParallax UI (Scroll Cards) for Trabalhos

## 1. TASK
- [ ] Implement `CardsParallax` UI component for the `Trabalhos` section.
- [ ] Render a 5-card dataset with a responsive 90vw container on desktop.
- [ ] Ensure images are lazy-loaded and accessible.
- [ ] Wire the new component into `src/components/Trabalhos.jsx`.

## 2. EXPECTED OUTCOME
- [ ] **Files created/modified**:
  - `src/components/ui/scroll-cards.tsx`: Implements the `CardsParallax` component.
  - `src/types/index.ts` (or equivalent): Extend `iCardItem` to support `techStack: string[]`, `color`, `textColor`, `image` fields.
  - `src/components/Trabalhos.jsx`: Render the new cards, replacing or augmenting `ImagesScrollingAnimation`.
  - `src/components/ui/index.ts`: Add barrel export for `CardsParallax`.
  - `tests/components/scroll-cards.test.tsx`: Unit tests for rendering 5 cards.
  - `tests/e2e/trabalhos.spec.ts`: Playwright smoke tests for scroll interaction.
- [ ] **Verification**: All new tests pass; UI renders correctly at 90vw and on smaller breakpoints; assets lazy-load as expected.

## 3. REQUIRED TOOLS
- **React + TypeScript**: For component implementation.
- **Vitest + Playwright**: For unit and end-to-end testing.
- **context7**: Reference for responsive design best practices and accessible SVG icons.
- **ast-grep**: Validate file structure and test definitions follow existing conventions.

## 4. MUST DO
- Create the new UI folder structure (`src/components/ui`) and TSX skeletons without touching existing runtime logic.
- Implement the `CardsParallax` UI with a minimal dataset and placeholder images to ensure tests can run.
- Wire the dataset into `Trabalhos.jsx` so the UI renders in the Trabalhos page.
- Create a barrel export file at `src/components/ui/index.ts` exporting `CardsParallax` and any dependencies.
- Add unit tests for 5-card rendering and a basic integration test for the new component.
- Document the decisions and usage in notepad receipts (`.sisyphus/notepads/parallax-integration/learnings.md`).

## 5. MUST NOT DO
- Do NOT modify the existing 5-card dataset if not necessary; keep changes isolated to the new component and its wiring.
- Do NOT add heavy dependencies; keep dependencies aligned with existing UI tooling (e.g., GSAP/Lenis).
- Do NOT bypass accessibility requirements (e.g., `alt` tags, ARIA roles) or testing.

## 6. CONTEXT
- **Notepad Paths**:
  - READ: `.sisyphus/notepads/parallax-integration/learnings.md`
  - WRITE: Append findings to `.sisyphus/notepads/parallax-integration/learnings.md`
- **Inherited Wisdom**: Wave 6 established reliable testing and Lenis/GSAP interaction; keep the testing patterns consistent and avoid regressing the scroll syncing in this wave.
- **Dependencies**: This wave expands on the UI layer; it will feed into downstream tests and Verifications in Wave 8 and beyond.

## Wave 7 Learnings
- CSS `sticky` is highly effective for creating parallax stacking effects and works seamlessly with Lenis smooth scrolling.
- When testing GSAP animations with Playwright, `scrollIntoViewIfNeeded` can timeout because the element is animating and not considered "stable". Using `page.evaluate` to scroll and `toBeVisible` with a timeout is a more reliable approach.
- The `CardsParallax` component successfully renders a 5-card dataset with responsive design (90vw container) and lazy-loaded images.

## Wave 8 Learnings
- Running multiple Playwright tests in parallel can lead to timeouts in resource-constrained environments (like CI or local dev with many workers). Reducing worker count or increasing timeouts is necessary for stability.
- Waiting for the loading screen to be `hidden` (state: 'hidden') is more reliable than waiting for the app container to have a specific class, as it ensures the overlay is no longer blocking interactions.
- JSDOM (used by Vitest) requires manual mocking of `HTMLMediaElement` properties like `duration` and `readyState` using `Object.defineProperty` since it doesn't fully implement the HTML5 Video API.
- GSAP `ScrollTrigger.refresh()` is crucial after dynamic content loads or after a short delay on mount to ensure scroll positions are correctly calculated, especially when using smooth scrolling libraries like Lenis.
