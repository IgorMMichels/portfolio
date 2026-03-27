import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Trabalhos.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    image: '/assets/economizae.png',
    title: 'Economizae',
    description: 'Projeto pessoal criado para divulgação de links de afiliados com foco em monetização digital. Plataforma otimizada para conversão e automação de ofertas.',
    tech: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://economizae.com',
    highlight: '20K faturados'
  },
  {
    id: 2,
    image: '/assets/fechandoAsPorteiras.png',
    title: 'Fechando as Porteiras',
    description: 'Projeto desenvolvido para expandir uma marca no nicho de bikes, incluindo sistema de eventos e inscrições online.',
    tech: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://www.fechandoasporteiras.com.br/'
  },
  {
    id: 3,
    image: '/assets/solusMotobombas.png',
    title: 'Solus Motobombas',
    description: 'Website institucional focado na divulgação de produtos e serviços, facilitando o contato entre clientes e a empresa.',
    tech: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://solus-motobombas.vercel.app/'
  },
  {
    id: 4,
    image: '/assets/fitlyApp.png',
    title: 'FitlyApp',
    description: 'Projeto escolar desenvolvido para o IFC, com foco em auxiliar no processo de emagrecimento através de uma plataforma digital.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://fitlyapp.com.br'
  },
  {
    id: 5,
    image: '/assets/imok.png',
    title: 'Imok',
    description: 'Projeto pessoal voltado para um futuro empreendimento, com foco em facilitar o contato com clientes e permitir assinatura de serviços diretamente pelo site.',
    tech: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://imok.vercel.app'
  }
]

export default function Trabalhos() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

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

      // Cards stagger animation
      const cards = gridRef.current?.querySelectorAll('.project-card')
      cards?.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out'
        })
      })

      // Card hover effects
      cards?.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' })
          gsap.to(card, { 
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(34, 211, 238, 0.15)',
            borderColor: 'rgba(34, 211, 238, 0.4)',
            duration: 0.3
          })
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
          gsap.to(card, { 
            boxShadow: 'none',
            borderColor: 'rgba(34, 211, 238, 0.1)',
            duration: 0.3
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="trabalhos" className="trabalhos section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">03.</span> Trabalhos
        </h2>
        
        <div className="projects-grid" ref={gridRef}>
          {projects.map(project => (
            <a 
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay" />
              </div>
              
              <div className="project-content">
                {project.highlight && (
                  <span className="project-highlight">{project.highlight}</span>
                )}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <span className="project-link">
                  Ver projeto
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
