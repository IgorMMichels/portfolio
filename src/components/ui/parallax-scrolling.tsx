"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export interface ParallaxScrollingProps {
  images?: string[];
  lenis?: Lenis;
}

export function ParallaxScrolling({ images = [], lenis }: ParallaxScrollingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRefInternal = useRef<Lenis | null>(null);
  // track whether we created a Lenis instance here
  

  useEffect(() => {
    let _createdLenis = false;
    gsap.registerPlugin(ScrollTrigger);
    // Lenis integration: smooth scrolling with GSAP ScrollTrigger
    const lenisInstance = lenis ?? new Lenis();
    if (!lenis) {
      _createdLenis = true;
      lenisRefInternal.current = lenisInstance;
    }
    lenisInstance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenisInstance.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    const el = containerRef.current;
    if (el) {
      const layers = el.querySelectorAll('[data-parallax-layer]');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      layers.forEach((layer, idx) => {
        // Stagger parallax effect per layer
        tl.to(layer, { yPercent: -((idx + 1) * 15), ease: 'none' }, 0);
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (el) gsap.killTweensOf(el);
      // Only destroy Lenis if we created it here
      if (_createdLenis) {
        lenisInstance.destroy();
      }
      gsap.ticker.remove(() => {});
    };
  }, [images.length, lenis]);

  const renderLayers = () => {
    if (images.length > 0) {
      return images.map((src, i) => (
        <img key={i} src={src} data-parallax-layer={String(i + 1)} alt="parallax" style={{ width: '100%', display: 'block' }} />
      ));
    }
    // Default placeholders if no images provided
    return [1, 2, 3, 4].map((n) => (
      <div key={n} data-parallax-layer={String(n)} style={{ height: 260, background: '#ddd', margin: '0 0 16px' }} />
    ));
  };

  return (
    <div ref={containerRef} className="parallax-scrolling" aria-label="Parallax scrolling component">
      <div className="parallax-scrolling__layers" data-parallax-layers>
        {renderLayers()}
      </div>
    </div>
  );
}

export default ParallaxScrolling;
