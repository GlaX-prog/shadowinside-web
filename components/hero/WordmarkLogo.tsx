import { cn } from "@/lib/utils";

export function WordmarkLogo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "select-none font-display uppercase leading-[0.82] tracking-tight text-[var(--ice)]",
        compact ? "text-2xl md:text-3xl" : "text-[clamp(4rem,16vw,16rem)]",
        className
      )}
      aria-label="Shadow Inside"
    >
      <span className="block">Shadow</span>
      <span className="block">Inside</span>
    </div>
  );
}
