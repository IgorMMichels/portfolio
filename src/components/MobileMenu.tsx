import React, { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
    onClose();
  };
  const focusable = () => {
    if (!drawerRef.current) return [] as HTMLElement[];
    return Array.from(drawerRef.current.querySelectorAll<HTMLElement>("a, button"));
  };

  useEffect(() => {
    if (isOpen) {
      const items = focusable();
      items[0]?.focus();
      // Simple focus trap: wrap focus when tabbing
      const handler = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        const focusables = items;
        if (focusables.length === 0) return;
        const current = (document.activeElement as HTMLElement) || null;
        if (e.shiftKey) {
          if (current === focusables[0]) {
            e.preventDefault();
            focusables[focusables.length - 1]?.focus();
          }
        } else {
          if (current === focusables[focusables.length - 1]) {
            e.preventDefault();
            focusables[0]?.focus();
          }
        }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div>
      <div className="mobile-drawer-overlay" onClick={onClose} aria-hidden={!isOpen} />
      <aside id="mobile-drawer" ref={drawerRef} className="mobile-drawer" role="navigation" aria-label="Mobile Navigation" aria-hidden={!isOpen}>
        <button className="mobile-drawer-close" onClick={onClose} aria-label="Close menu">×</button>
        <nav>
          <ul>
            <li><button onClick={() => scrollToSection('inicio')}>Início</button></li>
            <li><button onClick={() => scrollToSection('timeline')}>Timeline</button></li>
            <li><button onClick={() => scrollToSection('trabalhos')}>Trabalhos</button></li>
            <li><button onClick={() => scrollToSection('contato')}>Contate-me</button></li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MobileMenu;
