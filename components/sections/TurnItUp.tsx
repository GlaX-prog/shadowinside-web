"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { FEATURED_YT_ID, FEATURED_YT_TITLE } from "@/lib/data";

const INTRO = ["STOP", "YOUR", "SCROLLING"];

export function TurnItUp() {
  const root = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Post YT iframe API commands
  const postCmd = (func: string, args: unknown[] = []) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    );
  };

  // Auto-unmute on ANY first user interaction anywhere on the page
  useEffect(() => {
    let done = false;
    const unlock = () => {
      if (done) return;
      done = true;
      postCmd("unMute");
      postCmd("setVolume", [80]);
      postCmd("playVideo");
      setMuted(false);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("scroll", unlock);
    };
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock);
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("wheel", unlock, { passive: true });
    window.addEventListener("scroll", unlock, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("scroll", unlock);
    };
  }, []);

  // Play/pause based on section in view
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIn = entry.intersectionRatio > 0.25;
          setPlaying(isIn);
          postCmd(isIn ? "playVideo" : "pauseVideo");
        });
      },
      { threshold: [0, 0.25, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scrub animation: letter reveal → fade out → "TURN IT UP" stays
  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const letters = el.querySelectorAll<HTMLSpanElement>("[data-char]");
      const stageTwo = el.querySelector<HTMLElement>("[data-stage-two]");
      const bg = el.querySelector<HTMLElement>("[data-bg]");

      gsap.set(letters, { yPercent: 110, rotate: 5 });
      gsap.set(stageTwo, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.8,
        },
      });

      tl.to(letters, {
        yPercent: 0,
        rotate: 0,
        stagger: 0.035,
        ease: "power3.out",
      })
        .to({}, { duration: 0.2 }) // hold
        .to(
          letters,
          {
            yPercent: -110,
            opacity: 0,
            stagger: 0.02,
            ease: "power3.in",
          },
          "+=0.15"
        )
        .to(
          bg,
          { scale: 1.1, filter: "blur(0px)" },
          0
        )
        .fromTo(
          stageTwo,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          ">-0.1"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    setMuted((m) => {
      postCmd(m ? "unMute" : "mute");
      return !m;
    });
  };

  const src = `https://www.youtube.com/embed/${FEATURED_YT_ID}?autoplay=1&mute=1&loop=1&playlist=${FEATURED_YT_ID}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;

  return (
    <section
      id="featured"
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--ink)]"
    >
      <div
        data-bg
        className="absolute inset-0"
        style={{ filter: "blur(2px)" }}
      >
        <iframe
          ref={iframeRef}
          src={src}
          title={FEATURED_YT_TITLE}
          allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
          allowFullScreen
          className="pointer-events-none absolute inset-0 h-full w-full scale-[1.5] origin-center"
          style={{ border: 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--void)]/60 via-[var(--ink)]/40 to-[var(--void)]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,92,255,0.25),transparent_65%)]" />
      </div>

      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
        <div className="pointer-events-none absolute top-8 left-0 right-0 flex justify-between px-6 md:px-12">
          <div className="flex items-center gap-3 font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--blue)]">
            <span className="h-px w-10 bg-[var(--blue)]" />
            02 · Now playing
          </div>
          <div className="flex items-center gap-2 font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--ice)]/70">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                playing ? "bg-[var(--blue)] animate-pulse" : "bg-[var(--steel)]"
              }`}
            />
            {playing ? "ON AIR" : "STANDBY"}
          </div>
        </div>

        {/* Stage 1 — letter reveal */}
        <div className="flex flex-col items-center gap-1">
          {INTRO.map((word, wi) => (
            <div key={word} className="overflow-hidden">
              <div className="flex font-display uppercase leading-[0.85] text-[clamp(3rem,14vw,13rem)] tracking-tight">
                {word.split("").map((ch, ci) => (
                  <span
                    key={`${wi}-${ci}`}
                    data-char
                    className={
                      wi === 1 ? "text-stroke" : "text-[var(--ice)] glow-blue"
                    }
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stage 2 — appears after letters fade */}
        <div
          data-stage-two
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6"
        >
          <div className="font-mono-token mb-4 text-[10px] uppercase tracking-[0.5em] text-[var(--blue)]">
            now with audio ↓
          </div>
          <h2 className="font-display text-[clamp(3.5rem,14vw,12rem)] uppercase leading-[0.82] tracking-tight text-center glow-blue">
            Turn
            <br />
            it
            <br />
            <span className="text-stroke">up.</span>
          </h2>

          <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={toggleMute}
              data-hover
              className="btn-magnetic"
            >
              {muted ? "🔊 Unmute" : "🔇 Mute"}
            </button>
            <a
              href={`https://www.youtube.com/watch?v=${FEATURED_YT_ID}`}
              target="_blank"
              rel="noreferrer"
              data-hover
              className="btn-magnetic btn-ghost"
            >
              Watch on YouTube ↗
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--ice)]/60">
          <VizBars active={playing && !muted} />
          <span>autoplaying · tap or scroll to unmute</span>
          <VizBars active={playing && !muted} />
        </div>
      </div>
    </section>
  );
}

function VizBars({ active }: { active: boolean }) {
  return (
    <div className="flex h-4 items-end gap-[2px]">
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="w-[2px] rounded-sm bg-[var(--blue)]"
          style={{
            height: `${20 + Math.abs(Math.sin(i * 1.3)) * 80}%`,
            animation: active
              ? `vizPulse 0.9s ease-in-out ${i * 0.07}s infinite alternate`
              : "none",
            opacity: active ? 1 : 0.3,
            transformOrigin: "bottom",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes vizPulse {
          from { transform: scaleY(0.35); }
          to { transform: scaleY(1.1); }
        }
      `}</style>
    </div>
  );
}
