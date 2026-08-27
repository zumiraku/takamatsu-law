import { Link } from "@tanstack/react-router";
import { NAV, FOOTER_EXTRA } from "@/lib/nav";
import { FIRM } from "@/lib/firm";
import logo from "@/assets/takamatsu-logo.jpg";
import { IMG } from "@/lib/media";

export function SiteFooter() {
  return (
    <footer className="relative mt-0 overflow-hidden border-t border-border bg-surface">
      <div className="relative h-40 overflow-hidden md:h-56">
        <img
          src={IMG.sea}
          alt=""
          sizes="100vw"
          width={1600}
          height={400}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="media-fill animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] tracking-[0.42em] text-primary/70">
          TAKAMATSU · KAGAWA · SETO INLAND SEA
        </p>
      </div>
      <div className="container-page grid gap-14 py-16 md:grid-cols-[1.3fr_1fr] md:py-20">
        <div>
          <img
            src={logo}
            alt={FIRM.name}
            width={330}
            height={72}
            decoding="async"
            className="h-11 w-auto object-contain object-left"
          />
          <p className="mt-5 max-w-md text-sm leading-8 text-muted-foreground">{FIRM.tagline}</p>
          <address className="mt-8 text-sm not-italic leading-8 text-muted-foreground">
            {FIRM.address}
            <br />
            代表 TEL{" "}
            <a href={FIRM.telMainHref} className="transition-colors hover:text-primary">
              {FIRM.telMain}
            </a>
            <br />
            相談予約 TEL{" "}
            <a href={FIRM.telReserveHref} className="transition-colors hover:text-primary">
              {FIRM.telReserve}
            </a>
            （{FIRM.hours}）
            <br />
            {FIRM.bar}所属
          </address>
          <a
            href={FIRM.facebook}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block text-[11px] tracking-[0.28em] text-brand transition-opacity hover:opacity-70"
          >
            FACEBOOK
          </a>
        </div>

        <nav aria-label="フッターナビゲーション">
          <ul className="grid grid-cols-2 gap-y-3 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
                ホーム
              </Link>
            </li>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {FOOTER_EXTRA.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="container-page py-6 text-xs tracking-wide text-muted-foreground">
          © {new Date().getFullYear()} {FIRM.name}
        </p>
      </div>
    </footer>
  );
}
