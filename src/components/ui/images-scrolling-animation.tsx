"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { SiReact, SiTypescript, SiHtml5, SiCss, SiJavascript, SiVuedotjs, SiNodedotjs, SiPython, SiMysql, SiPostgresql, SiLua } from '@icons-pack/react-simple-icons'

export interface Project {
  id: number
  image: string
  title: string
  description: string
  tech: string[]
  link: string
}

interface ImagesScrollingAnimationProps {
  projects: Project[]
}

// Tech icon mapping - same as SobreMim section
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  'React': SiReact,
  'Vue.js': SiVuedotjs,
  'HTML': SiHtml5,
  'CSS': SiCss,
  'JavaScript': SiJavascript,
  'Node.js': SiNodedotjs,
  'Python': SiPython,
  'MySQL': SiMysql,
  'PostgreSQL': SiPostgresql,
  'Lua': SiLua,
  'TypeScript': SiTypescript,
}

const getTechIcon = (tech: string) => {
  const IconComponent = iconMap[tech]
  if (IconComponent) {
    return <IconComponent size={20} />
  }
  return <SiJavascript size={20} />
}

const StickyCard = ({
  i,
  title,
  description,
  src,
  tech,
  link,
  progress,
  range,
  targetScale,
  totalCards,
}: {
  i: number
  title: string
  description: string
  src: string
  tech: string[]
  link: string
  progress: any
  range: [number, number]
  targetScale: number
  totalCards: number
}) => {
  const container = useRef<HTMLDivElement>(null)

  const scale = useTransform(progress, range, [1, targetScale])

  const isFirst = i === 0
  const isLast = i === totalCards - 1

  // First: no rotation, Middle: alternate, Last: opposite rotation to show expansion
  const rotate = isFirst ? 0 : isLast ? 0.5 : (i % 2 === 1 ? -0.5 : 0.5)
  // Background cards are wider to show stacking effect
  const cardWidth = i > 0 ? `${99 + i * 2}vw` : '99vw'

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center px-0"
    >
      <motion.div
        style={{
          scale,
          rotate,
          top: `calc(-5vh + ${i * 15 + 200}px)`,
          width: cardWidth,
          willChange: 'transform, opacity',
        }}
        className="group relative -top-1/4 flex origin-top flex-col overflow-hidden rounded-lg
                   max-w-screen
                   bg-neutral-900
                   outline-none"
      >
        {/* Full card clickable link */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full w-full outline-none"
        >
          {/* Image with text overlay - full height */}
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src={src || "/placeholder.svg"}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay - fully dark on hover */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/80 transition-all duration-500" />

            {/* Text content inside image - centered, bigger and cleaner - hidden by default, shown on hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 text-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">{title}</h3>
              <p className="text-base sm:text-lg text-neutral-200 line-clamp-2 max-w-lg">{description}</p>

              {/* Tech stack icons - EXACTLY like SobreMim section */}
              <style>{`
                @keyframes iconFloat {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-3px); }
                }
                @keyframes iconGlow {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.15); }
                  100% { transform: scale(1); }
                }
                .card-skill-tag {
                  width: 3rem;
                  height: 3rem;
                  background: rgba(255, 255, 255, 0.05);
                  border: none;
                  border-radius: 0.5rem;
                  transition: all 0.2s ease;
                  position: relative;
                  overflow: hidden;
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                }
                .card-skill-tag::before {
                  content: '';
                  position: absolute;
                  inset: 0;
                  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
                  opacity: 0;
                  transition: opacity 0.2s ease;
                }
                .card-skill-tag:hover {
                  background: rgba(255, 255, 255, 0.1);
                  transform: translateY(-4px);
                }
                .card-skill-tag:hover::before {
                  opacity: 1;
                }
                .card-skill-icon {
                  width: 1.8rem;
                  height: 1.8rem;
                  color: rgba(255, 255, 255, 0.6);
                  transition: all 0.2s ease;
                  animation: iconFloat 3s ease-in-out infinite;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .card-skill-icon svg {
                  width: 100%;
                  height: 100%;
                }
                .card-skill-tag:hover .card-skill-icon {
                  color: rgba(255, 255, 255, 1);
                  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
                  animation: iconGlow 0.3s ease-out forwards;
                }
              `}</style>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="card-skill-tag"
                    title={t}
                  >
                    <span className="card-skill-icon">
                      {getTechIcon(t)}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  )
}

const ImagesScrollingAnimation = ({ projects }: ImagesScrollingAnimationProps) => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <main
      ref={container}
      className="relative flex w-full flex-col items-center justify-center pb-24"
    >
      {projects.map((project, i) => {
        const targetScale = Math.max(0.6, 1 - (projects.length - i - 1) * 0.08)
        return (
          <StickyCard
            key={`p_${i}`}
            i={i}
            title={project.title}
            description={project.description}
            src={project.image}
            tech={project.tech}
            link={project.link}
            progress={scrollYProgress}
            range={[i * (1 / projects.length), 1]}
            targetScale={targetScale}
            totalCards={projects.length}
          />
        )
      })}
    </main>
  )
}

export { ImagesScrollingAnimation }
