import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Background.css'

gsap.registerPlugin(ScrollTrigger)

export default function Background() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use main as trigger instead of body - more specific
      const mainEl = document.querySelector('main')
      
      if (mainEl) {
        // Parallax effect on blobs based on scroll
        gsap.to('.bg-blob-1', {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: mainEl,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
          }
        })

        gsap.to('.bg-blob-2', {
          y: -50,
          x: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: mainEl,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
          }
        })

        gsap.to('.bg-blob-3', {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: mainEl,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5
          }
        })

        // Grid fade on scroll
        gsap.to('.bg-grid', {
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: mainEl,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
          }
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="background-container" ref={containerRef}>
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
      <div className="bg-grid" />
    </div>
  )
}