"use client";

import { useEffect, useRef, useState } from "react";

const EDUCATION = [
  {
    level: "School",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="currentColor"/><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="currentColor" opacity=".6"/></svg>`,
    institution: "School Education",
    degree: "Higher Secondary (11th & 12th)",
    period: "Completed",
    detail: "Foundation in mathematics, science, and computing — setting the stage for engineering studies.",
    accent: "#06b6d4",
    tags: ["Mathematics", "Science", "Computing"],
  },
  {
    level: "B.Tech",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5h16v14H4V5zm4 4h8M8 13h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 2v3M12 19v3M2 12h2M20 12h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".5"/></svg>`,
    institution: "Arunachala College of Engineering for Women",
    degree: "Bachelor of Technology — Information Technology",
    period: "2024 – 2028 (Expected)",
    detail: "CGPA: 8.83 / 10.0 · 2nd Year, Semester 4 Completed. Core coursework: Data Structures & Algorithms, OOP, DBMS, Operating Systems, Distributed Systems, Full-Stack Web Development, Machine Learning Fundamentals.",
    accent: "#3b7eff",
    tags: ["CGPA 8.83", "DSA", "DBMS", "OS", "ML", "Full-Stack"],
  },
];

export function EducationSection() {
  const ref = useRef<HTMLElement>(null);
  const [inViewItems, setInViewItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLElement>("[data-edu-item]");
    if (!items) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const key = (e.target as HTMLElement).dataset.eduItem ?? "";
          setInViewItems(prev => ({ ...prev, [key]: true }));
        }
      }),
      { threshold: 0.2 }
    );
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="education"
      ref={ref}
      aria-label="Academic Background"
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
    >
      {/* BG glow */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-10%", top: "10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>Education</span>
        <h2 className="t-display" style={{ marginBottom: "1rem" }}>Academic Background</h2>
        <p className="t-body" style={{ color: "var(--text-secondary)", maxWidth: "520px", marginBottom: "4rem" }}>
          Building strong foundations alongside real-world development.
        </p>

        {/* Timeline */}
        <div style={{ position: "relative", maxWidth: "680px" }}>
          {/* Vertical line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "20px",
              top: 0, bottom: 0,
              width: "1px",
              background: "linear-gradient(to bottom, rgba(59,126,255,0.4), rgba(6,182,212,0.2) 70%, transparent)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {EDUCATION.map((edu, i) => (
              <div
                key={edu.level}
                data-edu-item={edu.level}
                style={{
                  display: "flex",
                  gap: "2rem",
                  opacity: inViewItems[edu.level] ? 1 : 0,
                  transform: inViewItems[edu.level] ? "none" : i === 0 ? "translateX(-40px) scale(0.96)" : "translateX(40px) scale(0.96)",
                  filter: inViewItems[edu.level] ? "blur(0px)" : "blur(6px)",
                  transition: `opacity 0.85s var(--ease-expo) ${i * 0.2}s, transform 0.85s var(--ease-expo) ${i * 0.2}s, filter 0.85s ease ${i * 0.2}s`,
                }}
              >
                {/* Timeline node */}
                <div style={{ flexShrink: 0, position: "relative" }}>
                  <div
                    style={{
                      width: "40px", height: "40px",
                      borderRadius: "50%",
                      background: "var(--bg-base)",
                      border: `2px solid ${edu.accent}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: edu.accent,
                      boxShadow: `0 0 20px ${edu.accent}30`,
                      transition: "box-shadow 0.3s ease",
                    }}
                  >
                    <div
                      style={{ width: "18px", height: "18px" }}
                    >
                      <div className="svg-icon-wrap" dangerouslySetInnerHTML={{ __html: edu.icon }} />
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div
                  className="journey-card"
                  style={{
                    flex: 1,
                    paddingBottom: "1.75rem",
                  }}
                >
                  {/* Header row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <span
                      style={{
                        padding: "0.15rem 0.6rem",
                        background: `${edu.accent}14`,
                        border: `1px solid ${edu.accent}28`,
                        borderRadius: "var(--r-full)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: edu.accent,
                        textTransform: "uppercase" as const,
                      }}
                    >
                      {edu.level}
                    </span>
                    <span className="t-label" style={{ color: "var(--text-tertiary)" }}>{edu.period}</span>
                  </div>

                  {/* Institution */}
                  <h3
                    style={{
                      fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "0.25rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {edu.institution}
                  </h3>

                  {/* Degree */}
                  <p style={{ fontSize: "0.875rem", color: "var(--accent)", fontWeight: 500, marginBottom: "0.85rem" }}>
                    {edu.degree}
                  </p>

                  {/* Detail */}
                  <p className="t-small" style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                    {edu.detail}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {edu.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          padding: "0.15rem 0.55rem",
                          borderRadius: "var(--r-full)",
                          border: "1px solid var(--border)",
                          fontSize: "0.65rem",
                          color: "var(--text-tertiary)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Accent left border */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0, top: "20%", bottom: "20%",
                      width: "2px",
                      background: edu.accent,
                      borderRadius: "2px",
                      opacity: 0.45,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
