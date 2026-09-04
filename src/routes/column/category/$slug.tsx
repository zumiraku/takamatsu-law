import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FrameImg } from "@/components/site/Decor";
import { Reveal } from "@/components/site/Reveal";
import {
  CATEGORIES,
  categoryBySlug,
  columnsInCategory,
  formatDate,
  readingMinutes,
} from "@/lib/columns";
import { FIRM, pageTitle } from "@/lib/firm";
import { jsonLdBreadcrumb, seoMeta } from "@/lib/seo";
import { CATEGORY_IMG, IMG } from "@/lib/media";

export const Route = createFileRoute("/column/category/$slug")({
  loader: ({ params }) => {
    const meta = categoryBySlug(params.slug);
    if (!meta) throw notFound();
    return { meta, posts: columnsInCategory(meta.name) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: pageTitle("カテゴリーが見つかりません") },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { meta, posts } = loaderData;
    const seo = seoMeta({
      title: pageTitle(`${meta.name}のコラム`),
      description: `${meta.lead}${FIRM.name}が公開している${meta.name}のコラム（${posts.length}件）。`,
      path: `/column/category/${params.slug}`,
    });
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "ホーム", path: "/" },
              { name: "コラム", path: "/column" },
              { name: meta.name, path: `/column/category/${params.slug}` },
            ]),
          ),
        },
      ],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: CategoryArchive,
});

function CategoryNotFound() {
  return (
    <div className="container-page py-32 text-center">
      <h1 className="text-2xl">カテゴリーが見つかりません</h1>
      <Link
        to="/column"
        className="mt-6 inline-block text-sm text-primary underline underline-offset-8"
      >
        コラム一覧へ戻る
      </Link>
    </div>
  );
}

function CategoryArchive() {
  const { meta, posts } = Route.useLoaderData();
  const others = CATEGORIES.filter((c) => c.slug !== meta.slug);

  return (
    <>
      <PageHero
        title={meta.name}
        en={meta.en}
        image={CATEGORY_IMG[meta.name] ?? IMG.scales}
        imageAlt=""
        lead={meta.lead}
      />

      <section className="container-page py-16 md:py-24">
        <nav aria-label="パンくず" className="text-xs text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-primary">
            ホーム
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <Link to="/column" className="transition-colors hover:text-primary">
            コラム
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span>{meta.name}</span>
        </nav>

        <p className="mt-8 text-sm text-muted-foreground">
          {meta.name}のコラム <span className="text-brand">{posts.length}</span> 件
        </p>

        <ul className="mt-8 divide-y divide-border border-y border-border">
          {posts.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 50}>
                <Link
                  to="/column/$slug"
                  params={{ slug: c.slug }}
                  className="group grid gap-5 py-8 transition-colors hover:bg-surface md:grid-cols-[14rem_1fr] md:gap-10 md:px-2"
                >
                  <FrameImg
                    src={CATEGORY_IMG[c.category] ?? IMG.scales}
                    alt=""
                    className="aspect-[16/10]"
                    sizes="(min-width: 768px) 14rem, 100vw"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-4">
                      <time
                        dateTime={c.date}
                        className="text-xs tracking-widest text-muted-foreground"
                      >
                        {formatDate(c.date)}
                      </time>
                      <span className="text-xs text-muted-foreground">
                        読了目安 {readingMinutes(c)}分
                      </span>
                    </div>
                    <h2 className="mt-3 text-lg leading-8 transition-colors group-hover:text-primary">
                      {c.title}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {posts.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            この分野のコラムは、まだ公開していません。
          </p>
        )}
      </section>

      <section className="bg-surface">
        <div className="container-page py-16 md:py-20">
          <p className="text-[11px] tracking-[0.32em] text-brand">OTHER CATEGORIES</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/column/category/$slug"
                  params={{ slug: c.slug }}
                  className="light-pass inline-flex items-center gap-2 border border-border bg-background px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link to="/column" className="text-sm text-primary underline underline-offset-8">
              コラムの一覧へ戻る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
