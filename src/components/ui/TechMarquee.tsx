"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

const ITEMS = [
  "SOFTWARE ENGINEER",
  "AI BUILDER",
  "FULL-STACK DEVELOPER",
  "AI SYSTEMS",
  "CLOUD",
  "CYBERSECURITY",
  "DEVOPS",
  "CLOUDSECOPS",
  "PRODUCT BUILDER",
  "OPEN SOURCE",
  "SOFTWARE ENGINEER",
  "AI BUILDER",
  "FULL-STACK DEVELOPER",
];

interface TechMarqueeProps {
  className?: string;
  speed?: number;
}

export function TechMarquee({ className = "", speed = 30 }: TechMarqueeProps) {
  const reducedMotion = useReducedMotion();
  const displayItems = [...ITEMS, ...ITEMS];

  return (
    <div
      className={`marquee-outer ${className}`}
      aria-hidden="true"
    >
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: reducedMotion ? "paused" : "running",
        }}
      >
        {displayItems.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.5rem",
              paddingRight: "1.5rem",
              fontSize: "clamp(0.6rem, 0.85vw, 0.72rem)",
              fontWeight: 500,
              letterSpacing: "0.22em",
              color: "var(--text-tertiary)",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {item}
            <span
              style={{
                display: "inline-block",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "var(--accent)",
                opacity: 0.7,
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
