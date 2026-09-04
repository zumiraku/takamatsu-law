declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * 計測設計。
 *
 * どのコラムが読まれ、どこまで読み進められたかを見るための最小限のイベント。
 * 「表示されただけ」と「最後まで読まれた」を分けて取ることで、note で展開する
 * 主題を選ぶときの判断材料になる。GA4 の測定IDは src/lib/firm.ts で設定する。
 */
export type AnalyticsParams = Record<string, string | number | boolean>;

export function trackEvent(event: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  const w = window;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
  w.gtag?.("event", event, params);
}

/** 記事ページの閲覧。 */
export function trackArticleView(slug: string, title: string, category: string) {
  trackEvent("article_view", {
    article_id: slug,
    article_title: title,
    article_category: category,
  });
}

/** 読了率（50% / 90%）。同一表示につき一度だけ送る。 */
export function trackArticleProgress(slug: string, category: string, percent: 50 | 90) {
  trackEvent("article_progress", {
    article_id: slug,
    article_category: category,
    percent,
  });
}

/** note など外部への遷移。どの記事からの流出かを残す。 */
export function trackOutbound(destination: string, context: string) {
  trackEvent("outbound_click", { destination, context });
}
