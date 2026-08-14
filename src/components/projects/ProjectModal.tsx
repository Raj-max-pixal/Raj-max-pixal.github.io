"use client";

import { useEffect, useRef } from "react";
import { X, Github, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      // Focus close button for accessibility
      setTimeout(() => closeBtnRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  // ESC key close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} project details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="project-modal-inner"
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 10, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Close button */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close project details"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-full)",
                width: "36px", height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-secondary)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <X size={15} />
            </button>

            {/* Header */}
            <div style={{ marginBottom: "2rem", paddingRight: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                {/* Project icon */}
                <div style={{
                  width: "44px", height: "44px",
                  borderRadius: "12px",
                  background: `${project.accentColor}18`,
                  border: `1px solid ${project.accentColor}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: 800, color: project.accentColor, letterSpacing: "-0.04em" }}>
                    {project.name.charAt(0)}
                  </span>
                </div>

                <div>
                  <span style={{
                    display: "block",
                    padding: "0.15rem 0.6rem",
                    background: `${project.accentColor}14`,
                    border: `1px solid ${project.accentColor}28`,
                    borderRadius: "var(--r-full)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: project.accentColor,
                    textTransform: "uppercase" as const,
                    marginBottom: "0.25rem",
                  }}>
                    {project.category}
                  </span>
                </div>
              </div>

              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                  marginBottom: "1.25rem",
                }}
              >
                {project.name}
              </h2>

              {/* Accent line */}
              <div style={{
                width: "48px", height: "2px",
                background: project.accentColor,
                borderRadius: "2px",
                marginBottom: "1.5rem",
                opacity: 0.8,
              }} />
            </div>

            {/* Description */}
            <p
              className="t-body-lg"
              style={{
                color: "var(--text-secondary)",
                marginBottom: "2rem",
                lineHeight: 1.75,
              }}
            >
              {project.longDescription}
            </p>

            {/* Tech stack */}
            <div style={{ marginBottom: "2.5rem" }}>
              <p className="t-label" style={{ color: "var(--text-tertiary)", marginBottom: "0.85rem" }}>
                Tech Stack
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {project.techStack.map(t => (
                  <span
                    key={t}
                    style={{
                      padding: "0.3rem 0.75rem",
                      borderRadius: "var(--r-full)",
                      border: `1px solid ${project.accentColor}28`,
                      background: `${project.accentColor}0c`,
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`modal-${project.id}-github`}
                  className="btn-outline"
                  style={{ fontSize: "0.8rem", padding: "0.6rem 1.5rem" }}
                >
                  <Github size={13} />
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`modal-${project.id}-live`}
                  className="btn-primary"
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.6rem 1.5rem",
                    background: project.accentColor,
                    color: "#fff",
                  }}
                >
                  <ExternalLink size={13} />
                  Live Demo
                </a>
              )}
            </div>

            {/* Background accent glow */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0, right: 0,
                width: "300px", height: "200px",
                background: `radial-gradient(ellipse at top right, ${project.accentColor}08 0%, transparent 70%)`,
                pointerEvents: "none",
                borderRadius: "var(--r-xl)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
