// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/** 本番の公開先。ここが canonical の正としたいドメイン。 */
const PRODUCTION_SITE_URL = "https://takamatsu-law.com";

/**
 * 公開先URLをビルド時に確定させる。
 *
 * canonical・OGP・sitemap・RSS はすべてこの値を基準にする。実行時に
 * リクエストのホスト名から組み立てると、サーバーとブラウザで値がずれて
 * hydration が壊れるので、ビルド時に文字列として埋め込む。
 *
 * 優先順位：
 *   1. SITE_URL / VITE_SITE_URL … 明示指定（本番サーバーではこれを設定する）
 *   2. Vercel が渡すドメイン    … デモを Vercel の URL で自己完結させる
 *   3. 本番ドメイン              … ローカル開発時の既定値
 */
function resolveSiteUrl() {
  const trim = (s: string) => s.replace(/\/+$/, "");

  const explicit = process.env["VITE_SITE_URL"] ?? process.env["SITE_URL"];
  if (explicit) {
    return trim(/^https?:\/\//.test(explicit) ? explicit : `https://${explicit}`);
  }

  // VERCEL_PROJECT_PRODUCTION_URL は本番エイリアス、VERCEL_URL はその回のデプロイURL。
  const vercel = process.env["VERCEL_PROJECT_PRODUCTION_URL"] ?? process.env["VERCEL_URL"];
  if (vercel) return trim(`https://${vercel}`);

  return PRODUCTION_SITE_URL;
}

const siteUrl = resolveSiteUrl();

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    define: {
      "import.meta.env.VITE_SITE_URL": JSON.stringify(siteUrl),
      // 本番ドメイン以外（＝デモや検証用URL）は検索エンジンに載せない。
      "import.meta.env.VITE_IS_PRODUCTION_SITE": JSON.stringify(siteUrl === PRODUCTION_SITE_URL),
    },
  },
});
