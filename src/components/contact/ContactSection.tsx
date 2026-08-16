"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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
            marginBottom: "3.5rem",
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

        {/* Connect / Find Me Online section */}
        <div style={{ maxWidth: "800px", margin: "0 auto 3rem", textAlign: "center" }}>
          <p className="t-label" style={{ color: "var(--text-tertiary)", marginBottom: "1.5rem" }}>
            Connect / Find Me Online
          </p>
          <SocialLinks />
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

