"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProjectNetworkProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ProjectNetwork({ className = "", style = {} }: ProjectNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; baseX: number; baseY: number; radius: number }>>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = reducedMotion ? 0 : (isMobile ? 35 : 70);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initParticles(count, width, height);
    };

    const initParticles = (n: number, w: number, h: number) => {
      particlesRef.current = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        baseX: Math.random() * w,
        baseY: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 1.5 + Math.random() * 1.5,
      }));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Visibility observer to save power when tab/canvas is hidden
    const onVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const io = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting && !document.hidden;
    });
    io.observe(canvas);

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current || reducedMotion) return;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const connectionDistance = 130;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle drift
        p.baseX += p.vx;
        p.baseY += p.vy;

        // Wrap around
        if (p.baseX < 0) p.baseX = w;
        if (p.baseX > w) p.baseX = 0;
        if (p.baseY < 0) p.baseY = h;
        if (p.baseY > h) p.baseY = 0;

        // Mouse interaction
        const dx = p.baseX - mouse.x;
        const dy = p.baseY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 180;

        let x = p.baseX;
        let y = p.baseY;

        if (dist < interactionRadius) {
          const force = (interactionRadius - dist) / interactionRadius;
          x += (dx / dist) * force * 18;
          y += (dy / dist) * force * 18;
        }

        p.x = x;
        p.y = y;

        // Draw node
        const isNearMouse = dist < interactionRadius;
        ctx.beginPath();
        ctx.arc(p.x, p.y, isNearMouse ? p.radius * 1.5 : p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isNearMouse ? "rgba(59, 126, 255, 0.8)" : "rgba(59, 126, 255, 0.35)";
        ctx.fill();

        // Draw connections (spider web effect)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < connectionDistance) {
            const opacity = (1 - dist2 / connectionDistance) * (isNearMouse ? 0.22 : 0.1);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 126, 255, ${opacity})`;
            ctx.lineWidth = isNearMouse ? 0.8 : 0.5;
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      io.disconnect();
      ro.disconnect();
    };
  }, [reducedMotion]);

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
        opacity: 0.75,
        ...style,
      }}
    />
  );
}