import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, CtaBand } from "@/components/site/PageHero";
import { FrameImg } from "@/components/site/Decor";
import { columns, COLUMN_CATEGORIES, formatDate } from "@/lib/columns";
import { FIRM, pageTitle } from "@/lib/firm";
import { seoMeta } from "@/lib/seo";
import { CATEGORY_IMG, IMG } from "@/lib/media";

export const Route = createFileRoute("/column/")({
  head: () =>
    seoMeta({
      title: pageTitle("コラム"),
      description: `交通事故、相続、離婚、投資・消費者被害。${FIRM.name}の弁護士が、実務に即した法律情報をお伝えします。`,
      path: "/column",
    }),
  component: ColumnIndex,
});

function ColumnIndex() {
  const [cat, setCat] = useState<string>("すべて");
  const list = cat === "すべて" ? columns : columns.filter((c) => c.category === cat);

  return (
    <>
      <PageHero
        title="コラム"
        en="COLUMN"
        image={IMG.scales}
        imageAlt="法律書"
        lead="サイト本体では基本的なご案内を、コラムではもう少し踏み込んだ法律情報をお伝えします。個別の事案についての助言ではありません。"
      />

      <section className="container-page py-16 md:py-24">
        <div className="flex flex-wrap gap-2">
          {["すべて", ...COLUMN_CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={
                cat === c
                  ? "border border-primary bg-primary px-4 py-2 text-xs text-primary-foreground"
                  : "border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-brand hover:text-brand"
              }
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {list.map((c) => (
            <li key={c.slug}>
              <Link
                to="/column/$slug"
                params={{ slug: c.slug }}
                className="group block overflow-hidden border border-transparent transition-colors hover:border-border"
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

      <CtaBand />
    </>
  );
}
