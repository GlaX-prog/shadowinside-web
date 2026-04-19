"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;

    document.body.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hover = target.closest("a, button, [data-hover]");
      if (ringRef.current) {
        ringRef.current.dataset.hover = hover ? "1" : "0";
      }
    };

    let rafId = 0;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-[var(--blue-glow)] mix-blend-screen"
      />
      <div
        ref={ringRef}
        aria-hidden
        data-hover="0"
        className="pointer-events-none fixed left-0 top-0 z-[99] -ml-[18px] -mt-[18px] h-[36px] w-[36px] rounded-full border border-[var(--blue)]/70 transition-[width,height,margin,border-color,opacity] duration-200 data-[hover='1']:-ml-[28px] data-[hover='1']:-mt-[28px] data-[hover='1']:h-[56px] data-[hover='1']:w-[56px] data-[hover='1']:border-[var(--blue-glow)]"
      />
    </>
  );
}
