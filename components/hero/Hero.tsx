"use client";

import { useEffect, useRef } from "react";
import { VideoCrossfade } from "./VideoCrossfade";
import { WordmarkLogo } from "./WordmarkLogo";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { scale: 0.92, opacity: 0, filter: "blur(18px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
        y: 160,
        scale: 1.18,
        filter: "blur(6px)",
        opacity: 0,
        ease: "none",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden noise"
    >
      <VideoCrossfade
        sources={["/videos/hero-1.mp4", "/videos/hero-2.mp4"]}
      />

      <div
        ref={contentRef}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6"
      >
        <div className="mb-6 flex items-center gap-3 font-mono-token text-[11px] uppercase tracking-[0.4em] text-[var(--blue)]">
          <span className="h-px w-10 bg-[var(--blue)]" />
          Italian metalcore · EST. —
          <span className="h-px w-10 bg-[var(--blue)]" />
        </div>

        <div ref={logoRef} className="text-center">
          <WordmarkLogo className="glow-blue" />
        </div>

        <p className="mt-6 max-w-xl text-center text-sm text-[var(--steel)] md:text-base">
          stop your scrolling. loud · blue · bright.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#songs"
            className="btn-magnetic"
            data-hover
          >
            Listen now
          </a>
          <a href="#tour" className="btn-magnetic btn-ghost" data-hover>
            Tour dates
          </a>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono-token text-[10px] uppercase tracking-[0.5em] text-[var(--ice)]/60">
          <span className="animate-scroll-cue inline-block">scroll ↓</span>
        </div>

        <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 text-vertical font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--ice)]/50 md:block">
          SHADOW · INSIDE — @SHADOWINSIDEBAND
        </div>
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-vertical font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--ice)]/50 md:block">
          {new Date().getFullYear()} — LIVE / LOUD / LOOPING
        </div>
      </div>
    </section>
  );
}
