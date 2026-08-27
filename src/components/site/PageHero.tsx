import { Link } from "@tanstack/react-router";
import { FIRM } from "@/lib/firm";
import { IMG } from "@/lib/media";
import { DiamondField } from "./Decor";
import { Reveal } from "./Reveal";

export function PageHero({
  title,
  en,
  lead,
  image,
  imageAlt,
}: {
  title: string;
  en: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
}) {
  const src = image ?? IMG.corridor;
  const alt = imageAlt ?? "";

  return (
    <section className="relative isolate min-h-[44vh] overflow-hidden md:min-h-[52vh]">
      <img
        src={src}
        alt={alt}
        sizes="100vw"
        width={1600}
        height={900}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover animate-kenburns"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#001226]/88 via-[#001226]/55 to-[#001226]/25" />
      <DiamondField />
      <div className="relative container-page flex min-h-[44vh] items-end py-16 md:min-h-[52vh] md:py-24">
        <Reveal className="max-w-2xl text-white">
          <p className="text-[11px] tracking-[0.38em] text-white/70">{en}</p>
          <h1 className="rule-draw mt-5 text-3xl md:text-[2.6rem]">{title}</h1>
          {lead && (
            <p className="mt-7 max-w-xl text-sm leading-9 text-white/80 md:text-[15px]">{lead}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionTitle({ title, en }: { title: string; en: string }) {
  return (
    <div className="mb-12">
      <p className="text-[11px] tracking-[0.38em] text-brand">{en}</p>
      <h2 className="rule-draw mt-3 text-2xl md:text-3xl">{title}</h2>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden text-primary-foreground">
      <img
        src={IMG.sea}
        alt=""
        sizes="100vw"
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="absolute inset-0 h-full w-full object-cover animate-kenburns"
      />
      <div className="absolute inset-0 bg-primary/82" />
      <DiamondField />
      <div className="relative container-page grid gap-10 py-20 md:grid-cols-[1.4fr_1fr] md:items-center md:py-24">
        <div>
          <h2 className="text-2xl md:text-3xl">まずは、お電話ください</h2>
          <p className="mt-5 max-w-lg text-sm leading-8 opacity-85">
            法律相談は原則として来所面談です。紹介は不要です。弁護士への相談が初めての方も、丁寧に対応いたします。
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-[11px] tracking-[0.28em] opacity-70">相談予約専用（{FIRM.hours}）</p>
          <a
            href={FIRM.telReserveHref}
            className="block font-serif text-3xl tracking-wider transition-opacity hover:opacity-80"
          >
            {FIRM.telReserve}
          </a>
          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-center border border-primary-foreground/35 px-6 py-3.5 text-sm transition-colors hover:bg-primary-foreground hover:text-primary"
          >
            来所予約のご連絡
          </Link>
        </div>
      </div>
    </section>
  );
}
