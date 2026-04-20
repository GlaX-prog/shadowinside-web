"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { TOUR_DATES } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Tour() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
        gsap.fromTo(
          row,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
            },
          }
        );
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
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,rgba(11,92,255,0.18),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-10">
          <SectionLabel eyebrow="05 · Tour">
            <span className="block">On The</span>
            <span className="block text-stroke">Road</span>
          </SectionLabel>
          <div className="max-w-sm text-sm text-[var(--steel)]">
            Seven shows. One real — the rest are painfully fictional. Don&apos;t actually buy tickets to Skibidi Arena.
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {TOUR_DATES.map((t, i) => (
            <li
              key={t.date}
              data-row
              data-hover
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--ink)]/60 backdrop-blur-sm transition-colors hover:border-[var(--blue)]/40 hover:bg-[var(--blue)]/[0.04]"
            >
              {/* hover accent bar */}
              <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-[var(--blue)] transition-transform duration-300 group-hover:scale-y-100" />

              {/* Desktop row */}
              <div className="hidden grid-cols-12 items-center gap-6 px-6 py-6 md:grid">
                <div className="col-span-2 flex items-baseline gap-3 font-mono-token text-xs uppercase tracking-[0.3em] text-[var(--blue)]">
                  <span className="text-[var(--ice)]/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{t.date}</span>
                </div>
                <div className="col-span-4">
                  <div className="font-display text-3xl uppercase leading-none">
                    {t.city}
                  </div>
                  <div className="mt-2 font-mono-token text-[11px] uppercase tracking-[0.3em] text-[var(--steel)]">
                    {t.venue}
                  </div>
                </div>
                <div className="col-span-4 text-sm leading-snug text-[var(--steel)]">
                  {t.note}
                </div>
                <div className="col-span-2 flex items-center justify-end gap-4">
                  <StatusPill status={t.status} />
                  <a
                    href="#"
                    className="font-mono-token text-xs uppercase tracking-[0.3em] text-[var(--blue)] transition-transform group-hover:translate-x-1"
                    data-hover
                  >
                    →
                  </a>
                </div>
              </div>

              {/* Mobile card */}
              <div className="flex flex-col gap-3 p-5 md:hidden">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-baseline gap-2 font-mono-token text-[10px] uppercase tracking-[0.3em] text-[var(--blue)]">
                    <span className="text-[var(--ice)]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{t.date}</span>
                  </div>
                  <StatusPill status={t.status} />
                </div>

                <div>
                  <div className="font-display text-[2rem] uppercase leading-[0.95]">
                    {t.city}
                  </div>
                  <div className="mt-1 font-mono-token text-[10px] uppercase tracking-[0.3em] text-[var(--steel)]">
                    {t.venue}
                  </div>
                </div>

                <p className="text-[13px] leading-snug text-[var(--steel)]">
                  {t.note}
                </p>

                <a
                  href="#"
                  data-hover
                  className="mt-1 inline-flex w-fit items-center gap-2 font-mono-token text-[11px] uppercase tracking-[0.3em] text-[var(--blue)]"
                >
                  Tickets
                  <span aria-hidden>→</span>
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
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1 font-mono-token text-[9px] uppercase tracking-[0.3em] md:text-[10px] ${tone}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
