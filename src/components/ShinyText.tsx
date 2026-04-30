import { useRef, useEffect, ReactNode, ElementType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ShinyText.css'

gsap.registerPlugin(ScrollTrigger)

interface ShinyTextProps {
  children: ReactNode;
  tag?: ElementType;
  className?: string;
}

export default function ShinyText({ children, tag: Tag = 'h1', className = '' }: ShinyTextProps) {
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const textElement = textRef.current
    if (!textElement) return

    gsap.fromTo(
      textElement,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textElement,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  return (
    <Tag ref={textRef} className={`shiny-text ${className}`}>
      {children}
    </Tag>
  )
}
