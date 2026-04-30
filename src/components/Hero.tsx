import { useRef, useEffect, memo, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'
import './Hero.css'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  onVideoComplete?: () => void
}

const Hero = memo(function Hero({ onVideoComplete }: HeroProps) {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Ensure we're hooked into the Lenis lifecycle
  useLenis()

  // Handle video completion
  const handleVideoComplete = useCallback(() => {
    const video = videoRef.current
    if (video) {
      // Clean up video from memory
      video.pause()
      video.removeAttribute('src')
      video.load()
      // Force garbage collection hint
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

    // Listen for video ended event
    const onVideoEnded = () => {
      handleVideoComplete()
    }

    // Wait for video to be ready, then play
    const playVideo = async () => {
      try {
        await video.play()
      } catch (e) {
        // Auto-play was prevented, fallback to timer
        console.log('Auto-play prevented, using timer fallback')
      }
    }

    // On desktop, allow auto-play; on mobile, do not auto-play
    if (!isMobile) {
      if (video.readyState >= 2) {
        playVideo()
      } else {
        video.addEventListener('loadeddata', playVideo)
      }
      // Listen for video end
      video.addEventListener('ended', onVideoEnded)
    }

    return () => {
      video.removeEventListener('ended', onVideoEnded)
      video.removeEventListener('loadeddata', playVideo)
      video.removeEventListener('ended', onVideoEnded)
    }
  }, [handleVideoComplete, isMobile])

  useEffect(() => {
    if (!showContent) return

    const ctx = gsap.context(() => {
      // Content appears after video
      gsap.from(['.hero-greeting', '.hero-name', '.hero-roles', '.hero-scroll-indicator'], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })

      // Content fade out on scroll
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
        {/* On mobile, always show video (even if not playing) - don't switch to static image */}
        {!videoEnded || isMobile ? (
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
