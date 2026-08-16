"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Home } from "lucide-react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-base)",
        color: "var(--text-primary)",
        position: "relative",
        overflow: "hidden",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      {/* Load dotLottie player for 404 Error.lottie */}
      <Script
        type="module"
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
      />

      {/* Ambient background radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(59,126,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "520px" }}>
        {/* Lottie 404 Animation */}
        <div
          style={{
            width: "clamp(260px, 40vw, 360px)",
            height: "clamp(260px, 40vw, 360px)",
            margin: "0 auto 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mounted && (
            /* @ts-expect-error dotlottie-player custom element */
            <dotlottie-player
              src="/404-error.lottie"
              background="transparent"
              speed="1"
              style={{ width: "100%", height: "100%" }}
              loop
              autoplay
            />
          )}
        </div>

        {/* Title */}
        <h1
          className="t-display"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            marginBottom: "0.85rem",
            letterSpacing: "-0.03em",
          }}
        >
          404 — Page Not Found
        </h1>

        {/* Subtitle */}
        <p
          className="t-body"
          style={{
            color: "var(--text-secondary)",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          The page or route you requested does not exist or has been shifted in the neural matrix.
        </p>

        {/* CTA Button */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Link
            href="/"
            aria-label="Return to portfolio home"
            className="btn-primary"
            style={{ padding: "0.85rem 1.8rem", fontSize: "0.85rem", gap: "0.6rem" }}
          >
            <Home size={15} />
            Return to Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
