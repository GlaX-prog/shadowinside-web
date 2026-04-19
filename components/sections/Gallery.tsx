"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { GALLERY_IMAGES } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Gallery() {
  const root = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-tile]").forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.1,
            delay: i * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: tile,
              start: "top 90%",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section
      id="gallery"
      ref={root}
      className="section relative overflow-hidden bg-[var(--void)]"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionLabel eyebrow="06 · Gallery">
            <span className="block">Behind</span>
            <span className="block text-stroke">The Blue</span>
          </SectionLabel>
          <div className="max-w-sm text-sm text-[var(--steel)]">
            On stage, off stage, in the haze. Tap any frame.
          </div>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.src}
              data-tile
              data-hover
              onClick={() => setLightbox(img.src)}
              className={`group relative overflow-hidden rounded-xl bg-[var(--panel)] ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--blue-deep)]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute left-3 top-3 font-mono-token text-[10px] uppercase tracking-[0.3em] text-[var(--ice)]/80">
                {String(i + 1).padStart(2, "0")} / {String(GALLERY_IMAGES.length).padStart(2, "0")}
              </div>
              <div className="absolute bottom-3 left-3 max-w-[80%] font-mono-token text-[10px] uppercase tracking-[0.2em] text-[var(--ice)]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {img.alt}
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
        >
          <div className="relative h-[85vh] w-[90vw] max-w-5xl">
            <Image
              src={lightbox}
              alt="Gallery image"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            className="absolute right-6 top-6 font-mono-token text-xs uppercase tracking-[0.3em] text-[var(--ice)]/80"
            onClick={() => setLightbox(null)}
          >
            Close ✕
          </button>
        </div>
      )}
    </section>
  );
}
