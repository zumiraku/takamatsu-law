import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/PageHero";
import { FrameImg } from "@/components/site/Decor";
import { getColumn, formatDate, columns } from "@/lib/columns";
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
  const related = columns
    .filter((c) => c.category === column.category && c.slug !== column.slug)
    .slice(0, 3);

  return (
    <>
      <article className="container-page max-w-3xl py-16 md:py-24">
        <nav aria-label="パンくず" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            ホーム
          </Link>
          <span className="mx-2">/</span>
          <Link to="/column" className="hover:text-primary">
            コラム
          </Link>
        </nav>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <time dateTime={column.date} className="text-xs tracking-widest text-muted-foreground">
            {formatDate(column.date)}
          </time>
          <span className="border border-brand/35 px-3 py-0.5 text-xs text-brand">
            {column.category}
          </span>
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

        {related.length > 0 && (
          <aside className="mt-16">
            <h2 className="text-sm text-primary">同じ分野の記事</h2>
            <ul className="mt-4 space-y-3">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/column/$slug"
                    params={{ slug: c.slug }}
                    className="text-sm leading-7 hover:text-primary"
                  >
                    {c.title}
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

      <CtaBand />
    </>
  );
}
