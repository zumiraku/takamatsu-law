import { columns, CATEGORIES } from "./columns";
import { PRACTICES } from "./practices";

const STATIC: Record<string, string> = {
  "/office": "/about",
  "/lawyer": "/lawyers",
  "/rate": "/fees",
  "/price": "/fees",
  "/inquiry": "/flow",
  "/reserve": "/contact",
  "/policy": "/privacy",
  "/blog": "/column",
  "/topics": "/news",
  "/consult": "/column",
  "/voice": "/about",
  "/link": "/",
  "/faq.html": "/faq",
  "/note": "/publishing",
  "/column/category": "/column",
};

const OLD_CATEGORY: Record<string, string> = {
  koutujiko: "kotsu-jiko",
  souzoku: "souzoku",
  rikon: "rikon",
  toushihigai: "toshi-higai",
  syohisya: "shohisha-higai",
  "syouhisya-higai": "shohisha-higai",
  "zakkan-sonota": "zakkan",
};

function buildMap() {
  const map = { ...STATIC };
  for (const p of PRACTICES) {
    for (const old of p.oldPaths) {
      map[old] = `/practice#${p.id}`;
    }
  }
  for (const c of columns) {
    for (const old of c.oldPaths) {
      if (old === "/blog") continue;
      map[old] = `/column/${c.slug}`;
    }
  }
  for (const [old, slug] of Object.entries(OLD_CATEGORY)) {
    if (!CATEGORIES.some((c) => c.slug === slug)) continue;
    for (const from of [`/blog/${old}`, `/category/${old}`]) {
      if (!map[from]) map[from] = `/column/category/${slug}`;
    }
  }
  return map;
}

const MAP = buildMap();

export function normalizePath(pathname: string) {
  let path: string;
  try {
    path = decodeURIComponent(pathname);
  } catch {
    path = pathname;
  }
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path;
}

export function matchRedirect(pathname: string): string | null {
  const path = normalizePath(pathname);
  if (MAP[path]) return MAP[path];

  if (path.startsWith("/blog/")) return "/column";
  if (path.startsWith("/topics/")) return "/news";
  if (path.startsWith("/law/")) return "/column";
  if (path.startsWith("/personal/") || path.startsWith("/companies/")) return "/practice";
  if (path.startsWith("/law-cat/")) return "/practice";

  return null;
}
