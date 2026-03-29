import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contato.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contato() {
  const sectionRef = useRef(null)
  const email = 'igor.marcon.michels@gmail.com'

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Status text animation
      gsap.from('.status-text', {
        scrollTrigger: {
          trigger: '.status-text',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
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

      // Message animation
      gsap.from('.contato-message', {
        scrollTrigger: {
          trigger: '.contato-message',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
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
        delay: 0.3,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contato" className="contato section" ref={sectionRef}>
      <div className="contato-content">
        <span className="status-text">Disponível para novos projetos</span>
        
        <h3 className="contato-heading">Vamos construir algo?</h3>
        
        <p className="contato-message">
          Busco colaborar em projetos que envolvam desenvolvimento, automação e tecnologia, criando soluções eficientes e com impacto real.
        </p>
        
        <a href={`mailto:${email}`} className="contato-button">
          Entrar em contato
        </a>
      </div>
    </section>
  )
}
