import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { FrameImg } from "@/components/site/Decor";
import { getColumn, formatDate, columnsByDate, readingMinutes } from "@/lib/columns";
import { trackArticleView } from "@/lib/analytics";
import { FIRM, pageTitle } from "@/lib/firm";
import { CATEGORY_IMG, IMG } from "@/lib/media";

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
    return {
      meta: [
        { title },
        { name: "description", content: column.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: column.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${FIRM.siteUrl}${path}` },
        { property: "og:locale", content: "ja_JP" },
        { name: "robots", content: "index,follow" },
      ],
      links: [{ rel: "canonical", href: path }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: column.title,
            datePublished: column.date,
            inLanguage: "ja",
            articleSection: column.category,
            wordCount: column.body.join("").length,
            author: { "@type": "Organization", name: FIRM.name, url: FIRM.siteUrl },
            publisher: { "@type": "Organization", name: FIRM.name },
            mainEntityOfPage: `${FIRM.siteUrl}${path}`,
          }),
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
  const related = columnsByDate
    .filter((c) => c.category === column.category && c.slug !== column.slug)
    .slice(0, 3);

  useEffect(() => {
    trackArticleView(column.slug, column.title, column.category);
  }, [column.slug, column.title, column.category]);

  return (
    <article
      className="container-page max-w-3xl py-16 md:py-24"
      data-article-id={column.slug}
      data-article-category={column.category}
    >
      <nav aria-label="パンくず" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          ホーム
        </Link>
        <span className="mx-2">/</span>
        <Link to="/column" className="hover:text-primary">
          コラム
        </Link>
        <span className="mx-2">/</span>
        <span>{column.category}</span>
      </nav>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <time dateTime={column.date} className="text-xs tracking-widest text-muted-foreground">
          {formatDate(column.date)}
        </time>
        <span className="border border-brand/35 px-3 py-0.5 text-xs text-brand">
          {column.category}
        </span>
        <span className="text-xs text-muted-foreground">読了目安 {readingMinutes(column)}分</span>
      </div>

      <h1 className="mt-5 text-2xl leading-[1.7] md:text-3xl">{column.title}</h1>
      <FrameImg
        src={CATEGORY_IMG[column.category] ?? IMG.scales}
        alt=""
        className="mt-10 aspect-[16/8]"
      />

      <div className="mt-12 space-y-7 border-t border-border pt-12 text-[15px] leading-9 text-foreground/85">
        {column.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <p className="mt-12 border-l-2 border-brand bg-surface p-6 text-sm leading-8 text-muted-foreground">
        本コラムは一般的な情報提供を目的としたものであり、個別の事案についての法的助言ではありません。具体的な対応は事案によって異なります。電話・メールでの法律相談はお受けしておりません。
      </p>

      <p className="mt-8 text-xs leading-7 text-muted-foreground">
        この記事の正規URLは {FIRM.siteUrl}/column/{column.slug} です。抄録・有料記事は{" "}
        <a
          href={FIRM.note}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline underline-offset-4"
        >
          note（{FIRM.noteName}）
        </a>
        で公開します。
      </p>

      {related.length > 0 && (
        <aside className="mt-16 border-t border-border pt-12">
          <h2 className="text-[11px] tracking-[0.32em] text-brand">RELATED</h2>
          <p className="mt-2 text-sm text-primary">同じ分野の記事</p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
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
                  />
                  <p className="mt-3 text-sm leading-7 group-hover:text-primary">{c.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="mt-12">
        <Link to="/column" className="text-sm text-primary underline underline-offset-8">
          コラム一覧へ戻る
        </Link>
      </div>
    </article>
  );
}
