"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { TOUR_DATES } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Tour() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-row]").forEach((row, i) => {
        gsap.fromTo(
          row,
          { x: i % 2 === 0 ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
            },
          }
        );
      });

      // velocity-based skew
      let skew = 0;
      const proxy = { val: 0 };
      const updateSkew = () => {
        gsap.to(el, {
          skewY: proxy.val,
          duration: 0.3,
          ease: "power3",
          overwrite: true,
        });
      };
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity() * -0.0006;
          proxy.val = Math.max(-6, Math.min(6, v));
          updateSkew();
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tour"
      ref={root}
      className="section relative overflow-hidden border-y border-white/5 bg-[var(--panel)]/40"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-[50%] -translate-y-1/2 bg-grid opacity-30" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionLabel eyebrow="05 · Tour">
            <span className="block">On The</span>
            <span className="block text-stroke">Road</span>
          </SectionLabel>
          <div className="max-w-sm text-sm text-[var(--steel)]">
            Seven shows. One real — the rest are painfully fictional. Don&apos;t actually buy tickets to Skibidi Arena.
          </div>
        </div>

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {TOUR_DATES.map((t, i) => (
            <li
              key={t.date}
              data-row
              data-hover
              className="group grid grid-cols-12 items-center gap-4 py-6 md:py-8 transition-colors hover:bg-[var(--blue)]/5"
            >
              <div className="col-span-12 flex items-center gap-4 font-mono-token text-xs uppercase tracking-[0.3em] text-[var(--blue)] md:col-span-2">
                <span className="text-[var(--ice)]/40">{String(i + 1).padStart(2, "0")}</span>
                {t.date}
              </div>
              <div className="col-span-6 md:col-span-3">
                <div className="font-display text-3xl uppercase leading-none md:text-4xl">
                  {t.city}
                </div>
                <div className="mt-1 font-mono-token text-[11px] uppercase tracking-[0.3em] text-[var(--steel)]">
                  {t.venue}
                </div>
              </div>
              <div className="col-span-6 text-sm text-[var(--steel)] md:col-span-5">{t.note}</div>
              <div className="col-span-12 flex items-center justify-between md:col-span-2 md:justify-end">
                <StatusPill status={t.status} />
                <a
                  href="#"
                  className="ml-4 font-mono-token text-xs uppercase tracking-[0.3em] text-[var(--blue)] transition-transform group-hover:translate-x-1"
                  data-hover
                >
                  Tickets →
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatusPill({ status }: { status: string }) {
  const s = status.toUpperCase();
  const tone =
    s === "SOLD OUT"
      ? "bg-red-500/15 text-red-400 border-red-500/30"
      : s === "LIMITED" || s === "2 LEFT" || s === "PRESALE"
      ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/30"
      : "bg-[var(--blue)]/15 text-[var(--blue)] border-[var(--blue)]/40";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono-token text-[10px] uppercase tracking-[0.3em] ${tone}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
