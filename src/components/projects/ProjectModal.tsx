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
            layoutId={`project-card-${project.id}`}
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
                zIndex: 10,
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
            <div style={{ marginBottom: "1.5rem", paddingRight: "2.5rem" }}>
              <span style={{
                display: "inline-block",
                padding: "0.2rem 0.75rem",
                background: `${project.accentColor}18`,
                border: `1px solid ${project.accentColor}35`,
                borderRadius: "var(--r-full)",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: project.accentColor,
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}>
                {project.category}
              </span>

              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                  marginBottom: "0.75rem",
                }}
              >
                {project.name}
              </h2>

              <p
                className="t-body-lg"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {project.longDescription}
              </p>
            </div>

            {/* Technical Problem & Solution callouts */}
            {(project.problem || project.solution) && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.75rem",
                }}
              >
                {project.problem && (
                  <div
                    style={{
                      padding: "1rem 1.25rem",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r-lg)",
                    }}
                  >
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                      The Problem
                    </p>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div
                    style={{
                      padding: "1rem 1.25rem",
                      background: `${project.accentColor}0a`,
                      border: `1px solid ${project.accentColor}25`,
                      borderRadius: "var(--r-lg)",
                    }}
                  >
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", color: project.accentColor, textTransform: "uppercase", marginBottom: "0.35rem" }}>
                      The Solution
                    </p>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Architecture Highlights */}
            {project.architecture && (
              <div style={{ marginBottom: "1.75rem" }}>
                <p className="t-label" style={{ color: "var(--text-tertiary)", marginBottom: "0.75rem" }}>
                  Architecture Highlights
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {project.architecture.map((arch, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.45rem 0.85rem",
                        background: "var(--bg-elevated)",
                        borderRadius: "var(--r-md)",
                        border: "1px solid var(--border-subtle)",
                        fontSize: "0.78rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span style={{ color: project.accentColor, fontSize: "0.7rem" }}>◆</span>
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div style={{ marginBottom: "2rem" }}>
              <p className="t-label" style={{ color: "var(--text-tertiary)", marginBottom: "0.75rem" }}>
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
                  View Repository on GitHub
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
                background: `radial-gradient(ellipse at top right, ${project.accentColor}10 0%, transparent 70%)`,
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

