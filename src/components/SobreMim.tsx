import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import * as Icons from '@icons-pack/react-simple-icons'
import { Cpu, Code2, Sparkles } from 'lucide-react'
import './SobreMim.css'

const sobreTexto = `Sou desenvolvedor front-end com experiência em HTML, CSS e JavaScript, além de conhecimentos em Node.js e Vue.js. Estou em constante evolução, aprofundando meus estudos em tecnologias como JavaScript, Python, Lua, MySQL, Node.js e Vue.js, com foco em criar aplicações eficientes e escaláveis. Tenho grande interesse por inteligência artificial, já tendo explorado ferramentas como MCP Servers, Claude Code e Open Code, além de estar iniciando em prompt engineering. Busco unir desenvolvimento e automação para criar soluções modernas, funcionais e com impacto real, desenvolvendo não apenas aplicações, mas sistemas que resolvem problemas e geram valor.`

const iconMap: Record<string, React.ComponentType<any>> = {
  'React': Icons.SiReact,
  'Vue.js': Icons.SiVuedotjs,
  'HTML': Icons.SiHtml5,
  'CSS': Icons.SiCss,
  'JavaScript': Icons.SiJavascript,
  'Node.js': Icons.SiNodedotjs,
  'Python': Icons.SiPython,
  'MySQL': Icons.SiMysql,
  'PostgreSQL': Icons.SiPostgresql,
  'Lua': Icons.SiLua,
  'Claude Code': Icons.SiAnthropic,
}

interface TechIconProps {
  name: string;
}

const TechIcon = ({ name }: TechIconProps) => {
  const IconComponent = iconMap[name]

  if (name === 'MCP Servers') {
    return (
      <span className="skill-icon" title={name}>
        <Cpu size={20} strokeWidth={1.5} />
      </span>
    )
  }

  if (name === 'Open Code') {
    return (
      <span className="skill-icon" title={name}>
        <Code2 size={20} strokeWidth={1.5} />
      </span>
    )
  }

  if (name === 'Prompt Engineering') {
    return (
      <span className="skill-icon" title={name}>
        <Sparkles size={20} strokeWidth={1.5} />
      </span>
    )
  }

  if (IconComponent) {
    return (
      <span className="skill-icon" title={name}>
        <IconComponent size={20} />
      </span>
    )
  }

  return (
    <span className="skill-icon" title={name}>
      <Icons.SiJavascript size={20} />
    </span>
  )
}

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
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
  const sectionRef = useRef<HTMLElement>(null)

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
