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
        className="media-fill animate-kenburns"
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

export function JournalBand() {
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
        className="media-fill animate-kenburns"
      />
      <div className="absolute inset-0 bg-primary/82" />
      <DiamondField />
      <div className="relative container-page grid gap-10 py-20 md:grid-cols-[1.4fr_1fr] md:items-center md:py-24">
        <div>
          <p className="text-[11px] tracking-[0.32em] opacity-70">JOURNAL / NOTE</p>
          <h2 className="mt-4 text-2xl md:text-3xl">事務所の考えは、コラムに残しています。</h2>
          <p className="mt-5 max-w-lg text-sm leading-8 opacity-85">
            全文の正規掲載はこのサイトです。有料を含む抄録・連載は note（{FIRM.noteName}
            ）で公開し、スキ数を見ながら販売を検討します。
          </p>
        </div>
        <div className="space-y-3">
          <Link
            to="/column"
            className="light-pass inline-flex w-full items-center justify-center border border-primary-foreground/35 px-6 py-3.5 text-sm transition-colors hover:bg-primary-foreground hover:text-primary"
          >
            コラム一覧へ
          </Link>
          <a
            href={FIRM.note}
            target="_blank"
            rel="noreferrer"
            className="light-pass inline-flex w-full items-center justify-center bg-primary-foreground px-6 py-3.5 text-sm text-primary transition-opacity hover:opacity-90"
          >
            note で読む
          </a>
        </div>
      </div>
    </section>
  );
}
