"use client";

import { useEffect, useRef, useState } from "react";
import { skillCategories } from "@/data/skills";
import { TechIconCard } from "./TechIconCard";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI / ML" },
  { id: "cloud", label: "Cloud" },
  { id: "cloudsecops", label: "CloudSecOps" },
  { id: "tools", label: "Tools" },
  { id: "cloudservices", label: "Cloud Services" },
  { id: "languages", label: "Languages" },
];

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const allSkills = skillCategories.flatMap(cat =>
    cat.skills.map(s => ({ ...s, categoryId: cat.id }))
  );

  const filtered = activeTab === "all"
    ? allSkills
    : allSkills.filter(s => s.categoryId === activeTab);

  return (
    <section
      id="skills"
      ref={ref}
      aria-label="Skills"
      className="section-pad"
      style={{
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* BG accent */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "-18%", top: "15%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,126,255,0.035) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container">
        <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>Technology</span>
        <h2 className="t-display" style={{ marginBottom: "0.75rem" }}>Tech Stack</h2>
        <p className="t-body" style={{ color: "var(--text-secondary)", maxWidth: "520px", marginBottom: "0.5rem" }}>
          Tools &amp; Technologies
        </p>
        <p className="t-small" style={{ color: "var(--text-tertiary)", maxWidth: "520px", marginBottom: "3rem" }}>
          The technologies powering my projects — from AI &amp; full-stack to cloud, security &amp; DevOps.
        </p>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Skill categories"
          style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2.5rem" }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              id={`tab-${cat.id}`}
              role="tab"
              aria-selected={activeTab === cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                padding: "0.4rem 1.1rem",
                borderRadius: "var(--r-full)",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                border: "1px solid",
                borderColor: activeTab === cat.id ? "var(--accent)" : "var(--border)",
                background: activeTab === cat.id ? "var(--accent)" : "transparent",
                color: activeTab === cat.id ? "#fff" : "var(--text-secondary)",
                transition: "all 0.2s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Icon grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {filtered.map((skill, i) => (
            <div
              key={`${skill.name}-${i}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(20px) scale(0.95)",
                filter: inView ? "blur(0px)" : "blur(4px)",
                transition: `opacity 0.6s var(--ease-expo) ${Math.min(i * 0.08, 0.8)}s, transform 0.6s var(--ease-expo) ${Math.min(i * 0.08, 0.8)}s, filter 0.6s ease ${Math.min(i * 0.08, 0.8)}s`,
              }}
            >
              <TechIconCard name={skill.name} icon={skill.icon} />
            </div>
          ))}
        </div>

        {/* CloudSecOps note */}
        {(activeTab === "cloudsecops" || activeTab === "all") && (
          <div
            style={{
              marginTop: "2.5rem",
              padding: "1.2rem 1.5rem",
              background: "var(--bg-surface)",
              border: "1px solid rgba(59,126,255,0.15)",
              borderRadius: "var(--r-lg)",
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "8px", height: "8px",
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 10px var(--accent)",
                flexShrink: 0,
                marginTop: "0.35rem",
              }}
            />
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                CloudSecOps — Actively Exploring
              </p>
              <p className="t-small" style={{ color: "var(--text-secondary)" }}>
                Exploring secure cloud-native development: Docker, CI/CD, GCP, Firebase security, and DevSecOps practices. An area I&apos;m actively developing alongside my AI and full-stack work.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
