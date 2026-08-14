"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";

const LINKS = [
  {
    id: "email-link",
    label: "Email",
    value: "rajasaranyaraj20@gmail.com",
    href: "mailto:rajasaranyaraj20@gmail.com",
    icon: <Mail size={14} />,
    description: "For work & collaborations",
  },
  {
    id: "github-link",
    label: "GitHub",
    value: "github.com/Raj-max-pixal",
    href: "https://github.com/Raj-max-pixal",
    icon: <Github size={14} />,
    description: "Explore my projects",
  },
  {
    id: "linkedin-link",
    label: "LinkedIn",
    value: "linkedin.com/in/raja-saranya-ba9545342",
    href: "https://linkedin.com/in/raja-saranya-ba9545342",
    icon: <Linkedin size={14} />,
    description: "Professional profile",
  },
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Contact"
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
    >
      {/* Large ambient glow */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "500px",
        background: "radial-gradient(ellipse, rgba(59,126,255,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label" style={{
            display: "inline-flex",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(10px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            marginBottom: "1.5rem",
          }}>
            Get in Touch
          </span>

          <h2
            className="t-display"
            style={{
              marginBottom: "1.25rem",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: "opacity 0.8s var(--ease-expo) 0.1s, transform 0.8s var(--ease-expo) 0.1s",
            }}
          >
            Let&apos;s build something
            <br />
            <span style={{ color: "var(--text-secondary)" }}>meaningful.</span>
          </h2>

          <p
            className="t-body-lg"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "500px",
              margin: "0 auto 0.75rem",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.8s ease 0.2s",
            }}
          >
            Open to engineering roles, AI collaborations, and interesting projects.
          </p>
          <p
            className="t-small"
            style={{
              color: "var(--text-tertiary)",
              maxWidth: "480px",
              margin: "0 auto",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.8s ease 0.28s",
            }}
          >
            Interested in AI, software engineering, cloud infrastructure, and CloudSecOps.
          </p>
        </div>

        {/* CTA button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "4rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(12px)",
            transition: "opacity 0.8s ease 0.32s, transform 0.8s ease 0.32s",
          }}
        >
          <a
            href="mailto:rajasaranyaraj20@gmail.com"
            id="contact-main-email"
            aria-label="Send email to Rajasaranya"
            className="btn-primary"
            style={{ padding: "1rem 2.5rem", fontSize: "0.9rem" }}
          >
            Say Hello <ArrowRight size={15} />
          </a>
        </div>

        {/* Contact links */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.8s ease 0.42s",
          }}
        >
          {LINKS.map(link => (
            <a
              key={link.id}
              id={link.id}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              onMouseEnter={() => setHovered(link.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                padding: "0.9rem 1.5rem",
                background: "var(--bg-surface)",
                border: `1px solid ${hovered === link.id ? "var(--border-strong)" : "var(--border)"}`,
                borderRadius: "var(--r-lg)",
                textDecoration: "none",
                transition: "all 0.25s ease",
                transform: hovered === link.id ? "translateY(-3px)" : "none",
                boxShadow: hovered === link.id ? "0 10px 30px rgba(0,0,0,0.3)" : "none",
                maxWidth: "320px",
              }}
            >
              <div
                style={{
                  width: "32px", height: "32px",
                  borderRadius: "var(--r-md)",
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: hovered === link.id ? "var(--accent)" : "var(--text-secondary)",
                  transition: "color 0.2s",
                  flexShrink: 0,
                }}
              >
                {link.icon}
              </div>
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: "var(--text-tertiary)", textTransform: "uppercase" as const, marginBottom: "0.15rem" }}>
                  {link.label}
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", letterSpacing: "0.01em" }}>
                  {link.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Location note */}
        <p
          style={{
            textAlign: "center",
            marginTop: "3rem",
            fontSize: "0.75rem",
            color: "var(--text-tertiary)",
            letterSpacing: "0.06em",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          Based in Chennai, Tamil Nadu, India · Open to remote
        </p>
      </div>
    </section>
  );
}
