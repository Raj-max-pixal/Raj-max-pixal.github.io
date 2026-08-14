"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  phase: number;
  phaseSpeed: number;
}

interface InteractiveParticleFieldProps {
  particleCount?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function InteractiveParticleField({
  particleCount,
  className = "",
  style = {},
}: InteractiveParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Determine particle count based on device
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = particleCount ?? (isMobile ? 45 : 110);

    // Resize canvas
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(count, canvas.width, canvas.height);
    };

    const initParticles = (n: number, w: number, h: number) => {
      particlesRef.current = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        baseX: Math.random() * w,
        baseY: Math.random() * h,
        size: Math.random() * 1.4 + 0.4,
        opacity: Math.random() * 0.35 + 0.05,
        speedX: (Math.random() - 0.5) * 0.18,
        speedY: (Math.random() - 0.5) * 0.18,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: (Math.random() * 0.4 + 0.1) * 0.006,
      }));
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Animation loop
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse interpolation
      mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, 0.04);
      mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, 0.04);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const parallaxStrength = 28; // max pixel shift

      for (const p of particlesRef.current) {
        // Drift
        if (!reducedMotion) {
          p.phase += p.phaseSpeed;
          p.baseX += p.speedX;
          p.baseY += p.speedY;

          // Wrap around edges
          if (p.baseX < 0) p.baseX = w;
          if (p.baseX > w) p.baseX = 0;
          if (p.baseY < 0) p.baseY = h;
          if (p.baseY > h) p.baseY = 0;
        }

        // Mouse parallax offset (different depths via size)
        const depth = p.size / 1.8; // smaller particles move less (far away)
        const offsetX = (mx - 0.5) * parallaxStrength * depth;
        const offsetY = (my - 0.5) * parallaxStrength * depth;

        p.x = p.baseX + offsetX;
        p.y = p.baseY + offsetY;

        // Breathing opacity
        const breathOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.phase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${breathOpacity})`;
        ctx.fill();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
    };
  }, [reducedMotion, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.65,
        ...style,
      }}
    />
  );
}
