import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getNews } from "@/lib/news";
import { formatDate } from "@/lib/columns";
import { FIRM, pageTitle } from "@/lib/firm";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const item = getNews(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: pageTitle("お知らせが見つかりません") },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { item } = loaderData;
    const title = `${item.title}｜${FIRM.name}`;
    const path = `/news/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: item.body[0] },
        { property: "og:title", content: title },
        { property: "og:description", content: item.body[0] },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${FIRM.siteUrl}${path}` },
      ],
      links: [{ rel: "canonical", href: path }],
    };
  },
  notFoundComponent: NewsNotFound,
  component: NewsDetail,
});

function NewsNotFound() {
  return (
    <div className="container-page py-32 text-center">
      <h1 className="text-2xl">お知らせが見つかりません</h1>
      <Link
        to="/news"
        className="mt-6 inline-block text-sm text-primary underline underline-offset-8"
      >
        お知らせ一覧へ戻る
      </Link>
    </div>
  );
}

function NewsDetail() {
  const { item } = Route.useLoaderData();

  return (
    <article className="container-page max-w-3xl py-16 md:py-24">
      <nav aria-label="パンくず" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          ホーム
        </Link>
        <span className="mx-2">/</span>
        <Link to="/news" className="hover:text-primary">
          お知らせ
        </Link>
      </nav>
      <time
        dateTime={item.date}
        className="mt-8 block text-xs tracking-widest text-muted-foreground"
      >
        {formatDate(item.date)}
      </time>
      <h1 className="mt-4 text-2xl leading-[1.7] md:text-3xl">{item.title}</h1>
      <div className="mt-12 space-y-6 border-t border-border pt-12 text-[15px] leading-9 text-foreground/85">
        {item.body.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </div>
      <div className="mt-12">
        <Link to="/news" className="text-sm text-primary underline underline-offset-8">
          お知らせ一覧へ戻る
        </Link>
      </div>
    </article>
  );
}
