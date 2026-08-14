"use client";

import { useEffect, useRef, useState } from "react";

const JOURNEY = [
  {
    step: "01",
    period: "2021",
    title: "Early Learning",
    category: "Foundation",
    description:
      "Started exploring programming and software development. Discovered Python, Java, and JavaScript through self-directed learning — moving from tutorials to real problem-solving.",
    tags: ["Python", "Java", "JavaScript", "DSA", "Self-Taught"],
    accent: "#3b7eff",
  },
  {
    step: "02",
    period: "2022",
    title: "Building Real Projects",
    category: "Building",
    description:
      "Stopped learning for the sake of learning. Started creating applications — shipping features, gathering feedback, and iterating. The shift from student to builder.",
    tags: ["Projects", "Shipping", "Feedback Loops", "Iteration"],
    accent: "#a855f7",
  },
  {
    step: "03",
    period: "2023 – 2024",
    title: "Full-Stack Development",
    category: "Full-Stack",
    description:
      "Expanded into the complete stack: React frontend, Node.js & FastAPI backends, Firebase databases, REST APIs, authentication, and production deployment. Shipping end-to-end.",
    tags: ["React", "Next.js", "FastAPI", "Firebase", "Deployment"],
    accent: "#22c55e",
  },
  {
    step: "04",
    period: "2024",
    title: "B.Tech Begins",
    category: "Education",
    description:
      "Started B.Tech in Information Technology at Arunachala College of Engineering for Women. Deepening CS fundamentals: DSA, OS, DBMS, Distributed Systems, and ML fundamentals. CGPA 8.83.",
    tags: ["CGPA 8.83", "DSA", "OS", "DBMS", "ML"],
    accent: "#f59e0b",
  },
  {
    step: "05",
    period: "2025 – 2026",
    title: "AI Exploration",
    category: "AI / LLMs",
    description:
      "Started building AI-powered applications. Integrated LLM APIs (Gemini, Claude), developed prompt engineering techniques, designed AI agents, and shipped AI systems for real use-cases.",
    tags: ["LLM APIs", "Gemini", "Claude", "Prompt Engineering", "AI Agents"],
    accent: "#ec4899",
  },
  {
    step: "06",
    period: "2026",
    title: "Hackathons",
    category: "Competition",
    description:
      "Competed in multiple hackathons and rapid-build challenges. Built CareerForge AI (Microsoft Hackathon) and EcoMind AI (48h). Practiced building fast under pressure — with real architecture decisions.",
    tags: ["Microsoft Hackathon", "CareerForge AI", "EcoMind AI", "Rapid Build"],
    accent: "#06b6d4",
  },
  {
    step: "07",
    period: "2026",
    title: "Google Student Ambassador",
    category: "Leadership",
    description:
      "Earned Google Cloud certifications (Compute Engine, Internal Load Balancing, Cloud Build CI/CD). Mentored 20+ junior engineers on full-stack architecture, Git workflows, and algorithms. Published IoT research in IJFMR.",
    tags: ["Google Cloud", "CI/CD", "Mentoring", "IJFMR Research"],
    accent: "#4285F4",
  },
  {
    step: "08",
    period: "2026",
    title: "CloudSecOps Exploration",
    category: "CloudSecOps",
    description:
      "Actively exploring the intersection of Cloud, Cybersecurity, and DevOps. Learning secure cloud-native development practices, containerization, CI/CD security, and DevSecOps fundamentals — building more resilient systems.",
    tags: ["Docker", "GCP", "DevSecOps", "CI/CD Security", "Linux"],
    accent: "#ef4444",
  },
  {
    step: "09",
    period: "Next",
    title: "What&apos;s Next",
    category: "Future",
    description:
      "Continue building production-quality AI systems, expand CloudSecOps capabilities, contribute to open source, and ship software that makes a real difference. The learning never stops.",
    tags: ["AI Systems", "CloudSecOps", "Open Source", "Production Scale"],
    accent: "#efefef",
  },
];

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [inViewItems, setInViewItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>("[data-journey-item]");
    if (!els) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const key = (e.target as HTMLElement).dataset.journeyItem ?? "";
          setInViewItems(prev => ({ ...prev, [key]: true }));
        }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      line.style.height = "100%";
      return;
    }
    const update = () => {
      const rect = line.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const scrolled = Math.max(0, window.innerHeight - rect.top);
      const pct = Math.min(100, (scrolled / rect.height) * 100);
      line.style.height = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section
      id="journey"
      ref={ref}
      aria-label="Personal Journey"
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
    >
      <div aria-hidden="true" style={{
        position: "absolute", left: "-10%", top: "10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,126,255,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container">
        <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>My Story</span>
        <h2 className="t-display" style={{ marginBottom: "1rem" }}>Personal Journey</h2>
        <p className="t-body" style={{ color: "var(--text-secondary)", maxWidth: "480px", marginBottom: "4rem" }}>
          From writing first lines of code to building production AI systems and exploring CloudSecOps.
        </p>

        <div style={{ position: "relative" }} className="journey-container">
          {/* Center timeline line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              top: 0, bottom: 0,
              width: "1px",
              background: "var(--border)",
              transform: "translateX(-50%)",
            }}
            className="journey-center-line"
          >
            <div
              ref={lineRef}
              style={{
                position: "absolute", top: 0, left: 0,
                width: "100%", height: "0%",
                background: "linear-gradient(to bottom, var(--accent), rgba(59,126,255,0.3))",
                transition: "height 0.1s linear",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }} className="journey-cards">
            {JOURNEY.map((item, i) => {
              const isLeft = i % 2 === 0;
              const itemInView = inViewItems[item.step];

              return (
                <div
                  key={item.step}
                  data-journey-item={item.step}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 60px 1fr",
                    alignItems: "center",
                  }}
                  className="journey-row"
                >
                  <div style={{ padding: "0 2rem 0 0", display: "flex", justifyContent: "flex-end" }}>
                    {isLeft ? (
                      <JourneyCard item={item} inView={itemInView} direction="left" />
                    ) : (
                      <div style={{ opacity: itemInView ? 1 : 0, transition: "opacity 0.6s ease", textAlign: "right" }}>
                        <p className="t-label" style={{ color: "var(--text-tertiary)" }}>{item.period}</p>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        width: "38px", height: "38px",
                        borderRadius: "50%",
                        background: "var(--bg-base)",
                        border: `2px solid ${itemInView ? item.accent : "var(--border)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: itemInView ? `0 0 18px ${item.accent}35` : "none",
                        transition: "border-color 0.5s ease, box-shadow 0.5s ease",
                        transitionDelay: `${i * 0.08}s`,
                        flexShrink: 0,
                      }}
                    >
                      <span style={{
                        fontSize: "0.58rem", fontWeight: 800,
                        color: itemInView ? item.accent : "var(--text-tertiary)",
                        letterSpacing: "0.04em",
                        transition: "color 0.5s ease",
                        transitionDelay: `${i * 0.08}s`,
                      }}>
                        {item.step}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: "0 0 0 2rem" }}>
                    {!isLeft ? (
                      <JourneyCard item={item} inView={itemInView} direction="right" />
                    ) : (
                      <div style={{ opacity: itemInView ? 1 : 0, transition: "opacity 0.6s ease" }}>
                        <p className="t-label" style={{ color: "var(--text-tertiary)" }}>{item.period}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .journey-center-line { display: none !important; }
          .journey-row { grid-template-columns: 40px 1fr !important; }
          .journey-row > div:nth-child(1) { display: none !important; }
          .journey-row > div:nth-child(2) { justify-content: flex-start !important; }
          .journey-row > div:nth-child(3) { padding: 0 0 0 1rem !important; }
        }
      `}</style>
    </section>
  );
}

function JourneyCard({
  item, inView, direction,
}: {
  item: typeof JOURNEY[0];
  inView: boolean;
  direction: "left" | "right";
}) {
  return (
    <div
      className="journey-card"
      style={{
        width: "100%",
        maxWidth: "400px",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateX(${direction === "left" ? "-20px" : "20px"}) translateY(10px)`,
        transition: "opacity 0.7s var(--ease-expo), transform 0.7s var(--ease-expo)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem", flexWrap: "wrap", gap: "0.4rem" }}>
        <span style={{
          padding: "0.12rem 0.55rem",
          background: `${item.accent}14`,
          border: `1px solid ${item.accent}28`,
          borderRadius: "var(--r-full)",
          fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
          color: item.accent, textTransform: "uppercase" as const,
        }}>
          {item.category}
        </span>
        <span className="t-label" style={{ color: "var(--text-tertiary)", fontSize: "0.62rem" }}>{item.period}</span>
      </div>

      <span aria-hidden="true" style={{
        position: "absolute", top: "-1rem", right: "-0.5rem",
        fontSize: "4.5rem", fontWeight: 900, letterSpacing: "-0.06em",
        color: `${item.accent}07`, lineHeight: 1, userSelect: "none",
        pointerEvents: "none", fontVariantNumeric: "tabular-nums",
      }}>
        {item.step}
      </span>

      <h3 style={{
        fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)", fontWeight: 700,
        letterSpacing: "-0.02em", color: "var(--text-primary)",
        marginBottom: "0.65rem", lineHeight: 1.2, position: "relative",
      }}>
        {item.title}
      </h3>

      <p className="t-body" style={{ color: "var(--text-secondary)", marginBottom: "1.1rem", lineHeight: 1.7, fontSize: "0.85rem" }}
        dangerouslySetInnerHTML={{ __html: item.description }}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
        {item.tags.map(tag => (
          <span key={tag} style={{
            padding: "0.12rem 0.5rem", borderRadius: "var(--r-full)",
            border: "1px solid var(--border)", fontSize: "0.65rem",
            color: "var(--text-tertiary)", letterSpacing: "0.02em",
          }}>
            {tag}
          </span>
        ))}
      </div>

      <div style={{
        position: "absolute", left: 0, top: "20%", bottom: "20%",
        width: "2px", background: item.accent, borderRadius: "2px", opacity: 0.45,
      }} />
    </div>
  );
}
