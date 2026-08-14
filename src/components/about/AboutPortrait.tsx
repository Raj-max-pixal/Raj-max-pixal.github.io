"use client";

import { useEffect, useRef, useState } from "react";
import { FloatingTechBadge } from "./FloatingTechBadge";

const TECH_BADGES = [
  {
    tech: "python", label: "Python",
    style: { top: "4%", left: "5%" },
    animationVariant: "up" as const,
    animationDuration: 4.2,
    animationDelay: 0,
    rotation: -3,
  },
  {
    tech: "react", label: "React",
    style: { top: "12%", right: "2%" },
    animationVariant: "down" as const,
    animationDuration: 3.8,
    animationDelay: 0.4,
    rotation: 2,
  },
  {
    tech: "nextjs", label: "Next.js",
    style: { top: "35%", left: "-2%" },
    animationVariant: "up" as const,
    animationDuration: 4.5,
    animationDelay: 0.8,
    rotation: -2,
  },
  {
    tech: "flutter", label: "Flutter",
    style: { bottom: "32%", left: "4%" },
    animationVariant: "down" as const,
    animationDuration: 3.9,
    animationDelay: 0.3,
    rotation: 3,
  },
  {
    tech: "fastapi", label: "FastAPI",
    style: { bottom: "14%", left: "8%" },
    animationVariant: "up" as const,
    animationDuration: 4.3,
    animationDelay: 1.2,
    rotation: -1,
  },
  {
    tech: "firebase", label: "Firebase",
    style: { bottom: "6%", right: "10%" },
    animationVariant: "down" as const,
    animationDuration: 3.6,
    animationDelay: 0.6,
    rotation: 2,
  },
  {
    tech: "typescript", label: "TypeScript",
    style: { top: "55%", right: "-3%" },
    animationVariant: "up" as const,
    animationDuration: 4.7,
    animationDelay: 1.0,
    rotation: -2,
  },
  {
    tech: "docker", label: "Docker",
    style: { top: "72%", right: "6%" },
    animationVariant: "down" as const,
    animationDuration: 5.0,
    animationDelay: 0.5,
    rotation: 1,
  },
  {
    tech: "gemini", label: "Gemini AI",
    style: { top: "1%", right: "28%" },
    animationVariant: "up" as const,
    animationDuration: 4.0,
    animationDelay: 1.5,
    rotation: 0,
  },
  {
    tech: "git", label: "Git",
    style: { bottom: "24%", right: "0%" },
    animationVariant: "up" as const,
    animationDuration: 3.8,
    animationDelay: 0.9,
    rotation: -3,
  },
  {
    tech: "gcp", label: "GCP",
    style: { top: "25%", right: "15%" },
    animationVariant: "down" as const,
    animationDuration: 4.4,
    animationDelay: 1.3,
    rotation: 1,
  },
  {
    tech: "github", label: "GitHub",
    style: { bottom: "45%", left: "2%" },
    animationVariant: "up" as const,
    animationDuration: 4.1,
    animationDelay: 0.7,
    rotation: -2,
  },
];

// Mobile: show only a subset to avoid crowding
const MOBILE_BADGES = ["python", "react", "nextjs", "firebase", "typescript", "gcp"];

export function AboutPortrait() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Subtle mouse parallax on the badge layer
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = layerRef.current;
    if (!layer) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = ((e.clientX / innerWidth) - 0.5) * 12;
      mouseY = ((e.clientY / innerHeight) - 0.5) * 8;
    };

    const tick = () => {
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;
      layer.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    tick();

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const visibleBadges = isMobile
    ? TECH_BADGES.filter(b => MOBILE_BADGES.includes(b.tech))
    : TECH_BADGES;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "480px",
        margin: "0 auto",
        aspectRatio: "3/4",
      }}
    >
      {/* Portrait image frame */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "15%",
          right: "15%",
          bottom: "8%",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(59,126,255,0.08)",
          background: "var(--bg-elevated)",
          zIndex: 2,
        }}
      >
        {/* Portrait */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/portrait.jpg"
          alt="Rajasaranya.T — Software Engineer & AI Builder"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
          onError={(e) => {
            // If portrait not found, show a styled placeholder
            const target = e.currentTarget;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent && !parent.querySelector(".portrait-placeholder")) {
              const placeholder = document.createElement("div");
              placeholder.className = "portrait-placeholder";
              placeholder.style.cssText = `
                width:100%;height:100%;
                display:flex;flex-direction:column;
                align-items:center;justify-content:center;
                gap:1rem;
                background: linear-gradient(145deg, #0a0a0a 0%, #111111 40%, #0d1a2a 100%);
              `;
              placeholder.innerHTML = `
                <div style="width:72px;height:72px;border-radius:50%;background:rgba(59,126,255,0.12);border:2px solid rgba(59,126,255,0.25);display:flex;align-items:center;justify-content:center;">
                  <span style="font-size:2rem;font-weight:800;color:rgba(59,126,255,0.8)">R</span>
                </div>
                <p style="font-size:0.75rem;color:rgba(255,255,255,0.25);letter-spacing:0.1em;font-weight:500">RAJASARANYA.T</p>
              `;
              parent.appendChild(placeholder);
            }
          }}
        />

        {/* Subtle vignette overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 50%, rgba(6,6,6,0.35) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Floating badges layer — parallax tracked */}
      <div
        ref={layerRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          willChange: "transform",
        }}
      >
        {visibleBadges.map((badge) => (
          <FloatingTechBadge
            key={badge.tech}
            tech={badge.tech}
            label={badge.label}
            style={isMobile ? getMobileStyle(badge.tech) : badge.style}
            animationVariant={badge.animationVariant}
            animationDuration={badge.animationDuration}
            animationDelay={badge.animationDelay}
            rotation={badge.rotation}
          />
        ))}
      </div>

      {/* Bottom ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "20%",
          right: "20%",
          height: "120px",
          background: "radial-gradient(ellipse at center, rgba(59,126,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
}

// Simplified mobile badge positions (fewer, repositioned)
function getMobileStyle(tech: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    python: { top: "2%", left: "0%" },
    react: { top: "2%", right: "0%" },
    nextjs: { bottom: "20%", left: "-2%" },
    firebase: { bottom: "20%", right: "-2%" },
    typescript: { bottom: "2%", left: "20%" },
  };
  return map[tech] ?? {};
}
