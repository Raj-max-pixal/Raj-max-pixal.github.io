"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STATS = [
  {
    value: 30,
    suffix: "+",
    label: "Repositories",
    sublabel: "& Real-world Projects",
  },
  {
    value: 10,
    suffix: "+",
    label: "Hackathons",
    sublabel: "Competed & Built",
  },
  {
    value: 20,
    suffix: "+",
    label: "Technologies",
    sublabel: "Explored & Used",
  },
  {
    value: 3,
    suffix: "+",
    label: "Certifications",
    sublabel: "Google Cloud",
  },
];

function useCountUp(target: number, inView: boolean, reducedMotion: boolean, duration = 1800) {
  const [count, setCount] = useState(reducedMotion ? target : 0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!inView || reducedMotion) {
      setCount(target);
      return;
    }
    setCount(0);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, target, reducedMotion, duration]);

  return count;
}

function StatItem({ value, suffix, label, sublabel, inView }: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  inView: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const count = useCountUp(value, inView, reducedMotion);

  return (
    <div className="stat-item">
      <div
        style={{
          fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "var(--text-primary)",
          fontVariantNumeric: "tabular-nums",
          fontFamily: "var(--font-display, var(--font-sans))",
        }}
      >
        {count}
        <span style={{ color: "var(--accent)" }}>{suffix}</span>
      </div>
      <div style={{ marginTop: "0.75rem" }}>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {label}
        </p>
        <p
          className="t-small"
          style={{ color: "var(--text-tertiary)", marginTop: "0.2rem" }}
        >
          {sublabel}
        </p>
      </div>
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      aria-label="Statistics"
      style={{
        position: "relative",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        padding: "clamp(4rem, 8vw, 6rem) clamp(1.25rem, 4vw, 3.5rem)",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px", height: "400px",
          background: "radial-gradient(ellipse, rgba(59,126,255,0.045) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          position: "relative",
          zIndex: 1,
        }}
        className="stats-grid"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: `opacity 0.7s var(--ease-expo) ${i * 0.1}s, transform 0.7s var(--ease-expo) ${i * 0.1}s`,
            }}
          >
            <StatItem
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              sublabel={stat.sublabel}
              inView={inView}
            />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .stats-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
          }
          .stats-grid > div:last-child, .stats-grid > div:nth-last-child(2):nth-child(odd) {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
