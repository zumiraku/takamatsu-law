import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRef } from "react";
import { FrameImg } from "@/components/site/Decor";
import { LawyerPortrait } from "@/components/site/LawyerPortrait";
import {
  ArticleBody,
  ArticleBreadcrumb,
  ArticleNav,
  KeyPoints,
  ShareRow,
  TableOfContents,
} from "@/components/site/Article";
import { ArticleNoteLink } from "@/components/site/NoteLink";
import {
  categorySlug,
  columnsByDate,
  formatDate,
  getColumn,
  headings,
  plainText,
  readingMinutes,
  siblings,
} from "@/lib/columns";
import { useArticleReading } from "@/hooks/use-article-reading";
import { representativeLawyer } from "@/lib/lawyers";
import { FIRM, pageTitle } from "@/lib/firm";
import { absoluteUrl, jsonLdBreadcrumb } from "@/lib/seo";
import { CATEGORY_IMG, IMG } from "@/lib/media";

const AUTHOR = representativeLawyer();

export const Route = createFileRoute("/column/$slug")({
  loader: ({ params }) => {
    const column = getColumn(params.slug);
    if (!column) throw notFound();
    return { column };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: pageTitle("記事が見つかりません") },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { column } = loaderData;
    const title = `${column.title}｜${FIRM.name}`;
    const path = `/column/${params.slug}`;
    const url = absoluteUrl(path);
    return {
      meta: [
        { title },
        { name: "description", content: column.excerpt },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: column.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: `${FIRM.siteUrl}/og.jpg` },
        { property: "og:locale", content: "ja_JP" },
        { property: "og:site_name", content: FIRM.name },
        { property: "article:published_time", content: column.date },
        { property: "article:section", content: column.category },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      // 正本はこのサイト。note に要約を載せても、評価はこの URL に集約する。
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: column.title,
            description: column.excerpt,
            datePublished: column.date,
            dateModified: column.updated ?? column.date,
            inLanguage: "ja",
            articleSection: column.category,
            keywords: column.tags.join(","),
            wordCount: plainText(column).length,
            image: `${FIRM.siteUrl}/og.jpg`,
            author: {
              "@type": "Person",
              name: AUTHOR.name.replace(/\s/g, ""),
              jobTitle: AUTHOR.role,
              affiliation: { "@type": "Organization", name: FIRM.name },
            },
            publisher: { "@id": `${FIRM.siteUrl}/#organization` },
            isAccessibleForFree: true,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "ホーム", path: "/" },
              { name: "コラム", path: "/column" },
              { name: column.category, path: `/column/category/${categorySlug(column.category)}` },
              { name: column.title, path },
            ]),
          ),
        },
      ],
    };
  },
  notFoundComponent: ColumnNotFound,
  component: ColumnDetail,
});

function ColumnNotFound() {
  return (
    <div className="container-page py-32 text-center">
      <h1 className="text-2xl">記事が見つかりません</h1>
      <Link
        to="/column"
        className="mt-6 inline-block text-sm text-primary underline underline-offset-8"
      >
        コラム一覧へ戻る
      </Link>
    </div>
  );
}

function ColumnDetail() {
  const { column } = Route.useLoaderData();
  const bodyRef = useRef<HTMLDivElement>(null);
  const toc = headings(column);
  const { newer, older } = siblings(column.slug);
  const path = `/column/${column.slug}`;
  const related = columnsByDate
    .filter((c) => c.category === column.category && c.slug !== column.slug)
    .slice(0, 3);

  useArticleReading(bodyRef, {
    slug: column.slug,
    title: column.title,
    category: column.category,
  });

  return (
    <article data-article-id={column.slug} data-article-category={column.category}>
      <div className="container-page max-w-5xl pt-12 md:pt-16">
        <ArticleBreadcrumb column={column} />

        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-4">
            <time dateTime={column.date} className="text-xs tracking-widest text-muted-foreground">
              {formatDate(column.date)}
            </time>
            <Link
              to="/column/category/$slug"
              params={{ slug: categorySlug(column.category) }}
              className="border border-brand/35 px-3 py-0.5 text-xs text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              {column.category}
            </Link>
            <span className="text-xs text-muted-foreground">
              読了目安 {readingMinutes(column)}分
            </span>
          </div>
          <h1 className="mt-6 text-[1.75rem] leading-[1.65] md:text-[2.4rem]">{column.title}</h1>
          <p className="mt-6 text-sm leading-8 text-muted-foreground">{column.excerpt}</p>
        </header>

        <FrameImg
          src={CATEGORY_IMG[column.category] ?? IMG.scales}
          alt=""
          className="mt-10 aspect-[16/8]"
          priority
          sizes="(min-width: 1024px) 64rem, 100vw"
        />
      </div>

      <div className="container-page max-w-5xl grid gap-14 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
        <div className="min-w-0">
          <KeyPoints items={column.summary} />

          {toc.length > 0 && <TableOfContents items={toc} className="mt-10 lg:hidden" />}

          <div ref={bodyRef} className="mt-12 border-t border-border pt-12">
            <ArticleBody blocks={column.body} />
          </div>

          <p className="mt-14 border-l-2 border-brand bg-surface p-6 text-sm leading-8 text-muted-foreground">
            本コラムは一般的な情報提供を目的としたものであり、個別の事案についての法的助言ではありません。具体的な対応は事案によって異なります。電話・メールでの法律相談はお受けしておりません。
          </p>

          <div className="mt-8">
            <ArticleNoteLink noteRef={column.noteRef} articleSlug={column.slug} />
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {column.tags.map((t) => (
              <span
                key={t}
                className="border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                #{t}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <ShareRow title={column.title} path={path} />
          </div>

          <aside className="mt-14 flex flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-start">
            <LawyerPortrait mark={AUTHOR.mark} name={AUTHOR.name} />
            <div>
              <p className="text-[11px] tracking-[0.28em] text-brand">WRITTEN BY</p>
              <p className="mt-2 text-lg">
                {AUTHOR.name}
                <span className="ml-3 text-xs tracking-widest text-muted-foreground">
                  {AUTHOR.role}・{FIRM.bar}所属
                </span>
              </p>
              <p className="mt-4 max-w-xl text-sm leading-8 text-muted-foreground">
                {AUTHOR.message}
              </p>
              <Link
                to="/lawyers"
                className="mt-4 inline-block text-sm text-primary underline underline-offset-8"
              >
                弁護士紹介を見る
              </Link>
            </div>
          </aside>

          <p className="mt-10 text-xs leading-7 text-muted-foreground">
            この記事の正規URL（canonical）は {absoluteUrl(path)}{" "}
            です。他の媒体に転載・要約を掲載する場合も、全文の掲載場所はこのページです。
          </p>
        </div>

        {toc.length > 0 && <TableOfContents items={toc} sticky className="hidden h-fit lg:block" />}
      </div>

      <div className="container-page max-w-5xl pb-16 md:pb-24">
        <ArticleNav newer={newer} older={older} />

        {related.length > 0 && (
          <section className="mt-16">
            <p className="text-[11px] tracking-[0.32em] text-brand">RELATED</p>
            <h2 className="mt-2 text-xl">{column.category}の他のコラム</h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-3">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/column/$slug"
                    params={{ slug: c.slug }}
                    className="light-pass group block"
                  >
                    <FrameImg
                      src={CATEGORY_IMG[c.category] ?? IMG.scales}
                      alt=""
                      className="aspect-[16/10]"
                      sizes="(min-width: 640px) 20rem, 100vw"
                    />
                    <time
                      dateTime={c.date}
                      className="mt-3 block text-xs tracking-widest text-muted-foreground"
                    >
                      {formatDate(c.date)}
                    </time>
                    <p className="mt-1 text-sm leading-7 transition-colors group-hover:text-primary">
                      {c.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-14 flex flex-wrap gap-6">
          <Link to="/column" className="text-sm text-primary underline underline-offset-8">
            コラム一覧へ戻る
          </Link>
          <Link
            to="/column/category/$slug"
            params={{ slug: categorySlug(column.category) }}
            className="text-sm text-primary underline underline-offset-8"
          >
            {column.category}のコラムをまとめて読む
          </Link>
        </div>
      </div>
    </article>
  );
}
