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

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    
    // Load the video first
    v.load();
    
    // Auto-play video as soon as possible
    const playVideo = async () => {
      try {
        await v.play();
        console.log("Video playing successfully");
      } catch (err) {
        console.log("Autoplay blocked:", err);
      }
    };
    
    // Try to play immediately, then retry after delays
    playVideo();
    const retry1 = setTimeout(playVideo, 300);
    const retry2 = setTimeout(playVideo, 1000);
    
    return () => {
      clearTimeout(retry1);
      clearTimeout(retry2);
    };
  }, [reducedMotion]);

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
        onLoadedData={() => {
          setVideoLoaded(true);
          console.log("Video loaded");
        }}
        onError={(e) => {
          console.error("Video error:", e);
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
          position: "relative",
          zIndex: 1,
          mixBlendMode: "screen",
          opacity: visible && videoLoaded ? 1 : 0,
          transform: visible && videoLoaded ? "scale(1)" : "scale(0.98)",
          transition: "opacity 1.4s ease, transform 1.4s var(--ease-expo)",
          transitionDelay: "0.4s",
          willChange: "opacity, transform",
        }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Fallback gradient if video doesn't load */}
      {!videoLoaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, rgba(59,126,255,0.15) 0%, transparent 70%)",
            zIndex: 0,
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        />
      )}
    </div>
  );
}
