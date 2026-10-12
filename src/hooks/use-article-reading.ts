import { useEffect } from "react";
import { trackArticleProgress, trackArticleView } from "@/lib/analytics";

export function useArticleReading(
  ref: React.RefObject<HTMLElement | null>,
  article: { slug: string; title: string; category: string },
) {
  const { slug, title, category } = article;

  useEffect(() => {
    trackArticleView(slug, title, category);
  }, [slug, title, category]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sent = new Set<number>();

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const read = Math.min(1, Math.max(0, -rect.top / total));
      for (const mark of [50, 90] as const) {
        if (read * 100 >= mark && !sent.has(mark)) {
          sent.add(mark);
          trackArticleProgress(slug, category, mark);
        }
      }
      if (sent.size === 2) window.removeEventListener("scroll", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, slug, category]);
}
