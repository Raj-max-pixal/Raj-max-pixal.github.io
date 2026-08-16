"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, X, Video } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FloatingVideoWidget() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after initial delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = isMuted;
    v.playsInline = true;

    if (isPlaying) {
      v.play().catch((err) => {
        console.log("Floating video play deferred:", err);
      });
    } else {
      v.pause();
    }
  }, [isPlaying, isMuted]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized((prev) => !prev);
  };

  if (reducedMotion || !isVisible) return null;

  return (
    <div
      aria-label="Floating Portfolio Video"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 800,
        transition: "all 0.4s var(--ease-expo)",
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.9)",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {isMinimized ? (
        /* Minimized Compact Badge */
        <button
          onClick={() => setIsMinimized(false)}
          aria-label="Expand intro video"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.55rem 0.95rem",
            background: "rgba(15,15,15,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(59,126,255,0.3)",
            borderRadius: "var(--r-full)",
            color: "var(--text-primary)",
            fontSize: "0.75rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(59,126,255,0.15)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Video size={14} color="#3b7eff" />
          <span>Show Intro Video</span>
        </button>
      ) : (
        /* Expanded Floating Video Window */
        <div
          style={{
            position: "relative",
            width: "clamp(190px, 16vw, 240px)",
            aspectRatio: "3 / 4",
            background: "rgba(10,10,10,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(59,126,255,0.12), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Top Controls Bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "0.5rem 0.65rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(to bottom, rgba(6,6,6,0.85) 0%, transparent 100%)",
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#ffffff",
                opacity: 0.85,
                textTransform: "uppercase",
              }}
            >
              Intro Media
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <button
                onClick={toggleMinimize}
                aria-label="Minimize video"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "none",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {/* Video Element */}
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
              mixBlendMode: "screen",
            }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Bottom Floating Overlay Controls */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0.65rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
              background: "linear-gradient(to top, rgba(6,6,6,0.9) 0%, transparent 100%)",
              zIndex: 10,
            }}
          >
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          [aria-label="Floating Portfolio Video"] {
            bottom: 1rem !important;
            right: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
