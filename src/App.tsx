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
    // Scroll to top on page load for video animation
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    setIsLoading(false)
    // After loading, start video and lock scroll
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
          <Cursor />
          <div className="app">
            <Header />
            <SocialSidebar />
            
            <main>
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
