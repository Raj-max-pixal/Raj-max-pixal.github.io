"use client";

import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectModal } from "./ProjectModal";

interface ProjectPanelProps {
  project: Project;
  index: number;
}

export function ProjectPanel({ project, index }: ProjectPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.08, rootMargin: "0px 0px -100px 0px" }
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

  return (
    <>
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
              transform: inView ? "none" : `translateX(${isEven ? "-40px" : "40px"}) scale(0.96)`,
              filter: inView ? "blur(0px)" : "blur(8px)",
              transition: `opacity 0.9s var(--ease-expo), transform 0.9s var(--ease-expo), filter 0.9s ease`,
              transitionDelay: `${index * 0.12}s`,
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
              {project.description}
            </p>

            {/* Tech stack */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
              {project.techStack.map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setModalOpen(true)}
                id={`${project.id}-explore`}
                className="btn-outline"
                style={{
                  fontSize: "0.8rem",
                  padding: "0.55rem 1.4rem",
                  borderColor: `${project.accentColor}35`,
                  color: project.accentColor,
                }}
              >
                View Project →
              </button>
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
              transform: inView ? "none" : `translateX(${isEven ? "40px" : "-40px"}) scale(0.96)`,
              filter: inView ? "blur(0px)" : "blur(8px)",
              transition: `opacity 0.9s var(--ease-expo) 0.1s, transform 0.9s var(--ease-expo) 0.1s, filter 0.9s ease 0.1s`,
              transitionDelay: `${index * 0.12 + 0.08}s`,
            }}
            className="project-media-col"
          >
            <div ref={mediaRef} style={{ willChange: "transform", transition: "transform 0.3s ease" }}>
              <ProjectPreview
                project={project}
                hovered={hovered}
                onClick={() => setModalOpen(true)}
              />
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

      <ProjectModal
        project={modalOpen ? project : null}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
