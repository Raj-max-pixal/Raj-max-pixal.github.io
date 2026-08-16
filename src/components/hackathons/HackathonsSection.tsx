"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PLATFORMS = [
  {
    id: "microsoft",
    name: "Microsoft",
    role: "Microsoft Hackathon 2026",
    color: "#00A4EF",
    icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" fill="#00A4EF"/></svg>`,
    verified: true,
    detail: "CareerForge AI — AI career recommendation engine with 85%+ accuracy",
  },
  {
    id: "google",
    name: "Google",
    role: "Google Student Ambassador",
    color: "#4285F4",
    icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>`,
    verified: true,
    detail: "Google Cloud certifications + Google Student Ambassador program",
  },
  {
    id: "hack2skill",
    name: "Hack2Skill",
    role: "Hackathon Participant",
    color: "#FF6B35",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#FF6B35" stroke-width="2" stroke-linejoin="round"/></svg>`,
    verified: false,
    detail: "Hack2Skill hackathon platform participation",
  },
  {
    id: "devpost",
    name: "Devpost",
    role: "Project Submissions",
    color: "#003E54",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="4" fill="#003E54" stroke="#3b7eff" stroke-width="1"/><path d="M7 8h4a4 4 0 010 8H7V8zm2 2v4h2a2 2 0 000-4H9z" fill="#3b7eff"/><path d="M15 8l2.5 4-2.5 4" stroke="#3b7eff" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    verified: false,
    detail: "Devpost hackathon submissions and project showcasing",
  },
  {
    id: "hackindia",
    name: "HackIndia",
    role: "Participant",
    color: "#FF9933",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#FF9933" stroke-width="1.5"/><path d="M8 12h8M12 8l4 4-4 4" stroke="#FF9933" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    verified: false,
    detail: "HackIndia India's largest hackathon series",
  },
  {
    id: "openai",
    name: "OpenAI",
    role: "AI Challenge",
    color: "#10A37F",
    icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="#10A37F"/></svg>`,
    verified: false,
    detail: "OpenAI developer community challenges and hackathons",
  },
];

export function HackathonsSection() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Subtle mouse parallax on card track
  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  return (
    <section
      id="hackathons"
      ref={ref}
      aria-label="Hackathons and Challenges"
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
    >
      {/* BG glow */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-10%", top: "20%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,126,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>Competitions</span>
        <h2 className="t-display" style={{ marginBottom: "1rem" }}>Hackathons &amp; Challenges</h2>
        <p className="t-body" style={{ color: "var(--text-secondary)", maxWidth: "520px", marginBottom: "1rem" }}>
          10+ hackathons competed. Fast builds, real problems, real solutions.
        </p>
        <p className="t-small" style={{ color: "var(--text-tertiary)", marginBottom: "3.5rem" }}>
          Hackathon participation across platforms and organizers.
        </p>

        {/* Highlight cards — verified entries */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {/* CareerForge highlight */}
          <div
            style={{
              gridColumn: "span 2",
              background: "var(--bg-surface)",
              border: "1px solid rgba(59,126,255,0.2)",
              borderRadius: "var(--r-xl)",
              padding: "1.75rem",
              position: "relative",
              overflow: "hidden",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(16px)",
              transition: "opacity 0.7s var(--ease-expo), transform 0.7s var(--ease-expo)",
            }}
            className="hackathon-highlight"
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "44px", height: "44px", flexShrink: 0,
                  background: "rgba(0,164,239,0.12)",
                  border: "1px solid rgba(0,164,239,0.25)",
                  borderRadius: "var(--r-md)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <div className="svg-icon-wrap" dangerouslySetInnerHTML={{ __html: PLATFORMS[0].icon }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", color: "#00A4EF", textTransform: "uppercase" }}>
                    Featured
                  </span>
                  <span style={{ fontSize: "0.62rem", color: "var(--text-tertiary)", letterSpacing: "0.08em" }}>
                    Microsoft Hackathon 2026
                  </span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
                  CareerForge AI
                </h3>
                <p className="t-small" style={{ color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "460px" }}>
                  CareerForge AI — AI-driven career recommendation engine. Built during the Microsoft Hackathon for intelligent skill-to-role mapping with a scalable RESTful API endpoint.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "1rem" }}>
                  {["Python", "LLM APIs", "FastAPI", "RESTful APIs"].map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Corner glow */}
            <div aria-hidden="true" style={{
              position: "absolute", top: 0, right: 0,
              width: "200px", height: "200px",
              background: "radial-gradient(circle at top right, rgba(0,164,239,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
          </div>

          {/* EcoMind highlight */}
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid rgba(16,163,127,0.2)",
              borderRadius: "var(--r-xl)",
              padding: "1.5rem",
              position: "relative",
              overflow: "hidden",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(16px)",
              transition: "opacity 0.7s var(--ease-expo) 0.1s, transform 0.7s var(--ease-expo) 0.1s",
            }}
          >
            <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", color: "#22c55e", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              48-Hour Build
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
              EcoMind AI
            </h3>
            <p className="t-small" style={{ color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "1rem" }}>
              Carbon footprint analysis platform with Anthropic Claude API integration. Built in under 48 hours.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {["React", "Claude API", "48h Sprint"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Platform ecosystem — floating logos */}
        <div>
          <p className="t-label" style={{ color: "var(--text-tertiary)", marginBottom: "1.5rem" }}>
            Platforms &amp; Organizers
          </p>
          <div
            ref={trackRef}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            {PLATFORMS.map((platform, i) => (
              <div
                key={platform.id}
                onMouseEnter={() => setHovered(platform.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.65rem 1.1rem",
                  background: "var(--bg-surface)",
                  border: `1px solid ${hovered === platform.id ? platform.color + "60" : "var(--border)"}`,
                  borderRadius: "var(--r-full)",
                  transition: "all 0.35s var(--ease-spring)",
                  boxShadow: hovered === platform.id ? `0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px ${platform.color}30, 0 0 20px ${platform.color}15` : "none",
                  opacity: inView ? 1 : 0,
                  transform: inView ? (hovered === platform.id ? "translateY(-5px) scale(1.03)" : "none") : "translateY(20px) scale(0.95)",
                  filter: inView ? "blur(0px)" : "blur(4px)",
                  transitionDelay: `${i * 0.08}s`,
                  cursor: "default",
                }}
              >
                <div
                  style={{ width: "20px", height: "20px", flexShrink: 0 }}
                >
                  <div className="svg-icon-wrap" dangerouslySetInnerHTML={{ __html: platform.icon }} />
                </div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: hovered === platform.id ? "var(--text-primary)" : "var(--text-secondary)",
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {platform.name}
                </span>
                {platform.verified && (
                  <span
                    style={{
                      width: "6px", height: "6px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      boxShadow: "0 0 6px #22c55e",
                      flexShrink: 0,
                    }}
                  />
                )}

                {/* Tooltip on hover */}
                {hovered === platform.id && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 8px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r-md)",
                      padding: "0.5rem 0.75rem",
                      fontSize: "0.65rem",
                      color: "var(--text-secondary)",
                      whiteSpace: "nowrap",
                      zIndex: 10,
                      pointerEvents: "none",
                    }}
                  >
                    {platform.detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hackathon-highlight { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
