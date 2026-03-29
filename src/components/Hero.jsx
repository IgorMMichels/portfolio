import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const ctx = gsap.context(() => {
      // Initial entrance animation
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

      // Video scrubbing logic
      // We wait for metadata to get the duration
      const setupVideoScrub = () => {
        gsap.to(video, {
          currentTime: video.duration || 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1, // Smooth scrubbing
            invalidateOnRefresh: true
          }
        })
      }

      if (video.readyState >= 1) {
        setupVideoScrub()
      } else {
        video.addEventListener('loadedmetadata', setupVideoScrub)
      }

      return () => {
        video.removeEventListener('loadedmetadata', setupVideoScrub)
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="inicio" ref={heroRef} className="hero">
      <div className="hero-video-container">
        <video
          ref={videoRef}
          className="hero-video"
          playsInline
          muted
          preload="auto"
          poster="/assets/fisrtFrame.jpg"
        >
          <source src="/assets/video_igor.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      <div className="hero-background-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

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

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  )
}
