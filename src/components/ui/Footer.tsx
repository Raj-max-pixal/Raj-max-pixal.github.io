"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2.5rem clamp(1.25rem,4vw,3.5rem)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.25rem",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              fontSize: "0.975rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              background: "linear-gradient(90deg, #3b7eff 0%, #06b6d4 50%, #efefef 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Rajasaranya.T
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              color: "var(--text-tertiary)",
              letterSpacing: "0.04em",
            }}
          >
            Software Engineer · AI Builder · CloudSecOps Explorer
          </span>
        </div>

        {/* Social links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {[
            {
              href: "https://github.com/Raj-max-pixal",
              icon: <Github size={14} />,
              label: "GitHub",
              id: "footer-github",
            },
            {
              href: "https://linkedin.com/in/raja-saranya-ba9545342",
              icon: <Linkedin size={14} />,
              label: "LinkedIn",
              id: "footer-linkedin",
            },
            {
              href: "mailto:rajasaranyaraj20@gmail.com",
              icon: <Mail size={14} />,
              label: "Email",
              id: "footer-email",
            },
          ].map((link) => (
            <a
              key={link.id}
              id={link.id}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "var(--r-md)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border-strong)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--text-secondary)";
              }}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.2rem" }}>
          <span className="t-small" style={{ color: "var(--text-tertiary)" }}>
            © 2026 Rajasaranya.T · Chennai, India
          </span>
        </div>
      </div>
    </footer>
  );
}
