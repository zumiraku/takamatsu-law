import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "お問い合わせ・相談予約｜高松法律事務所" },
      {
        name: "description",
        content:
          "高松法律事務所への法律相談のご予約・お問い合わせはこちらから。お電話（087-000-0000／平日9:00–18:00）でも承ります。",
      },
      { property: "og:title", content: "お問い合わせ・相談予約｜高松法律事務所" },
      { property: "og:description", content: "法律相談のご予約・お問い合わせフォーム。" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const FIELD =
  "mt-2 w-full border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-ring";

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        title="お問い合わせ"
        en="CONTACT"
        lead="ご相談内容の概要をお知らせください。2営業日以内に担当者よりご連絡します。"
      />

      <section className="container-page grid gap-16 py-20 md:grid-cols-[1.3fr_1fr] md:py-28">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("送信を受け付けました。折り返しご連絡いたします。");
          }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="text-sm text-primary">
              お名前 <span className="text-destructive">*</span>
            </label>
            <input id="name" name="name" required className={FIELD} autoComplete="name" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="text-sm text-primary">
                メールアドレス <span className="text-destructive">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={FIELD}
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="tel" className="text-sm text-primary">
                電話番号
              </label>
              <input id="tel" name="tel" type="tel" className={FIELD} autoComplete="tel" />
            </div>
          </div>
          <div>
            <label htmlFor="area" className="text-sm text-primary">
              ご相談分野
            </label>
            <select id="area" name="area" className={FIELD} defaultValue="">
              <option value="">選択してください</option>
              {[
                "相続・遺言",
                "離婚・男女問題",
                "労働問題",
                "企業法務",
                "交通事故",
                "債務整理",
                "その他",
              ].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message" className="text-sm text-primary">
              ご相談内容 <span className="text-destructive">*</span>
            </label>
            <textarea id="message" name="message" required rows={8} className={FIELD} />
          </div>
          <p className="text-xs leading-7 text-muted-foreground">
            ご相談の相手方がすでに当事務所へご相談されている場合など、利益相反により対応できないことがあります。あらかじめご了承ください。
          </p>
          <button
            type="submit"
            className="w-full bg-primary px-8 py-4 text-sm text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            この内容で送信する
          </button>
          {sent && (
            <p className="text-sm text-gold">
              送信ありがとうございました。2営業日以内にご連絡いたします。
            </p>
          )}
        </form>

        <aside className="h-fit border border-border bg-surface p-8">
          <h2 className="text-lg">お電話でのご予約</h2>
          <p className="mt-4 font-serif text-3xl tracking-wider text-primary">087-000-0000</p>
          <p className="mt-3 text-sm leading-8 text-muted-foreground">
            受付時間 平日 9:00–18:00
            <br />
            時間外・土日は事前予約制で対応します。
          </p>
          <h3 className="mt-8 text-sm text-primary">所在地</h3>
          <address className="mt-2 text-sm not-italic leading-8 text-muted-foreground">
            〒760-0033
            <br />
            香川県高松市丸の内○-○ ○○ビル4階
          </address>
        </aside>
      </section>
    </>
  );
}
