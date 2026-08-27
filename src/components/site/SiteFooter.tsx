import { Link } from "@tanstack/react-router";
import { NAV } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-serif text-lg tracking-[0.12em] text-primary">高松法律事務所</p>
          <p className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground">
            TAKAMATSU LAW OFFICE
          </p>
          <address className="mt-6 text-sm not-italic leading-8 text-muted-foreground">
            〒760-0033 香川県高松市丸の内○-○ ○○ビル4階
            <br />
            TEL 087-000-0000（受付 平日 9:00–18:00）
            <br />
            香川県弁護士会所属
          </address>
        </div>

        <nav aria-label="フッターナビゲーション">
          <ul className="grid grid-cols-2 gap-y-3 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary">
                ホーム
              </Link>
            </li>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-primary">
                お問い合わせ
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                プライバシーポリシー
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="container-page py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} 高松法律事務所
        </p>
      </div>
    </footer>
  );
}
