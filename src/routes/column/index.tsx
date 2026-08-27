import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, CtaBand } from "@/components/site/PageHero";
import { columns, COLUMN_CATEGORIES, formatDate } from "@/lib/columns";

export const Route = createFileRoute("/column/")({
  head: () => ({
    meta: [
      { title: "コラム｜高松法律事務所" },
      {
        name: "description",
        content:
          "相続、離婚、労働、交通事故、債務整理、企業法務。香川・高松の弁護士が、実務でよくいただくご質問を平易な言葉で解説します。",
      },
      { property: "og:title", content: "コラム｜高松法律事務所" },
      { property: "og:description", content: "香川・高松の弁護士による法律コラム。" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/column" },
    ],
    links: [{ rel: "canonical", href: "/column" }],
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
        lead="ご相談の場でよくいただく質問を、専門用語をできるだけ避けてまとめています。"
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
                  : "border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              }
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {list.map((c) => (
            <li key={c.slug}>
              <Link
                to="/column/$slug"
                params={{ slug: c.slug }}
                className="group block py-8 transition-colors hover:bg-surface"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-xs tracking-widest text-muted-foreground">
                    {formatDate(c.date)}
                  </span>
                  <span className="border border-gold/40 px-3 py-0.5 text-xs text-gold">
                    {c.category}
                  </span>
                </div>
                <h2 className="mt-3 text-lg leading-8 group-hover:text-primary">{c.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.excerpt}</p>
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
