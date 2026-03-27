import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Timeline.css'

gsap.registerPlugin(ScrollTrigger)

const timelineItems = [
  {
    year: '2023',
    title: 'Início na Programação',
    description: 'Primeiros passos no mundo do desenvolvimento web, aprendendo os fundamentos de HTML, CSS e JavaScript.'
  },
  {
    year: '2024',
    title: 'Projetos Reais e Automações',
    description: 'Desenvolvimento de projetos comerciais, automações e descoberta de ferramentas de IA para otimização de workflows.'
  },
  {
    year: 'Agora',
    title: 'Foco em Sistemas Escaláveis e IA',
    description: 'Construção de sistemas robustos, integração com inteligências artificiais e criação de soluções inovadoras.'
  }
]

export default function Timeline() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

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

      // Timeline line draw animation
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

      // Timeline items
      const items = sectionRef.current?.querySelectorAll('.timeline-item')
      items?.forEach((item, index) => {
        const direction = index % 2 === 0 ? -50 : 50
        
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

        // Node pulse animation
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
          <span className="title-number">02.</span> Timeline
        </h2>
        
        <div className="timeline-container">
          <div className="timeline-line" ref={lineRef} />
          
          {timelineItems.map((item, index) => (
            <div 
              key={item.year} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
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
