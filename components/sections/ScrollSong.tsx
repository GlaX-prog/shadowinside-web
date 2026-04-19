"use client";

import { useEffect, useRef, useState } from "react";
import { FEATURED_YT_ID, FEATURED_YT_TITLE } from "@/lib/data";

export function ScrollSong() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIn = entry.intersectionRatio > 0.35;
          setVisible(isIn);
          postCmd(isIn ? "playVideo" : "pauseVideo");
        });
      },
      { threshold: [0, 0.35, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const postCmd = (func: string, args: unknown[] = []) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    );
  };

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
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[var(--ink)]"
    >
      <div className="absolute inset-0 opacity-40">
        <iframe
          ref={iframeRef}
          src={src}
          title={FEATURED_YT_TITLE}
          allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
          allowFullScreen
          className="pointer-events-none h-full w-full scale-[1.4] object-cover"
          style={{ border: 0 }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--void)] via-[var(--ink)]/60 to-[var(--void)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-between px-6 py-20 md:px-12">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--blue)]">
            <span className="h-px w-10 bg-[var(--blue)]" />
            04 · Now playing
          </div>
          <div className="flex items-center gap-2 font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--ice)]/70">
            <span className={`inline-block h-2 w-2 rounded-full ${visible ? "bg-[var(--blue)] animate-pulse" : "bg-[var(--steel)]"}`} />
            {visible ? "ON AIR" : "STANDBY"}
          </div>
        </div>

        <div>
          <h2 className="font-display text-[clamp(3rem,12vw,10rem)] uppercase leading-[0.85] tracking-tight glow-blue">
            Turn
            <br />
            it
            <br />
            <span className="text-stroke">UP.</span>
          </h2>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={toggleMute}
              data-hover
              className="btn-magnetic"
            >
              {muted ? "🔊 Unmute track" : "🔇 Mute track"}
            </button>
            <a
              href={`https://www.youtube.com/watch?v=${FEATURED_YT_ID}`}
              target="_blank"
              rel="noreferrer"
              data-hover
              className="btn-magnetic btn-ghost"
            >
              Open on YouTube ↗
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 font-mono-token text-xs uppercase tracking-[0.3em] text-[var(--steel)]">
            <VizBars active={visible && !muted} />
            <span>autoplaying · muted by default · tap to unmute</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function VizBars({ active }: { active: boolean }) {
  return (
    <div className="flex h-6 items-end gap-[3px]">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] rounded-sm bg-[var(--blue)]"
          style={{
            height: `${20 + Math.abs(Math.sin(i * 1.3)) * 80}%`,
            animation: active
              ? `vizPulse 0.9s ease-in-out ${i * 0.07}s infinite alternate`
              : "none",
            opacity: active ? 1 : 0.3,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes vizPulse {
          from { transform: scaleY(0.35); }
          to { transform: scaleY(1.1); }
        }
        span { transform-origin: bottom; }
      `}</style>
    </div>
  );
}
