import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface iCardItem {
  id: string | number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  link: string;
  color: string;
  textColor: string;
}

interface CardsParallaxProps {
  items: iCardItem[];
  className?: string;
}

/**
 * GSAP Stacking Cards Animation
 * 
 * How it works:
 * 1. Container pins when first card hits 20% viewport
 * 2. Each card slides up and scales down to stack on the previous card
 * 3. When last card is fully stacked, container unpins and normal scroll continues
 * 
 * Key GSAP concepts used:
 * - ScrollTrigger pin: pins the container during the animation
 * - scrub: links animation progress to scroll position
 * - gsap.timeline: sequences the card animations
 */
export const CardsParallax: React.FC<CardsParallaxProps> = ({ items, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      // Calculate the total scroll distance needed
      // Each card needs to scroll up by (card height - overlap amount)
      const cardHeight = cards[0]?.offsetHeight ?? 500;
      const overlap = 80; // px overlap between stacked cards
      const scrollDistance = (cards.length - 1) * (cardHeight - overlap);

      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top', // Start pinning when container hits top
          end: `+=${scrollDistance}`, // Scroll distance matches animation distance
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          // Once all cards are stacked, allow normal page scroll to continue
          pinSpacing: false,
        }
      });

      // Animate each card to stack on top of the previous one
      cards.forEach((card, i) => {
        if (i === 0) return; // First card stays in place
        
        const translateY = -(cardHeight - overlap) * i;
        const scale = 1 - (i * 0.05); // Slight scale down for depth effect
        
        tl.to(card, {
          y: translateY,
          scale: scale,
          opacity: 1 - (i * 0.1), // Slight fade for depth
          boxShadow: `0 -20px 60px rgba(0,0,0,0.3)`,
          zIndex: i,
          duration: 1,
          ease: 'none',
        }, i * 0.1); // Slight overlap in timing for smoother feel
      });

      // Add fade-in animation for cards as they enter
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div 
      ref={containerRef} 
      className={cn("stacking-cards-container relative w-full h-screen overflow-hidden", className)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {items.map((item, index) => (
          <Card 
            key={item.id} 
            item={item} 
            index={index} 
            ref={(el) => { cardsRef.current[index] = el; }}
          />
        ))}
      </div>
    </div>
  );
};

// Forward ref for accessing DOM element
const Card = React.forwardRef<HTMLDivElement, { item: iCardItem; index: number }>(
  ({ item, index }, ref) => {
    return (
      <div 
        ref={ref}
        className="card-parallax-item absolute flex flex-col md:flex-row items-stretch justify-between w-[85vw] max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 group"
        style={{ 
          backgroundColor: item.color,
          color: item.textColor,
          zIndex: index,
          // Start position - centered and slightly offset for stacking effect
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Dark overlay that appears on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 z-10 pointer-events-none" />
        
        <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-center gap-4 relative z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{item.title}</h3>
          <p className="text-sm md:text-base opacity-90 leading-relaxed max-w-lg">
            {item.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {item.techStack.map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/20 backdrop-blur-sm border border-white/10"
                style={{ color: item.textColor }}
              >
                {tech}
              </span>
            ))}
          </div>
          
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 w-fit px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors font-semibold text-sm border border-white/10"
            aria-label={`Visit ${item.title} project`}
          >
            Visit Project <ExternalLink size={16} />
          </a>
        </div>
        
        <div className="flex-1 w-full min-h-[200px] md:min-h-[300px] relative overflow-hidden">
          <img 
            src={item.image} 
            alt={`Screenshot of ${item.title}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
