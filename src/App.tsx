import Header from './components/Header'
import Hero from './components/Hero'
import SobreMim from './components/SobreMim'
import Timeline from './components/Timeline'
import Trabalhos from './components/Trabalhos'
import Contato from './components/Contato'
import SocialSidebar from './components/SocialSidebar'
import Footer from './components/Footer'
import Background from './components/Background'
import ParallaxScrolling from './components/ui/parallax-scrolling'
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const parallaxImages = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2147&q=80",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
]

function App() {
  const lenisRef = useRef<any>(null)
  useEffect(() => {
    // Initialize Lenis for global smooth scrolling and GSAP integration
    const lenis = new Lenis()
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)
    // Refresh ScrollTrigger after everything is mounted
    // This ensures all triggers calculate correct positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    // Also refresh on resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="app">
      <Background />
      <Header />
      <SocialSidebar />
      
      <main>
        <Hero />
        <section className="parallax-section" style={{ padding: '4rem 2rem', background: 'transparent', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--text-primary)', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 'bold' }}>
              Galeria
            </h2>
            <ParallaxScrolling images={parallaxImages} lenis={lenisRef.current} />
          </div>
        </section>
        <SobreMim />
        <Timeline />
        <Trabalhos />
        <Contato />
      </main>
      
      <Footer />
    </div>
  )
}

export default App
