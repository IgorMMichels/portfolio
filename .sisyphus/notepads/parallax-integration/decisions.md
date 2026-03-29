## Parallax Integration
- Decided to add the ParallaxScrolling component as a new section in `App.tsx` between `Hero` and `SobreMim` instead of replacing the `Hero` video background, to preserve the existing design and provide a dedicated gallery section.
- Added custom CSS in `App.css` to style the parallax layers as a grid, ensuring the images don't overlap awkwardly when moving at different speeds.
## Decisions
- Used ReactLenis for global scroll management to simplify context sharing.
- Used GSAP context for proper cleanup of ScrollTriggers.
<analysis>
**Literal Request**: Explore current wave statuses and plan.
**Actual Need**: Provide status summary and next steps.
**Success Looks Like**: 6-section block appended.
</analysis>

<results>
- /C:/Users/igor/Documents/portfolioo/.sisyphus/boulder.json
- /C:/Users/igor/Documents/portfolioo/.sisyphus/plans/parallax-integration.md
- /C:/Users/igor/Documents/portfolioo/src/App.tsx
- /C:/Users/igor/Documents/portfolioo/src/LenisWrapper.tsx
</results>

<answer>
The current active plan is ralph-loop.local.md as indicated by boulder.json. Wave 4-6 tasks are described in the plan and in the notepads learnings/decisions. Lenis/GSAP integration exists in LenisWrapper.tsx and App.tsx, with ParallaxDemo and placeholder ParallaxScrolling component ready for downstream wiring.
</answer>

<next_steps>
- Continue with Wave 4 tasks: wire Lenis to ParallaxScrolling and propagate instance.
- Create issues.md and problems.md to track blockers.
- Validate Wave 5 scrub and Wave 6 tests.
</next_steps>
## Wave 4 Decision Record
- Decision: Proceed with Wave 4 delegation to implement a shared Lenis wrapper (SmoothScroll) and remove duplicate Lenis usage in App.tsx
- Rationale: A single Lenis instance is required to prevent scroll conflicts and ensure GSAP ScrollTrigger remains synchronized across all sections
- Risks: Potential TS typing issues with Lenis; ensure cleanup of ticker listeners; ensure ParallaxScrolling consumes the Lenis reference safely
- Next steps: Create Wave 4 task prompt and implement in code; update notepads with status
## Wave 4: Decisions
- Used `lenis/react` for the wrapper component as it provides a more idiomatic React integration.
- Chose to use GSAP's ticker to drive Lenis's `raf` method to ensure perfect sync between smooth scrolling and GSAP animations.
- Removed `'use client'` directives to maintain a clean Vite-based codebase.

## Wave 5: Video Scrubbing Re-implementation
- Decision: Re-implemented video scrubbing in `Hero.jsx` using a dedicated GSAP timeline linked to `ScrollTrigger`.
- Rationale: Using a timeline provides better control and ensures synchronization with the global Lenis scroll progress.
- Implementation: Used `scrub: true` for direct mapping between scroll and video time, and `ease: 'none'` for linear scrubbing.
- Cleanup: Ensured `gsap.context` handles `ScrollTrigger` cleanup and removed manual event listeners on unmount.

## Wave 7: CardsParallax UI
- Decision: Implemented `CardsParallax` using CSS `sticky` positioning for the stacking effect, which naturally integrates with Lenis smooth scrolling without complex JS calculations.
- Decision: Added GSAP `ScrollTrigger` to animate the cards' opacity and vertical position as they enter the viewport, enhancing the visual experience.
- Decision: Updated Playwright tests to handle the GSAP animations by waiting for elements to become visible and using `page.evaluate` for scrolling to avoid stability timeouts.

## Wave 8: Testing & Verification
- Decision: Unified all Playwright tests to use a common `baseURL` and relative paths to ensure consistency across different environments.
- Decision: Increased global Playwright timeout to 60s and test-specific timeouts to handle the initial loading screen and smooth scroll animations more reliably.
- Decision: Explicitly excluded `.spec.ts` files from Vitest to prevent it from attempting to run Playwright tests as unit tests.
- Decision: Added edge case testing for video scrubbing, specifically handling `NaN` duration to prevent GSAP errors when video metadata is not yet available.
