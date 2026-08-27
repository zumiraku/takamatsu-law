import { columns } from "./columns";
import { PRACTICES } from "./practices";

/**
 * 現行URL → 新URL。移行時のSEO評価を引き継ぐための 301 用マップ。
 * パスは先頭スラッシュ付き、末尾スラッシュなしで正規化する。
 */
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
  return map;
}

const MAP = buildMap();

export function normalizePath(pathname: string) {
  let path = pathname;
  try {
    path = decodeURIComponent(pathname);
  } catch {
    /* keep as-is */
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
