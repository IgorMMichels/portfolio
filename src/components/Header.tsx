import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
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
