# Portfolio Responsive & Quality Improvement Design

**Date:** 2026-04-30
**Scope:** Comprehensive responsive fixes, performance, accessibility, and code quality improvements for Igor Michels' portfolio site.
**Approach:** Component-by-component modernization (Approach 2)

## Problem

The portfolio has partial responsive implementation with issues across mobile, tablet, and desktop breakpoints. Code quality is inconsistent (mix of `.jsx` and `.tsx`, duplicated CSS). Performance needs optimization. Accessibility is incomplete.

## Architecture

### Components in Scope (order of execution)

1. `Header` + `MobileMenu` - Navigation, responsive hamburger
2. `Hero` - Video background (must work on mobile), text overlay
3. `Timeline` - Scroll-based timeline
4. `Trabalhos` - Projects grid/cards
5. `SobreMim` - About section
6. `Contato` - Contact section
7. `Footer` - Footer layout
8. Global styles - `index.css`, `globals.css`, `App.css`

### Per-Component Checklist

Each component receives:
- **Responsive:** 320px, 430px, 768px, 1024px, 1280px+ breakpoints
- **Performance:** Image optimization, lazy loading, code splitting
- **Accessibility:** ARIA labels, keyboard nav, focus states, color contrast (WCAG AA)
- **Code quality:** TypeScript consistency, CSS cleanup, pattern modernization

## Responsive Strategy

- Mobile-first CSS with media queries at 320px, 430px, 768px, 1024px, 1280px
- Tailwind utilities where possible, minimal custom CSS
- `clamp()` for fluid typography
- CSS Grid `minmax()` + `auto-fill` instead of breakpoint media queries
- Minimum 44px touch targets on mobile
- No fixed widths; use max-width with percentages

## Mobile Video

- Video must play on mobile with tap-to-play button overlay
- Keep `playsInline` + `muted` (required for iOS)
- Poster image (`VideoIgor-last-frame.jpg`) as loading fallback
- After playback ends, show poster image
- Test on iOS Safari, Chrome Android, Samsung Internet

## Performance

- Compress `VideoIgor.mp4`; add WebM alternative with fallback
- Lazy load all non-critical images with `loading="lazy"` + IntersectionObserver
- Use existing `optimized-image.tsx` component consistently
- Preload critical Google Fonts
- Audit bundle: three.js, GSAP, framer-motion are heavy; only load what's needed
- Remove unused dependencies

## Accessibility

- ARIA labels on all interactive elements (started in Header)
- `:focus-visible` states on buttons, links, interactive elements
- Keyboard navigation for mobile menu, timeline, project cards
- Color contrast: WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Semantic HTML (nav, main, section, footer)
- Skip-to-content link
- Proper heading hierarchy (h1 → h2 → h3)

## Code Quality

- Convert all `.jsx` files to `.tsx` with proper types
- Remove duplicated CSS, use CSS variables from `index.css`
- Consolidate overlapping Tailwind classes
- Consistent import ordering
- Remove unused variables and dead code

## Testing

- Manual testing on dev server at breakpoints: 320px, 430px, 768px, 1024px, 1280px
- Run existing Playwright e2e tests
- Run Vitest unit tests
- Lighthouse performance score target: >80
- Lighthouse accessibility score target: >90
