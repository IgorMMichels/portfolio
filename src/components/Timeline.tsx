import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Timeline.css'

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    year: '2021',
    title: 'Primeiro contato com programação',
    description: 'Iniciei minha jornada criando um jogo no Roblox com um amigo, focando na parte de construção e desenvolvimento do ambiente.'
  },
  {
    year: '2023',
    title: 'Fundamentos de programação',
    description: 'Aprendi Python e lógica de programação, entendendo como estruturar códigos e desenvolver soluções simples.'
  },
  {
    year: '2024',
    title: 'Primeiro website',
    description: 'Criei meu primeiro site utilizando HTML, CSS e JavaScript, com apoio de inteligência artificial.'
  },
  {
    year: '2025',
    title: 'Evolução técnica',
    description: 'Iniciei no Instituto Federal Catarinense, aprofundando conhecimentos em lógica, JavaScript, HTML, CSS e Python.'
  },
  {
    year: '2026',
    title: 'Foco em sistemas e IA',
    description: 'Passei a focar na criação de projetos escaláveis, trabalhando com empresas, banco de dados e aprendendo Vue.js com apoio de IA.'
  }
]

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 1
        },
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none'
      })

      const items = sectionRef.current?.querySelectorAll('.timeline-item')
      items?.forEach((item) => {
        const direction = -30

        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          x: direction,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        })

        const node = item.querySelector('.timeline-node')
        gsap.from(node, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          scale: 0,
          duration: 0.5,
          ease: 'back.out(1.7)'
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="timeline" className="timeline section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">02.</span> Minha Jornada
        </h2>

        <div className="timeline-container">
          <div className="timeline-line" ref={lineRef} />

          {timelineItems.map((item) => (
            <div
              key={item.year}
              className="timeline-item"
            >
              <div className="timeline-node">
                <div className="node-inner" />
              </div>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
