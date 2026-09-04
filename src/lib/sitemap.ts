import { CATEGORIES, columns, columnsInCategory } from "./columns";
import { news } from "./news";
import { FIRM } from "./firm";

type Entry = {
  path: string;
  lastmod?: string | undefined;
  priority: string;
  changefreq: string;
};

/**
 * sitemap.xml の中身。コラムやお知らせを足せば自動で反映されるよう、
 * 静的ファイルではなくデータから組み立てる（src/server.ts が配信する）。
 */
export function sitemapEntries(): Entry[] {
  const latestColumn = columns.reduce((a, c) => (c.date > a ? c.date : a), "");
  const latestNews = news.reduce((a, n) => (n.date > a ? n.date : a), "");

  const entries: Entry[] = [
    { path: "/", lastmod: latestColumn, priority: "1.0", changefreq: "weekly" },
    { path: "/column", lastmod: latestColumn, priority: "0.9", changefreq: "weekly" },
    { path: "/publishing", priority: "0.8", changefreq: "yearly" },
    { path: "/about", priority: "0.8", changefreq: "yearly" },
    { path: "/lawyers", priority: "0.8", changefreq: "yearly" },
    { path: "/practice", priority: "0.8", changefreq: "yearly" },
    { path: "/fees", priority: "0.8", changefreq: "yearly" },
    { path: "/flow", priority: "0.8", changefreq: "yearly" },
    { path: "/faq", priority: "0.7", changefreq: "yearly" },
    { path: "/news", lastmod: latestNews, priority: "0.6", changefreq: "monthly" },
    { path: "/contact", priority: "0.6", changefreq: "yearly" },
    { path: "/privacy", priority: "0.3", changefreq: "yearly" },
    { path: "/sitemap", priority: "0.3", changefreq: "yearly" },
  ];

  for (const c of CATEGORIES) {
    const posts = columnsInCategory(c.name);
    entries.push({
      path: `/column/category/${c.slug}`,
      lastmod: posts[0]?.date,
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  for (const c of [...columns].sort((a, b) => (a.date < b.date ? 1 : -1))) {
    entries.push({
      path: `/column/${c.slug}`,
      lastmod: c.updated ?? c.date,
      priority: "0.7",
      changefreq: "yearly",
    });
  }

  for (const n of news) {
    entries.push({
      path: `/news/${n.slug}`,
      lastmod: n.date,
      priority: "0.4",
      changefreq: "yearly",
    });
  }

  return entries;
}

export function buildSitemapXml() {
  const body = sitemapEntries()
    .map((e) => {
      const loc = e.path === "/" ? `${FIRM.siteUrl}/` : `${FIRM.siteUrl}${e.path}`;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : "",
        `    <changefreq>${e.changefreq}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}
