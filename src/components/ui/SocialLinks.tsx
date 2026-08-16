"use client";

import { useState } from "react";

export interface SocialProfile {
  id: string;
  name: string;
  handle: string;
  url: string;
  color: string;
  svg: string;
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: "github",
    name: "GitHub",
    handle: "@Raj-max-pixal",
    url: "https://github.com/Raj-max-pixal",
    color: "#ffffff",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "Raja Saranya",
    url: "https://linkedin.com/in/raja-saranya-ba9545342",
    color: "#0A66C2",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/></svg>`,
  },
  {
    id: "x",
    name: "X / Twitter",
    handle: "@Raja_x_20",
    url: "https://x.com/Raja_x_20",
    color: "#1DA1F2",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  },
  {
    id: "leetcode",
    name: "LeetCode",
    handle: "@Raj_saran12",
    url: "https://leetcode.com/u/Raj_saran12",
    color: "#FFA116",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.038-1.901l-2.697-2.607a5.21 5.21 0 0 0-3.665-1.423c-1.425 0-2.85.545-3.935 1.63L3.847 10.96a5.53 5.53 0 0 0 0 7.846l4.332 4.363c1.085 1.085 2.51 1.63 3.935 1.63 1.425 0 2.85-.545 3.935-1.63l2.697-2.607c.515-.514.497-1.365-.038-1.901s-1.386-.553-1.901-.038zm5.727-8.156L10.748 1.41a1.35 1.35 0 0 0-1.91 0 1.35 1.35 0 0 0 0 1.91l11.081 8.364a1.35 1.35 0 0 0 1.91 0 1.35 1.35 0 0 0 0-1.91z"/></svg>`,
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "@RajaSaranya-20",
    url: "https://youtube.com/@RajaSaranya-20",
    color: "#FF0000",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@its.me_ra_s_12",
    url: "https://instagram.com/its.me_ra_s_12",
    color: "#E4405F",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  },
  {
    id: "reddit",
    name: "Reddit",
    handle: "u/Raj_x_20",
    url: "https://reddit.com/user/Raj_x_20",
    color: "#FF4500",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.562-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-4.566 3.75a.39.39 0 0 0-.273.664c.758.758 1.996.953 3.089.953 1.093 0 2.331-.195 3.089-.953a.39.39 0 0 0-.546-.554c-.546.547-1.562.727-2.543.727-.981 0-1.997-.18-2.543-.727a.388.388 0 0 0-.273-.11z"/></svg>`,
  },
  {
    id: "medium",
    name: "Medium",
    handle: "@rajasaranyaraj20",
    url: "https://medium.com/@rajasaranyaraj20",
    color: "#000000",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42zm2.96 0c0 3.08-.47 5.57-1.06 5.57-.59 0-1.06-2.49-1.06-5.57s.47-5.57 1.06-5.57c.59 0 1.06 2.49 1.06 5.57z"/></svg>`,
  },
];

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);

  if (compact) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {SOCIAL_PROFILES.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.name} profile (${p.handle})`}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "var(--bg-surface)",
              border: `1px solid ${hovered === p.id ? p.color + "60" : "var(--border)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: hovered === p.id ? p.color : "var(--text-secondary)",
              transition: "all 0.25s ease",
              transform: hovered === p.id ? "translateY(-3px) scale(1.08)" : "none",
              boxShadow: hovered === p.id ? `0 8px 20px rgba(0,0,0,0.3), 0 0 12px ${p.color}30` : "none",
            }}
          >
            <div
              style={{ width: "16px", height: "16px" }}
              dangerouslySetInnerHTML={{ __html: p.svg }}
            />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.85rem", width: "100%" }}>
      {SOCIAL_PROFILES.map((p) => (
        <a
          key={p.id}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${p.name} (${p.handle})`}
          onMouseEnter={() => setHovered(p.id)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            background: "var(--bg-surface)",
            border: `1px solid ${hovered === p.id ? p.color + "60" : "var(--border)"}`,
            borderRadius: "var(--r-lg)",
            textDecoration: "none",
            transition: "all 0.25s ease",
            transform: hovered === p.id ? "translateY(-3px)" : "none",
            boxShadow: hovered === p.id ? `0 12px 30px rgba(0,0,0,0.35), 0 0 15px ${p.color}20` : "none",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              background: `${p.color}15`,
              border: `1px solid ${p.color}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: p.color,
              flexShrink: 0,
            }}
          >
            <div style={{ width: "16px", height: "16px" }} dangerouslySetInnerHTML={{ __html: p.svg }} />
          </div>

          <div style={{ overflow: "hidden" }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.2 }}>
              {p.name}
            </p>
            <p style={{ fontSize: "0.68rem", color: "var(--text-tertiary)", margin: "0.15rem 0 0 0", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
              {p.handle}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
