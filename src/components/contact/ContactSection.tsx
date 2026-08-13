"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/Raj-max-pixal",                    icon: Github,   id: "contact-github"   },
  { label: "LinkedIn", href: "https://linkedin.com/in/raja-saranya-ba9545342",       icon: Linkedin, id: "contact-linkedin" },
  { label: "X",        href: "https://x.com/rajasaranya",                            icon: Twitter,  id: "contact-x"        },
  { label: "Email",    href: "mailto:rajasaranyaraj20@gmail.com",                    icon: Mail,     id: "contact-email"    },
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Contact"
      style={{
        padding: "clamp(6rem,14vw,11rem) clamp(1.25rem,4vw,3.5rem)",
        borderTop: "1px solid var(--border)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "500px",
        background: "radial-gradient(ellipse, rgba(59,126,255,0.065) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto" }}>
        <span
          className="section-label reveal"
          style={{ justifyContent: "center", marginBottom: "2rem", display: "flex" }}
        >
          Contact
        </span>

        <h2
          className="t-display reveal"
          style={{ marginBottom: "1.5rem", transitionDelay: "0.1s" }}
        >
          Let&apos;s build something
          <br />
          <span style={{
            background: "linear-gradient(90deg, var(--text-primary) 0%, rgba(239,239,239,0.45) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            impossible.
          </span>
        </h2>

        <p
          className="t-body-lg reveal"
          style={{ color: "var(--text-secondary)", marginBottom: "3rem", transitionDelay: "0.2s" }}
        >
          Whether it&apos;s an AI product, a full-stack application, or an ambitious
          experiment — I&apos;m open to conversations that matter.
        </p>

        {/* Primary CTA */}
        <div className="reveal" style={{ marginBottom: "3rem", transitionDelay: "0.3s" }}>
          <a
            href="mailto:rajasaranyaraj20@gmail.com"
            id="contact-email-primary"
            className="btn-primary"
            style={{ display: "inline-flex" }}
          >
            <Mail size={15} />
            rajasaranyaraj20@gmail.com
          </a>
        </div>

        {/* Social links */}
        <div
          className="reveal"
          style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", transitionDelay: "0.42s" }}
        >
          {SOCIALS.map(({ label, href, icon: Icon, id }) => (
            <a
              key={id}
              href={href}
              id={id}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className="btn-ghost"
            >
              <Icon size={13} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
