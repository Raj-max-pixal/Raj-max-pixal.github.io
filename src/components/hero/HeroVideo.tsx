"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroVideoProps {
  visible: boolean;
}

export function HeroVideo({ visible }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Enforce DOM muted & playsInline attributes for modern browser background autoplay
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("autoplay", "");

    const playVideo = () => {
      if (v.paused) {
        v.play().catch((err) => {
          console.log("Autoplay pending user interaction:", err);
        });
      }
    };

    // Initial attempt
    playVideo();

    // Fallback: trigger play on first user gesture or scroll if browser defers initial load
    const userEvents = ["click", "touchstart", "scroll", "mousemove", "pointerdown"];
    const handleGesture = () => {
      playVideo();
    };

    userEvents.forEach(evt => {
      window.addEventListener(evt, handleGesture, { passive: true });
    });

    const timer = setTimeout(() => {
      playVideo();
    }, 200);

    return () => {
      clearTimeout(timer);
      userEvents.forEach(evt => {
        window.removeEventListener(evt, handleGesture);
      });
    };
  }, [reducedMotion]);

  // Make video visible as soon as component is visible
  const isVideoVisible = visible;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {/* Gradient — bottom blends to bg */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "55%",
        background: "linear-gradient(to top, var(--bg-base) 0%, rgba(6,6,6,0.5) 60%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />
      {/* Side fade left */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, bottom: 0, width: "22%",
        background: "linear-gradient(to right, var(--bg-base) 0%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />
      {/* Side fade right */}
      <div style={{
        position: "absolute",
        top: 0, right: 0, bottom: 0, width: "22%",
        background: "linear-gradient(to left, var(--bg-base) 0%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />
      {/* Top fade */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: "18%",
        background: "linear-gradient(to bottom, var(--bg-base) 0%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />

      {/* Video — mix-blend-mode:screen makes black bg transparent */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
          position: "relative",
          zIndex: 1,
          mixBlendMode: "screen",
          opacity: isVideoVisible ? 1 : 0,
          transform: isVideoVisible ? "scale(1)" : "scale(0.98)",
          transition: "opacity 1.2s ease, transform 1.2s var(--ease-expo)",
          willChange: "opacity, transform",
        }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Ambient background glow behind video */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "radial-gradient(ellipse at center, rgba(59,126,255,0.14) 0%, transparent 70%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}




