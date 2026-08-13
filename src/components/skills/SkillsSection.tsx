"use client";

import { useEffect, useRef, useState } from "react";
import { skillCategories, type Skill } from "@/data/skills";
import { projects } from "@/data/projects";

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("languages");
  const [hovered, setHovered] = useState<Skill | null>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = skillCategories.find(c => c.id === activeTab);
  const related = hovered?.relatedProjects?.map(id => projects.find(p => p.id === id)).filter(Boolean) ?? [];

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
        <span className="section-label reveal" style={{ marginBottom: "1.5rem", display: "block" }}>Technology</span>
        <h2 className="t-display reveal" style={{ marginBottom: "1rem", transitionDelay: "0.08s" }}>Skills</h2>
        <p className="t-body reveal" style={{ color: "var(--text-secondary)", maxWidth: "480px", marginBottom: "3rem", transitionDelay: "0.16s" }}>
          Hover a technology to see which projects use it.
        </p>

        {/* Tabs */}
        <div
          className="reveal"
          role="tablist"
          aria-label="Skill categories"
          style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2.5rem", transitionDelay: "0.24s" }}
        >
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              id={`tab-${cat.id}`}
              role="tab"
              aria-selected={activeTab === cat.id}
              aria-controls={`panel-${cat.id}`}
              onClick={() => { setActiveTab(cat.id); setHovered(null); }}
              style={{
                padding: "0.4rem 1rem",
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

        {/* Skills grid */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="reveal"
          style={{ transitionDelay: "0.32s" }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2rem" }}>
            {current?.skills.map(skill => (
              <button
                key={skill.name}
                id={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="skill-pill"
                onMouseEnter={() => setHovered(skill)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderColor: hovered?.name === skill.name ? "var(--accent)" : "var(--border)",
                  background: hovered?.name === skill.name ? "var(--accent-dim)" : "var(--bg-surface)",
                  color: hovered?.name === skill.name ? "var(--text-primary)" : "var(--text-secondary)",
                }}
                aria-label={skill.name}
              >
                {skill.name}
                {skill.relatedProjects && skill.relatedProjects.length > 0 && (
                  <span style={{
                    width: 16, height: 16,
                    borderRadius: "50%",
                    background: "var(--accent-dim)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.6rem",
                    color: "var(--accent)",
                    fontWeight: 700,
                  }}>
                    {skill.relatedProjects.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Related projects tooltip */}
          <div
            aria-live="polite"
            style={{
              minHeight: "76px",
              padding: "1.1rem 1.4rem",
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.2s, transform 0.2s",
              pointerEvents: "none",
            }}
          >
            {hovered && (
              <>
                <p className="t-label" style={{ color: "var(--text-tertiary)", marginBottom: "0.6rem" }}>
                  {related.length ? `Used in ${related.length} project${related.length > 1 ? "s" : ""}` : "Core skill"}
                </p>
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                  {related.length > 0 ? related.map(p => p && (
                    <span key={p.id} style={{
                      padding: "0.25rem 0.7rem",
                      borderRadius: "var(--r-full)",
                      border: `1px solid ${p.accentColor}40`,
                      background: `${p.accentColor}0f`,
                      fontSize: "0.775rem",
                      color: p.accentColor,
                    }}>
                      {p.name}
                    </span>
                  )) : (
                    <span className="t-small" style={{ color: "var(--text-tertiary)" }}>Used across all projects</span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
