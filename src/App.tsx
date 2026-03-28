import Header from './components/Header'
import Hero from './components/Hero'
import SobreMim from './components/SobreMim'
import Timeline from './components/Timeline'
import Trabalhos from './components/Trabalhos'
import Contato from './components/Contato'
import SocialSidebar from './components/SocialSidebar'
import { MinimalFooter } from './components/ui/minimal-footer'
import Background from './components/Background'
import { Cursor } from './components/ui/inverted-cursor'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 0.8,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <div className={`app cursor-none transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Cursor size={24} />
      <Background />
      <Header />
      <SocialSidebar />
      
      <main>
        <Hero />
        <SobreMim />
        <Timeline />
        <Trabalhos />
        <Contato />
      </main>
      
      <MinimalFooter />
      </div>
    </>
  )
}

export default App
