import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';

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

export const CardsParallax: React.FC<CardsParallaxProps> = ({ items, className }) => {
  return (
    <div className={cn("w-[90vw] max-w-7xl mx-auto flex flex-col items-center justify-center gap-10 pb-32", className)}>
      {items.map((item, index) => (
        <Card key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};

const Card = ({ item, index }: { item: iCardItem; index: number }) => {
  // Sticky positioning creates the parallax stacking effect
  // Each card sticks at a slightly lower top offset
  const topOffset = `calc(10vh + ${index * 30}px)`;
  
  return (
    <div 
      className="sticky flex flex-col md:flex-row items-stretch justify-between w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 transition-all duration-500"
      style={{ 
        top: topOffset,
        backgroundColor: item.color,
        color: item.textColor,
        zIndex: index,
      }}
    >
      <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-6">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{item.title}</h3>
        <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-xl">
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mt-4">
          {item.techStack.map((tech) => (
            <span 
              key={tech} 
              className="px-4 py-2 rounded-full text-sm font-medium bg-black/20 backdrop-blur-sm border border-white/10"
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
          className="inline-flex items-center gap-2 mt-6 w-fit px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors font-semibold border border-white/10"
          aria-label={`Visit ${item.title} project`}
        >
          Visit Project <ExternalLink size={18} />
        </a>
      </div>
      
      <div className="flex-1 w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] relative overflow-hidden">
        <img 
          src={item.image} 
          alt={`Screenshot of ${item.title}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  );
};
