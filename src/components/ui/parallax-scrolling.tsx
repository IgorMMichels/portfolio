import React from "react";
import { useLenis } from "./smooth-scroll";

/**
 * ParallaxScrolling
 * 
 * A component for parallax scrolling integration.
 * Consumes the shared Lenis instance via useLenis hook.
 */
export interface ParallaxScrollingProps {
  children?: React.ReactNode;
  className?: string;
}

export const ParallaxScrolling: React.FC<ParallaxScrollingProps> = ({ children, className = "" }) => {
  const lenis = useLenis();

  return (
    <div className={`relative w-full overflow-hidden ${className}`} data-lenis={lenis ? "active" : "inactive"}>
      <div className="parallax-container">
        {children ?? <p className="p-4 text-center text-muted-foreground">Parallax Scrolling Active</p>}
      </div>
    </div>
  );
};

export default ParallaxScrolling;
