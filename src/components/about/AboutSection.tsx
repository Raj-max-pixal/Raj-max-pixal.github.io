"use client";

import { useEffect, useRef } from "react";
import { AboutPortrait } from "./AboutPortrait";
import { InteractiveParticleField } from "@/components/ui/InteractiveParticleField";
import { NetworkParticles } from "@/components/ui/NetworkParticles";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About"
      className="section-pad"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <InteractiveParticleField particleCount={60} style={{ opacity: 0.4 }} />
      <NetworkParticles particleCount={100} connectionDistance={130} style={{ opacity: 0.5 }} />

      <div aria-hidden="true" style={{
        position: "absolute", right: "-15%", top: "5%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,126,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <span className="section-label reveal" style={{ marginBottom: "2rem", display: "block" }}>About</span>

        <h2 className="t-display reveal" style={{ marginBottom: "3.5rem", transitionDelay: "0.08s" }}>
          Building beyond
          <br />
          <span style={{ color: "var(--text-secondary)" }}>the obvious.</span>
        </h2>

        {/* Two-column */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "center",
          }}
          className="about-main-grid"
        >
          {/* Left: Bio */}
          <div>
            <div className="reveal" style={{ transitionDelay: "0.15s" }}>
              <p className="t-body-lg" style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                I&apos;m <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Rajasaranya.T</strong> — a software engineer, AI builder, and full-stack developer from Chennai, Tamil Nadu. I study Information Technology at Arunachala College of Engineering for Women (CGPA 8.83).
              </p>
              <p className="t-body-lg" style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                I build production-grade software — from AI platforms and voice interfaces to mobile apps and developer tools. I operate at the intersection of <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>full-stack engineering</strong>, LLM integration, and cloud infrastructure.
              </p>
              <p className="t-body-lg" style={{ color: "var(--text-secondary)" }}>
                Beyond building, I&apos;m actively exploring <strong style={{ color: "#06b6d4", fontWeight: 600 }}>CloudSecOps</strong> — combining cloud-native development, cybersecurity fundamentals, and DevOps practices to build more secure and resilient software systems.
              </p>
            </div>

            {/* Interest tags */}
            <div className="reveal" style={{ marginTop: "2rem", transitionDelay: "0.22s" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {[
                  { label: "AI Builder", color: "#a855f7" },
                  { label: "Full-Stack", color: "#3b7eff" },
                  { label: "Cloud", color: "#22c55e" },
                  { label: "Cybersecurity", color: "#ef4444" },
                  { label: "DevOps", color: "#f59e0b" },
                  { label: "CloudSecOps", color: "#06b6d4" },
                ].map(tag => (
                  <span
                    key={tag.label}
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "var(--r-full)",
                      border: `1px solid ${tag.color}30`,
                      background: `${tag.color}0d`,
                      fontSize: "0.72rem",
                      color: tag.color,
                      fontWeight: 500,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div
              className="reveal"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginTop: "2rem",
                transitionDelay: "0.28s",
              }}
            >
              {[
                { value: "8.83", label: "CGPA" },
                { value: "10+", label: "Hackathons" },
                { value: "30+", label: "Projects" },
              ].map(stat => (
                <div
                  key={stat.label}
                  style={{
                    padding: "0.9rem 1.3rem",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r-lg)",
                    textAlign: "center",
                    minWidth: "80px",
                  }}
                >
                  <p style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text-primary)", lineHeight: 1 }}>
                    {stat.value}
                  </p>
                  <p className="t-label" style={{ color: "var(--text-tertiary)", marginTop: "0.3rem" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Portrait + floating badges */}
          <div className="reveal" style={{ transitionDelay: "0.3s" }}>
            <AboutPortrait />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
