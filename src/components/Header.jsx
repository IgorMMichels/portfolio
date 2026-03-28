import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Header.css'

const navItems = [
  { id: 'inicio', label: 'Início' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'trabalhos', label: 'Trabalhos' },
  { id: 'contato', label: 'Contate-me' }
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const headerRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header scroll animation
      gsap.fromTo(headerRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      )

      // Nav items stagger animation
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
      })
    }, headerRef)

    // Scroll handler
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

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header ref={headerRef} className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <a href="#inicio" className="header-logo">
          <img src="/assets/icon.png" alt="IM" />
        </a>
        
        <nav className="header-nav" ref={navRef}>
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
      </div>
    </header>
  )
}