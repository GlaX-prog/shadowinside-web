"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { SONGS } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function RecentSongs() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => tr.scrollWidth - window.innerWidth + 64;

      gsap.to(tr, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // tilt cards on hover
      el.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
        const inner = card.querySelector<HTMLElement>("[data-card-inner]");
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          if (inner) {
            inner.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${
              -y * 14
            }deg) translateZ(10px)`;
          }
        });
        card.addEventListener("mouseleave", () => {
          if (inner) inner.style.transform = "";
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="songs" ref={root} className="relative h-[100svh] overflow-hidden bg-[var(--void)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-10 md:px-12">
        <SectionLabel eyebrow="03 · Recent Releases">
          <span className="block">Loud</span>
          <span className="block text-stroke">Loops</span>
        </SectionLabel>
        <div className="hidden font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--ice)]/50 md:block">
          swipe · or · scroll →
        </div>
      </div>

      <div className="flex h-full items-center">
        <div ref={track} className="flex gap-6 pl-[8vw] pr-[12vw] will-change-transform">
          {SONGS.map((song, i) => (
            <div
              key={song.title}
              data-card
              data-hover
              className="group relative h-[70vh] w-[min(78vw,520px)] shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-[var(--panel)]"
            >
              <div
                data-card-inner
                className="relative h-full w-full transition-transform duration-300 ease-out"
              >
                <Image
                  src={song.cover}
                  alt={song.title}
                  fill
                  sizes="(max-width: 768px) 78vw, 520px"
                  className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--void)] via-[var(--void)]/30 to-transparent" />

                <div className="absolute left-4 top-4 flex items-center gap-2 font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--blue)]">
                  <span className="h-px w-6 bg-[var(--blue)]" />
                  {song.tag}
                </div>

                <div className="absolute right-4 top-4 font-mono-token text-[10px] uppercase tracking-[0.3em] text-[var(--ice)]/60">
                  {String(i + 1).padStart(2, "0")} / {String(SONGS.length).padStart(2, "0")}
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-4xl uppercase leading-none md:text-5xl">
                      {song.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3 font-mono-token text-xs uppercase tracking-[0.25em] text-[var(--steel)]">
                      <span>{song.year}</span>
                      <span className="h-px w-6 bg-[var(--steel)]/60" />
                      <span>{song.duration}</span>
                    </div>
                  </div>
                  <button
                    aria-label={`Play ${song.title}`}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--blue)] text-[var(--ink)] transition-transform hover:scale-110"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex h-[70vh] w-[min(60vw,420px)] shrink-0 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--blue)]/40 p-8 text-center">
            <div className="font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--blue)]">
              more / coming / soon
            </div>
            <div className="mt-4 font-display text-4xl uppercase leading-none md:text-5xl">
              new single
              <br />
              next quarter
            </div>
            <a href="#subscribe" className="btn-magnetic mt-8" data-hover>
              Get notified
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
