"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { WordmarkLogo } from "@/components/hero/WordmarkLogo";
import { cn } from "@/lib/utils";

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? y / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all md:px-10",
          scrolled ? "backdrop-blur-md bg-[var(--void)]/60 border-b border-white/5" : "bg-transparent"
        )}
      >
        <a href="#hero" className="flex items-center gap-3" data-hover>
          <WordmarkLogo compact className="leading-[0.85]" />
          <span className="hidden font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--blue)] md:inline">
            · band
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-hover
              className="font-mono-token text-xs uppercase tracking-[0.3em] text-[var(--ice)]/80 transition-colors hover:text-[var(--blue)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden font-mono-token text-xs uppercase tracking-[0.3em] text-[var(--ice)]"
          data-hover
        >
          {open ? "Close ✕" : "Menu ☰"}
        </button>

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
          <div
            className="h-full bg-[var(--blue)] transition-[width] duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[var(--void)]/95 backdrop-blur-lg md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              data-hover
              className="font-display text-4xl uppercase text-[var(--ice)] hover:text-[var(--blue)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
