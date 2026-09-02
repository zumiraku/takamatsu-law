import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { FrameImg } from "@/components/site/Decor";
import { columnsByDate, COLUMN_CATEGORIES, formatDate, readingMinutes } from "@/lib/columns";
import { FIRM, pageTitle } from "@/lib/firm";
import { seoMeta } from "@/lib/seo";
import { CATEGORY_IMG, IMG } from "@/lib/media";

export const Route = createFileRoute("/column/")({
  head: () =>
    seoMeta({
      title: pageTitle("コラム"),
      description: `${FIRM.name}の情報発信。交通事故、相続、離婚、投資・消費者被害など、実務に即した論考を公開しています。正規の掲載場所はこのサイトです。`,
      path: "/column",
    }),
  component: ColumnIndex,
});

function ColumnIndex() {
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
        lead="事務所の考えを、論考として残しています。個別の事案についての助言ではありません。"
      />

      <section className="container-page py-16 md:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] tracking-[0.32em] text-brand">PUBLISHING</p>
          <p className="mt-4 text-sm leading-8 text-muted-foreground">
            コラムは当事務所の情報発信の中心です。全文の正規URLはこのサイトに置きます。
          </p>
        </div>

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
