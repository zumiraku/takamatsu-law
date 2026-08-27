import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV } from "@/lib/nav";
import { FIRM } from "@/lib/firm";
import logo from "@/assets/takamatsu-logo.jpg";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-[height,background,box-shadow] duration-500",
        scrolled
          ? "border-border/80 bg-background/90 shadow-soft"
          : "border-transparent bg-background/70",
      )}
    >
      <a href="#main" className="skip-link">
        本文へスキップ
      </a>
      <div
        className={cn(
          "container-page flex items-center justify-between gap-4 transition-[height] duration-500",
          scrolled ? "h-16 md:h-[4.5rem]" : "h-[4.5rem] md:h-24",
        )}
      >
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
          className="inline-flex size-11 items-center justify-center border border-border text-primary transition-colors hover:bg-surface xl:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto border-t border-border bg-background/98 backdrop-blur md:top-24 xl:hidden"
        >
          <ul className="container-page divide-y divide-border py-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-5 text-base tracking-wide text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/news"
                onClick={() => setOpen(false)}
                className="block py-5 text-base tracking-wide text-foreground"
              >
                お知らせ
              </Link>
            </li>
            <li className="py-6">
              <a href={FIRM.telReserveHref} className="block text-center text-sm text-primary">
                相談予約 {FIRM.telReserve}
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 block bg-primary px-5 py-3.5 text-center text-sm text-primary-foreground"
              >
                来所予約のご連絡
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
