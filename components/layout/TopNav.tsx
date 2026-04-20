"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { WordmarkLogo } from "@/components/hero/WordmarkLogo";
import { cn } from "@/lib/utils";

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const delta = y - lastY.current;
      if (y < 80) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-[transform,background-color,backdrop-filter,border-color] duration-300 md:px-10",
          scrolled ? "backdrop-blur-md bg-[var(--void)]/70 border-b border-white/5" : "bg-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0"
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
