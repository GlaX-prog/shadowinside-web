"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { SONGS } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function RecentSongs() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

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

      el.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
        const inner = card.querySelector<HTMLElement>("[data-card-inner]");
        const onMove = (e: MouseEvent) => {
          if (card.dataset.playing === "true") return;
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          if (inner) {
            inner.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${
              -y * 14
            }deg) translateZ(10px)`;
          }
        };
        const onLeave = () => {
          if (inner) inner.style.transform = "";
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const toggle = (id: string) => {
    setPlayingId((current) => (current === id ? null : id));
  };

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
          {SONGS.map((song, i) => {
            const isPlaying = playingId === song.spotifyId;
            return (
              <div
                key={song.title}
                data-card
                data-hover
                data-playing={isPlaying}
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
                    className={`object-cover transition-all duration-500 ${
                      isPlaying ? "opacity-30 blur-[2px] scale-105" : "opacity-80 group-hover:opacity-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--void)] via-[var(--void)]/30 to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--blue)]">
                    <span className="h-px w-6 bg-[var(--blue)]" />
                    {song.tag}
                  </div>

                  <div className="absolute right-4 top-4 font-mono-token text-[10px] uppercase tracking-[0.3em] text-[var(--ice)]/60">
                    {String(i + 1).padStart(2, "0")} / {String(SONGS.length).padStart(2, "0")}
                  </div>

                  {/* Spotify player overlay */}
                  {isPlaying && (
                    <div className="absolute inset-x-4 top-1/2 z-10 -translate-y-1/2">
                      <iframe
                        title={`Spotify · ${song.title}`}
                        src={`https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator&theme=0&autoplay=1`}
                        width="100%"
                        height="152"
                        frameBorder={0}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="overflow-hidden rounded-xl border border-[var(--blue)]/30 shadow-[0_0_40px_rgba(31,182,255,0.35)]"
                      />
                      <div className="mt-2 flex items-center justify-center gap-2 font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--blue)]">
                        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--blue)]" />
                        now playing · tap play on spotify
                      </div>
                    </div>
                  )}

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
                      onClick={() => toggle(song.spotifyId)}
                      aria-label={isPlaying ? `Stop ${song.title}` : `Play ${song.title}`}
                      data-hover
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all ${
                        isPlaying
                          ? "bg-[var(--ice)] text-[var(--ink)] shadow-[0_0_24px_rgba(230,244,255,0.6)]"
                          : "bg-[var(--blue)] text-[var(--ink)] hover:scale-110"
                      }`}
                    >
                      {isPlaying ? (
                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                          <rect x="6" y="5" width="4" height="14" rx="1" />
                          <rect x="14" y="5" width="4" height="14" rx="1" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current ml-1">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

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
