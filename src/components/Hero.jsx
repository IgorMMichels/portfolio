import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)
  const videoContainerRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video scrubbing: bind a timeline to currentTime on scroll
      if (videoRef.current) {
        videoRef.current.addEventListener('loadedmetadata', () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          })
          tl.to(videoRef.current, { currentTime: videoRef.current.duration, ease: 'none' })
        })
      }

      // Content fade on scroll
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '30% top',
          scrub: true
        },
        opacity: 0,
        y: -30,
        ease: 'none'
      })

      // Entry animations - simpler, not conflicting with scroll
      gsap.from('.hero-greeting', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      })

      gsap.from('.hero-name', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      })

      gsap.from('.hero-roles', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
      })

      gsap.from('.hero-scroll-indicator', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 1,
        ease: 'power3.out'
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="inicio" ref={heroRef} className="hero">
      <div className="hero-video-container" ref={videoContainerRef}>
        <video
          ref={videoRef}
          className="hero-video"
          playsInline
          preload="auto"
          muted
          loop
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
