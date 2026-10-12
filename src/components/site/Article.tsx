import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Block, Column } from "@/lib/columns";
import { categorySlug, formatDate } from "@/lib/columns";
import { trackEvent } from "@/lib/analytics";
import { FIRM } from "@/lib/firm";
import { cn } from "@/lib/utils";

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  let h = 0;
  return (
    <div className="article-body">
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          h += 1;
          return (
            <h2 key={`h-${i}`} id={`sec-${h}`}>
              {b.text}
            </h2>
          );
        }
        if (b.type === "list") {
          return (
            <ul key={`l-${i}`}>
              {b.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (b.type === "quote") {
          return (
            <blockquote key={`q-${i}`}>
              <p>{b.text}</p>
              {b.cite && <cite>{b.cite}</cite>}
            </blockquote>
          );
        }
        return <p key={`p-${i}`}>{b.text}</p>;
      })}
    </div>
  );
}

export function KeyPoints({ items }: { items: string[] }) {
  return (
    <aside className="border-l-2 border-brand bg-surface px-6 py-7 md:px-8">
      <p className="text-[11px] tracking-[0.3em] text-brand">SUMMARY</p>
      <p className="mt-2 text-base text-primary">この記事の要点</p>
      <ul className="mt-5 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex gap-3 text-[15px] leading-8 text-foreground/80">
            <span aria-hidden className="mt-3 size-1.5 shrink-0 rotate-45 bg-brand/70" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function TableOfContents({
  items,
  className,
  sticky = false,
}: {
  items: { id: string; text: string }[];
  className?: string;
  sticky?: boolean;
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (!sticky || items.length === 0) return;
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items, sticky]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="目次"
      className={cn(sticky ? "sticky top-28" : "border border-border p-6", className)}
    >
      <p className="text-[11px] tracking-[0.3em] text-brand">CONTENTS</p>
      <p className="mt-2 text-sm text-primary">目次</p>
      <ol className="mt-4 space-y-3">
        {items.map((i, n) => (
          <li key={i.id} className="flex gap-3">
            <span className="font-serif text-[11px] leading-7 text-brand/70">
              {String(n + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${i.id}`}
              className={cn(
                "text-[13.5px] leading-7 transition-colors hover:text-primary",
                sticky && active === i.id ? "text-primary" : "text-muted-foreground",
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ShareRow({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${FIRM.siteUrl}${path}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent("share_click", { method: "copy", article_path: path });
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  const cls =
    "light-pass inline-flex items-center justify-center border border-border px-5 py-2.5 text-xs tracking-wider text-muted-foreground transition-colors hover:border-brand hover:text-brand";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-[11px] tracking-[0.3em] text-brand">SHARE</span>
      <a
        className={cls}
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("share_click", { method: "x", article_path: path })}
      >
        X で共有
      </a>
      <a
        className={cls}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("share_click", { method: "facebook", article_path: path })}
      >
        Facebook で共有
      </a>
      <button type="button" className={cls} onClick={copy}>
        {copied ? "コピーしました" : "URL をコピー"}
      </button>
    </div>
  );
}

export function ArticleNav({
  newer,
  older,
}: {
  newer?: Column | undefined;
  older?: Column | undefined;
}) {
  if (!newer && !older) return null;
  return (
    <nav
      aria-label="記事の移動"
      className="grid gap-px border-y border-border bg-border sm:grid-cols-2"
    >
      {[
        { item: older, label: "前の記事", align: "text-left" },
        { item: newer, label: "次の記事", align: "sm:text-right" },
      ].map(({ item, label, align }) =>
        item ? (
          <Link
            key={label}
            to="/column/$slug"
            params={{ slug: item.slug }}
            className={cn("group bg-background p-7 transition-colors hover:bg-surface", align)}
          >
            <p className="text-[11px] tracking-[0.28em] text-brand">{label}</p>
            <p className="mt-3 text-sm leading-7 transition-colors group-hover:text-primary">
              {item.title}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{formatDate(item.date)}</p>
          </Link>
        ) : (
          <span key={label} className="bg-background p-7" aria-hidden />
        ),
      )}
    </nav>
  );
}

export function ArticleBreadcrumb({ column }: { column: Column }) {
  return (
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
      <Link
        to="/column/category/$slug"
        params={{ slug: categorySlug(column.category) }}
        className="transition-colors hover:text-primary"
      >
        {column.category}
      </Link>
    </nav>
  );
}
