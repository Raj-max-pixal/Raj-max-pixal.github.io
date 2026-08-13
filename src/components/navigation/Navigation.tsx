"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home",       href: "home" },
  { label: "About",      href: "about" },
  { label: "Projects",   href: "projects" },
  { label: "Experience", href: "experience" },
  { label: "Skills",     href: "skills" },
  { label: "Contact",    href: "contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navigation() {
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48);
        const ids = [...NAV_ITEMS].reverse().map(n => n.href);
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
            setActive(id);
            break;
          }
        }
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trap body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        aria-label="Primary navigation"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.1rem clamp(1.25rem, 4vw, 3rem)",
          background: scrolled ? "rgba(6,6,6,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
          transition: "background 0.5s ease, border-color 0.5s ease",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          aria-label="Scroll to top"
          style={{
            background: "none", border: "none",
            fontSize: "1.05rem", fontWeight: 800,
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
            display: "flex", alignItems: "center", gap: "3px",
          }}
        >
          RAJ
          <span style={{
            width: 5, height: 5,
            borderRadius: "50%",
            background: "var(--accent)",
            display: "inline-block",
            marginBottom: "6px",
            flexShrink: 0,
          }} />
        </button>

        {/* Desktop links */}
        <ul role="list" style={{ display: "flex", gap: "2.25rem", listStyle: "none" }} className="hide-mobile">
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className="nav-link"
                aria-current={active === href ? "page" : undefined}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="mailto:rajasaranyaraj20@gmail.com"
          id="nav-contact-cta"
          aria-label="Send email to Raja Saranya"
          className="hide-mobile btn-ghost"
        >
          Get in touch
        </a>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          style={{ background: "none", border: "none", color: "var(--text-primary)", lineHeight: 0 }}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: "fixed", inset: 0, zIndex: 850,
          background: "rgba(6,6,6,0.97)",
          backdropFilter: "blur(24px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      >
        {NAV_ITEMS.map(({ label, href }) => (
          <button
            key={href}
            onClick={() => { scrollTo(href); setMobileOpen(false); }}
            style={{
              background: "none", border: "none",
              fontSize: "clamp(1.75rem,8vw,2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: active === href ? "var(--text-primary)" : "var(--text-tertiary)",
              transition: "color 0.2s",
            }}
          >
            {label}
          </button>
        ))}
        <a
          href="mailto:rajasaranyaraj20@gmail.com"
          className="btn-ghost"
          style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
