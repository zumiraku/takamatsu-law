import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV } from "@/lib/nav";
import { FIRM } from "@/lib/firm";
import logo from "@/assets/takamatsu-logo.jpg";
import { cn } from "@/lib/utils";
import { LogoMark } from "./LogoMark";

const MOBILE_NAV = [
  ...NAV,
  { to: "/news" as const, label: "お知らせ" },
  { to: "/contact" as const, label: "お問い合わせ" },
];
const EASE = "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mode, setMode] = useState<"unknown" | "bar" | "menu">("unknown");
  const measureRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const compact = mode === "menu";
  const wide = mode === "bar";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (wide) setOpen(false);
  }, [wide]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      setMode(el.scrollWidth > el.clientWidth + 1 ? "menu" : "bar");
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);

    const fonts = document.fonts;
    fonts?.ready.then(update);
    fonts?.addEventListener("loadingdone", update);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      fonts?.removeEventListener("loadingdone", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const barHeight = scrolled ? "h-16 md:h-[4.5rem]" : "h-[4.5rem] md:h-24";
  const panelPad = scrolled ? "pt-16 md:pt-[4.5rem]" : "pt-[4.5rem] md:pt-24";

  return (
    <>
      <header className="sticky top-0 z-[80]">
        <div
          className={cn(
            "border-b backdrop-blur-md",
            "transition-[height,background-color,border-color,box-shadow]",
            EASE,
            barHeight,
            scrolled
              ? "border-border/80 bg-background/90 shadow-soft"
              : "border-transparent bg-background/70",
          )}
        >
          <a href="#main" className="skip-link">
            本文へスキップ
          </a>
          <div className="container-page relative flex h-full items-center justify-between gap-4">
            <div
              ref={measureRef}
              aria-hidden
              inert
              className="pointer-events-none invisible absolute inset-x-0 top-0 flex h-px items-center justify-between gap-4 overflow-hidden whitespace-nowrap"
            >
              <img
                src={logo}
                alt=""
                width={330}
                height={72}
                className="h-10 w-auto shrink-0 md:h-12"
              />
              <div className="flex shrink-0 items-center gap-8">
                {NAV.map((item) => (
                  <span key={item.to} className="text-[13px] tracking-wide">
                    {item.label}
                  </span>
                ))}
                <span className="text-[13px] tracking-wide">お問い合わせ</span>
              </div>
            </div>

            <Link to="/" className="min-w-0 shrink" onClick={() => setOpen(false)}>
              <img
                src={logo}
                alt={FIRM.name}
                width={330}
                height={72}
                decoding="async"
                className={cn(
                  "w-auto max-w-[min(100%,16rem)] object-contain object-left",
                  "transition-[height]",
                  EASE,
                  scrolled ? "h-8 md:h-10" : "h-10 md:h-12",
                )}
              />
            </Link>

            <nav
              className={cn(
                "items-center",
                mode === "unknown" && "hidden lg:flex",
                wide && "flex",
                compact && "hidden",
                "transition-[gap]",
                EASE,
                scrolled ? "gap-6" : "gap-8",
              )}
              aria-label="メインナビゲーション"
            >
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "nav-link tracking-wide text-foreground/75 transition-[color,font-size,letter-spacing] hover:text-primary",
                    EASE,
                    scrolled ? "text-[12px] tracking-wider" : "text-[13px]",
                  )}
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className={cn(
                  "nav-link tracking-wide text-foreground/75 transition-[color,font-size,letter-spacing] hover:text-primary",
                  EASE,
                  scrolled ? "text-[12px] tracking-wider" : "text-[13px]",
                )}
              >
                お問い合わせ
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className={cn(
                "light-pass inline-flex items-center justify-center border text-primary",
                mode === "unknown" && "lg:hidden",
                wide && "hidden",
                compact && "inline-flex",
                "transition-[width,height,background-color,border-color,color,transform]",
                EASE,
                scrolled ? "size-10" : "size-11",
                open
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-surface",
              )}
            >
              <span className={cn("menu-toggle-bars", open && "is-open")} aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className={cn(mode === "unknown" && "lg:hidden", wide && "hidden")}>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden={!open}
          aria-label="メニューを閉じる"
          onClick={() => setOpen(false)}
          className={cn(
            "fixed inset-0 z-[70] bg-primary/25 backdrop-blur-[2px] transition-opacity",
            EASE,
            open ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
        <nav
          id="mobile-nav"
          data-open={open ? "true" : "false"}
          aria-hidden={!open}
          inert={!open ? true : undefined}
          className={cn(
            "menu-sheet fixed inset-y-0 right-0 z-[75] flex h-dvh w-[min(100%,20.5rem)] flex-col border-l border-border/80 bg-background/95 shadow-soft backdrop-blur-md transition-[opacity,transform,padding-top]",
            EASE,
            "origin-right",
            panelPad,
            open
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none translate-x-full opacity-0",
          )}
        >
          <div className="flex items-center gap-3 px-5 pt-6">
            <LogoMark className="size-7" />
            <p className="text-[10px] tracking-[0.35em] text-brand">MENU</p>
          </div>
          <ul className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 pb-2 pt-4">
            {MOBILE_NAV.map((item, i) => (
              <li key={item.to} className="menu-sheet-item">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-baseline gap-4 px-3 py-3.5 text-[15px] tracking-wide transition-colors hover:text-primary",
                    pathname === item.to ? "text-primary" : "text-foreground",
                  )}
                >
                  <span className="font-serif text-[11px] tracking-[0.22em] text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="menu-sheet-item mt-auto border-t border-border/80 px-3 py-5">
              <p className="text-[10px] tracking-[0.28em] text-muted-foreground">JOURNAL</p>
              <Link
                to="/column"
                onClick={() => setOpen(false)}
                className="light-pass mt-5 block bg-primary px-4 py-3 text-center text-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                コラムを読む
              </Link>
              <a
                href={FIRM.note}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-center text-[11px] tracking-[0.22em] text-brand"
              >
                NOTE
              </a>
              <p className="mt-4 text-[11px] tracking-wide text-muted-foreground">
                {FIRM.hours}
                <br />
                代表 {FIRM.telMain}
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
