"use client";

import type { Project } from "@/data/projects";

interface ProjectPreviewProps {
  project: Project;
  hovered: boolean;
  onClick: () => void;
}

export function ProjectPreview({ project, hovered, onClick }: ProjectPreviewProps) {
  return (
    <div
      className="project-media-wrap"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.name} details`}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      style={{
        boxShadow: hovered ? `0 0 80px ${project.accentColor}20` : "none",
        borderColor: hovered ? `${project.accentColor}35` : "var(--border)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.4s, border-color 0.4s, transform 0.3s var(--ease-expo)",
        transform: hovered ? "scale(1.015)" : "scale(1)",
      }}
    >
      {/* Gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${project.accentColor}10 0%, var(--bg-surface) 60%, ${project.accentColor}06 100%)`,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${project.accentColor}08 1px, transparent 1px),
            linear-gradient(90deg, ${project.accentColor}08 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 90%)",
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.9rem",
          padding: "2rem",
          width: "100%",
          height: "100%",
          textAlign: "center",
        }}
      >
        {/* Project icon */}
        <div
          style={{
            width: "56px", height: "56px",
            borderRadius: "16px",
            background: `${project.accentColor}18`,
            border: `1px solid ${project.accentColor}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: hovered ? `0 0 24px ${project.accentColor}25` : "none",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: project.accentColor,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {project.name.charAt(0)}
          </span>
        </div>

        {/* Category */}
        <p
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: `${project.accentColor}cc`,
            textTransform: "uppercase",
          }}
        >
          {project.category}
        </p>

        {/* Click hint */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.3rem 0.85rem",
            background: `${project.accentColor}12`,
            border: `1px solid ${project.accentColor}22`,
            borderRadius: "var(--r-full)",
            opacity: hovered ? 1 : 0.5,
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <span style={{ fontSize: "0.62rem", color: project.accentColor, letterSpacing: "0.1em", fontWeight: 500 }}>
            CLICK TO EXPLORE
          </span>
          <span style={{ color: project.accentColor, fontSize: "0.6rem" }}>→</span>
        </div>
      </div>

      {/* Corner accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, right: 0,
          width: "80px", height: "80px",
          background: `radial-gradient(circle at top right, ${project.accentColor}15 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
