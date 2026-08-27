import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { NAV, FOOTER_EXTRA } from "@/lib/nav";
import { columns } from "@/lib/columns";
import { news } from "@/lib/news";
import { pageTitle } from "@/lib/firm";
import { seoMeta } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const Route = createFileRoute("/sitemap")({
  head: () =>
    seoMeta({
      title: pageTitle("サイトマップ"),
      description: "高松総合法律事務所ウェブサイトのページ一覧です。",
      path: "/sitemap",
    }),
  component: Sitemap,
});

function Sitemap() {
  return (
    <>
      <PageHero title="サイトマップ" en="SITEMAP" image={IMG.sea} imageAlt="" />
      <section className="container-page grid gap-16 py-20 md:grid-cols-2 md:py-28">
        <div>
          <h2 className="text-lg">ページ</h2>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary">
                ホーム
              </Link>
            </li>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
            {FOOTER_EXTRA.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg">コラム</h2>
          <ul className="mt-6 space-y-3 text-sm">
            {columns.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/column/$slug"
                  params={{ slug: c.slug }}
                  className="text-muted-foreground hover:text-primary"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-12 text-lg">お知らせ</h2>
          <ul className="mt-6 space-y-3 text-sm">
            {news.map((n) => (
              <li key={n.slug}>
                <Link
                  to="/news/$slug"
                  params={{ slug: n.slug }}
                  className="text-muted-foreground hover:text-primary"
                >
                  {n.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
