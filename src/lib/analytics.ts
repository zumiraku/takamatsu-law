declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsParams = Record<string, string | number | boolean>;

export function trackEvent(event: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  const w = window;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
  w.gtag?.("event", event, params);
}

export function trackArticleView(slug: string, title: string, category: string) {
  trackEvent("article_view", {
    article_id: slug,
    article_title: title,
    article_category: category,
  });
}

export function trackArticleProgress(slug: string, category: string, percent: 50 | 90) {
  trackEvent("article_progress", {
    article_id: slug,
    article_category: category,
    percent,
  });
}

export function trackOutbound(destination: string, context: string) {
  trackEvent("outbound_click", { destination, context });
}
