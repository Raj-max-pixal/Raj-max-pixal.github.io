"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function AnimatedSection({
  children,
  className = "",
  style = {},
  delay = 0,
  direction = "up",
  distance = 40,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const getTransform = () => {
    if (reducedMotion) return "none";
    if (!inView) {
      switch (direction) {
        case "up": return `translateY(${distance}px)`;
        case "down": return `translateY(-${distance}px)`;
        case "left": return `translateX(${distance}px)`;
        case "right": return `translateX(-${distance}px)`;
        default: return `translateY(${distance}px)`;
      }
    }
    return "none";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: getTransform(),
        transition: reducedMotion 
          ? "opacity 0.3s ease"
          : `opacity 0.85s var(--ease-expo), transform 0.85s var(--ease-expo) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}