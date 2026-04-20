"use client";

import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "@/lib/data";

export function ScrollRail() {
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const markerRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(max > 0 ? y / max : 0);

      const anchor = window.innerHeight * 0.4;
      let idx = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= anchor) idx = i;
      }
      setActiveIdx(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <aside
      aria-hidden={false}
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 md:block"
      style={{ height: "60vh" }}
    >
      <div className="relative flex h-full w-12 flex-col items-center">
        {/* Vertical rail */}
        <div className="relative h-full w-[3px] overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-[var(--blue)] via-[var(--blue)] to-[var(--blue-deep)] shadow-[0_0_14px_rgba(31,182,255,0.55)]"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        {/* Markers */}
        <ul className="absolute inset-0 flex flex-col items-center justify-between py-1">
          {SECTIONS.map((section, i) => {
            const isActive = i === activeIdx;
            const isPassed = i < activeIdx;
            return (
              <li key={section.id} className="group relative flex items-center">
                <a
                  ref={(el) => {
                    markerRefs.current[i] = el;
                  }}
                  href={`#${section.id}`}
                  data-hover
                  className="pointer-events-auto relative flex items-center justify-center"
                  aria-label={`Jump to ${section.label}`}
                >
                  {/* Pulse ring on active */}
                  <span
                    className={`absolute h-7 w-7 rounded-full border transition-all duration-500 ${
                      isActive
                        ? "border-[var(--blue)]/70 scale-100 opacity-100 animate-ping-slow"
                        : "border-transparent scale-50 opacity-0"
                    }`}
                  />
                  {/* Marker dot */}
                  <span
                    className={`relative z-10 block rounded-full transition-all duration-300 ${
                      isActive
                        ? "h-4 w-4 bg-[var(--blue)] shadow-[0_0_18px_rgba(31,182,255,0.9)]"
                        : isPassed
                        ? "h-2.5 w-2.5 bg-[var(--blue)]/70"
                        : "h-2 w-2 bg-[var(--ice)]/25 group-hover:bg-[var(--ice)]/70"
                    }`}
                  />

                  {/* Label */}
                  <span
                    className={`pointer-events-none absolute left-7 whitespace-nowrap font-mono-token text-[10px] uppercase tracking-[0.35em] transition-all duration-300 ${
                      isActive
                        ? "translate-x-0 opacity-100 text-[var(--blue)]"
                        : "-translate-x-1 opacity-0 group-hover:opacity-70 text-[var(--ice)]/70"
                    }`}
                  >
                    <span className="mr-2 text-[var(--steel)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx>{`
        @keyframes pingSlow {
          0% {
            transform: scale(0.6);
            opacity: 0.9;
          }
          80%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        :global(.animate-ping-slow) {
          animation: pingSlow 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </aside>
  );
}
