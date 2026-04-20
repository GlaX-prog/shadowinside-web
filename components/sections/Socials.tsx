"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { SOCIALS, type Social } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";

function Icon({ name }: { name: Social["icon"] }) {
  const common = "h-full w-full";
  switch (name) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="5" width="20" height="14" rx="3" />
          <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
        </svg>
      );
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M7 10c3-1 8-1 11 1" strokeLinecap="round" />
          <path d="M7.5 13c2.5-.8 6.5-.8 9 .8" strokeLinecap="round" />
          <path d="M8 16c2-.6 5-.6 7 .4" strokeLinecap="round" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" strokeLinecap="round" />
          <path d="M14 4c.3 2.5 2.2 4.5 5 5" strokeLinecap="round" />
        </svg>
      );
  }
}

function MagneticTile({ s }: { s: Social }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    const ic = inner.current;
    if (!el || !ic) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.3;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    ic.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
    if (inner.current) inner.current.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={s.href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-hover
      data-tile
      className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[var(--panel)] p-6 transition-[border-color,box-shadow,background-color] duration-300 hover:border-[var(--blue)]/60 hover:shadow-[0_0_40px_rgba(31,182,255,0.25)] hover:bg-[var(--blue)]/[0.06]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,182,255,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute left-4 top-4 font-mono-token text-[10px] uppercase tracking-[0.3em] text-[var(--steel)] group-hover:text-[var(--blue)] transition-colors">
        {s.label}
      </div>
      <div className="absolute right-4 top-4 font-mono-token text-[10px] uppercase tracking-[0.3em] text-[var(--ice)]/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        open ↗
      </div>

      <div
        ref={inner}
        className="pointer-events-none flex flex-col items-center gap-4 transition-transform duration-150"
      >
        <div className="h-20 w-20 text-[var(--ice)] transition-colors duration-300 group-hover:text-[var(--blue)] md:h-24 md:w-24">
          <Icon name={s.icon} />
        </div>
        <div className="text-center">
          <div className="font-display text-2xl uppercase leading-none md:text-3xl">
            {s.handle}
          </div>
          <div className="mt-2 font-mono-token text-[10px] uppercase tracking-[0.3em] text-[var(--steel)]">
            {s.blurb}
          </div>
        </div>
      </div>
    </a>
  );
}

export function Socials() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-tile]").forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: tile,
              start: "top 88%",
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="socials"
      ref={root}
      className="section relative overflow-hidden bg-[var(--void)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(11,92,255,0.28),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionLabel eyebrow="04 · Find us loud" align="center">
            <span className="block">Every</span>
            <span className="block text-stroke">feed.</span>
          </SectionLabel>
          <p className="mt-6 max-w-xl text-[var(--steel)]">
            Follow, save, repost, resend to your ex. We&apos;re loud on every platform that&apos;ll have us.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {SOCIALS.map((s) => (
            <MagneticTile key={s.label} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
