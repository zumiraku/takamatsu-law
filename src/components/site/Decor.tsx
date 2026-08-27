import { cn } from "@/lib/utils";
import { IMG } from "@/lib/media";
import { LogoMark } from "./LogoMark";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-multiply"
      style={{ backgroundImage: `url(${IMG.washi})`, backgroundSize: "420px" }}
    />
  );
}

export function DiamondField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <LogoMark className="absolute -right-8 top-16 size-40 animate-float-slow opacity-[0.12] md:size-56" />
      <LogoMark className="absolute -left-10 bottom-10 size-24 animate-float-slower opacity-[0.08] md:size-32" />
      <span className="absolute right-[18%] top-[42%] size-2 rotate-45 bg-brand/40 animate-pulse-soft" />
      <span className="absolute left-[12%] top-[28%] size-1.5 rotate-45 bg-white/50 animate-pulse-soft" />
    </div>
  );
}

export function ScrollHint() {
  return (
    <a
      href="#approach"
      className="group inline-flex flex-col items-center gap-2 text-[10px] tracking-[0.35em] text-white/70"
    >
      SCROLL
      <span className="block h-10 w-px origin-top bg-white/50 animate-scroll-line" />
    </a>
  );
}

export function VerticalEn({ text }: { text: string }) {
  return (
    <p
      aria-hidden
      className="pointer-events-none hidden font-serif text-[11px] tracking-[0.55em] text-white/45 [writing-mode:vertical-rl] lg:block"
    >
      {text}
    </p>
  );
}

export function FrameImg({
  src,
  alt,
  className,
  imgClassName,
  kenburns = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  kenburns?: boolean;
}) {
  return (
    <div className={cn("group relative overflow-hidden bg-surface", className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105",
          kenburns && "animate-kenburns",
          imgClassName,
        )}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/25 to-transparent opacity-70"
      />
    </div>
  );
}
