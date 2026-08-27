import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

export const NAV = [
  { to: "/about", label: "事務所案内" },
  { to: "/lawyers", label: "弁護士紹介" },
  { to: "/practice", label: "取扱業務" },
  { to: "/fees", label: "弁護士費用" },
  { to: "/flow", label: "相談までの流れ" },
  { to: "/column", label: "コラム" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link to="/" className="group flex items-baseline gap-3" onClick={() => setOpen(false)}>
          <span className="font-serif text-xl tracking-[0.12em] text-primary">高松法律事務所</span>
          <span className="hidden text-[10px] tracking-[0.3em] text-muted-foreground sm:inline">
            TAKAMATSU LAW OFFICE
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-medium" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Phone className="size-4" aria-hidden />
            相談のご予約
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          className="inline-flex size-10 items-center justify-center border border-border text-primary lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <ul className="container-page divide-y divide-border py-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-sm text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block bg-primary px-5 py-3 text-center text-sm text-primary-foreground"
              >
                相談のご予約・お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
