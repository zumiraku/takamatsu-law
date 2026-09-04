import { Link } from "@tanstack/react-router";
import { NAV, FOOTER_EXTRA } from "@/lib/nav";
import { FIRM } from "@/lib/firm";
import { NOTE } from "@/lib/note";
import { trackOutbound } from "@/lib/analytics";
import logo from "@/assets/opt/takamatsu-logo.webp";
import logo2x from "@/assets/opt/takamatsu-logo@2x.webp";
import { IMG, srcSetFor } from "@/lib/media";

export function SiteFooter() {
  return (
    <footer className="relative mt-0 overflow-hidden border-t border-border bg-surface">
      <div className="relative h-40 overflow-hidden md:h-56">
        <img
          src={IMG.sea}
          srcSet={srcSetFor(IMG.sea)}
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
            srcSet={`${logo} 1x, ${logo2x} 2x`}
            width={330}
            height={72}
            decoding="async"
            className="h-11 w-auto object-contain object-left"
          />
          <p className="mt-5 max-w-md text-sm leading-8 text-muted-foreground">
            実務に根ざしたコラムを中心に、事務所の考えを発信しています。
          </p>
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
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <a
              href={FIRM.facebook}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] tracking-[0.28em] text-brand transition-opacity hover:opacity-70"
            >
              FACEBOOK
            </a>
            {NOTE.status === "live" && NOTE.accountUrl && (
              <a
                href={NOTE.accountUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackOutbound("note", "footer")}
                className="text-[11px] tracking-[0.28em] text-brand transition-opacity hover:opacity-70"
              >
                NOTE
              </a>
            )}
          </div>
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
