"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HeroVideo } from "./HeroVideo";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { InteractiveParticleField } from "@/components/ui/InteractiveParticleField";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  // Cinematic entrance sequence
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), reducedMotion ? 0 : 300);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  // Subtle mouse parallax — desktop only
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;
    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) return;

    let frameId: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const { innerWidth: W, innerHeight: H } = window;
        const rx = (e.clientX / W - 0.5) * 2;
        const ry = (e.clientY / H - 0.5) * 2;
        const glow = section.querySelector<HTMLElement>(".hero-glow");
        const text = section.querySelector<HTMLElement>(".hero-text");
        if (glow) glow.style.transform = `translate(calc(-50% + ${rx * -18}px), calc(-50% + ${ry * -12}px))`;
        if (text) text.style.transform = `translate(${rx * 3}px, ${ry * 2}px)`;
      });
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => { cancelAnimationFrame(frameId); document.removeEventListener("mousemove", onMove); };
  }, [reducedMotion]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        background: "var(--bg-base)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr",
        alignItems: "center",
      }}
      className="hero-section"
    >
      {/* Ambient radial glow — reacts to mouse */}
      <div
        className="hero-glow"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: "900px", height: "600px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse at center, rgba(59,126,255,0.055) 0%, transparent 65%)",
          pointerEvents: "none",
          willChange: "transform",
          transition: "transform 0.8s var(--ease-expo)",
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          pointerEvents: "none",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      {/* Interactive particle field */}
      <InteractiveParticleField particleCount={80} style={{ opacity: 0.5 }} />

      {/* ── Left: Typography ──────────────────────────────────── */}
      <div
        className="hero-text"
        style={{
          position: "relative",
          zIndex: 10,
          padding: "clamp(5rem,10vw,7rem) clamp(1.25rem,4vw,3.5rem) 4rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          willChange: "transform",
          transition: "transform 0.8s var(--ease-expo)",
        }}
      >
        {/* Label */}
        <span
          className="section-label"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(8px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            transitionDelay: "0s",
          }}
        >
          Portfolio 2026
        </span>

        {/* Name */}
        <h1
          className="t-hero"
          style={{
            color: "var(--text-primary)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(28px)",
            transition: "opacity 1s ease, transform 1s var(--ease-expo)",
            transitionDelay: "0.18s",
          }}
        >
          RAJA
          <br />
          <span style={{ color: "rgba(239,239,239,0.42)", letterSpacing: "-0.04em" }}>
            SARANYA.T
          </span>
        </h1>

        {/* Role */}
        <p
          style={{
            fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
            fontWeight: 400,
            letterSpacing: "0.14em",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
            transitionDelay: "0.38s",
          }}
        >
          Software Engineer
          <span style={{ color: "var(--accent)", fontSize: "0.5em" }}>●</span>
          AI Builder
          <span style={{ color: "var(--accent)", fontSize: "0.5em" }}>●</span>
          Full-Stack Developer
          <span style={{ color: "var(--accent)", fontSize: "0.5em" }}>●</span>
          CloudSecOps Explorer
        </p>

        {/* Running marquee text */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease",
            transitionDelay: "0.5s",
            marginTop: "0.25rem",
          }}
        >
          <TechMarquee speed={32} />
        </div>

        {/* Copy */}
        <p
          className="t-body-lg"
          style={{
            color: "var(--text-secondary)",
            maxWidth: "400px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(14px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
            transitionDelay: "0.62s",
          }}
        >
          Building intelligent products, immersive experiences,
          and software that goes beyond the expected.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.85rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(12px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
            transitionDelay: "0.78s",
          }}
        >
          <button
            id="hero-explore-btn"
            className="btn-primary"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore My Work
          </button>
          <button
            id="hero-about-btn"
            className="btn-outline"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            About Me
          </button>
        </div>
      </div>

      {/* ── Right: Video subject ──────────────────────────────── */}
      <div
        style={{
          position: "relative",
          height: "100svh",
          overflow: "hidden",
        }}
        className="hero-video-col"
      >
        <HeroVideo visible={visible} />
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to About section"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.3rem",
          zIndex: 20,
          opacity: visible ? 0.35 : 0,
          transition: "opacity 1.2s ease",
          transitionDelay: "1.4s",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.35")}
      >
        <span className="t-label" style={{ color: "var(--text-tertiary)", fontSize: "0.6rem" }}>SCROLL</span>
        <ChevronDown size={13} color="var(--text-tertiary)" style={{ animation: "scrollBounce 2s ease-in-out infinite" }} />
      </button>

      <style>{`
        @keyframes scrollBounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto 1fr !important;
          }
          .hero-video-col {
            height: 60vw !important;
            min-height: 260px;
          }
        }
      `}</style>
    </section>
  );
}
