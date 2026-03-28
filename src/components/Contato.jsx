import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnoAI from './ui/animated-shader-background'
import './Contato.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contato() {
  const sectionRef = useRef(null)
  const email = 'igor.marcon.michels@gmail.com'

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.section-title', {
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      // Heading animation
      gsap.from('.contato-heading', {
        scrollTrigger: {
          trigger: '.contato-heading',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out'
      })

      // Subheading animation
      gsap.from('.contato-subheading', {
        scrollTrigger: {
          trigger: '.contato-subheading',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      })

      // Email animation
      gsap.from('.contato-email', {
        scrollTrigger: {
          trigger: '.contato-email',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out'
      })

      // Button animation
      gsap.from('.contato-button', {
        scrollTrigger: {
          trigger: '.contato-button',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      })

      // Button hover effects
      const button = sectionRef.current?.querySelector('.contato-button')
      const emailLink = sectionRef.current?.querySelector('.contato-email')
      
      button?.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.02, y: -2, duration: 0.2 })
      })
      button?.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, y: 0, duration: 0.2 })
      })
      
      emailLink?.addEventListener('mouseenter', () => {
        gsap.to(emailLink, { scale: 1.02, y: -2, duration: 0.2 })
      })
      emailLink?.addEventListener('mouseleave', () => {
        gsap.to(emailLink, { scale: 1, y: 0, duration: 0.2 })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contato" className="contato section" ref={sectionRef}>
      <AnoAI />
      <div className="contato-glass">
        <h2 className="section-title">
          <span className="title-number">04.</span> Contato
        </h2>
        
        <div className="contato-content">
          <h3 className="contato-heading">Vamos construir algo?</h3>
          <p className="contato-subheading">
            Estou disponível para projetos, oportunidades e conversas sobre tecnologia.
          </p>
          
          <a href={`mailto:${email}`} className="contato-email">
            <span className="email-text">{email}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" />
              <path d="M22 6L12 13L2 6" />
            </svg>
          </a>
          
          <a href={`mailto:${email}`} className="contato-button">
            Enviar mensagem
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
