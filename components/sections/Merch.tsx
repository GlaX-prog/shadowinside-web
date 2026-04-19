"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { MERCH } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Merch() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-item]").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 70, opacity: 0, rotate: i % 2 === 0 ? -4 : 4 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
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
      id="merch"
      ref={root}
      className="section relative overflow-hidden bg-gradient-to-b from-[var(--void)] via-[var(--panel)] to-[var(--void)]"
    >
      <div className="absolute inset-0 bg-grid opacity-20" />

      <MarqueeBand />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionLabel eyebrow="07 · Merch drop">
            <span className="block">Loud</span>
            <span className="block text-stroke">Threads</span>
          </SectionLabel>
          <div className="max-w-sm text-sm text-[var(--steel)]">
            Everything is out of stock because everything is fictional. Feast your eyes instead.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MERCH.map((m) => (
            <article
              key={m.name}
              data-item
              data-hover
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--panel)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-[var(--blue-deep)]/20 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel)] via-transparent to-transparent" />

                <span className="absolute right-4 top-4 rotate-12 rounded-sm border-2 border-red-500 px-3 py-1 font-display text-lg uppercase tracking-widest text-red-500 opacity-80">
                  {m.status}
                </span>

                <span className="absolute left-4 top-4 font-mono-token text-[10px] uppercase tracking-[0.3em] text-[var(--blue)]">
                  · {m.tag}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <h3 className="font-display text-2xl uppercase leading-tight md:text-3xl">
                    {m.name}
                  </h3>
                  <div className="mt-1 font-mono-token text-[11px] uppercase tracking-[0.3em] text-[var(--steel)]">
                    Unisex · limited run
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-display text-2xl text-[var(--blue)]">{m.price}</div>
                  <button
                    disabled
                    className="mt-1 font-mono-token text-[10px] uppercase tracking-[0.3em] text-[var(--steel)] line-through"
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeBand() {
  const phrase = " · SHADOW INSIDE · MERCH · LIVE ·  RAIN BRIGHT · OUT NOW · ";
  return (
    <div className="relative -my-4 select-none overflow-hidden border-y border-white/10 bg-[var(--blue)] py-4 text-[var(--ink)]">
      <div className="flex w-max animate-marquee whitespace-nowrap font-display text-3xl uppercase md:text-5xl">
        <span>{phrase.repeat(8)}</span>
        <span aria-hidden>{phrase.repeat(8)}</span>
      </div>
    </div>
  );
}
