## Parallax Integration
- The ParallaxScrolling component requires `@studio-freight/lenis` for smooth scrolling, which was missing and had to be installed.
- The component renders a list of images that move at different speeds using GSAP ScrollTrigger.
- Added CSS to display the images in a responsive grid layout to enhance the parallax effect.
Lenis, GSAP, and Tailwind TS integration steps are the priority. Tailwind v4 requires @tailwindcss/postcss in postcss.config.js. tsconfig.json needs ignoreDeprecations: 6.0 for baseUrl in TS 6.0.
## Parallax Integration & Video Scrub Fix
- Integrated global Lenis using ReactLenis in App.tsx.
- Synced GSAP ScrollTrigger with Lenis using useLenis hook.
- Implemented video scrubbing in Hero.jsx using GSAP ScrollTrigger.
- Resolved Lenis conflict by removing local Lenis root from ImagesScrollingAnimation.tsx.

## Wave 2: shadcn Initialization
- Verified `src/components/ui` directory exists and contains a `README.md` documenting shadcn-like UI conventions.
- Created `src/components/ui/parallax-scrolling.tsx` as a minimal valid React TSX component stub.
- The component is a placeholder for future parallax scrolling integration with Lenis and GSAP.
- No runtime changes or dependencies were added, keeping the scaffolding lightweight and ready for downstream waves.
