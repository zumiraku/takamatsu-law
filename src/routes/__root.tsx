import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Grain, LightPass } from "@/components/site/Decor";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { SiteScrollbar } from "@/components/site/SiteScrollbar";
import { Toaster } from "@/components/ui/sonner";
import { FIRM, DEFAULT_DESCRIPTION, SITE_TITLE } from "@/lib/firm";
import { LogoMark } from "@/components/site/LogoMark";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <LogoMark className="mx-auto size-14" />
        <p className="mt-8 text-[11px] tracking-[0.38em] text-brand">404</p>
        <h1 className="mt-4 text-2xl">ページが見つかりません</h1>
        <p className="mt-4 text-sm leading-8 text-muted-foreground">
          お探しのページは移動したか、削除された可能性があります。
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="light-pass inline-flex items-center justify-center bg-primary px-6 py-3 text-sm text-primary-foreground"
          >
            ホームへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl tracking-tight text-foreground">ページを表示できませんでした</h1>
        <p className="mt-4 text-sm leading-8 text-muted-foreground">
          申し訳ありません。しばらくしてから再度お試しください。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="light-pass inline-flex items-center justify-center bg-primary px-6 py-3 text-sm text-primary-foreground"
          >
            再読み込み
          </button>
          <Link
            to="/"
            className="light-pass inline-flex items-center justify-center border border-border px-6 py-3 text-sm"
          >
            ホームへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: DEFAULT_DESCRIPTION },
      { property: "og:site_name", content: FIRM.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ja_JP" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "format-detection", content: "telephone=no" },
      { name: "theme-color", content: "#001a4d" },
      // Search Console の所有権確認。src/lib/firm.ts に値を入れると出力される。
      ...(FIRM.searchConsoleToken
        ? [{ name: "google-site-verification", content: FIRM.searchConsoleToken }]
        : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/logo.jpg" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const id = FIRM.gaMeasurementId;
    if (!id || document.getElementById("ga4-src")) return;
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // gtag.js は Arguments オブジェクトをそのまま dataLayer に積むことを前提にしている。
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments as unknown as Record<string, unknown>);
    };
    window.gtag("js", new Date());
    // ページ遷移は下の effect から送るので、自動計測は切っておく（二重計上を避ける）。
    window.gtag("config", id, { send_page_view: false });
    const s = document.createElement("script");
    s.id = "ga4-src";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
  }, []);

  // 画面遷移でページが再読み込みされないため、遷移のたびに page_view を送る。
  useEffect(() => {
    if (!FIRM.gaMeasurementId) return;
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <ScrollProgress />
        <SiteScrollbar />
        <SiteHeader />
        <main id="main" key={pathname} className="page-enter flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <Grain />
      <LightPass />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
