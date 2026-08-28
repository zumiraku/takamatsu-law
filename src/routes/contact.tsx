import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { FrameImg } from "@/components/site/Decor";
import { FIRM, pageTitle } from "@/lib/firm";
import { seoMeta } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const Route = createFileRoute("/contact")({
  head: () =>
    seoMeta({
      title: pageTitle("お問い合わせ・相談予約"),
      description: `法律相談のご予約はお電話（${FIRM.telReserve}／${FIRM.hours}）で。来所予約のご連絡はフォームからも受け付けます。法律相談は来所面談です。`,
      path: "/contact",
    }),
  component: Contact,
});

const FIELD =
  "mt-2 w-full border border-input bg-card px-4 py-3 text-sm outline-none transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus:border-brand focus:shadow-[0_0_0_3px_oklch(0.48_0.13_260_/_0.14)]";

function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    toast.success("送信を受け付けました。折り返しご連絡いたします。");
  }

  return (
    <>
      <PageHero
        title="お問い合わせ"
        en="CONTACT"
        image={IMG.consult}
        imageAlt="相談室"
        lead="法律相談は原則として来所面談です。電話・メールでの法律相談は、顧問先を除きお受けできません。フォームは来所予約のご連絡用です。"
      />

      <section className="container-page grid gap-16 py-20 md:grid-cols-[1.25fr_1fr] md:py-28">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm text-primary">
              お名前 <span className="text-destructive">*</span>
            </label>
            <input id="name" name="name" required className={FIELD} autoComplete="name" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="text-sm text-primary">
                メールアドレス{" "}
                <span className="text-sm font-normal text-muted-foreground">任意</span>
              </label>
              <input id="email" name="email" type="email" className={FIELD} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="tel" className="text-sm text-primary">
                電話番号 <span className="text-destructive">*</span>
              </label>
              <input id="tel" name="tel" type="tel" required className={FIELD} autoComplete="tel" />
            </div>
          </div>
          <div>
            <label htmlFor="opponent" className="text-sm text-primary">
              相手方のお名前
            </label>
            <input id="opponent" name="opponent" className={FIELD} />
            <p className="mt-2 text-xs text-muted-foreground">
              利益相反の確認のため、わかる範囲でご記入ください。
            </p>
          </div>
          <div>
            <label htmlFor="area" className="text-sm text-primary">
              ご相談分野
            </label>
            <select id="area" name="area" className={FIELD} defaultValue="">
              <option value="">選択してください</option>
              {[
                "交通事故",
                "相続",
                "離婚・男女問題",
                "借金問題",
                "投資被害・消費者被害",
                "企業法務・顧問",
                "その他",
              ].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message" className="text-sm text-primary">
              ご相談内容の概要 <span className="text-destructive">*</span>
            </label>
            <textarea id="message" name="message" required rows={7} className={FIELD} />
          </div>
          <label className="flex items-start gap-3 text-xs leading-6 text-muted-foreground">
            <input type="checkbox" name="privacy" required className="mt-1 size-4" />
            <span>
              <Link to="/privacy" className="underline underline-offset-4">
                プライバシーポリシー
              </Link>
              に同意のうえ送信します。
            </span>
          </label>
          <p className="text-xs leading-7 text-muted-foreground">
            同種案件の法律相談は3回までです。相談の内容によってはお受けできないことがあります。3営業日以上経っても連絡がない場合は、お電話ください。
          </p>
          <button
            type="submit"
            className="light-pass w-full bg-primary px-8 py-4 text-sm text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            この内容で送信する
          </button>
          {sent && (
            <p className="text-sm text-brand" role="status">
              送信ありがとうございました。折り返しご連絡いたします。
            </p>
          )}
        </form>

        <aside className="h-fit overflow-hidden border border-border bg-surface">
          <FrameImg src={IMG.consult} alt="" className="aspect-[16/10]" />
          <div className="p-8 md:p-10">
            <h2 className="text-lg">お電話でのご予約</h2>
            <p className="mt-2 text-xs tracking-[0.2em] text-muted-foreground">相談予約専用</p>
            <a
              href={FIRM.telReserveHref}
              className="mt-4 block font-serif text-3xl tracking-wider text-primary"
            >
              {FIRM.telReserve}
            </a>
            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              {FIRM.hours}
              <br />
              {FIRM.hoursNote}
            </p>
            <h3 className="mt-10 text-sm text-primary">所在地</h3>
            <address className="mt-2 text-sm not-italic leading-8 text-muted-foreground">
              {FIRM.address}
            </address>
            <p className="mt-6 text-xs leading-7 text-muted-foreground">代表電話 {FIRM.telMain}</p>
          </div>
        </aside>
      </section>
    </>
  );
}
