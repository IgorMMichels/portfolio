import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AnimatedSection.css'

gsap.registerPlugin(ScrollTrigger)

type AnimationType = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up'

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
}

export default function AnimatedSection({ children, className = '', animation = 'fade-up' }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const animations: Record<AnimationType, { from: Record<string, number>; to: Record<string, number | string> }> = {
      'fade-up': {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      },
      'fade-in': {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.8, ease: 'power2.out' }
      },
      'slide-left': {
        from: { opacity: 0, x: -60 },
        to: { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      },
      'slide-right': {
        from: { opacity: 0, x: 60 },
        to: { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      },
      'scale-up': {
        from: { opacity: 0, scale: 0.9 },
        to: { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
      }
    }

    const config = animations[animation] || animations['fade-up']

    gsap.fromTo(element, config.from, {
      ...config.to,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })
  }, [animation])

  return (
    <section ref={sectionRef} className={`animated-section ${className}`}>
      {children}
    </section>
  )
}
