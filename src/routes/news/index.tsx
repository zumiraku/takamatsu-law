import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { news } from "@/lib/news";
import { formatDate } from "@/lib/columns";
import { FIRM, pageTitle } from "@/lib/firm";
import { seoMeta } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const Route = createFileRoute("/news/")({
  head: () =>
    seoMeta({
      title: pageTitle("お知らせ"),
      description: `${FIRM.name}からのお知らせ。休業、相談料の改定など。`,
      path: "/news",
    }),
  component: NewsIndex,
});

function NewsIndex() {
  return (
    <>
      <PageHero
        title="お知らせ"
        en="NEWS"
        image={IMG.sea}
        imageAlt="瀬戸内海"
        lead="事務所からのご案内です。法律情報はコラムをご覧ください。"
      />
      <section className="container-page py-16 md:py-24">
        <ul className="divide-y divide-border border-y border-border">
          {news.map((n) => (
            <li key={n.slug}>
              <Link
                to="/news/$slug"
                params={{ slug: n.slug }}
                className="flex flex-col gap-2 py-7 hover:bg-surface md:flex-row md:items-baseline md:gap-10"
              >
                <time dateTime={n.date} className="text-xs tracking-widest text-muted-foreground">
                  {formatDate(n.date)}
                </time>
                <span className="text-base leading-8">{n.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
