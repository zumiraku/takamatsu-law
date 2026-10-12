import { FIRM, DEFAULT_DESCRIPTION, SITE_TITLE, isProductionSite } from "@/lib/firm";

export const absoluteUrl = (path: string) =>
  path === "/" ? FIRM.siteUrl : `${FIRM.siteUrl}${path}`;

export function jsonLdLegalService() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${FIRM.siteUrl}/#organization`,
    name: FIRM.name,
    alternateName: FIRM.nameEn,
    url: FIRM.siteUrl,
    image: `${FIRM.siteUrl}/og.jpg`,
    logo: `${FIRM.siteUrl}/logo.jpg`,
    telephone: FIRM.telMainHref.replace("tel:", ""),
    areaServed: ["香川県", "高松市"],
    address: {
      "@type": "PostalAddress",
      postalCode: FIRM.postalCode,
      addressRegion: FIRM.prefecture,
      addressLocality: FIRM.city,
      streetAddress: FIRM.addressLine,
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.3426,
      longitude: 134.048,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    priceRange: "¥¥",
    founder: {
      "@type": "Person",
      name: FIRM.representative,
      jobTitle: "代表弁護士",
    },
    sameAs: FIRM.sameAs.filter(Boolean),
  };
}

export function jsonLdBreadcrumb(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  };
}

export function jsonLdFaq(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function jsonLdBlog(posts: { title: string; path: string; date: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${FIRM.siteUrl}/column#blog`,
    name: `${FIRM.name}のコラム`,
    url: absoluteUrl("/column"),
    inLanguage: "ja",
    publisher: { "@id": `${FIRM.siteUrl}/#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.date,
      url: absoluteUrl(p.path),
    })),
  };
}

export function seoMeta({
  title,
  description,
  path,
  type = "website",
  image,
  noindex = false,
}: {
  title: string;
  description?: string;
  path: string;
  type?: string;
  image?: string;
  noindex?: boolean;
}) {
  const desc = description ?? DEFAULT_DESCRIPTION;
  const url = absoluteUrl(path);
  const img = image ?? `${FIRM.siteUrl}/og.jpg`;
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      {
        name: "robots",
        content: noindex || !isProductionSite ? "noindex,nofollow" : "index,follow",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:locale", content: "ja_JP" },
      { property: "og:site_name", content: FIRM.name },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export { SITE_TITLE };
