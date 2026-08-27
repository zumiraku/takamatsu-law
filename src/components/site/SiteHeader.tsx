import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { NAV } from "@/lib/nav";
import { FIRM } from "@/lib/firm";
import logo from "@/assets/takamatsu-logo.jpg";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
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
            "border-b backdrop-blur-md transition-[height,background,box-shadow] duration-500",
            scrolled
              ? "border-border/80 bg-background/90 shadow-soft"
              : "border-transparent bg-background/70",
          )}
        >
          <a href="#main" className="skip-link">
            本文へスキップ
          </a>
          <div className={cn("container-page flex items-center justify-between gap-4", barHeight)}>
            <Link to="/" className="min-w-0 shrink" onClick={() => setOpen(false)}>
              <img
                src={logo}
                alt={FIRM.name}
                width={330}
                height={72}
                decoding="async"
                className={cn(
                  "w-auto max-w-[min(100%,16rem)] object-contain object-left transition-[height] duration-500",
                  scrolled ? "h-8 md:h-10" : "h-10 md:h-12",
                )}
              />
            </Link>

            <nav className="hidden items-center gap-8 xl:flex" aria-label="メインナビゲーション">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-link text-[13px] tracking-wide text-foreground/75 transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-[13px] text-primary-foreground transition-all duration-300 hover:translate-y-[-1px] hover:opacity-90"
              >
                <Phone className="size-3.5" aria-hidden />
                相談のご予約
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex size-11 items-center justify-center border border-border text-primary transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-surface xl:hidden"
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

      <div className="xl:hidden">
        <button
          type="button"
          tabIndex={-1}
          aria-hidden={!open}
          aria-label="メニューを閉じる"
          onClick={() => setOpen(false)}
          className={cn(
            "fixed inset-0 z-[70] bg-primary/25 backdrop-blur-[2px] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
        <nav
          id="mobile-nav"
          data-open={open ? "true" : "false"}
          aria-hidden={!open}
          inert={!open ? true : undefined}
          className={cn(
            "menu-sheet fixed inset-y-0 right-0 z-[75] flex h-dvh w-[min(100%,20.5rem)] flex-col border-l border-border/80 bg-background/95 shadow-soft backdrop-blur-md transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "origin-right",
            panelPad,
            open
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none translate-x-full opacity-0",
          )}
        >
          <p className="shrink-0 px-5 pt-5 text-[10px] tracking-[0.35em] text-brand">MENU</p>
          <ul className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 pb-2 pt-1">
            {NAV.map((item) => (
              <li key={item.to} className="menu-sheet-item">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 text-[15px] tracking-wide text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="menu-sheet-item">
              <Link
                to="/news"
                onClick={() => setOpen(false)}
                className="block px-3 py-3 text-[15px] tracking-wide text-foreground transition-colors hover:text-primary"
              >
                お知らせ
              </Link>
            </li>
            <li className="menu-sheet-item mt-auto border-t border-border/80 px-3 py-5">
              <a href={FIRM.telReserveHref} className="block text-sm tracking-wide text-primary">
                相談予約 {FIRM.telReserve}
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 block bg-primary px-4 py-3 text-center text-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                来所予約のご連絡
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
