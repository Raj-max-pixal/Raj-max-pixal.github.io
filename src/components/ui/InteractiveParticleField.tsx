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
  color: string;
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
    const count = particleCount ?? (isMobile ? 90 : 200);

    const colors = [
      "rgba(255, 255, 255, ",
      "rgba(59, 126, 255, ",
      "rgba(6, 182, 212, ",
      "rgba(168, 85, 247, ",
    ];

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
        size: Math.random() * 2.2 + 1.0,
        opacity: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: (Math.random() * 0.6 + 0.2) * 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
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
      mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, 0.05);
      mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, 0.05);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const parallaxStrength = 45; // max pixel shift on mouse move

      for (const p of particlesRef.current) {
        // Continuous autonomous drift (moves even when mouse is still)
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

        // Mouse interaction shift
        const depth = p.size / 2.0;
        const offsetX = (mx - 0.5) * parallaxStrength * depth;
        const offsetY = (my - 0.5) * parallaxStrength * depth;

        p.x = p.baseX + offsetX;
        p.y = p.baseY + offsetY;

        // Dynamic shimmer / breathing opacity
        const breathOpacity = p.opacity * (0.65 + 0.35 * Math.sin(p.phase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${breathOpacity})`;
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
        opacity: 0.85,
        ...style,
      }}
    />
  );
}

