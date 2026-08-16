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
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const angleRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = reducedMotion ? 0 : (isMobile ? 35 : 75);
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
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: 1.2 + Math.random() * 1.6,
      }));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

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

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
      angleRef.current += 0.03;

      const particles = particlesRef.current;
      const connectionDistance = 135;
      const interactionRadius = 200;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift
        p.baseX += p.vx;
        p.baseY += p.vy;

        if (p.baseX < 0) p.baseX = w;
        if (p.baseX > w) p.baseX = 0;
        if (p.baseY < 0) p.baseY = h;
        if (p.baseY > h) p.baseY = 0;

        // Interaction toward mouse cursor location
        let x = p.baseX;
        let y = p.baseY;

        if (mouse.active) {
          const dx = mouse.x - p.baseX;
          const dy = mouse.y - p.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < interactionRadius) {
            const pull = (1 - dist / interactionRadius) * 22;
            x += (dx / dist) * pull;
            y += (dy / dist) * pull;
          }
        }

        p.x = x;
        p.y = y;

        // Calculate distance from cursor for node styling
        const distToMouse = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2);
        const isNear = mouse.active && distToMouse < interactionRadius;

        ctx.beginPath();
        ctx.arc(p.x, p.y, isNear ? p.radius * 1.4 : p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isNear ? "rgba(59, 126, 255, 0.85)" : "rgba(59, 126, 255, 0.35)";
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < connectionDistance) {
            const opacity = (1 - dist2 / connectionDistance) * (isNear ? 0.28 : 0.11);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isNear ? `rgba(6, 182, 212, ${opacity})` : `rgba(59, 126, 255, ${opacity})`;
            ctx.lineWidth = isNear ? 0.85 : 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw Cursor Nucleus Effect at (mouse.x, mouse.y)
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        // Soft radial glow
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 45);
        grad.addColorStop(0, "rgba(59, 126, 255, 0.22)");
        grad.addColorStop(0.5, "rgba(6, 182, 212, 0.08)");
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 45, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Nucleus core
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#3b7eff";
        ctx.shadowColor = "#3b7eff";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Satellite orbiting nodes
        for (let k = 0; k < 3; k++) {
          const orbAngle = angleRef.current + (k * Math.PI * 2) / 3;
          const orbDist = 18 + k * 4;
          const ox = mouse.x + Math.cos(orbAngle) * orbDist;
          const oy = mouse.y + Math.sin(orbAngle) * orbDist;

          ctx.beginPath();
          ctx.arc(ox, oy, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(ox, oy);
          ctx.strokeStyle = "rgba(59, 126, 255, 0.25)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
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
        opacity: 0.8,
        ...style,
      }}
    />
  );
}