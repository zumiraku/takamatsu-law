import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { FrameImg } from "@/components/site/Decor";
import { columnsByDate, COLUMN_CATEGORIES, formatDate, readingMinutes } from "@/lib/columns";
import { FIRM, pageTitle } from "@/lib/firm";
import { seoMeta } from "@/lib/seo";
import { fetchNotePosts, formatNotePrice } from "@/lib/note";
import { CATEGORY_IMG, IMG } from "@/lib/media";

export const Route = createFileRoute("/column/")({
  loader: async () => ({ notes: await fetchNotePosts(6) }),
  head: () =>
    seoMeta({
      title: pageTitle("コラム"),
      description: `${FIRM.name}の情報発信。実務に即した論考は本サイトに全文を置き、有料を含む抄録は note で公開します。`,
      path: "/column",
    }),
  component: ColumnIndex,
});

function ColumnIndex() {
  const { notes } = Route.useLoaderData();
  const [cat, setCat] = useState<string>("すべて");
  const list =
    cat === "すべて" ? columnsByDate : columnsByDate.filter((c) => c.category === cat);

  return (
    <>
      <PageHero
        title="コラム"
        en="JOURNAL"
        image={IMG.scales}
        imageAlt="法律書"
        lead="事務所の考えを、論考として残しています。全文はここに置き、有料を含む抄録は note で公開します。個別の事案についての助言ではありません。"
      />

      <section className="container-page py-16 md:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] tracking-[0.32em] text-brand">PUBLISHING</p>
          <p className="mt-4 text-sm leading-8 text-muted-foreground">
            コラムは当事務所の情報発信の中心です。同じ文章を複数の場所に置くと評価が分かれるため、全文の正規URLはこのサイトに置きます。note（
            {FIRM.noteName}）では抄録と有料記事を公開し、スキ数を見ながら販売を検討します。
          </p>
        </div>

        {notes.length > 0 && (
          <div className="mb-16">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] tracking-[0.32em] text-brand">NOTE</p>
                <h2 className="mt-2 text-xl">note での発信</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  公開中の記事です。スキは反応の目安、有料は販売中の記事です。
                </p>
              </div>
              <a
                href={FIRM.note}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary underline underline-offset-8"
              >
                {FIRM.noteName} の note
              </a>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noreferrer"
                    className="light-pass group block overflow-hidden border border-border bg-card"
                  >
                    {n.eyecatch ? (
                      <img
                        src={n.eyecatch}
                        alt=""
                        className="aspect-[16/9] w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-[16/9] bg-surface" />
                    )}
                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <time dateTime={n.publishedAt}>{formatDate(n.publishedAt)}</time>
                        {n.paid && n.price != null && (
                          <span className="border border-brand/35 px-2 py-0.5 text-brand">
                            {formatNotePrice(n.price)}
                          </span>
                        )}
                        <span>スキ {n.likeCount.toLocaleString("ja-JP")}</span>
                      </div>
                      <h3 className="mt-3 text-[15px] leading-7 group-hover:text-primary">
                        {n.title}
                      </h3>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {["すべて", ...COLUMN_CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={
                cat === c
                  ? "light-pass border border-primary bg-primary px-4 py-2 text-xs text-primary-foreground"
                  : "light-pass border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-brand hover:text-brand"
              }
            >
              {c}
              {c !== "すべて" && (
                <span className="ml-2 opacity-60">
                  {columnsByDate.filter((x) => x.category === c).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {list.map((c) => (
            <li key={c.slug}>
              <Link
                to="/column/$slug"
                params={{ slug: c.slug }}
                className="light-pass group block overflow-hidden border border-transparent transition-colors hover:border-border"
              >
                <FrameImg
                  src={CATEGORY_IMG[c.category] ?? IMG.scales}
                  alt=""
                  className="aspect-[16/9]"
                />
                <div className="py-5">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-xs tracking-widest text-muted-foreground">
                      {formatDate(c.date)}
                    </span>
                    <span className="border border-brand/35 px-3 py-0.5 text-xs text-brand">
                      {c.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{readingMinutes(c)}分</span>
                  </div>
                  <h2 className="mt-3 text-lg leading-8 group-hover:text-primary">{c.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {list.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            このカテゴリの記事はまだありません。
          </p>
        )}
      </section>
    </>
  );
}
