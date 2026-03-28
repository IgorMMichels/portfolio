import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SobreMim.css'

const sobreTexto = `Sou desenvolvedor front-end com experiência em HTML, CSS e JavaScript, além de conhecimentos em Node.js e Vue.js. Estou em constante evolução, aprofundando meus estudos em tecnologias como JavaScript, Python, Lua, MySQL, Node.js e Vue.js, com foco em criar aplicações eficientes e escaláveis. Tenho grande interesse por inteligência artificial, já tendo explorado ferramentas como MCP Servers, Claude Code e Open Code, além de estar iniciando em prompt engineering. Busco unir desenvolvimento e automação para criar soluções modernas, funcionais e com impacto real, desenvolvendo não apenas aplicações, mas sistemas que resolvem problemas e geram valor.`

const TechIcon = ({ name }) => {
  const icons = {
    'React': (
      <svg viewBox="0 0 128 128"><g fill="currentColor"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8z"/></g></svg>
    ),
    'Vue.js': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M0 8.934l49.854.158 14.167 24.47 14.432-24.47L128 8.935l-63.834 110.14zm126.98.637l-24.36.02-38.476 66.053L25.691 9.592.942 9.572l63.211 107.89zm-25.149-.008l-22.745.168-15.053 24.647L49.216 9.73l-22.794-.168 37.731 64.476z"/><path fill="currentColor" d="M.91 9.569l25.067-.172 38.15 65.659L101.98 9.401l25.11.026-62.966 108.06z"/></svg>
    ),
    'HTML': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M19.6 0H0l50.6 125.2L115.4 0H95.8L64 85.8 19.6 0z"/><path fill="currentColor" d="M64 85.8l25.2-62.6h8.6L64 85.8z"/><path fill="currentColor" d="M75.4 52.4H52.6l1.8-4.6h17.2l-1.6 4.6h5z"/></svg>
    ),
    'CSS': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M89.7 0H38.3l7.2 100.4 31.4 14.2 31-14.2L89.7 0z"/><path fill="currentColor" d="M64 97.2l-20-8.6L18.5 0h18.3L64 79.6 91.2 0h18.3L64 97.2z"/></svg>
    ),
    'JavaScript': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M2 2h124v124H2z"/><path fill="currentColor" d="M89.8 83c-1.3 5.8-5.2 9-11.8 11.3-3 .8-4.8 1.3-4.8 2.5 0 1.1 1.4 1.7 4.1 1.7 2.7 0 5.7-.9 8.3-2.7l2.3 5.4c-3.1 2-6.6 3-10.5 3-8.2 0-12.8-4-12.8-11.5 0-7 4.3-11.6 11.7-14.6 6-2.4 9.8-4 9.8-7.3 0-1.8-1.2-2.9-4.2-2.9-2.6 0-5.5 1-8.4 3l-2-5.3c3.2-2.4 7-3.6 10.9-3.6 7.5 0 11.8 3.5 11.8 10.2v13.7z"/></svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64c0 35.3 28.7 64 64 64 35.3 0 64-28.7 64-64C128 28.7 99.3 0 64 0z"/></svg>
    ),
    'Python': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M63.4 0C30.8 0 3.8 22.7 3.8 50.4c0 27.7 27 50.4 59.6 50.4 32.6 0 59.6-22.7 59.6-50.4C128 22.7 99.3 0 63.4 0z"/><path fill="currentColor" d="M32 67.4V38.4l25 14.5z"/><path fill="currentColor" d="M52 77.4l-20-9V48l20 9v20z"/></svg>
    ),
    'MySQL': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0z"/></svg>
    ),
    'PostgreSQL': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M63.4 0c-4.5 0-8.6.8-12.2 2.2 2.4 1.4 4.3 3.3 5.6 5.6 1.8-1.3 4-2.1 6.5-2.1 2.5 0 4.7.7 6.5 2 1.4-2.3 3.2-4 5.5-5.4c-3.5-1.4-7.6-2.3-11.9-2.3z"/></svg>
    ),
    'Lua': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M63.7 0C29.9 0 2.2 21.9 0 52.7h8.2c3.5-17.8 17-30.7 34.8-30.7z"/></svg>
    ),
    'MCP Servers': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M64 10L10 38v52l54 28 54-28V38L64 10zm0 20l30 15v26l-30 15-30-15V45l30-15z"/></svg>
    ),
    'Claude Code': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M64 10L10 38v52l54 28 54-28V38L64 10zm0 20l30 15v26l-30 15-30-15V45l30-15z"/></svg>
    ),
    'Open Code': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M64 10L10 38v52l54 28 54-28V38L64 10zm0 20l30 15v26l-30 15-30-15V45l30-15z"/></svg>
    ),
    'Prompt Engineering': (
      <svg viewBox="0 0 128 128"><path fill="currentColor" d="M32 16h64v96H32z"/><path fill="currentColor" d="M40 44h48v8H40zM40 60h32v8H40zM40 76h40v8H40z"/></svg>
    )
  }
  
  return (
    <span className="skill-icon" title={name}>
      {icons[name] || icons['JavaScript']}
    </span>
  )
}
  
const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Vue.js', 'HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Python', 'MySQL', 'PostgreSQL', 'Lua']
  },
  {
    title: 'IA & Automação',
    skills: ['MCP Servers', 'Claude Code', 'Open Code', 'Prompt Engineering']
  }
]

export default function SobreMim() {
  const sectionRef = useRef(null)

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

      // Text reveal from left
      gsap.from('.sobre-text', {
        scrollTrigger: {
          trigger: '.sobre-text',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      // Skills stagger reveal
      const skillCats = sectionRef.current?.querySelectorAll('.skill-category')
      skillCats?.forEach((cat, i) => {
        gsap.from(cat, {
          scrollTrigger: {
            trigger: cat,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: 'power3.out'
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="sobre" className="sobre-mim section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">01.</span> Sobre Mim
        </h2>
        
        <div className="sobre-content">
          <div className="sobre-text">
            <p>{sobreTexto}</p>
          </div>
          
          <div className="sobre-skills">
            {skillCategories.map((category) => (
              <div key={category.title} className="skill-category">
                <h3>{category.title}</h3>
                  <div className="skill-tags">
                    {category.skills.map(skill => (
                      <span key={skill} className="skill-tag">
                        <TechIcon name={skill} />
                      </span>
                    ))}
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
