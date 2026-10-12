import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

const PRODUCTION_SITE_URL = "https://takamatsu-law.com";

// canonical / OGP / sitemap はこの値を基準にする。リクエストから組み立てると
// SSR とブラウザで値がずれるので、ビルド時に埋め込む。
function resolveSiteUrl() {
  const trim = (s: string) => s.replace(/\/+$/, "");

  const explicit = process.env["VITE_SITE_URL"] ?? process.env["SITE_URL"];
  if (explicit) {
    return trim(/^https?:\/\//.test(explicit) ? explicit : `https://${explicit}`);
  }

  const vercel = process.env["VERCEL_PROJECT_PRODUCTION_URL"] ?? process.env["VERCEL_URL"];
  if (vercel) return trim(`https://${vercel}`);

  return PRODUCTION_SITE_URL;
}

const siteUrl = resolveSiteUrl();

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    command === "build" && nitro({ defaultPreset: "cloudflare-module" }),
    viteReact(),
  ],
  define: {
    "import.meta.env.VITE_SITE_URL": JSON.stringify(siteUrl),
    "import.meta.env.VITE_IS_PRODUCTION_SITE": JSON.stringify(siteUrl === PRODUCTION_SITE_URL),
  },
  css: { transformer: "lightningcss" },
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: { host: "::", port: 8080 },
}));
