"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface ProjectPreviewProps {
  project: Project;
  hovered: boolean;
  onClick: () => void;
}

export function ProjectPreview({ project, hovered, onClick }: ProjectPreviewProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="project-media-wrap"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.name} details`}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      style={{
        boxShadow: hovered ? `0 0 100px ${project.accentColor}30, 0 0 0 1px ${project.accentColor}30` : "none",
        borderColor: hovered ? `${project.accentColor}60` : "var(--border)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--r-lg)",
        aspectRatio: "16 / 10",
        background: "var(--bg-surface)",
        transition: "box-shadow 0.5s, border-color 0.5s, transform 0.4s var(--ease-expo)",
        transform: hovered ? "scale(1.02)" : "scale(1)",
      }}
    >
      {/* 1. Image Banner (if available and not errored) */}
      {project.imageBannerUrl && !imgError ? (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Image
            src={project.imageBannerUrl}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImgError(true)}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.6s var(--ease-expo), filter 0.5s ease",
              filter: hovered ? "brightness(1.08)" : "brightness(0.92)",
            }}
          />
          {/* Subtle gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to top, rgba(6,6,6,0.85) 0%, transparent 60%, rgba(6,6,6,0.4) 100%)`,
              pointerEvents: "none",
            }}
          />
        </div>
      ) : (
        /* 2. Custom Technical Product Visual Banner */
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          {/* Ambient gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at center, ${project.accentColor}18 0%, var(--bg-surface) 75%)`,
            }}
          />

          {/* Project Specific Technical Visualizer Graphics */}
          {project.id === "studybuddy-ai" && (
            <svg viewBox="0 0 400 250" style={{ width: "100%", height: "100%", opacity: 0.75 }}>
              <line x1="80" y1="180" x2="200" y2="100" stroke={project.accentColor} strokeWidth="1.5" opacity="0.4" />
              <line x1="200" y1="100" x2="320" y2="160" stroke={project.accentColor} strokeWidth="1.5" opacity="0.4" />
              <line x1="200" y1="100" x2="260" y2="60" stroke={project.accentColor} strokeWidth="1.5" opacity="0.4" />
              <circle cx="200" cy="100" r="14" fill={project.accentColor} opacity="0.8" />
              <circle cx="80" cy="180" r="8" fill="#3b7eff" opacity="0.7" />
              <circle cx="320" cy="160" r="10" fill="#ec4899" opacity="0.7" />
              <circle cx="260" cy="60" r="7" fill="#22c55e" opacity="0.7" />
              <text x="200" y="104" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">AI</text>
            </svg>
          )}

          {project.id === "janvoice-ai" && (
            <svg viewBox="0 0 400 250" style={{ width: "100%", height: "100%", opacity: 0.75 }}>
              {[30, 60, 100, 150, 200, 140, 90, 130, 180, 110, 70, 40].map((h, i) => (
                <rect
                  key={i}
                  x={100 + i * 18}
                  y={125 - h / 2}
                  width="8"
                  height={h}
                  rx="4"
                  fill={project.accentColor}
                  opacity={0.3 + (i % 3) * 0.25}
                />
              ))}
            </svg>
          )}

          {project.id === "growth-intelligence-studio" && (
            <svg viewBox="0 0 400 250" style={{ width: "100%", height: "100%", opacity: 0.75 }}>
              <path
                d="M 50 180 Q 150 160 220 100 T 350 50"
                fill="none"
                stroke={project.accentColor}
                strokeWidth="3"
              />
              <circle cx="220" cy="100" r="6" fill={project.accentColor} />
              <circle cx="350" cy="50" r="7" fill={project.accentColor} />
              <path
                d="M 50 180 Q 150 160 220 100 T 350 50 L 350 220 L 50 220 Z"
                fill={`url(#growthGradient-${project.id})`}
                opacity="0.25"
              />
              <defs>
                <linearGradient id={`growthGradient-${project.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={project.accentColor} />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {project.id === "animeverse" && (
            <svg viewBox="0 0 400 250" style={{ width: "100%", height: "100%", opacity: 0.65 }}>
              <rect x="60" y="50" width="80" height="110" rx="8" fill={project.accentColor} opacity="0.2" stroke={project.accentColor} strokeWidth="1" />
              <rect x="160" y="40" width="80" height="110" rx="8" fill={project.accentColor} opacity="0.35" stroke={project.accentColor} strokeWidth="1" />
              <rect x="260" y="60" width="80" height="110" rx="8" fill={project.accentColor} opacity="0.2" stroke={project.accentColor} strokeWidth="1" />
            </svg>
          )}
        </div>
      )}

      {/* Grid Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${project.accentColor}10 1px, transparent 1px),
            linear-gradient(90deg, ${project.accentColor}10 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 95%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Foreground Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          gap: "0.5rem",
          padding: "1.5rem",
          width: "100%",
          height: "100%",
        }}
      >
        <span
          style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#ffffff",
            background: `${project.accentColor}cc`,
            padding: "0.2rem 0.6rem",
            borderRadius: "var(--r-full)",
            textTransform: "uppercase",
            boxShadow: `0 0 12px ${project.accentColor}55`,
          }}
        >
          {project.category}
        </span>

        <h4
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            margin: 0,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          {project.name}
        </h4>

        {/* View project action button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            marginTop: "0.25rem",
            color: project.accentColor,
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          <span>VIEW PROJECT DETAILS</span>
          <span
            style={{
              transform: hovered ? "translateX(4px)" : "none",
              transition: "transform 0.3s ease",
            }}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}

