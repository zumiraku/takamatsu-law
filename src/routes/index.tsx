import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionTitle, JournalBand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { DiamondField, FrameImg, ScrollHint, TextLink, VerticalEn } from "@/components/site/Decor";
import { LogoMark } from "@/components/site/LogoMark";
import {
  CATEGORIES,
  columnsByDate,
  countInCategory,
  formatDate,
  readingMinutes,
} from "@/lib/columns";
import { news } from "@/lib/news";
import { PRACTICES } from "@/lib/practices";
import { FIRM, DEFAULT_DESCRIPTION, SITE_TITLE, isProductionSite } from "@/lib/firm";
import { absoluteUrl, jsonLdLegalService } from "@/lib/seo";
import { IMG, CATEGORY_IMG, srcSetFor } from "@/lib/media";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: DEFAULT_DESCRIPTION },
      // 他ページと同じく、本番ドメイン以外では検索エンジンに載せない。
      {
        name: "robots",
        content: isProductionSite ? "index,follow" : "noindex,nofollow",
      },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: DEFAULT_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: FIRM.siteUrl },
      { property: "og:image", content: `${FIRM.siteUrl}/og.jpg` },
      { property: "og:locale", content: "ja_JP" },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/") },
      // 先読みも srcset に合わせる。合わせないと携帯で大小2枚を読みに行く。
      {
        rel: "preload",
        href: IMG.hero,
        as: "image",
        type: "image/webp",
        imageSrcSet: srcSetFor(IMG.hero),
        imageSizes: "100vw",
        fetchPriority: "high",
      },
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
    t: "実務を、言葉にする",
    d: "取り扱ってきた事件の蓄積を、一般論としてコラムに残します。事務所の考えを、検索のための文章ではなく、読むための文章として公開しています。",
    img: IMG.scales,
    alt: "法律書と正義の天秤",
  },
  {
    t: "秘密は、厳守します",
    d: "ご相談・ご依頼の内容がご近所や勤務先に知られることはありません。弁護士法上の守秘義務のもと、個人情報を厳重に管理します。",
    img: IMG.consult,
    alt: "静かな室内",
  },
  {
    t: "瀬戸内のまちで",
    d: "高松市磨屋町。駅から徒歩圏の小さな事務所です。大きな広告で集めるのではなく、仕事の質と、公開する情報で事務所を知っていただきたいと考えています。",
    img: IMG.corridor,
    alt: "光の差す廊下",
  },
];

/** 発信の姿勢。トップで先に示し、詳細は /publishing に置く。 */
const PUBLISHING_STANCE = [
  {
    t: "全文は、ここに置く",
    d: "コラムの本文は当サイトを正本とします。事務所の言葉が、事務所の場所に積み上がっていく形を崩しません。",
  },
  {
    t: "note は、要約と入口に",
    d: "同じ本文を二か所に置くことはしません。note には要点と本文への案内を置き、全文はこのサイトでお読みいただきます。",
  },
  {
    t: "反応を見て、次を決める",
    d: "どの記事がどこまで読まれたかを記録しています。次に何を書くか、どの主題を掘り下げるかは、その反応から決めます。",
  },
];

const TICKER = [
  "香川県高松市",
  "香川県弁護士会所属",
  "コラムによる情報発信",
  "瀬戸内から、考える法律事務所",
];

function Home() {
  const [featured, ...rest] = columnsByDate;
  const more = rest.slice(0, 4);
  const latestNews = news.slice(0, 3);

  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-primary">
        <img
          src={IMG.hero}
          srcSet={srcSetFor(IMG.hero)}
          alt="朝の光が差し込む窓辺"
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
            <div className="hero-enter max-w-2xl text-white">
              <div className="flex items-center gap-4">
                <LogoMark className="size-10 md:size-12" />
                <p className="text-[11px] tracking-[0.42em] text-white/70">{FIRM.nameEn}</p>
              </div>
              <h1 className="mt-8 text-[2rem] leading-[1.55] md:text-[3.15rem]">
                考えることを、
                <br />
                公開する事務所でありたい。
              </h1>
              <p className="mt-8 max-w-lg text-sm leading-9 text-white/80">
                {FIRM.name}
                は、香川県高松市の法律事務所です。集客のためのサイトではなく、事務所の姿勢と、実務に根ざした情報発信の場としてこのサイトを置いています。
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/column"
                  className="light-pass inline-flex items-center gap-2 bg-white px-7 py-3.5 text-sm text-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
                >
                  コラムを読む
                </Link>
                <Link
                  to="/about"
                  className="light-pass inline-flex items-center gap-2 border border-white/40 px-7 py-3.5 text-sm text-white transition-colors duration-500 hover:bg-white hover:text-primary"
                >
                  事務所案内
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <ScrollHint />
          </div>
        </div>
      </section>

      <div className="group/ticker overflow-hidden border-y border-border bg-primary text-primary-foreground">
        <div className="flex w-max animate-marquee py-3 text-[11px] tracking-[0.35em] opacity-80 group-hover/ticker:[animation-play-state:paused]">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={`${t}-${i}`} className="px-8">
              {t} ·
            </span>
          ))}
        </div>
      </div>

      <section id="approach" className="container-page py-20 md:py-28">
        <Reveal>
          <SectionTitle title="最新のコラム" en="JOURNAL" />
        </Reveal>
        {featured && (
          <Reveal>
            <Link
              to="/column/$slug"
              params={{ slug: featured.slug }}
              className="light-pass group grid overflow-hidden border border-border bg-card md:grid-cols-[1.15fr_0.85fr]"
            >
              <FrameImg
                src={CATEGORY_IMG[featured.category] ?? IMG.scales}
                alt=""
                className="aspect-[16/10] md:aspect-auto md:min-h-[22rem]"
                sizes="(min-width: 768px) 55vw, 100vw"
              />
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-[10px] tracking-[0.28em] text-brand">FEATURED</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <time className="text-xs tracking-widest text-muted-foreground">
                    {formatDate(featured.date)}
                  </time>
                  <span className="border border-brand/35 px-3 py-0.5 text-xs text-brand">
                    {featured.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {readingMinutes(featured)}分
                  </span>
                </div>
                <h3 className="mt-4 text-2xl leading-9 transition-colors group-hover:text-primary">
                  {featured.title}
                </h3>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">{featured.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        )}
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {more.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 60}>
                <Link
                  to="/column/$slug"
                  params={{ slug: c.slug }}
                  className="group flex flex-col gap-2 py-6 transition-colors hover:bg-surface md:flex-row md:items-baseline md:gap-10 md:px-2"
                >
                  <span className="w-36 shrink-0 text-xs tracking-widest text-muted-foreground">
                    {formatDate(c.date)}
                  </span>
                  <span className="w-28 shrink-0 text-xs text-brand">{c.category}</span>
                  <span className="text-sm leading-7 transition-colors group-hover:text-primary">
                    {c.title}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
          <TextLink to="/column">コラムの一覧を見る</TextLink>
          <TextLink to="/publishing">発信の方針について</TextLink>
        </div>

        <div className="mt-14 border-t border-border pt-10">
          <p className="text-[11px] tracking-[0.32em] text-brand">CATEGORIES</p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/column/category/$slug"
                  params={{ slug: c.slug }}
                  className="light-pass inline-flex items-baseline gap-2 border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  {c.name}
                  <span className="text-xs opacity-70">{countInCategory(c.name)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionTitle title="事務所の姿勢" en="OUR STANCE" />
          </Reveal>
          <ul className="grid gap-8 md:grid-cols-3">
            {POINTS.map((v, i) => (
              <li key={v.t}>
                <Reveal delay={i * 120}>
                  <p className="font-serif text-[11px] tracking-[0.32em] text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <FrameImg src={v.img} alt={v.alt} className="mt-4 aspect-[4/3]" />
                  <h3 className="mt-6 text-lg">{v.t}</h3>
                  <p className="mt-3 text-sm leading-8 text-muted-foreground">{v.d}</p>
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
                JR高松駅から徒歩約10分。磨屋町の小さな事務所です。{FIRM.tagline}
              </p>
              <div className="mt-8">
                <TextLink to="/about" light>
                  事務所案内を見る
                </TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <Reveal>
          <SectionTitle title="専門とする領域" en="PRACTICE" />
        </Reveal>
        <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICES.map((p, i) => (
            <li key={p.id} className="bg-background">
              <Reveal delay={(i % 3) * 70}>
                <Link
                  to="/practice"
                  hash={p.id}
                  className="group block p-7 transition-colors hover:bg-surface"
                >
                  <p className="font-serif text-[11px] tracking-[0.28em] text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-lg transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[11px] tracking-widest text-muted-foreground">
                    {p.group === "personal" ? "個人の方" : "企業の方"}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-16 md:py-20">
          <Reveal>
            <SectionTitle title="発信について" en="PUBLISHING" />
          </Reveal>
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-3">
            {PUBLISHING_STANCE.map((c, i) => (
              <li key={c.t} className="bg-background">
                <Reveal delay={i * 70}>
                  <div className="h-full p-8">
                    <p className="font-serif text-[11px] tracking-[0.28em] text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-lg">{c.t}</h3>
                    <p className="mt-3 text-sm leading-8 text-muted-foreground">{c.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
            <TextLink to="/publishing">発信の方針をくわしく見る</TextLink>
            <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {[
                { to: "/flow" as const, label: "相談までの流れ" },
                { to: "/fees" as const, label: "弁護士費用" },
                { to: "/faq" as const, label: "よくあるご質問" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              ))}
            </p>
          </div>
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
                  className="flex flex-col gap-1 py-5 transition-[background-color,padding] duration-500 hover:bg-background md:flex-row md:items-baseline md:gap-8 md:hover:px-4"
                >
                  <span className="text-xs tracking-widest text-muted-foreground">
                    {formatDate(n.date)}
                  </span>
                  <span className="text-sm leading-7">{n.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <TextLink to="/news">お知らせの一覧を見る</TextLink>
          </div>
        </div>
      </section>

      <JournalBand />
    </>
  );
}
