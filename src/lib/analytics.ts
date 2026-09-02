declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** 記事ページの閲覧。GA4 があればイベント、未設定でも dataLayer に残る。 */
export function trackArticleView(slug: string, title: string, category: string) {
  const payload = {
    event: "article_view",
    article_id: slug,
    article_title: title,
    article_category: category,
  };
  const w = window;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(payload);
  w.gtag?.("event", "article_view", {
    article_id: slug,
    article_title: title,
    article_category: category,
  });
}
