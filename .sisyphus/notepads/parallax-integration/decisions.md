## Parallax Integration
- Decided to add the ParallaxScrolling component as a new section in `App.tsx` between `Hero` and `SobreMim` instead of replacing the `Hero` video background, to preserve the existing design and provide a dedicated gallery section.
- Added custom CSS in `App.css` to style the parallax layers as a grid, ensuring the images don't overlap awkwardly when moving at different speeds.
## Decisions
- Used ReactLenis for global scroll management to simplify context sharing.
- Used GSAP context for proper cleanup of ScrollTriggers.
