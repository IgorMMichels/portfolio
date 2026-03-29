import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!containerRef.current || !boxRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      // Parallax effect on the box
      gsap.to(boxRef.current, {
        y: 200,
        rotation: 45,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Parallax effect on the text
      gsap.to(textRef.current, {
        y: -100,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-900 text-white"
    >
      <div 
        ref={boxRef}
        className="absolute w-64 h-64 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl opacity-50"
      />
      <h2 
        ref={textRef}
        className="relative z-10 text-6xl md:text-8xl font-bold tracking-tighter"
      >
        Parallax Demo
      </h2>
    </section>
  )
}
