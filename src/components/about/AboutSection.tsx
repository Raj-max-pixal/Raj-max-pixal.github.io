"use client";

import { useEffect, useRef } from "react";

const JOURNEY = [
  { year: "2007",    label: "First Code",          desc: "Curiosity sparked a lifelong obsession with building." },
  { year: "2021",    label: "Self-taught Engineer", desc: "3+ years of Python, Java, JavaScript — built a real engineering foundation." },
  { year: "2023",    label: "Founded Multimax",     desc: "Shipped production AI applications to real users. Startup founder." },
  { year: "2024",    label: "B.Tech IT",            desc: "Arunachala College — CGPA 8.83. Deepened CS fundamentals and systems thinking." },
  { year: "2026",    label: "Microsoft Hackathon",  desc: "CareerForge AI — 85% accuracy, sub-200ms latency. Published IoT research. Google Ambassador." },
  { year: "→",       label: "What's Next",          desc: "Building intelligent products that go beyond the expected." },
];

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
      {/* Background accent */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-15%", top: "5%",
        width: "550px", height: "550px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,126,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container">
        <span className="section-label reveal" style={{ marginBottom: "2rem", display: "block" }}>About</span>

        <h2 className="t-display reveal" style={{ marginBottom: "3.5rem", transitionDelay: "0.08s" }}>
          Building beyond
          <br />
          <span style={{ color: "var(--text-secondary)" }}>the obvious.</span>
        </h2>

        {/* Two-column bio */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem, 5vw, 4.5rem)",
          marginBottom: "5rem",
        }} className="about-grid">
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <p className="t-body-lg" style={{ color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
              I&apos;m <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Rajasaranya.T</strong> — software engineer, AI builder, and founder from Chennai, Tamil Nadu. I study Information Technology at Arunachala College of Engineering for Women (CGPA 8.83).
            </p>
            <p className="t-body-lg" style={{ color: "var(--text-secondary)" }}>
              I founded <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Multimax</strong> — shipping production AI applications used by real users. I operate at the intersection of full-stack engineering, LLM integration, and cloud infrastructure.
            </p>
          </div>

          <div className="reveal" style={{ transitionDelay: "0.25s" }}>
            <p className="t-body-lg" style={{ color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
              Competed at <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Microsoft Hackathon 2026</strong>, published peer-reviewed IoT research in IJFMR, earned Google Cloud certifications, and mentored 20+ junior engineers on full-stack architecture.
            </p>
            <p className="t-body-lg" style={{ color: "var(--text-secondary)" }}>
              I also produce 150+ technical videos explaining AI, ML, and cloud engineering — making complex systems accessible to the next generation of builders.
            </p>
          </div>
        </div>

        {/* Journey timeline */}
        <div className="reveal" style={{ transitionDelay: "0.35s" }}>
          <p className="t-label" style={{ color: "var(--text-tertiary)", marginBottom: "2.5rem" }}>Journey</p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
            position: "relative",
            gap: "0 0.5rem",
          }}>
            {/* Connector */}
            <div aria-hidden="true" style={{
              position: "absolute",
              top: "4px",
              left: 0, right: 0,
              height: "1px",
              background: "var(--border)",
              zIndex: 0,
            }} />

            {JOURNEY.map((item, i) => (
              <div
                key={item.year}
                style={{
                  paddingBottom: "2rem",
                  paddingRight: "1rem",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Dot */}
                <div style={{
                  width: 9, height: 9,
                  borderRadius: "50%",
                  background: i === JOURNEY.length - 1 ? "var(--accent)" : "var(--bg-elevated)",
                  border: `1.5px solid ${i === JOURNEY.length - 1 ? "var(--accent)" : "var(--border-strong)"}`,
                  marginBottom: "1rem",
                }} />

                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "0.35rem" }}>
                  {item.year}
                </p>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.3rem", lineHeight: 1.3 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--text-tertiary)", lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
