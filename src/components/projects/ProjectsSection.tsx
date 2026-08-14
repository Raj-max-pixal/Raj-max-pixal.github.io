"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import { ProjectPanel } from "./ProjectPanel";
import { ProjectNetwork } from "./ProjectNetwork";

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} aria-label="Projects" style={{ position: "relative" }}>
      {/* Background network effect */}
      <ProjectNetwork />

      {/* Header */}
      <div style={{ padding: "clamp(5rem,11vw,9rem) clamp(1.25rem,4vw,3.5rem) 0", position: "relative", zIndex: 1 }}>
        <div className="container-wide">
          <span className="section-label reveal" style={{ marginBottom: "1.5rem", display: "block" }}>
            Selected Work
          </span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem" }}>
            <h2 className="t-display reveal" style={{ transitionDelay: "0.08s" }}>Projects</h2>
            <p className="t-body reveal" style={{ color: "var(--text-secondary)", maxWidth: "300px", transitionDelay: "0.16s" }}>
              Six real products — each solving a real problem with engineering and AI.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider" style={{ position: "relative", zIndex: 1 }} />

      {/* Project panels */}
      {projects.map((project, i) => (
        <ProjectPanel key={project.id} project={project} index={i} />
      ))}

      {/* GitHub CTA */}
      <div style={{ textAlign: "center", padding: "3.5rem clamp(1.25rem,4vw,3.5rem)" }}>
        <a
          href="https://github.com/Raj-max-pixal"
          target="_blank"
          rel="noopener noreferrer"
          id="projects-github-all"
          className="btn-outline reveal"
          style={{ display: "inline-flex" }}
        >
          See all on GitHub →
        </a>
      </div>
    </section>
  );
}
