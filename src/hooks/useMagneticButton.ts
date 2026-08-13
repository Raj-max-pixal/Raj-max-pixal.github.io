"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useMagneticButton(strength = 0.4) {
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    // Only apply on desktop
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let animFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(() => {
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
    };

    const onMouseLeave = () => {
      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(() => {
        el.style.transform = "translate(0px, 0px)";
        el.style.transition = "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)";
      });
    };

    const onMouseEnter = () => {
      el.style.transition = "transform 0.1s ease";
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(animFrameId);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [strength, reducedMotion]);

  return ref;
}
