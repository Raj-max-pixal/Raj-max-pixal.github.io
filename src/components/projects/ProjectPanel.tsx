"use client";

import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectPanelProps {
  project: Project;
  index: number;
}

export function ProjectPanel({ project, index }: ProjectPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Subtle scroll parallax on media
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId: number;
    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const rect = media.getBoundingClientRect();
        const progress = 1 - (rect.top + rect.height * 0.5) / window.innerHeight;
        const s = 1 + Math.max(0, Math.min(0.05, progress * 0.025));
        media.style.transform = `scale(${s})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frameId); window.removeEventListener("scroll", onScroll); };
  }, []);

  const isEven = index % 2 === 0;
  const delay = 0;

  return (
    <div
      ref={ref}
      className="project-panel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor
    >
      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "clamp(3.5rem,7vw,6rem) clamp(1.25rem,4vw,4rem)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2.5rem,5vw,5rem)",
          alignItems: "center",
        }}
        className="project-inner"
      >
        {/* Text */}
        <div
          style={{
            order: isEven ? 0 : 1,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : `translateX(${isEven ? "-24px" : "24px"})`,
            transition: `opacity 0.85s var(--ease-expo) ${delay}s, transform 0.85s var(--ease-expo) ${delay}s`,
          }}
          className="project-text-col"
        >
          {/* Number + category */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", fontVariantNumeric: "tabular-nums" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span style={{ width: 1, height: 14, background: "var(--border)" }} />
            <span className="t-label" style={{ color: project.accentColor, fontSize: "0.68rem" }}>
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className="t-title"
            style={{
              color: "var(--text-primary)",
              marginBottom: "1.1rem",
              transition: "color 0.2s",
            }}
          >
            {project.name}
          </h3>

          {/* Description */}
          <p className="t-body-lg" style={{ color: "var(--text-secondary)", marginBottom: "1.75rem", maxWidth: "440px" }}>
            {project.longDescription}
          </p>

          {/* Tech stack */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
            {project.techStack.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`${project.id}-github`}
                aria-label={`${project.name} on GitHub`}
                className="btn-ghost"
              >
                <Github size={12} /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`${project.id}-live`}
                aria-label={`${project.name} live demo`}
                className="btn-ghost"
                style={{ borderColor: `${project.accentColor}40`, color: project.accentColor }}
              >
                <ExternalLink size={12} /> Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Media */}
        <div
          style={{
            order: isEven ? 1 : 0,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : `translateX(${isEven ? "24px" : "-24px"})`,
            transition: `opacity 0.85s var(--ease-expo) 0.1s, transform 0.85s var(--ease-expo) 0.1s`,
          }}
          className="project-media-col"
        >
          <div
            className="project-media-wrap"
            style={{
              boxShadow: hovered ? `0 0 80px ${project.accentColor}18` : "none",
              borderColor: hovered ? `${project.accentColor}30` : "var(--border)",
              transition: "box-shadow 0.4s, border-color 0.4s",
            }}
          >
            <div
              ref={mediaRef}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(135deg, ${project.accentColor}0a 0%, var(--bg-surface) 100%)`,
                transition: "transform 0.3s ease",
                willChange: "transform",
              }}
            >
              {/* Project identity visual */}
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{
                  width: "52px", height: "52px",
                  borderRadius: "12px",
                  background: `${project.accentColor}15`,
                  border: `1px solid ${project.accentColor}35`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}>
                  <span style={{ fontSize: "1.3rem", fontWeight: 800, color: project.accentColor, letterSpacing: "-0.04em" }}>
                    {project.name.charAt(0)}
                  </span>
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--text-tertiary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {project.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-inner { grid-template-columns: 1fr !important; }
          .project-text-col, .project-media-col { order: unset !important; }
        }
      `}</style>
    </div>
  );
}
