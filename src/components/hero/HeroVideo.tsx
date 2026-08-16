"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroVideoProps {
  visible: boolean;
}

export function HeroVideo({ visible }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playFailed, setPlayFailed] = useState(false);

  const markLoaded = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Explicitly set DOM properties for background autoplay compatibility
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("autoplay", "");

    // Check readyState
    if (v.readyState >= 1) {
      setVideoLoaded(true);
    }

    const tryPlay = () => {
      const promise = v.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setVideoLoaded(true);
            setPlayFailed(false);
          })
          .catch((err) => {
            console.log("Autoplay policy restricted video play:", err);
            setPlayFailed(true);
          });
      }
    };

    tryPlay();

    // Fallback timer to check readyState
    const timer = setTimeout(() => {
      if (v.readyState >= 2) {
        setVideoLoaded(true);
        tryPlay();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [reducedMotion]);

  const isVideoVisible = visible && videoLoaded && !playFailed;

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
        onLoadedData={markLoaded}
        onCanPlay={markLoaded}
        onPlay={markLoaded}
        onPlaying={markLoaded}
        onLoadedMetadata={markLoaded}
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
          transition: "opacity 1.4s ease, transform 1.4s var(--ease-expo)",
          transitionDelay: "0.2s",
          willChange: "opacity, transform",
        }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Premium Poster Fallback visual if video is loading or autoplay is blocked */}
      {(!videoLoaded || playFailed) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(ellipse at center, rgba(59,126,255,0.18) 0%, rgba(6,6,6,0.95) 75%)",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          {/* Subtle glowing tech orb visual */}
          <div
            style={{
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,126,255,0.25) 0%, transparent 70%)",
              boxShadow: "0 0 60px rgba(59,126,255,0.2)",
              animation: "pulse-gentle 4s ease-in-out infinite",
            }}
          />
        </div>
      )}
    </div>
  );
}


