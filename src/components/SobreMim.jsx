import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SobreMim.css'

const sobreTexto = `Sou desenvolvedor front-end com experiência em HTML, CSS e JavaScript, além de conhecimentos em Node.js e Vue.js. Estou em constante evolução, aprofundando meus estudos em tecnologias como JavaScript, Python, Lua, MySQL, Node.js e Vue.js, com foco em criar aplicações eficientes e escaláveis. Tenho grande interesse por inteligência artificial, já tendo explorado ferramentas como MCP Servers, Claude Code e Open Code, além de estar iniciando em prompt engineering. Busco unir desenvolvimento e automação para criar soluções modernas, funcionais e com impacto real, desenvolvendo não apenas aplicações, mas sistemas que resolvem problemas e geram valor.`

// SVG Icons for each technology
const TechIcon = ({ name }) => {
  const icons = {
    'React': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89c0 1-.84 1.85-1.87 1.85c-1.03 0-1.87-.85-1.87-1.85c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7c-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86c.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5l-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47c.54.03 1.11.03 1.71.03c.6 0 1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7c.52.59 1.03 1.23 1.51 1.9c.82.08 1.63.2 2.4.36c.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86c-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63c2.54.75 4.37 1.99 4.37 3.68c0 1.69-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63c-1.46.84-3.45-.12-5.37-1.95c-1.92 1.83-3.91 2.79-5.38 1.95c-1.46-.84-1.62-3.05-1-5.63c-2.54-.75-4.37-1.99-4.37-3.68c0-1.69 1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63c1.47-.84 3.46.12 5.38 1.95c1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26c2.1-.63 3.28-1.53 3.28-2.26c0-.73-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26c-2.1.63-3.28 1.53-3.28 2.26c0 .73 1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.61l-.3.51c.31-.05.61-.1.88-.16c-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.6 1.7c.64-.35.83-1.82.32-3.96c-.77.16-1.58.28-2.4.36c-.48.67-.99 1.31-1.52 1.9M8.08 9.39l.29-.51c-.31.05-.61.1-.88.16c.07.28.18.57.29.86l.3-.51m2.89-4.04C9.58 3.85 7.2 3.07 6.62 3.43c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9Z"/>
      </svg>
    ),
    'Vue.js': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 1.61h-9.94L12 5.16L9.94 1.61H0l12 20.78L24 1.61ZM12 14.08 5.16 2.23h4.43L12 6.41l2.41-4.18h4.43L12 14.08Z"/>
      </svg>
    ),
    'HTML': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.136 3.012h15.729l-1.432 16.588L12 22.227 2.55 19.6l1.586-16.588Zm8.456 11.565l1.922-3.378 1.922 3.378-1.922 3.377-1.922-3.377Zm-3.32-5.97l.64 7.134h2.038l.64-7.134h-3.318Zm1.086-1.358c.526 0 .926.421.926.947 0 .526-.4.947-.926.947s-.926-.421-.926-.947c0-.526.4-.947.926-.947Z"/>
      </svg>
    ),
    'CSS': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.192 3.143h15.615l-1.42 16.24L12 22.667 5.612 19.383 4.192 3.143Zm11.95 11.565l1.915-3.374 1.915 3.374-1.915 3.377-1.915-3.377Zm-3.306-5.964l.636-7.133h2.041l.64 7.133h-3.317Zm1.073-1.358c.527 0 .933.42.933.947 0 .526-.406.947-.933.947s-.933-.421-.933-.947c0-.527.406-.947.933-.947Z"/>
      </svg>
    ),
    'JavaScript': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3Zm16.525 13.704c-.131-.821-.666-1.511-2.252-2.155c-.552-.259-1.165-.438-1.349-.854c-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-1.222c-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354c1.039.762 2.564.916 2.757 1.623c.18.833-.652 1.121-1.490 1.075c-.628-.034-1.119-.227-1.523-.536l-1.381.745c.147.359.337.517.607.832c1.305 1.316 4.568 1.249 5.153-.754c.021-.067.14-.472.022-1.121Zm-6.737-5.934h-1.667c0 1.735.056 3.264-.389 4.245c-.339.716-.947 1.027-1.566 1.073v1.102c.566.046 1.203-.264 1.777-.9c.457-.536.667-1.257.667-2.164v-.291c0-1.235-.131-2.137.535-3.042c.04-.06.09-.113.141-.164l-.998.171Z"/>
      </svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47c1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 0 1-.12-.21V7.71c0-.09.05-.17.12-.21l7.44-4.29c.07-.05.16-.05.23 0l7.44 4.29c.07.04.12.12.12.21v8.58c0 .08-.05.16-.12.21l-7.44 4.29c-.07.04-.16.04-.23 0L4.33 17.5c-.06-.47.28-.9.72-.9c.14 0 .28.03.41.08l1.95-1.12c.06-.04.14-.04.2 0l7.44 4.29c.07.04.16.04.23 0l7.44-4.29c.07-.04.12-.12.12-.21V7.71c0-.08-.05-.16-.12-.21l-7.44-4.29c-.07-.04-.16-.04-.23 0L13.08 4.1c.12-.09.12-.09.18-.19Z"/>
      </svg>
    ),
    'Python': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-.52 0-1.02.04-1.5.11c-.52-2.23-2.44-3.11-4.5-3.11c-2.91 0-4.96 2.67-4.96 6.95c0 2.97 1.37 5.33 3.45 6.78c-.21.41-.46.83-.5 1.32c-.54.24-1.13.37-1.71.37c-1.83 0-2.78-1.51-2.78-3.44c0-2.15 1.46-4.62 2.36-5.86c.79-1.09.92-1.76.92-2.48c0-.67-.38-1.43-1.19-1.43c-1.13 0-1.59.87-1.59 1.71c0 .75.29 1.56.56 2.16l.11.26l-.62.25c-.41.17-.72.31-.72.93c0 .71.66 1.41 1.89 1.41c1.63 0 2.76-1.21 3.43-2.33l.17-.29l.61.24c.44.17.9.27 1.38.27c2.59 0 4.77-2.26 4.77-6.21c0-2.34-1.06-4.89-3.29-5.86c.53-.13 1.04-.22 1.58-.22c.47 0 .96.04 1.45.13c.44-1.03 1.18-1.72 2.06-1.96l-.57-.73c-.64-.84-1.8-1.15-2.86-1.15c-.47 0-.93.08-1.36.22Zm2.24 2.79c.53 0 1.11.43 1.11 1.42c0 .82-.34 1.55-.77 2.02l-.25.28l-.6-.23c-.46-.18-.89-.47-1.28-.86l-.19-.2c-.3.43-.75.86-1.41.86c-.52 0-.77-.31-.77-.68c0-.43.35-.74.8-1.13l.24-.21c.35-.32.75-.61 1.28-.61c.17 0 .33.03.48.08l.27.54c.1.2.21.28.41.28c.19 0 .38-.12.49-.33l.2-.41c.15-.01.31-.02.48-.02Zm-2.35 8.3c.55 0 1.07.08 1.54.23l-.23.67c-.39-.14-.82-.22-1.27-.22c-1.26 0-1.96.56-1.96 1.41c0 .69.56 1.07 1.54 1.07c.96 0 1.92-.44 2.46-1.17l.24.54c-.67.94-1.84 1.37-3.08 1.37c-2.17 0-3.6-1.09-3.6-2.73c0-1.73 1.43-2.68 3.36-2.68Zm6.66.64c.41 0 .74.07 1.02.2l-.26.64c-.28-.1-.58-.15-.89-.15c-.72 0-1.15.35-1.15.87c0 .52.42.79 1.02.79c.63 0 1.23-.33 1.62-.87l.22.58c-.51.72-1.35 1.15-2.31 1.15c-1.68 0-2.75-.94-2.75-2.36c0-1.44 1.02-2.45 2.54-2.45c.36 0 .69.06 1 .17l-.04.2c0 .01-.03.04-.03.06v-.23Z"/>
      </svg>
    ),
    'MySQL': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.09L4.64 4.67c-.39.17-.64.55-.64.97v11.17c0 .48.38.86.85.86h4.38c.22 0 .41-.18.41-.41V7.3c0-.23.19-.41.42-.41h1.95c.23 0 .42.18.42.41v10.85c0 .23.19.42.42.42h4.37c.48 0 .86-.38.86-.86V5.64c0-.42-.25-.8-.64-.97l-7.36-3.58ZM6.88 4.1l5.12 2.5v8.27l-5.12-2.49V4.1Zm8.25 10.77V6.6l5.12-2.49v8.27l-5.12 2.49Z"/>
      </svg>
    ),
    'PostgreSQL': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C7.03 2 3 6.03 3 11v6c0 1.1.9 2 2 2h2v-7.5H5v-2c0-2.76 2.24-5 5-5h4c2.76 0 5 2.24 5 5v2h-2v7.5h2c1.1 0 2-.9 2-2v-6c0-4.97-4.03-9-9-9Zm0 2c3.86 0 7 3.14 7 7v6c0 1.1-.9 2-2 2h-2v-7.5h-2v7.5H9v-7.5H7v7.5H5v-6c0-3.86 3.14-7 7-7Z"/>
      </svg>
    ),
    'MCP Servers': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5"/>
      </svg>
    ),
    'Claude Code': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10l10 5l10-5V7l-10-5zm0 2.18l6.9 3.45L12 11.09L5.1 7.63L12 4.18zM4 8.82l7 3.5v7.86l-7-3.5V8.82zm9 11.36v-7.86l7-3.5v7.86l-7 3.5z"/>
      </svg>
    ),
    'Open Code': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6l-6 6l-1.4-1.4zm-5.2 0L4.8 12l4.6-4.6L8 6l-6 6l6 6l1.4-1.4z"/>
      </svg>
    ),
    'Prompt Engineering': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
      </svg>
    ),
    'Lua': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
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
