import { cn } from "@/lib/utils";

export function SectionLabel({
  eyebrow,
  children,
  align = "left",
  className,
}: {
  eyebrow?: string;
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right",
        className
      )}
    >
      {eyebrow && (
        <span className="font-mono-token text-xs uppercase tracking-[0.4em] text-[var(--blue)]">
          <span className="mr-2 inline-block h-px w-8 align-middle bg-[var(--blue)]" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-5xl uppercase leading-none md:text-7xl lg:text-8xl">
        {children}
      </h2>
    </div>
  );
}
