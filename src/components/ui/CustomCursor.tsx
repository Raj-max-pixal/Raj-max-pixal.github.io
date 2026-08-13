"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Desktop / fine pointer only
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let frameId: number;
    let isHover = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.13);
      ry = lerp(ry, my, 0.13);
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    const onEnter = () => {
      isHover = true;
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.borderColor = "rgba(59,126,255,0.55)";
    };
    const onLeave = () => {
      isHover = false;
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderColor = "rgba(255,255,255,0.45)";
    };

    document.addEventListener("mousemove", onMove, { passive: true });

    const addListeners = () => {
      document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    addListeners();

    // Re-scan on DOM changes (dynamic content)
    const mo = new MutationObserver(addListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", onMove);
      mo.disconnect();
    };
  }, []);

  return (
    <div className="cursor-wrap" aria-hidden="true">
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
