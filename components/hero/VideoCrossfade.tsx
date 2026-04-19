"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  sources: string[];
  intervalMs?: number;
}

export function VideoCrossfade({ sources, intervalMs = 6500 }: Props) {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (!v) return;
      v.muted = true;
      v.playsInline = true;
      v.loop = true;
      v.play().catch(() => {});
    });
    const id = setInterval(() => {
      setActive((n) => (n + 1) % sources.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [sources.length, intervalMs]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {sources.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* color grade overlay */}
      <div
        className="absolute inset-0 mix-blend-color"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,92,255,0.35) 0%, rgba(31,182,255,0.25) 40%, rgba(5,8,13,0.35) 100%)",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
