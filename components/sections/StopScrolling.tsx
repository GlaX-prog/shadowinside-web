"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

const WORDS = ["STOP", "YOUR", "SCROLLING"];

export function StopScrolling() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const letters = el.querySelectorAll<HTMLSpanElement>("[data-char]");
      const sub = el.querySelector<HTMLElement>("[data-sub]");
      const blob = el.querySelector<HTMLElement>("[data-blob]");

      gsap.set(letters, { yPercent: 110, rotate: 6 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.7,
        },
      });

      tl.to(letters, {
        yPercent: 0,
        rotate: 0,
        stagger: 0.04,
        ease: "power3.out",
      })
        .fromTo(
          sub,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power2.out" },
          "-=0.2"
        )
        .to(
          blob,
          { scale: 1.6, opacity: 0.35, ease: "sine.inOut" },
          0
        )
        .to(letters, {
          yPercent: -40,
          opacity: 0,
          stagger: 0.03,
          ease: "power3.in",
        });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--void)]"
    >
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div
        data-blob
        className="absolute left-1/2 top-1/2 -z-10 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--blue-deep)]/40 blur-[140px]"
      />

      <div className="flex h-full w-full flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-2">
          {WORDS.map((word, wi) => (
            <div key={word} className="overflow-hidden">
              <div className="flex font-display uppercase leading-[0.85] text-[clamp(3rem,14vw,14rem)] tracking-tight">
                {word.split("").map((ch, ci) => (
                  <span
                    key={`${wi}-${ci}`}
                    data-char
                    className={
                      wi === 1
                        ? "text-stroke"
                        : "text-[var(--ice)] glow-blue"
                    }
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p
          data-sub
          className="mt-10 max-w-lg text-center text-sm text-[var(--steel)] md:text-base"
        >
          you&apos;ve seen us between the cat videos. now listen.
        </p>
      </div>

      <div className="absolute bottom-6 right-6 font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--ice)]/40">
        sec · 02
      </div>
    </section>
  );
}
