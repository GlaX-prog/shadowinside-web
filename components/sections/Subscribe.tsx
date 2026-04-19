"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Subscribe() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("that doesn't look like an email 🤨");
      return;
    }
    setSubmitted(true);
    toast.success("you're on the list. stay loud.");
    console.info("subscribe:", email);
    setEmail("");
  };

  return (
    <section
      id="subscribe"
      className="section relative overflow-hidden bg-[var(--void)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,92,255,0.35),transparent_60%)]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center md:px-12">
        <div className="font-mono-token text-xs uppercase tracking-[0.4em] text-[var(--blue)]">
          <span className="mr-2 inline-block h-px w-10 align-middle bg-[var(--blue)]" />
          08 · Stay close
        </div>

        <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] md:text-7xl lg:text-8xl">
          <span className="block">Sneak peaks,</span>
          <span className="block text-stroke">shows, songs.</span>
        </h2>

        <p className="mt-6 max-w-xl text-balance text-[var(--steel)]">
          Want to get notified about upcoming shows and new songs + sneak peaks? Drop your email. No spam, no nonsense, occasional emotional damage.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-10 flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row"
        >
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.tld"
            className="w-full flex-1 rounded-full border border-white/15 bg-[var(--panel)] px-5 py-4 font-mono-token text-sm text-[var(--ice)] placeholder:text-[var(--steel)] focus:border-[var(--blue)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]/40"
          />
          <MagneticButton type="submit" className="w-full sm:w-auto">
            {submitted ? "Done ✓" : "Subscribe →"}
          </MagneticButton>
        </form>

        <div className="mt-6 font-mono-token text-[10px] uppercase tracking-[0.3em] text-[var(--steel)]">
          by subscribing you accept·loud·music·at·unreasonable·hours
        </div>
      </div>
    </section>
  );
}
