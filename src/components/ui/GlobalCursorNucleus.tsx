"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function GlobalCursorNucleus() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
  const angleRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      if (!mouse.active || mouse.targetX < 0 || mouse.targetY < 0) return;

      // Smooth lerp following mouse pointer everywhere
      mouse.x += (mouse.targetX - mouse.x) * 0.22;
      mouse.y += (mouse.targetY - mouse.y) * 0.22;
      angleRef.current += 0.04;

      const mx = mouse.x;
      const my = mouse.y;

      // Outer soft radial glow
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 45);
      grad.addColorStop(0, "rgba(59, 126, 255, 0.25)");
      grad.addColorStop(0.5, "rgba(6, 182, 212, 0.1)");
      grad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(mx, my, 45, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Nucleus core
      ctx.beginPath();
      ctx.arc(mx, my, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Orbiting satellite nodes (neutron system)
      for (let k = 0; k < 3; k++) {
        const orbAngle = angleRef.current + (k * Math.PI * 2) / 3;
        const orbDist = 18 + k * 3;
        const ox = mx + Math.cos(orbAngle) * orbDist;
        const oy = my + Math.sin(orbAngle) * orbDist;

        // Satellite node dot
        ctx.beginPath();
        ctx.arc(ox, oy, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.95)";
        ctx.shadowColor = "#06b6d4";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connecting ray line to nucleus core
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(ox, oy);
        ctx.strokeStyle = "rgba(59, 126, 255, 0.35)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        display: "block",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
}
