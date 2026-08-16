"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, Download } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home",           href: "home" },
  { label: "About",          href: "about" },
  { label: "Projects",       href: "projects" },
  { label: "Journey",        href: "journey" },
  { label: "Skills",         href: "skills" },
  { label: "Education",      href: "education" },
  { label: "Certifications", href: "certifications" },
  { label: "Hackathons",     href: "hackathons" },
  { label: "Contact",        href: "contact" },
];

const NAV_PRIMARY = NAV_ITEMS.filter(item => ["Home", "About", "Projects", "Journey", "Skills"].includes(item.label));
const NAV_MORE    = NAV_ITEMS.filter(item => !["Home", "About", "Projects", "Journey", "Skills"].includes(item.label));

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navigation() {
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen,   setMoreOpen]   = useState(false);
  const [theme,      setTheme]      = useState<"dark" | "light">("dark");
  const [resumeHint, setResumeHint] = useState(false);
  const ticking = useRef(false);
  const moreRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

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
          padding: "1rem clamp(1.25rem, 4vw, 3rem)",
          background: scrolled ? "rgba(6,6,6,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
          transition: "background 0.5s ease, border-color 0.5s ease",
        }}
      >
        {/* ── Shimmer Logo ─────────────────── */}
        <button
          onClick={() => scrollTo("home")}
          aria-label="Scroll to top"
          style={{
            background: "none", border: "none",
            padding: 0, position: "relative",
            overflow: "hidden",
          }}
          id="nav-logo-btn"
        >
          <span
            style={{
              fontSize: "1.05rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              background: "linear-gradient(90deg, #3b7eff 0%, #06b6d4 40%, #efefef 55%, #06b6d4 70%, #3b7eff 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer-brand 4s linear infinite",
              display: "inline-block",
            }}
          >
            Rajasaranya
          </span>
          <style>{`
            @keyframes shimmer-brand {
              0%   { background-position: 200% center; }
              100% { background-position: -200% center; }
            }
            #nav-logo-btn:hover span {
              filter: brightness(1.25);
              transform: scale(1.02);
            }
            #nav-logo-btn span {
              transition: filter 0.3s ease, transform 0.3s ease;
            }
          `}</style>
        </button>

        {/* Desktop links */}
        <ul role="list" style={{ display: "flex", gap: "0.25rem", listStyle: "none", alignItems: "center" }} className="hide-mobile">
          {NAV_PRIMARY.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className={`nav-link ${active === href ? "nav-active-pill" : ""}`}
                aria-current={active === href ? "page" : undefined}
              >
                {label}
              </button>
            </li>
          ))}

          {/* More dropdown */}
          <li ref={moreRef} style={{ position: "relative" }}>
            <button
              onClick={() => setMoreOpen(o => !o)}
              className="nav-link"
              aria-expanded={moreOpen}
              aria-haspopup="true"
              style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              More
              <span style={{
                fontSize: "0.55em",
                transition: "transform 0.2s ease",
                display: "inline-block",
                transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}>▼</span>
            </button>

            {moreOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(10,10,10,0.96)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  padding: "0.5rem",
                  minWidth: "160px",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                  zIndex: 10,
                }}
              >
                {NAV_MORE.map(({ label, href }) => (
                  <button
                    key={href}
                    onClick={() => { scrollTo(href); setMoreOpen(false); }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      padding: "0.5rem 0.85rem",
                      fontSize: "0.8rem",
                      color: active === href ? "var(--accent)" : "var(--text-secondary)",
                      borderRadius: "var(--r-md)",
                      transition: "background 0.15s, color 0.15s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = active === href ? "var(--accent)" : "var(--text-secondary)"; }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Desktop right actions */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ position: "relative" }}>
            <a
              href="/Raja_Saranya_T_Resume_Microsoft.docx"
              download
              id="nav-resume-download"
              aria-label="Download Resume"
              onMouseEnter={() => setResumeHint(true)}
              onMouseLeave={() => setResumeHint(false)}
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-full)",
                width: "34px", height: "34px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              <Download size={13} />
            </a>
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "-2.2rem",
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-sm)",
                padding: "0.2rem 0.5rem",
                fontSize: "0.6rem",
                letterSpacing: "0.04em",
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
                opacity: resumeHint ? 1 : 0,
                transition: "opacity 0.15s ease",
                pointerEvents: "none",
              }}
            >
              Resume
            </span>
          </div>

          <a
            href="mailto:rajasaranyaraj20@gmail.com"
            id="nav-contact-cta"
            aria-label="Send email to Raja Saranya"
            className="btn-ghost"
            style={{ fontSize: "0.75rem", padding: "0.4rem 1rem" }}
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="show-mobile" style={{ alignItems: "center", gap: "0.5rem" }}>
          <a
            href="/Raja_Saranya_T_Resume_Microsoft.docx"
            download
            aria-label="Download Resume"
            style={{ background: "none", border: "none", color: "var(--text-secondary)", lineHeight: 0, display: "flex" }}
          >
            <Download size={16} />
          </a>
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            style={{ background: "none", border: "none", color: "var(--text-primary)", lineHeight: 0 }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
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
          gap: "1.75rem",
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
              fontSize: "clamp(1.5rem,7vw,2.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: active === href ? "var(--accent)" : "var(--text-tertiary)",
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
