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
