import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionTitle } from "@/components/site/PageHero";
import { FrameImg, TextLink } from "@/components/site/Decor";
import { Reveal } from "@/components/site/Reveal";
import { NoteAccountLink } from "@/components/site/NoteLink";
import {
  CATEGORIES,
  columnsByDate,
  countInCategory,
  formatDate,
  readingMinutes,
  categorySlug,
} from "@/lib/columns";
import { FIRM, pageTitle } from "@/lib/firm";
import { jsonLdBlog, jsonLdBreadcrumb, seoMeta } from "@/lib/seo";
import { CATEGORY_IMG, IMG } from "@/lib/media";

export const Route = createFileRoute("/column/")({
  head: () => {
    const seo = seoMeta({
      title: pageTitle("コラム"),
      description: `${FIRM.name}の情報発信。交通事故、相続、離婚、投資・消費者被害など、実務に即した論考を公開しています。全文の正規の掲載場所はこのサイトです。`,
      path: "/column",
    });
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            jsonLdBlog(
              columnsByDate.map((c) => ({
                title: c.title,
                path: `/column/${c.slug}`,
                date: c.date,
              })),
            ),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "ホーム", path: "/" },
              { name: "コラム", path: "/column" },
            ]),
          ),
        },
      ],
    };
  },
  component: ColumnIndex,
});

function ColumnIndex() {
  const [featured, ...rest] = columnsByDate;

  return (
    <>
      <PageHero
        title="コラム"
        en="JOURNAL"
        image={IMG.scales}
        imageAlt="法律書"
        lead="事務所の考えを、論考として残しています。個別の事案についての助言ではありません。"
      />

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-10 border-b border-border pb-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-[11px] tracking-[0.32em] text-brand">PUBLISHING</p>
            <p className="mt-5 max-w-xl text-[15px] leading-9 text-muted-foreground">
              コラムは当事務所の情報発信の中心です。全文の正規URL（canonical）はこのサイトに置き、
              事務所の言葉が事務所のドメインに蓄積される形を崩しません。将来 note
              で発信する場合も、この方針は変えません。
            </p>
          </div>
          <div className="lg:justify-self-end">
            <TextLink to="/publishing">発信の方針と、note の扱いについて</TextLink>
          </div>
        </div>

        {featured && (
          <Reveal>
            <Link
              to="/column/$slug"
              params={{ slug: featured.slug }}
              className="light-pass group mt-14 grid overflow-hidden border border-border bg-card md:grid-cols-[1.1fr_0.9fr]"
            >
              <FrameImg
                src={CATEGORY_IMG[featured.category] ?? IMG.scales}
                alt=""
                className="aspect-[16/10] md:aspect-auto md:min-h-[24rem]"
                sizes="(min-width: 768px) 55vw, 100vw"
              />
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-[10px] tracking-[0.28em] text-brand">LATEST</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <time
                    dateTime={featured.date}
                    className="text-xs tracking-widest text-muted-foreground"
                  >
                    {formatDate(featured.date)}
                  </time>
                  <span className="border border-brand/35 px-3 py-0.5 text-xs text-brand">
                    {featured.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    読了目安 {readingMinutes(featured)}分
                  </span>
                </div>
                <h2 className="mt-4 text-2xl leading-9 transition-colors group-hover:text-primary">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[15px] leading-8 text-muted-foreground">
                  {featured.excerpt}
                </p>
              </div>
            </Link>
          </Reveal>
        )}
      </section>

      <section className="bg-surface">
        <div className="container-page py-16 md:py-20">
          <SectionTitle title="分野から探す" en="CATEGORIES" />
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <li key={c.slug} className="bg-background">
                <Reveal delay={(i % 3) * 70}>
                  <Link
                    to="/column/category/$slug"
                    params={{ slug: c.slug }}
                    className="group flex h-full flex-col p-7 transition-colors hover:bg-surface"
                  >
                    <p className="font-serif text-[10px] tracking-[0.28em] text-brand">{c.en}</p>
                    <h3 className="mt-3 flex items-baseline gap-3 text-lg transition-colors group-hover:text-primary">
                      {c.name}
                      <span className="text-xs text-muted-foreground">
                        {countInCategory(c.name)}件
                      </span>
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{c.lead}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <SectionTitle title="すべてのコラム" en="ALL POSTS" />
        <ul className="grid gap-10 sm:grid-cols-2">
          {rest.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={(i % 2) * 80}>
                <Link
                  to="/column/$slug"
                  params={{ slug: c.slug }}
                  className="light-pass group block overflow-hidden border border-transparent transition-colors hover:border-border"
                >
                  <FrameImg
                    src={CATEGORY_IMG[c.category] ?? IMG.scales}
                    alt=""
                    className="aspect-[16/9]"
                    sizes="(min-width: 640px) 45vw, 100vw"
                  />
                  <div className="py-5">
                    <div className="flex flex-wrap items-center gap-4">
                      <time
                        dateTime={c.date}
                        className="text-xs tracking-widest text-muted-foreground"
                      >
                        {formatDate(c.date)}
                      </time>
                      <span className="border border-brand/35 px-3 py-0.5 text-xs text-brand">
                        {c.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        読了目安 {readingMinutes(c)}分
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg leading-8 transition-colors group-hover:text-primary">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
              <p className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="text-[11px] tracking-wide text-muted-foreground">
                    #{t}
                  </span>
                ))}
              </p>
              <p className="mt-4">
                <Link
                  to="/column/category/$slug"
                  params={{ slug: categorySlug(c.category) }}
                  className="text-xs text-brand underline underline-offset-8 transition-opacity hover:opacity-70"
                >
                  {c.category}のコラムをまとめて読む
                </Link>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <NoteAccountLink context="column-index" />
        </div>
      </section>
    </>
  );
}
