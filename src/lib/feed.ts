import { columnsByDate, plainText } from "./columns";
import { news } from "./news";
import { FIRM, DEFAULT_DESCRIPTION } from "./firm";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const rfc822 = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  const at = new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1));
  return `${DAYS[at.getUTCDay()]}, ${String(d).padStart(2, "0")} ${MONTHS[(m ?? 1) - 1]} ${y} 00:00:00 +0900`;
};

export function buildFeedXml() {
  const items = [
    ...columnsByDate.map((c) => ({
      title: c.title,
      path: `/column/${c.slug}`,
      date: c.updated ?? c.date,
      category: c.category,
      description: c.excerpt,
      summary: c.summary,
      length: plainText(c).length,
    })),
    ...news.map((n) => ({
      title: n.title,
      path: `/news/${n.slug}`,
      date: n.date,
      category: "お知らせ",
      description: n.body[0] ?? "",
      summary: [] as string[],
      length: n.body.join("").length,
    })),
  ]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 30);

  const body = items
    .map((i) => {
      const url = `${FIRM.siteUrl}${i.path}`;
      const summary = i.summary.length > 0 ? `\n${i.summary.map((s) => `・${s}`).join("\n")}` : "";
      return [
        "    <item>",
        `      <title>${escape(i.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <category>${escape(i.category)}</category>`,
        `      <pubDate>${rfc822(i.date)}</pubDate>`,
        `      <description>${escape(i.description + summary)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escape(FIRM.name)}｜コラム</title>`,
    `    <link>${FIRM.siteUrl}/column</link>`,
    `    <description>${escape(DEFAULT_DESCRIPTION)}</description>`,
    "    <language>ja</language>",
    `    <atom:link href="${FIRM.siteUrl}/feed.xml" rel="self" type="application/rss+xml" />`,
    items[0] ? `    <lastBuildDate>${rfc822(items[0].date)}</lastBuildDate>` : "",
    body,
    "  </channel>",
    "</rss>",
    "",
  ]
    .filter((line) => line !== "")
    .join("\n");
}
