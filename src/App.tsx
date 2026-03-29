import Header from './components/Header'
import Hero from './components/Hero'
import SobreMim from './components/SobreMim'
import Timeline from './components/Timeline'
import Trabalhos from './components/Trabalhos'
import Contato from './components/Contato'
import SocialSidebar from './components/SocialSidebar'
import { Footer7 } from './components/ui/footer-7'
import Background from './components/Background'
import { Cursor } from './components/ui/inverted-cursor'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { useState } from 'react'
import LenisWrapper from './LenisWrapper'
import ParallaxDemo from './ParallaxDemo'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <LenisWrapper>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <div className={`app cursor-none transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Cursor size={24} />
      <Background />
      <Header />
      <SocialSidebar />
      
      <main>
        <Hero />
        <ParallaxDemo />
        <SobreMim />
        <Timeline />
        <Trabalhos />
        <Contato />
      </main>
      
      <Footer7 />
      </div>
    </LenisWrapper>
  )
}

export default App
