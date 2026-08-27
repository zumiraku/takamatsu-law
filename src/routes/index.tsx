import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionTitle, CtaBand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { DiamondField, FrameImg, ScrollHint, VerticalEn } from "@/components/site/Decor";
import { LogoMark } from "@/components/site/LogoMark";
import { columns, formatDate } from "@/lib/columns";
import { news } from "@/lib/news";
import { PRACTICES } from "@/lib/practices";
import { FIRM, DEFAULT_DESCRIPTION, SITE_TITLE } from "@/lib/firm";
import { jsonLdLegalService } from "@/lib/seo";
import { IMG, CATEGORY_IMG } from "@/lib/media";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: DEFAULT_DESCRIPTION },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: DEFAULT_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: FIRM.siteUrl },
      { property: "og:image", content: `${FIRM.siteUrl}/og.jpg` },
      { property: "og:locale", content: "ja_JP" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", href: IMG.hero, as: "image", type: "image/webp" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLdLegalService()),
      },
    ],
  }),
  component: Home,
});

const POINTS = [
  {
    t: "経験を、見通しに変える",
    d: "民事・家事・商事・刑事と幅広い分野を扱ってきました。難しい事件、多数被害者の弁護団事件も含め、培った経験を依頼者に還元します。",
    img: IMG.scales,
    alt: "法律書と正義の天秤",
  },
  {
    t: "秘密は、厳守します",
    d: "ご相談・ご依頼の内容がご近所や勤務先に知られることはありません。弁護士法上の守秘義務のもと、個人情報を厳重に管理します。",
    img: IMG.consult,
    alt: "静かな相談室",
  },
  {
    t: "費用は、先にお示しします",
    d: "相談料・着手金・報酬金の目安を公開しています。ご依頼の前に、案件の内容を伺ったうえで費用をご説明します。",
    img: IMG.corridor,
    alt: "光の差す事務所の廊下",
  },
];

const TICKER = [
  "香川県高松市",
  "香川県弁護士会所属",
  "紹介は不要です",
  "法律相談は来所面談",
  "瀬戸内から、確かなリーガルへ",
];

function Home() {
  const latest = columns.slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-primary">
        <img
          src={IMG.hero}
          alt="朝の光が差し込む高松総合法律事務所の相談室"
          sizes="100vw"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="media-fill animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000c1c]/90 via-[#000c1c]/55 to-[#000c1c]/20" />
        <DiamondField />
        <div className="relative container-page flex min-h-[92vh] flex-col justify-end pb-16 pt-28 md:pb-20">
          <div className="flex items-end gap-10">
            <VerticalEn text={FIRM.nameEn} />
            <div className="max-w-2xl text-white">
              <Reveal>
                <div className="flex items-center gap-4">
                  <LogoMark className="size-10 md:size-12" />
                  <p className="text-[11px] tracking-[0.42em] text-white/70">{FIRM.nameEn}</p>
                </div>
                <h1 className="mt-8 text-[2rem] leading-[1.55] md:text-[3.15rem]">
                  クライアントの安心と
                  <br />
                  最良の結果のために
                </h1>
                <p className="mt-8 max-w-md text-sm leading-9 text-white/80">
                  香川県高松市の法律事務所です。紹介は不要です。弁護士への相談が初めての方にも、丁寧に対応いたします。
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href={FIRM.telReserveHref}
                    className="inline-flex items-center gap-2 bg-white px-7 py-3.5 text-sm text-primary transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    相談予約 {FIRM.telReserve}
                  </a>
                  <Link
                    to="/practice"
                    className="inline-flex items-center gap-2 border border-white/40 px-7 py-3.5 text-sm text-white transition-colors hover:bg-white hover:text-primary"
                  >
                    取扱業務を見る <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="mt-12">
            <ScrollHint />
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border bg-primary text-primary-foreground">
        <div className="flex w-max animate-marquee py-3 text-[11px] tracking-[0.35em] opacity-80">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={`${t}-${i}`} className="px-8">
              {t} ·
            </span>
          ))}
        </div>
      </div>

      <section id="approach" className="container-page py-20 md:py-28">
        <Reveal>
          <SectionTitle title="当事務所の姿勢" en="OUR APPROACH" />
        </Reveal>
        <ul className="grid gap-8 md:grid-cols-3">
          {POINTS.map((v, i) => (
            <li key={v.t}>
              <Reveal delay={i * 120}>
                <FrameImg src={v.img} alt={v.alt} className="aspect-[4/3]" />
                <h3 className="mt-6 text-lg">{v.t}</h3>
                <p className="mt-3 text-sm leading-8 text-muted-foreground">{v.d}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden bg-surface">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionTitle title="取扱業務" en="PRACTICE AREAS" />
          </Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICES.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={(i % 3) * 90}>
                  <Link
                    to="/practice"
                    hash={p.id}
                    className="group block overflow-hidden border border-border bg-card transition-shadow duration-500 hover:shadow-soft"
                  >
                    <FrameImg src={IMG.practices[p.id]} alt="" className="aspect-[16/10]" />
                    <div className="p-6">
                      <p className="text-[10px] tracking-[0.28em] text-brand">
                        {p.group === "personal" ? "個人の方" : "企業の方"}
                      </p>
                      <h3 className="mt-2 text-lg transition-colors group-hover:text-primary">
                        {p.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted-foreground">
                        {p.lead}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <FrameImg
            src={IMG.sea}
            alt="瀬戸内海と高松の夕景"
            className="min-h-72 lg:min-h-[32rem]"
            kenburns
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="flex items-center bg-primary px-8 py-16 text-primary-foreground md:px-16">
            <Reveal>
              <p className="text-[11px] tracking-[0.38em] text-white/60">TAKAMATSU / KAGAWA</p>
              <h2 className="mt-4 text-2xl md:text-3xl">瀬戸内のまちで、暮らしと事業の隣に。</h2>
              <p className="mt-6 max-w-md text-sm leading-8 text-white/80">
                JR高松駅から徒歩約10分。兵庫町の交差点ほど近く。紹介がなくても、相談が初めてでも、丁寧にお話を伺います。
              </p>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-sm hover:border-white"
              >
                事務所案内を見る <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <Reveal>
          <SectionTitle title="コラム" en="COLUMN" />
        </Reveal>
        <ul className="grid gap-8 md:grid-cols-3">
          {latest.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 100}>
                <Link to="/column/$slug" params={{ slug: c.slug }} className="group block">
                  <FrameImg
                    src={CATEGORY_IMG[c.category] ?? IMG.scales}
                    alt=""
                    className="aspect-[16/10]"
                  />
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="text-xs tracking-widest text-muted-foreground">
                      {formatDate(c.date)}
                    </span>
                    <span className="border border-brand/35 px-3 py-0.5 text-xs text-brand">
                      {c.category}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg leading-8 group-hover:text-primary">{c.title}</h3>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link to="/column" className="text-sm text-primary underline underline-offset-8">
            コラムの一覧を見る
          </Link>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionTitle title="お知らせ" en="NEWS" />
          </Reveal>
          <ul className="divide-y divide-border border-y border-border">
            {latestNews.map((n) => (
              <li key={n.slug}>
                <Link
                  to="/news/$slug"
                  params={{ slug: n.slug }}
                  className="flex flex-col gap-1 py-5 transition-colors hover:bg-background md:flex-row md:items-baseline md:gap-8"
                >
                  <span className="text-xs tracking-widest text-muted-foreground">
                    {formatDate(n.date)}
                  </span>
                  <span className="text-sm leading-7">{n.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
