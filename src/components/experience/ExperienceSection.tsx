"use client";

import { useEffect, useRef } from "react";

const TIMELINE = [
  {
    period: "Jan 2023 – Present",
    role: "Founder & Full Stack Engineer",
    org: "Multimax",
    points: [
      "Designed, built, and launched 3 production-grade applications — AI content platform + social app, web and mobile.",
      "Gathered requirements from real users; iterated on scope based on feedback and usage data.",
      "Distributed backend on Firebase + GCP handling concurrent real-time sessions at scale.",
      "Produced 150+ technical videos on AI, ML, cloud engineering — growing the developer community.",
    ],
  },
  {
    period: "2026",
    role: "CareerForge AI — Microsoft Hackathon",
    org: "Hackathon",
    points: [
      "Built an AI career-path recommendation engine — 85%+ accuracy, 100+ test users.",
      "Scalable RESTful API architecture: sub-200ms response under concurrent load.",
      "Resume analyzer + job-matching pipeline: cut career-assessment time by 70%.",
    ],
  },
  {
    period: "2026",
    role: "EcoMind AI — 48-hour Build",
    org: "Hackathon",
    points: [
      "Integrated Anthropic Claude API for real-time eco-analysis — reduced decision time by 60%.",
      "Full React SPA with auth, data visualization, and RESTful backend in under 48 hours.",
    ],
  },
  {
    period: "2026",
    role: "Google Student Ambassador",
    org: "Google",
    points: [
      "Google Cloud certifications: Compute Engine, Internal Load Balancing (GSP216), Cloud Build CI/CD.",
      "Mentored 20+ junior engineers on full-stack architecture, Git workflows, and algorithms.",
    ],
  },
  {
    period: "2026",
    role: "Published Research",
    org: "IJFMR",
    points: [
      '"Smart Waste Segregation and Recycling System" — peer-reviewed IoT research. Vol. 2026, Issue 1.',
    ],
  },
  {
    period: "2024 – 2028",
    role: "B.Tech Information Technology",
    org: "Arunachala College of Engineering for Women",
    points: [
      "CGPA: 8.83 / 10.0 · Semester 4 complete.",
      "Coursework: DSA, OOP, DBMS, OS, Distributed Systems, Full-Stack Dev, ML Fundamentals.",
    ],
  },
];

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.06, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      aria-label="Experience"
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="container">
        <span className="section-label reveal" style={{ marginBottom: "1.5rem", display: "block" }}>Journey</span>
        <h2 className="t-display reveal" style={{ marginBottom: "4rem", transitionDelay: "0.08s" }}>Experience</h2>

        {/* Two-col timeline */}
        <div
          style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "0" }}
          className="experience-grid"
        >
          {TIMELINE.map((item, i) => (
            <div key={i} style={{ display: "contents" }}>
              {/* Period */}
              <div
                className="reveal"
                style={{
                  padding: "0 2rem 3rem 0",
                  borderRight: "1px solid var(--border)",
                  position: "relative",
                  transitionDelay: `${i * 0.07}s`,
                }}
              >
                <div className="tl-dot" />
                <p className="t-small" style={{ color: "var(--text-tertiary)", lineHeight: 1.45 }}>
                  {item.period}
                </p>
              </div>

              {/* Content */}
              <div
                className="reveal"
                style={{
                  padding: "0 0 3rem 2rem",
                  transitionDelay: `${i * 0.07 + 0.05}s`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.6rem", marginBottom: "0.75rem" }}>
                  <h3 className="t-heading" style={{ fontSize: "1rem" }}>{item.role}</h3>
                  <span style={{
                    padding: "0.12rem 0.6rem",
                    borderRadius: "var(--r-full)",
                    border: "1px solid var(--border)",
                    fontSize: "0.7rem",
                    color: "var(--text-tertiary)",
                    letterSpacing: "0.04em",
                  }}>
                    {item.org}
                  </span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {item.points.map((pt, j) => (
                    <li key={j} style={{ display: "flex", gap: "0.55rem", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--accent)", fontSize: "0.45rem", marginTop: "0.48rem", flexShrink: 0 }}>●</span>
                      <span className="t-small" style={{ color: "var(--text-secondary)", lineHeight: 1.65 }}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .experience-grid { grid-template-columns: 1fr !important; }
          .experience-grid > div:nth-child(odd) {
            border-right: none !important;
            padding-right: 0 !important;
            border-left: 1px solid var(--border);
            padding-left: 1rem !important;
            padding-bottom: 0.25rem !important;
          }
          .experience-grid > div:nth-child(even) {
            border-left: 1px solid var(--border);
            padding-left: 1rem !important;
          }
          .tl-dot { right: auto !important; left: -4.5px !important; }
        }
      `}</style>
    </section>
  );
}
