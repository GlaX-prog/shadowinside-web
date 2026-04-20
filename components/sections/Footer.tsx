import { BAND_LINEUP } from "@/lib/data";
import { WordmarkLogo } from "@/components/hero/WordmarkLogo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--ink)] pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <WordmarkLogo className="text-[clamp(3rem,10vw,7rem)] glow-blue" />
            <p className="mt-4 max-w-sm text-sm text-[var(--steel)]">
              An Italian metalcore band making songs that stop your scrolling. This site is a fan-made mockup.
            </p>
          </div>

          <div>
            <div className="font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--blue)]">
              Lineup
            </div>
            <ul className="mt-4 space-y-2 font-mono-token text-xs uppercase tracking-[0.2em] text-[var(--steel)]">
              {BAND_LINEUP.map((b) => (
                <li key={b.role} className="flex justify-between gap-4">
                  <span>{b.role}</span>
                  <span className="text-[var(--ice)]/70">{b.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono-token text-[10px] uppercase tracking-[0.4em] text-[var(--steel)]">
          <div>© {new Date().getFullYear()} — Shadow Inside · fan-made mockup</div>
          <div>Built with Next.js · GSAP · Lenis · Three.js</div>
          <div>
            <a href="#hero" data-hover className="transition-colors hover:text-[var(--blue)]">
              ↑ back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
