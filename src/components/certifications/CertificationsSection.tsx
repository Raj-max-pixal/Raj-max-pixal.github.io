"use client";

import { useEffect, useRef, useState } from "react";

const CERTIFICATIONS = [
  {
    id: "nptel-java",
    title: "Programming in Java",
    issuer: "NPTEL",
    issued: "October 2025",
    category: "Programming",
    categoryColor: "#3b7eff",
    icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573" fill="#E76F00"/><path d="M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82" fill="#E76F00"/></svg>`,
    description: "NPTEL certification covering core Java programming concepts, OOP principles, and application development.",
    credentialUrl: null,
  },
  {
    id: "simplilearn-cyber",
    title: "Introduction to Cyber Security",
    issuer: "Simplilearn",
    issued: "February 2025",
    category: "Cybersecurity",
    categoryColor: "#ef4444",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" stroke="#ef4444" stroke-width="2" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    description: "Foundational cybersecurity concepts including threat landscape, network security, cryptography, and security practices.",
    credentialUrl: null,
  },
  {
    id: "udemy-flutter",
    title: "Flutter UI Bootcamp",
    issuer: "Udemy",
    issued: "February 2025",
    category: "Mobile Development",
    categoryColor: "#54C5F8",
    icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.314 0L2.3 12 6 15.7 21.684.013zM14.314 11.97l-6.01 6.01 6.01 6.02H21.7l-6.015-6.02 6.015-6.01z" fill="#54C5F8"/></svg>`,
    description: "Build Beautiful Apps using Flutter — comprehensive mobile UI development using Dart and Flutter framework.",
    credentialUrl: null,
  },
  {
    id: "csc-python",
    title: "Advanced Diploma in Python Programming (ADPP)",
    issuer: "CSC Computer Education",
    issued: "August 2024",
    category: "Programming",
    categoryColor: "#3776AB",
    icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656L6.207 5.4h5.814v.8H3.9S0 5.772 0 11.934c0 6.163 3.404 5.94 3.404 5.94h2.032v-2.857s-.109-3.404 3.348-3.404h5.764s3.236.052 3.236-3.13V3.202S18.28 0 11.914 0zM8.777 1.85a1.037 1.037 0 1 1 0 2.074 1.037 1.037 0 0 1 0-2.074z" fill="#3776AB"/><path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656L17.793 18.6H11.98v-.8h8.12S24 18.228 24 12.066c0-6.163-3.404-5.94-3.404-5.94H18.564v2.857s.109 3.404-3.348 3.404H9.452s-3.236-.052-3.236 3.13v5.281S5.72 24 12.086 24zm3.137-1.85a1.037 1.037 0 1 1 0-2.074 1.037 1.037 0 0 1 0 2.074z" fill="#FFD43B"/></svg>`,
    description: "Advanced Python programming covering OOP, data structures, file handling, and real-world application development.",
    credentialUrl: null,
  },
  {
    id: "github-foundations",
    title: "GitHub Foundations",
    issuer: "GitHub",
    issued: "2025",
    category: "Developer Tools",
    categoryColor: "#ffffff",
    icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="white"/></svg>`,
    description: "Core GitHub skills: repository management, branching, pull requests, GitHub Actions, and open source collaboration.",
    credentialUrl: null,
  },
];

export function CertificationsSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

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

  return (
    <section
      id="certifications"
      ref={ref}
      aria-label="Certifications"
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
    >
      {/* BG accent */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "-12%", bottom: "10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,126,255,0.035) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>Credentials</span>
        <h2 className="t-display" style={{ marginBottom: "1rem" }}>Certifications</h2>
        <p className="t-body" style={{ color: "var(--text-secondary)", maxWidth: "480px", marginBottom: "3.5rem" }}>
          Verified learning across programming, cybersecurity, mobile development, and developer tools.
        </p>

        {/* Certificate grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={cert.id}
              onMouseEnter={() => setHovered(cert.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                background: "var(--bg-surface)",
                border: `1px solid ${hovered === cert.id ? cert.categoryColor + "60" : "var(--border)"}`,
                borderRadius: "var(--r-xl)",
                padding: "1.5rem",
                transition: "all 0.4s var(--ease-spring)",
                transform: inView ? (hovered === cert.id ? "translateY(-8px) scale(1.02)" : "none") : "translateY(30px) scale(0.95)",
                filter: inView ? "blur(0px)" : "blur(6px)",
                boxShadow: hovered === cert.id ? `0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px ${cert.categoryColor}30, 0 0 30px ${cert.categoryColor}15` : "none",
                opacity: inView ? 1 : 0,
                transitionDelay: `${Math.min(i * 0.1, 0.5)}s`,
                willChange: "transform",
              }}
            >
              {/* Category badge */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                <span
                  style={{
                    padding: "0.15rem 0.6rem",
                    background: `${cert.categoryColor}14`,
                    border: `1px solid ${cert.categoryColor}28`,
                    borderRadius: "var(--r-full)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: cert.categoryColor,
                    textTransform: "uppercase" as const,
                  }}
                >
                  {cert.category}
                </span>

                {/* Icon */}
                <div
                  style={{
                    width: "36px", height: "36px",
                    borderRadius: "var(--r-md)",
                    background: `${cert.categoryColor}12`,
                    border: `1px solid ${cert.categoryColor}24`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    filter: hovered === cert.id ? `drop-shadow(0 0 6px ${cert.categoryColor}60)` : "none",
                    transition: "filter 0.3s ease",
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: cert.icon }} />
                </div>
              </div>

              {/* Issuer */}
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase" as const,
                  marginBottom: "0.35rem",
                }}
              >
                {cert.issuer}
              </p>

              {/* Title */}
              <h3
                style={{
                  fontSize: "0.975rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  marginBottom: "0.75rem",
                }}
              >
                {cert.title}
              </h3>

              {/* Description */}
              <p className="t-small" style={{ color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "1.1rem" }}>
                {cert.description}
              </p>

              {/* Footer */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--text-tertiary)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Issued {cert.issued}
                </span>
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{ fontSize: "0.65rem", padding: "0.3rem 0.75rem" }}
                  >
                    View Credential →
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: cert.categoryColor,
                      opacity: hovered === cert.id ? 1 : 0,
                      transition: "opacity 0.25s ease",
                      letterSpacing: "0.04em",
                      fontWeight: 500,
                    }}
                  >
                    Verified ✓
                  </span>
                )}
              </div>

              {/* Hover accent line */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0, left: "1.5rem", right: "1.5rem",
                  height: "2px",
                  background: cert.categoryColor,
                  borderRadius: "2px",
                  opacity: hovered === cert.id ? 0.6 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
