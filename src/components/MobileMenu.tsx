import { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';

type NavItem = { id: string; label: string };

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navItems: readonly NavItem[];
  onNavigate: (id: string) => void;
};

export default function MobileMenu({ isOpen, onClose, navItems, onNavigate }: MobileMenuProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const lenis = useLenis();
  const [closing, setClosing] = useState(false);

  const handleNavigate = (id: string) => {
    setClosing(true);
    onNavigate(id);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  };

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusable?.[0];
      firstFocusable?.focus();

      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }
        if (e.key !== 'Tab') return;
        const focusables = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        ) || []);
        if (focusables.length === 0) return;
        const current = document.activeElement as HTMLElement | null;
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
    } else if (previousFocus.current) {
      previousFocus.current.focus();
    }
  }, [isOpen, onClose]);

  if (!isOpen && !closing) return null;

  return (
    <div className={`mobile-drawer-backdrop ${closing ? 'closing' : ''}`}>
      <div className="mobile-drawer-overlay" onClick={onClose} aria-hidden="true" />
      <aside
        id="mobile-drawer"
        ref={drawerRef}
        className={`mobile-drawer ${closing ? 'closing' : ''}`}
        role="navigation"
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}
      >
        <button
          className="mobile-drawer-close"
          onClick={() => { setClosing(true); setTimeout(onClose, 200); }}
          aria-label="Close menu"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button onClick={() => handleNavigate(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
