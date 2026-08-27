import { FIRM, DEFAULT_DESCRIPTION, SITE_TITLE } from "@/lib/firm";

export function jsonLdLegalService() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: FIRM.name,
    url: FIRM.siteUrl,
    image: `${FIRM.siteUrl}/og.jpg`,
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
    sameAs: [FIRM.facebook],
  };
}

export function seoMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description?: string;
  path: string;
  type?: string;
}) {
  const desc = description ?? DEFAULT_DESCRIPTION;
  const url = path === "/" ? FIRM.siteUrl : `${FIRM.siteUrl}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:locale", content: "ja_JP" },
      { property: "og:site_name", content: FIRM.name },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}

export { SITE_TITLE };
