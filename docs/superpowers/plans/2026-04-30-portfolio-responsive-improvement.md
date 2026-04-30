# Portfolio Responsive & Quality Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix responsive issues across all breakpoints, enable mobile video playback, improve accessibility, performance, and code quality throughout the portfolio.

**Architecture:** Component-by-component modernization. Each component receives responsive fixes, accessibility improvements, performance optimizations, and code quality cleanup. Order: Header → Hero → Timeline → Trabalhos → SobreMim → Contato → Footer → Global styles.

**Tech Stack:** React 18, TypeScript, Tailwind CSS 4, GSAP, Framer Motion, Lenis, Vite

---

## File Structure

**Files to modify:**
- `src/index.css` — Global CSS variables, responsive utilities
- `src/App.css` — Remove unused parallax styles, minimal app wrapper
- `src/components/Header.jsx` → `src/components/Header.tsx` — Responsive navigation
- `src/components/Header.css` — Mobile-first responsive styles
- `src/components/MobileMenu.tsx` — Accessibility improvements
- `src/components/MobileMenu.css` — Dark theme styling
- `src/components/Hero.tsx` — Mobile video support
- `src/components/Hero.css` — Fluid typography, responsive adjustments
- `src/components/Timeline.jsx` → `src/components/Timeline.tsx` — Responsive timeline
- `src/components/Timeline.css` — Mobile-first timeline layout
- `src/components/Trabalhos.jsx` → `src/components/Trabalhos.tsx` — Responsive project cards
- `src/components/Trabalhos.css` — Responsive card sizing
- `src/components/SobreMim.jsx` → `src/components/SobreMim.tsx` — Responsive layout
- `src/components/SobreMim.css` — Fluid grid
- `src/components/Contato.jsx` → `src/components/Contato.tsx` — Responsive contact section
- `src/components/Contato.css` — Fluid spacing
- `src/components/Footer.jsx` → `src/components/Footer.tsx` — Responsive footer
- `src/components/Footer.css` — Mobile adjustments

**Files to create:**
- `src/components/ui/MobileVideoPlayButton.tsx` — Tap-to-play button overlay for mobile

---

### Task 1: Global CSS Cleanup & Responsive Foundation

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.css`

- [ ] **Step 1: Update index.css with responsive utilities and clamp typography**

Add CSS custom properties and utility classes for responsive design at the bottom of `src/index.css` (after the existing `@keyframes` block):

```css
/* --- Responsive Foundation --- */

/* Fluid typography using clamp() */
:root {
  --text-fluid-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-fluid-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-fluid-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-fluid-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --text-fluid-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-fluid-2xl: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);
  --text-fluid-3xl: clamp(1.875rem, 1.4rem + 2.375vw, 2.5rem);
  --text-fluid-4xl: clamp(2.25rem, 1.5rem + 3.75vw, 3.5rem);
  --text-fluid-hero: clamp(2.5rem, 1.5rem + 5vw, 5rem);
}

/* Section padding responsive */
.section {
  padding: var(--spacing-xl) var(--spacing-md);
}

@media (max-width: 768px) {
  .section {
    padding: var(--spacing-lg) var(--spacing-sm);
  }
}

@media (max-width: 430px) {
  .section {
    padding: var(--spacing-md) 0.75rem;
  }
}

/* Focus visible for accessibility */
:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 2px;
}

/* Skip to content link (accessibility) */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent-cyan);
  color: var(--bg-primary);
  padding: 8px 16px;
  z-index: 10000;
  font-weight: 600;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}

/* Section title responsive */
.section-title {
  font-size: var(--text-fluid-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.title-number {
  color: var(--accent-cyan);
  font-size: var(--text-fluid-xl);
  font-weight: 400;
}

@media (max-width: 430px) {
  .section-title {
    margin-bottom: var(--spacing-md);
  }
}

/* Container responsive */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

@media (max-width: 768px) {
  .container {
    padding: 0 var(--spacing-sm);
  }
}

@media (max-width: 430px) {
  .container {
    padding: 0 0.75rem;
  }
}
```

- [ ] **Step 2: Remove duplicate section-title styles from component CSS files**

The `.section-title` and `.title-number` classes are now in `index.css`. Remove them from:
- `src/components/SobreMim.css` — remove lines 6-19
- `src/components/Contato.css` — remove lines 17-29 (the local `.section-title` and `.title-number` overrides)

- [ ] **Step 3: Clean up App.css**

Replace `src/App.css` content with:

```css
.app {
  position: relative;
  min-height: 100vh;
}
```

The `.parallax-section` and `.parallax-scrolling__layers` classes are unused in App.tsx and should be removed. If they're used elsewhere, they should live in the component's own CSS.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/App.css src/components/SobreMim.css src/components/Contato.css
git commit -m "refactor: add responsive foundation CSS with fluid typography and clean up unused styles"
```

---

### Task 2: Header & Mobile Menu — Responsive + Accessibility + TypeScript

**Files:**
- Create: `src/components/Header.tsx`
- Modify: `src/components/Header.css`
- Modify: `src/components/MobileMenu.tsx`
- Modify: `src/components/MobileMenu.css`

- [ ] **Step 1: Convert Header.jsx to Header.tsx**

Create `src/components/Header.tsx`:

```tsx
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './ui/smooth-scroll'
import './Header.css'
import MobileMenu from './MobileMenu'
import './MobileMenu.css'

const navItems = [
  { id: 'inicio', label: 'Início' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'trabalhos', label: 'Trabalhos' },
  { id: 'contato', label: 'Contate-me' }
] as const

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const headerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      )

      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
      })
    }, headerRef)

    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 50)

      const sections = navItems.map(item => document.getElementById(item.id))
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(navItems[index].id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const lenis = useLenis()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    }
  }

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen])

  return (
    <header ref={headerRef} className={`header ${scrolled ? 'scrolled' : ''}`} role="banner">
      <div className="header-container">
        <button className="header-logo" onClick={() => scrollToSection('inicio')} aria-label="Go to top">
          <div className="logo-container">
            <span className="logo-text">IM</span>
            <svg
              className="logo-circle"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="8 4"
              />
            </svg>
          </div>
        </button>

        <nav className="header-nav" ref={navRef} role="navigation" aria-label="Main navigation">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          aria-label={mobileOpen ? "Close menu" : "Open mobile menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
        >
          <span className="hamburger" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} navItems={navItems} onNavigate={scrollToSection} />
    </header>
  )
}
```

- [ ] **Step 2: Update Header.css with improved responsive styles**

Replace `src/components/Header.css`:

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 16px 0;
  transition: background 0.3s ease;
}

.header.scrolled {
  background: rgba(5, 6, 10, 0.95);
  backdrop-filter: blur(10px);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.header-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
}

.logo-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.logo-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 13px;
  font-weight: 300;
  color: #fff;
  z-index: 10;
}

.logo-circle {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.3);
  animation: spin-slow 12s linear infinite;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.header-nav {
  display: flex;
  gap: 32px;
  align-items: center;
}

.mobile-menu-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.mobile-menu-btn:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 2px;
}

.mobile-menu-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-menu-btn .hamburger {
  display: inline-block;
  width: 22px;
  height: 16px;
  position: relative;
}

.mobile-menu-btn .hamburger span {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #fff;
  border-radius: 1px;
  transition: transform 0.3s, opacity 0.3s;
}

.mobile-menu-btn .hamburger span:first-child { top: 0; }
.mobile-menu-btn .hamburger span:nth-child(2) { top: 7px; }
.mobile-menu-btn .hamburger span:last-child { top: 14px; }

.nav-item {
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  position: relative;
  padding: 8px 0;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.nav-item:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 4px;
  border-radius: 4px;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple));
  transition: width 0.3s ease;
}

.nav-item:hover,
.nav-item.active {
  color: var(--text-primary);
}

.nav-item:hover::after,
.nav-item.active::after {
  width: 100%;
}

@media (max-width: 768px) {
  .header-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: inline-flex;
  }

  .header-container {
    padding: 0 16px;
  }
}

@media (min-width: 769px) {
  .mobile-menu-btn {
    display: none;
  }
}
```

- [ ] **Step 3: Update MobileMenu.tsx with dark theme and better accessibility**

Replace `src/components/MobileMenu.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';

type NavItem = { id: string; label: string };

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navItems: readonly NavItem[];
  onNavigate: (id: string) => void;
};

export default function MobileMenu({ isOpen, onClose, navItems, onNavigate }: MobileMenuProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const lenis = useLenis();
  const [closing, setClosing] = useState(false);

  const handleNavigate = (id: string) => {
    setClosing(true);
    onNavigate(id);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  };

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusable?.[0];
      firstFocusable?.focus();

      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }
        if (e.key !== 'Tab') return;
        const focusables = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        ) || []);
        if (focusables.length === 0) return;
        const current = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (current === focusables[0]) {
            e.preventDefault();
            focusables[focusables.length - 1]?.focus();
          }
        } else {
          if (current === focusables[focusables.length - 1]) {
            e.preventDefault();
            focusables[0]?.focus();
          }
        }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    } else if (previousFocus.current) {
      previousFocus.current.focus();
    }
  }, [isOpen, onClose]);

  if (!isOpen && !closing) return null;

  return (
    <div className={`mobile-drawer-backdrop ${closing ? 'closing' : ''}`}>
      <div className="mobile-drawer-overlay" onClick={onClose} aria-hidden="true" />
      <aside
        id="mobile-drawer"
        ref={drawerRef}
        className={`mobile-drawer ${closing ? 'closing' : ''}`}
        role="navigation"
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}
      >
        <button
          className="mobile-drawer-close"
          onClick={() => { setClosing(true); setTimeout(onClose, 200); }}
          aria-label="Close menu"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button onClick={() => handleNavigate(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
```

- [ ] **Step 4: Update MobileMenu.css with dark theme matching the site**

Replace `src/components/MobileMenu.css`:

```css
.mobile-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
}

.mobile-drawer-backdrop.closing {
  opacity: 0;
  transition: opacity 0.2s;
}

.mobile-drawer-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.mobile-drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: min(85vw, 320px);
  height: 100%;
  background: var(--bg-secondary);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
  padding: 1.5rem 1.5rem 2rem;
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.mobile-drawer.closing {
  transform: translateX(100%);
}

.mobile-drawer-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.mobile-drawer-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-drawer-close:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 2px;
}

.mobile-drawer nav ul {
  list-style: none;
  padding: 0;
  margin: 4rem 0 0 0;
}

.mobile-drawer nav ul li {
  margin: 8px 0;
}

.mobile-drawer nav ul li button {
  text-decoration: none;
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px 16px;
  width: 100%;
  text-align: left;
  border-radius: 8px;
  transition: background-color 0.2s;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.mobile-drawer nav ul li button:hover {
  background: rgba(255, 255, 255, 0.05);
}

.mobile-drawer nav ul li button:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: -2px;
}

@media (min-width: 769px) {
  .mobile-drawer-backdrop,
  .mobile-drawer-overlay,
  .mobile-drawer {
    display: none;
  }
}
```

- [ ] **Step 5: Update App.tsx to use the new TypeScript Header**

In `src/App.tsx`, the import `import Header from './components/Header'` will automatically resolve to `.tsx` now. No change needed to the import line — Vite prefers `.tsx` over `.jsx` when both exist. After the new file is created, delete the old `.jsx`:

```bash
rm src/components/Header.jsx
```

- [ ] **Step 6: Run lint and tests, commit**

```bash
npm run lint
```

```bash
git add src/components/Header.tsx src/components/Header.css src/components/MobileMenu.tsx src/components/MobileMenu.css src/App.tsx
git commit -m "feat: convert Header to TypeScript, improve MobileMenu with dark theme, add accessibility and responsive fixes"
```

---

### Task 3: Hero — Mobile Video Playback + Fluid Typography

**Files:**
- Create: `src/components/ui/MobileVideoPlayButton.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Hero.css`

- [ ] **Step 1: Create MobileVideoPlayButton component**

Create `src/components/ui/MobileVideoPlayButton.tsx`:

```tsx
import { Play } from 'lucide-react'

interface MobileVideoPlayButtonProps {
  onPlay: () => void;
}

export default function MobileVideoPlayButton({ onPlay }: MobileVideoPlayButtonProps) {
  return (
    <button
      className="mobile-video-play-btn"
      onClick={onPlay}
      aria-label="Play video"
    >
      <Play size={32} fill="white" />
      <span className="mobile-video-play-label">Tap to play</span>
    </button>
  )
}
```

- [ ] **Step 2: Update Hero.tsx with mobile video support**

Replace `src/components/Hero.tsx`:

```tsx
import { useRef, useEffect, memo, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'
import './Hero.css'
import MobileVideoPlayButton from './ui/MobileVideoPlayButton'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  onVideoComplete?: () => void;
}

const Hero = memo(function Hero({ onVideoComplete }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobilePlaying, setMobilePlaying] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useLenis()

  const handleVideoComplete = useCallback(() => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.removeAttribute('src')
      video.load()
      video.src = ''
    }

    if (!videoEnded) {
      setVideoEnded(true)
      setShowContent(true)

      if (onVideoComplete) {
        onVideoComplete()
      }
    }
  }, [videoEnded, onVideoComplete])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onEnded = () => {
      handleVideoComplete()
    }

    const playVideo = async () => {
      try {
        await video.play()
      } catch (e) {
        console.log('Auto-play prevented, using timer fallback')
      }
    }

    if (!isMobile) {
      if (video.readyState >= 2) {
        playVideo()
      } else {
        video.addEventListener('loadeddata', playVideo)
      }
      video.addEventListener('ended', onEnded)
    }

    return () => {
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('loadeddata', playVideo)
    }
  }, [handleVideoComplete, isMobile])

  const handleMobilePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    setMobilePlaying(true)
    video.play().catch(() => {
      setMobilePlaying(false)
    })
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isMobile) return

    const onEnded = () => {
      handleVideoComplete()
    }

    if (mobilePlaying) {
      video.addEventListener('ended', onEnded)
    }

    return () => {
      video.removeEventListener('ended', onEnded)
    }
  }, [handleVideoComplete, isMobile, mobilePlaying])

  useEffect(() => {
    if (!showContent) return

    const ctx = gsap.context(() => {
      gsap.from(['.hero-greeting', '.hero-name', '.hero-roles', '.hero-scroll-indicator'], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })

      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '30% top',
          scrub: true
        },
        opacity: 0,
        y: -30
      })
    }, heroRef)

    return () => ctx.revert()
  }, [showContent])

  return (
    <section id="inicio" ref={heroRef} className="hero">
      <div className="hero-video-container">
        {!videoEnded ? (
          <>
            <video
              ref={videoRef}
              src="/assets/VideoIgor.mp4"
              className="hero-video"
              muted
              playsInline
              loop={false}
              autoPlay={false}
              poster="/assets/VideoIgor-last-frame.jpg"
            />
            {isMobile && !mobilePlaying && (
              <MobileVideoPlayButton onPlay={handleMobilePlay} />
            )}
          </>
        ) : (
          <img
            src="/assets/VideoIgor-last-frame.jpg"
            alt="Igor Michels"
            className="hero-video"
          />
        )}
        <div className="hero-overlay" />
      </div>

      <div className="hero-background-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      {showContent && (
        <div className="hero-content" ref={contentRef}>
          <div className="hero-content-inner">
            <p className="hero-greeting">Olá, eu sou</p>
            <h1 className="hero-name">
              <span className="name-gradient">IGOR MICHELS</span>
            </h1>
            <div className="hero-roles">
              <p className="hero-role">Desenvolvedor Front-End</p>
              <p className="hero-role-sub">Entusiasta em Inteligência Artificial</p>
            </div>
          </div>
        </div>
      )}

      {showContent && (
        <div className="hero-scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
        </div>
      )}
    </section>
  )
})

export default Hero
```

- [ ] **Step 3: Add mobile video play button styles to Hero.css**

Add these styles at the end of `src/components/Hero.css`:

```css
/* Mobile video play button */
.mobile-video-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 16px 24px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  min-width: 44px;
  min-height: 44px;
}

.mobile-video-play-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translate(-50%, -50%) scale(1.05);
}

.mobile-video-play-btn:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 2px;
}

.mobile-video-play-label {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
}

/* Desktop: hide play button */
@media (min-width: 769px) {
  .mobile-video-play-btn {
    display: none;
  }
}
```

- [ ] **Step 4: Update Hero.css with fluid typography**

Replace the font-size declarations in existing media queries with clamp-based values. In `src/components/Hero.css`, update:

Replace `.hero-name` font-size:
```css
.hero-name {
  font-size: var(--text-fluid-hero);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -1px;
}
```

Replace `.hero-greeting`:
```css
.hero-greeting {
  font-size: var(--text-fluid-lg);
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.5px;
}
```

Replace `.hero-role`:
```css
.hero-role {
  font-size: var(--text-fluid-xl);
  color: var(--text-primary);
  font-weight: 600;
}
```

Replace `.hero-role-sub`:
```css
.hero-role-sub {
  font-size: var(--text-fluid-base);
  color: var(--text-muted);
  font-weight: 400;
}
```

Remove the `@media (max-width: 1024px)` and `@media (max-width: 768px)` blocks that only change font-sizes (since clamp handles this now). Keep only responsive layout adjustments (centering, padding).

- [ ] **Step 5: Run dev server and test, commit**

```bash
npm run dev
```

Test at: 320px, 430px, 768px (mobile), 1024px (tablet), 1280px (desktop). Verify video play button appears on mobile.

```bash
git add src/components/Hero.tsx src/components/Hero.css src/components/ui/MobileVideoPlayButton.tsx
git commit -m "feat: enable mobile video playback with tap-to-play button, add fluid typography"
```

---

### Task 4: Timeline — Responsive Layout

**Files:**
- Create: `src/components/Timeline.tsx`
- Modify: `src/components/Timeline.css`

- [ ] **Step 1: Convert Timeline.jsx to Timeline.tsx**

Create `src/components/Timeline.tsx`:

```tsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Timeline.css'

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    year: '2021',
    title: 'Primeiro contato com programação',
    description: 'Iniciei minha jornada criando um jogo no Roblox com um amigo, focando na parte de construção e desenvolvimento do ambiente.'
  },
  {
    year: '2023',
    title: 'Fundamentos de programação',
    description: 'Aprendi Python e lógica de programação, entendendo como estruturar códigos e desenvolver soluções simples.'
  },
  {
    year: '2024',
    title: 'Primeiro website',
    description: 'Criei meu primeiro site utilizando HTML, CSS e JavaScript, com apoio de inteligência artificial.'
  },
  {
    year: '2025',
    title: 'Evolução técnica',
    description: 'Iniciei no Instituto Federal Catarinense, aprofundando conhecimentos em lógica, JavaScript, HTML, CSS e Python.'
  },
  {
    year: '2026',
    title: 'Foco em sistemas e IA',
    description: 'Passei a focar na criação de projetos escaláveis, trabalhando com empresas, banco de dados e aprendendo Vue.js com apoio de IA.'
  }
]

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.section-title', {
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 1
        },
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none'
      })

      const items = sectionRef.current?.querySelectorAll('.timeline-item')
      items?.forEach((item) => {
        const direction = -30

        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          x: direction,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        })

        const node = item.querySelector('.timeline-node')
        gsap.from(node, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          scale: 0,
          duration: 0.5,
          ease: 'back.out(1.7)'
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="timeline" className="timeline section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">02.</span> Minha Jornada
        </h2>

        <div className="timeline-container">
          <div className="timeline-line" ref={lineRef} />

          {timelineItems.map((item) => (
            <div
              key={item.year}
              className="timeline-item"
            >
              <div className="timeline-node">
                <div className="node-inner" />
              </div>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update Timeline.css with mobile-first responsive layout**

Replace `src/components/Timeline.css`:

```css
.timeline {
  background: var(--bg-primary);
  position: relative;
}

.timeline-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-lg) 0;
}

.timeline-line {
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    180deg,
    var(--accent-cyan) 0%,
    var(--accent-purple) 50%,
    var(--accent-cyan) 100%
  );
  box-shadow:
    0 0 15px rgba(6, 182, 212, 0.6),
    0 0 30px rgba(168, 85, 247, 0.4);
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-xl);
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-node {
  position: absolute;
  left: 20px;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: var(--bg-primary);
  border-radius: 50%;
  border: 3px solid var(--accent-cyan);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: var(--shadow-glow-cyan);
  flex-shrink: 0;
}

.node-inner {
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
  border-radius: 50%;
  box-shadow:
    0 0 15px var(--accent-cyan),
    0 0 30px var(--accent-purple);
  animation: nodePulse 2s ease-in-out infinite;
}

@keyframes nodePulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

.timeline-content {
  width: calc(100% - 60px);
  margin-left: auto;
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  text-align: left;
}

.timeline-content:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.timeline-year {
  font-size: var(--text-fluid-2xl);
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
  margin-bottom: var(--spacing-xs);
  line-height: 1;
}

.timeline-title {
  font-size: var(--text-fluid-lg);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.timeline-description {
  font-size: var(--text-fluid-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Desktop: alternating layout */
@media (min-width: 769px) {
  .timeline-line {
    left: 50%;
  }

  .timeline-node {
    left: 50%;
    width: 24px;
    height: 24px;
  }

  .node-inner {
    width: 10px;
    height: 10px;
  }

  .timeline-item {
    align-items: center;
  }

  .timeline-item:nth-child(odd) .timeline-content {
    margin-right: auto;
    margin-left: 0;
    text-align: right;
  }

  .timeline-item:nth-child(even) .timeline-content {
    margin-left: auto;
    margin-right: 0;
    text-align: left;
  }

  .timeline-content {
    width: calc(50% - 40px);
  }
}
```

- [ ] **Step 3: Delete old .jsx, commit**

```bash
rm src/components/Timeline.jsx
git add src/components/Timeline.tsx src/components/Timeline.css
git commit -m "feat: convert Timeline to TypeScript with mobile-first responsive layout"
```

---

### Task 5: Trabalhos (Projects) — Responsive Cards

**Files:**
- Create: `src/components/Trabalhos.tsx`
- Modify: `src/components/Trabalhos.css`

- [ ] **Step 1: Convert Trabalhos.jsx to Trabalhos.tsx**

Create `src/components/Trabalhos.tsx`:

```tsx
import { ImagesScrollingAnimation, Project } from './ui/images-scrolling-animation'
import './Trabalhos.css'

const projects: Project[] = [
  {
    id: 1,
    image: '/assets/economizae4k.webp',
    title: 'Economizae',
    description: 'Projeto pessoal criado para divulgação de links de afiliados com foco em monetização digital. Plataforma otimizada para conversão e automação de ofertas.',
    tech: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://economizae.com',
  },
  {
    id: 2,
    image: '/assets/fechandoAsPorteiras4k.webp',
    title: 'Fechando as Porteiras',
    description: 'Projeto desenvolvido para expandir uma marca no nicho de bikes, incluindo sistema de eventos e inscrições online.',
    tech: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://www.fechandoasporteiras.com.br/',
  },
  {
    id: 3,
    image: '/assets/solusMotoBombas02.webp',
    title: 'Solus Motobombas',
    description: 'Website institucional focado na divulgação de produtos e serviços, facilitando o contato entre clientes e a empresa.',
    tech: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://solus-motobombas.vercel.app/',
  },
  {
    id: 4,
    image: '/assets/fitlyApp.webp',
    title: 'FitlyApp',
    description: 'Projeto escolar desenvolvido para o IFC, com foco em auxiliar no processo de emagrecimento através de uma plataforma digital.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://fitlyapp.com.br',
  },
  {
    id: 5,
    image: '/assets/imok.webp',
    title: 'Imok',
    description: 'Projeto pessoal voltado para um futuro empreendimento, com foco em facilitar o contato com clientes e permitir assinatura de serviços diretamente pelo site.',
    tech: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://imok.vercel.app',
  },
  {
    id: 6,
    image: '/assets/cecy.webp',
    title: 'CECY Advocacia',
    description: 'Website feito para o escritório especializado de advocacia do Matheus Cecy, com foco em captar mais clientes para seu negócio.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://cecy.adv.br/',
  }
]

export default function Trabalhos() {
  return (
    <section id="trabalhos" className="trabalhos section" style={{ background: 'linear-gradient(180deg, rgba(5, 6, 10, 1) 0%, rgba(5, 6, 10, 1) 100%)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">03.</span> Trabalhos
        </h2>

        <div className="scroll-cards-wrapper">
          <ImagesScrollingAnimation projects={projects} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update Trabalhos.css for responsive card sizing**

Replace `src/components/Trabalhos.css`:

```css
.trabalhos {
  background: var(--bg-primary);
  position: relative;
  padding-top: 8rem;
  padding-bottom: 8rem;
}

@media (min-width: 769px) {
  .trabalhos {
    padding-top: 16rem;
    padding-bottom: 16rem;
  }
}

.scroll-cards-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.projects-container {
  position: relative;
  height: 300vh;
  width: 100%;
}

@media (max-width: 768px) {
  .projects-container {
    height: 250vh;
  }
}

@media (max-width: 430px) {
  .projects-container {
    height: 200vh;
  }
}

.project-card-container {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.project-card {
  display: block;
  width: 90%;
  max-width: 900px;
  aspect-ratio: 16 / 9;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .project-card {
    width: 95%;
    border-radius: 16px;
  }
}

@media (max-width: 430px) {
  .project-card {
    width: 100%;
    border-radius: 12px;
  }
}

.project-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover img {
  transform: scale(1.03);
}

.project-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5, 6, 10, 0.85) 0%,
    rgba(5, 6, 10, 0.3) 40%,
    transparent 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 3rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

@media (max-width: 768px) {
  .project-card-overlay {
    opacity: 1;
    padding: 2rem;
  }
}

.project-card:hover .project-card-overlay {
  opacity: 1;
}

.project-card-title {
  font-size: var(--text-fluid-2xl);
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}
```

- [ ] **Step 3: Update images-scrolling-animation.tsx for responsive card width**

In `src/components/ui/images-scrolling-animation.tsx`, update the `cardWidth` and `rotate` logic in the `StickyCard` component. Replace lines 75-77:

```tsx
  // Mobile: no rotation, simpler stacking
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 769
  const rotate = isMobile ? 0 : isFirst ? 0 : isLast ? 0.5 : (i % 2 === 1 ? -0.5 : 0.5)
  const cardWidth = isMobile ? '100%' : (i > 0 ? `${99 + i * 2}vw` : '99vw')
```

Also update the card motion div className to remove the `max-w-screen` constraint on mobile. Replace lines 91-93:

```tsx
        className={`group relative -top-1/4 flex origin-top flex-col overflow-hidden rounded-lg
                   bg-neutral-900
                   outline-none w-[min(100%,900px)] mx-auto`}
```

- [ ] **Step 4: Delete old .jsx, commit**

```bash
rm src/components/Trabalhos.jsx
git add src/components/Trabalhos.tsx src/components/Trabalhos.css src/components/ui/images-scrolling-animation.tsx
git commit -m "feat: convert Trabalhos to TypeScript with responsive card sizing and reduced mobile scroll height"
```

---

### Task 6: SobreMim — Responsive Grid + TypeScript

**Files:**
- Create: `src/components/SobreMim.tsx`
- Modify: `src/components/SobreMim.css`

- [ ] **Step 1: Convert SobreMim.jsx to SobreMim.tsx**

Create `src/components/SobreMim.tsx`:

```tsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as Icons from '@icons-pack/react-simple-icons'
import { Cpu, Code2, Sparkles } from 'lucide-react'
import './SobreMim.css'

const sobreTexto = `Sou desenvolvedor front-end com experiência em HTML, CSS e JavaScript, além de conhecimentos em Node.js e Vue.js. Estou em constante evolução, aprofundando meus estudos em tecnologias como JavaScript, Python, Lua, MySQL, Node.js e Vue.js, com foco em criar aplicações eficientes e escaláveis. Tenho grande interesse por inteligência artificial, já tendo explorado ferramentas como MCP Servers, Claude Code e Open Code, além de estar iniciando em prompt engineering. Busco unir desenvolvimento e automação para criar soluções modernas, funcionais e com impacto real, desenvolvendo não apenas aplicações, mas sistemas que resolvem problemas e geram valor.`

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  'React': Icons.SiReact,
  'Vue.js': Icons.SiVuedotjs,
  'HTML': Icons.SiHtml5,
  'CSS': Icons.SiCss3,
  'JavaScript': Icons.SiJavascript,
  'Node.js': Icons.SiNodedotjs,
  'Python': Icons.SiPython,
  'MySQL': Icons.SiMysql,
  'PostgreSQL': Icons.SiPostgresql,
  'Lua': Icons.SiLua,
  'Claude Code': Icons.SiAnthropic,
}

interface TechIconProps {
  name: string;
}

const TechIcon = ({ name }: TechIconProps) => {
  const IconComponent = iconMap[name]

  if (name === 'MCP Servers') {
    return (
      <span className="skill-icon" title={name}>
        <Cpu size={20} strokeWidth={1.5} />
      </span>
    )
  }

  if (name === 'Open Code') {
    return (
      <span className="skill-icon" title={name}>
        <Code2 size={20} strokeWidth={1.5} />
      </span>
    )
  }

  if (name === 'Prompt Engineering') {
    return (
      <span className="skill-icon" title={name}>
        <Sparkles size={20} strokeWidth={1.5} />
      </span>
    )
  }

  if (IconComponent) {
    return (
      <span className="skill-icon" title={name}>
        <IconComponent size={20} />
      </span>
    )
  }

  return (
    <span className="skill-icon" title={name}>
      <Icons.SiJavascript size={20} />
    </span>
  )
}

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: ['React', 'Vue.js', 'HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Python', 'MySQL', 'PostgreSQL', 'Lua']
  },
  {
    title: 'IA & Automação',
    skills: ['MCP Servers', 'Claude Code', 'Open Code', 'Prompt Engineering']
  }
]

export default function SobreMim() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.section-title', {
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      gsap.from('.sobre-text', {
        scrollTrigger: {
          trigger: '.sobre-text',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      const skillCats = sectionRef.current?.querySelectorAll('.skill-category')
      skillCats?.forEach((cat, i) => {
        gsap.from(cat, {
          scrollTrigger: {
            trigger: cat,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: 'power3.out'
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="sobre" className="sobre-mim section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">01.</span> Sobre Mim
        </h2>

        <div className="sobre-content">
          <div className="sobre-text">
            <p>{sobreTexto}</p>
          </div>

          <div className="sobre-skills">
            {skillCategories.map((category) => (
              <div key={category.title} className="skill-category">
                <h3>{category.title}</h3>
                <div className="skill-tags">
                  {category.skills.map(skill => (
                    <span key={skill} className="skill-tag">
                      <TechIcon name={skill} />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update SobreMim.css with responsive adjustments**

Replace `src/components/SobreMim.css`:

```css
.sobre-mim {
  background: var(--bg-primary);
  position: relative;
}

.sobre-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: start;
}

.sobre-text p {
  font-size: var(--text-fluid-base);
  line-height: 1.8;
  color: var(--text-secondary);
}

.sobre-skills {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.skill-category h3 {
  font-size: var(--text-fluid-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.skill-tag::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.skill-icon {
  width: 1.8rem;
  height: 1.8rem;
  color: rgba(255, 255, 255, 0.6);
  transition: all var(--transition-fast);
  animation: iconFloat 3s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skill-icon svg {
  width: 100%;
  height: 100%;
}

.skill-tag:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-4px);
}

.skill-tag:hover::before {
  opacity: 1;
}

.skill-tag:hover .skill-icon {
  color: rgba(255, 255, 255, 1);
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
  animation: iconGlow 0.3s ease-out forwards;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes iconGlow {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

@media (max-width: 768px) {
  .sobre-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .sobre-text p {
    font-size: var(--text-fluid-sm);
  }

  .skill-tags {
    gap: 0.375rem;
  }

  .skill-tag {
    width: 2.5rem;
    height: 2.5rem;
  }

  .skill-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}

@media (max-width: 430px) {
  .skill-tag {
    width: 2.25rem;
    height: 2.25rem;
  }

  .skill-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
```

- [ ] **Step 3: Delete old .jsx, commit**

```bash
rm src/components/SobreMim.jsx
git add src/components/SobreMim.tsx src/components/SobreMim.css
git commit -m "feat: convert SobreMim to TypeScript with responsive grid and fluid typography"
```

---

### Task 7: Contato — Responsive + TypeScript

**Files:**
- Create: `src/components/Contato.tsx`
- Modify: `src/components/Contato.css`

- [ ] **Step 1: Convert Contato.jsx to Contato.tsx**

Create `src/components/Contato.tsx`:

```tsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contato.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contato() {
  const sectionRef = useRef<HTMLElement>(null)
  const email = 'igor.marcon.michels@gmail.com'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.status-text', {
        scrollTrigger: {
          trigger: '.status-text',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      })

      gsap.from('.contato-heading', {
        scrollTrigger: {
          trigger: '.contato-heading',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out'
      })

      gsap.from('.contato-message', {
        scrollTrigger: {
          trigger: '.contato-message',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      })

      gsap.from('.contato-button', {
        scrollTrigger: {
          trigger: '.contato-button',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contato" className="contato section" ref={sectionRef}>
      <div className="container">
        <div className="contato-content">
          <span className="status-text">Disponível para novos projetos</span>

          <h3 className="contato-heading">Vamos construir algo?</h3>

          <p className="contato-message">
            Busco colaborar em projetos que envolvam desenvolvimento, automação e tecnologia, criando soluções eficientes e com impacto real.
          </p>

          <a href={`mailto:${email}`} className="contato-button" aria-label={`Send email to ${email}`}>
            Entrar em contato
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update Contato.css**

Replace `src/components/Contato.css`:

```css
.contato {
  background: linear-gradient(180deg, var(--bg-primary) 0%, rgba(5, 6, 10, 0.95) 100%);
  position: relative;
  text-align: center;
}

.contato-content {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.status-text {
  font-size: var(--text-fluid-xs);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-cyan);
  opacity: 0.8;
}

.contato-heading {
  font-size: var(--text-fluid-4xl);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contato-message {
  font-size: var(--text-fluid-base);
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 500px;
}

.contato-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
  border: 1px solid rgba(34, 211, 238, 0.4);
  border-radius: 8px;
  font-size: var(--text-fluid-base);
  font-weight: 600;
  color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-height: 44px;
  min-width: 44px;
  text-decoration: none;
}

.contato-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.contato-button:hover {
  border-color: rgba(34, 211, 238, 0.8);
  box-shadow:
    0 0 20px rgba(34, 211, 238, 0.4),
    0 0 40px rgba(34, 211, 238, 0.2),
    0 0 60px rgba(168, 85, 247, 0.15);
  transform: translateY(-2px);
}

.contato-button:hover::before {
  left: 100%;
}

.contato-button:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 4px;
}

@media (max-width: 768px) {
  .contato-content {
    gap: var(--spacing-sm);
  }

  .contato-message {
    padding: 0 0.5rem;
  }

  .contato-button {
    width: 100%;
    max-width: 300px;
  }
}
```

- [ ] **Step 3: Delete old .jsx, commit**

```bash
rm src/components/Contato.jsx
git add src/components/Contato.tsx src/components/Contato.css
git commit -m "feat: convert Contato to TypeScript with responsive layout and focus states"
```

---

### Task 8: Footer — TypeScript + Responsive

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/components/Footer.css`

- [ ] **Step 1: Convert Footer.jsx to Footer.tsx**

Create `src/components/Footer.tsx`:

```tsx
import './Footer.css'

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const socials: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/IgorMMichels/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/igor-marcon-michels-3b068b360/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    )
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/igormichels_',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  {
    name: 'Email',
    url: 'mailto:igor.marcon.michels@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    )
  }
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-socials">
          {socials.map(social => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label={`Visit ${social.name}`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <p className="footer-text">
          &copy; {new Date().getFullYear()} Igor Michels. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Update Footer.css with focus states**

Replace `src/components/Footer.css`:

```css
.footer {
  padding: var(--spacing-lg) 0;
  background: var(--bg-primary);
  border-top: 1px solid rgba(34, 211, 238, 0.1);
  text-align: center;
}

.footer-socials {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.footer-social {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.footer-social:hover {
  color: var(--accent-cyan);
  transform: translateY(-3px);
}

.footer-social:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 2px;
}

.footer-text {
  font-size: var(--text-fluid-xs);
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .footer {
    padding: var(--spacing-md) 0;
  }

  .footer-socials {
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }

  .footer-social {
    width: 40px;
    height: 40px;
  }
}
```

- [ ] **Step 3: Delete old .jsx, commit**

```bash
rm src/components/Footer.jsx
git add src/components/Footer.tsx src/components/Footer.css
git commit -m "feat: convert Footer to TypeScript with proper accessibility and focus states"
```

---

### Task 9: Remaining .jsx conversions + Cleanup

**Files:**
- `src/components/AnimatedSection.jsx` → `src/components/AnimatedSection.tsx`
- `src/components/FadeIn.jsx` → `src/components/FadeIn.tsx`
- `src/components/ShinyText.jsx` → `src/components/ShinyText.tsx`
- `src/components/SocialSidebar.jsx` → `src/components/SocialSidebar.tsx`
- `src/components/Background.jsx` → `src/components/Background.tsx`

- [ ] **Step 1: Convert AnimatedSection.jsx to TypeScript**

Create `src/components/AnimatedSection.tsx`:

```tsx
import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AnimatedSection.css'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export default function AnimatedSection({ children, className = '', direction = 'up' }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const getDirectionOffset = () => {
    switch (direction) {
      case 'left': return { x: -50, y: 0 }
      case 'right': return { x: 50, y: 0 }
      case 'up': return { x: 0, y: -50 }
      case 'down': return { x: 0, y: 50 }
      default: return { x: 0, y: 50 }
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const { x, y } = getDirectionOffset()

      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        x,
        y,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [direction])

  return (
    <div ref={sectionRef} className={`animated-section ${className}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Convert FadeIn.jsx to TypeScript**

Create `src/components/FadeIn.tsx`:

```tsx
import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FadeIn.css'

gsap.registerPlugin(ScrollTrigger)

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay,
        ease: 'power3.out'
      })
    }, ref)

    return () => ctx.revert()
  }, [delay])

  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Convert ShinyText.jsx to TypeScript**

Create `src/components/ShinyText.tsx`:

```tsx
import './ShinyText.css'

interface ShinyTextProps {
  text: string;
  className?: string;
}

export default function ShinyText({ text, className = '' }: ShinyTextProps) {
  return (
    <span className={`shiny-text ${className}`}>
      {text}
    </span>
  )
}
```

- [ ] **Step 4: Convert SocialSidebar.jsx to TypeScript**

Create `src/components/SocialSidebar.tsx`:

```tsx
import './SocialSidebar.css'

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const socials: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/IgorMMichels/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/igor-marcon-michels-3b068b360/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    )
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/igormichels_',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  }
]

export default function SocialSidebar() {
  return (
    <div className="social-sidebar" aria-label="Social links">
      {socials.map(social => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label={`Visit ${social.name}`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Convert Background.jsx to TypeScript**

Create `src/components/Background.tsx`:

```tsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import './Background.css'

export default function Background() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.bg-gradient', {
        backgroundPosition: '200% 200%',
        duration: 10,
        repeat: -1,
        ease: 'none'
      })
    }, bgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={bgRef} className="app-background" aria-hidden="true">
      <div className="bg-gradient" />
    </div>
  )
}
```

- [ ] **Step 6: Delete all old .jsx files, commit**

```bash
rm src/components/AnimatedSection.jsx src/components/FadeIn.jsx src/components/ShinyText.jsx src/components/SocialSidebar.jsx src/components/Background.jsx
git add src/components/AnimatedSection.tsx src/components/FadeIn.tsx src/components/ShinyText.tsx src/components/SocialSidebar.tsx src/components/Background.tsx
git commit -m "refactor: convert remaining .jsx components to TypeScript"
```

---

### Task 10: Add Skip-to-Content Link + Semantic HTML in App.tsx

**Files:**
- Modify: `src/App.tsx`
- Modify: `index.html`

- [ ] **Step 1: Add skip-to-content link to App.tsx**

Update `src/App.tsx` — add skip link before the header:

```tsx
import Header from './components/Header'
import Hero from './components/Hero'
import SobreMim from './components/SobreMim'
import Timeline from './components/Timeline'
import Trabalhos from './components/Trabalhos'
import Contato from './components/Contato'
import SocialSidebar from './components/SocialSidebar'
import Footer from './components/Footer'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { Cursor } from './components/ui/inverted-cursor'
import { useState } from 'react'
import { SmoothScroll } from './components/ui/smooth-scroll'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [videoStarted, setVideoStarted] = useState(false)

  const handleLoadingComplete = () => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    setIsLoading(false)
    setVideoStarted(true)
  }

  const handleVideoComplete = () => {
    setVideoStarted(false)
  }

  return (
    <SmoothScroll initialLock={videoStarted}>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {!isLoading && (
        <>
          <a href="#main-content" className="skip-link">
            Pular para o conteúdo principal
          </a>
          <Cursor />
          <div className="app">
            <Header />
            <SocialSidebar />

            <main id="main-content">
              <Hero onVideoComplete={handleVideoComplete} />
              <SobreMim />
              <Timeline />
              <Trabalhos />
              <Contato />
            </main>

            <Footer />
          </div>
        </>
      )}
    </SmoothScroll>
  )
}

export default App
```

- [ ] **Step 2: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add skip-to-content link for accessibility"
```

---

### Task 11: Verification & Final Testing

**Files:**
- Run tests and build

- [ ] **Step 1: Run TypeScript type check**

```bash
npm run build
```

Expected: No TypeScript errors, successful build.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No linting errors.

- [ ] **Step 3: Run unit tests**

```bash
npm test
```

Expected: All tests pass.

- [ ] **Step 4: Run e2e tests**

```bash
npm run test:e2e
```

Expected: All Playwright tests pass.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final verification — all tests passing, responsive improvements complete"
```

---

## Verification Checklist

After all tasks are complete, verify:

- [ ] **Responsive:** Test at 320px, 430px, 768px, 1024px, 1280px — no horizontal overflow, readable text, touch targets ≥44px
- [ ] **Mobile video:** Play button appears on mobile ≤768px, video plays on tap, ends correctly
- [ ] **Accessibility:** Skip link works, all interactive elements have focus-visible, ARIA labels present, keyboard navigation works in mobile menu
- [ ] **Code quality:** No `.jsx` files remain in `src/components/` (except `ui/` which may have `.tsx` already), TypeScript strict mode passes
- [ ] **Performance:** No bundle size increase beyond what's necessary for TypeScript types
