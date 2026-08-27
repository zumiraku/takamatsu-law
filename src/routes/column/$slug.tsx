import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/PageHero";
import { getColumn, formatDate } from "@/lib/columns";

export const Route = createFileRoute("/column/$slug")({
  loader: ({ params }) => {
    const column = getColumn(params.slug);
    if (!column) throw notFound();
    return { column };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "記事が見つかりません｜高松法律事務所" }, { name: "robots", content: "noindex" }] };
    }
    const { column } = loaderData;
    const title = `${column.title}｜高松法律事務所`;
    return {
      meta: [
        { title },
        { name: "description", content: column.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: column.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/column/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/column/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: column.title,
            datePublished: column.date,
            author: { "@type": "Organization", name: "高松法律事務所" },
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
      <Link to="/column" className="mt-6 inline-block text-sm text-primary underline underline-offset-8">
        コラム一覧へ戻る
      </Link>
    </div>
  );
}

function ColumnDetail() {
  const { column } = Route.useLoaderData();

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
          <span className="text-xs tracking-widest text-muted-foreground">
            {formatDate(column.date)}
          </span>
          <span className="border border-gold/40 px-3 py-0.5 text-xs text-gold">
            {column.category}
          </span>
        </div>

        <h1 className="mt-5 text-2xl leading-[1.7] md:text-3xl">{column.title}</h1>

        <div className="mt-12 space-y-7 border-t border-border pt-12 text-[15px] leading-9 text-foreground/85">
          {column.body.map((p) => (
            <p key={p.slice(0, 16)}>{p}</p>
          ))}
        </div>

        <p className="mt-12 border-l-2 border-gold bg-surface p-6 text-sm leading-8 text-muted-foreground">
          本コラムは一般的な情報提供を目的としたものであり、個別の事案についての法的助言ではありません。具体的な対応は、事案の内容によって異なります。
        </p>

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
