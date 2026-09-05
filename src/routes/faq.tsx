import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionTitle } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FAQ, FAQ_GROUPS, faqInGroup } from "@/lib/faq";
import { FIRM, pageTitle } from "@/lib/firm";
import { jsonLdBreadcrumb, jsonLdFaq, seoMeta } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const Route = createFileRoute("/faq")({
  head: () => {
    const seo = seoMeta({
      title: pageTitle("よくあるご質問"),
      description: `ご相談の方法、費用、当日の持ち物について、よくいただくご質問をまとめました。${FIRM.name}（${FIRM.bar}所属）。`,
      path: "/faq",
    });
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLdFaq(FAQ.map((f) => ({ q: f.q, a: f.a })))),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "ホーム", path: "/" },
              { name: "よくあるご質問", path: "/faq" },
            ]),
          ),
        },
      ],
    };
  },
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageHero
        title="よくあるご質問"
        en="FAQ"
        image={IMG.consult}
        imageAlt="静かな室内"
        lead="ご相談の前に確かめておきたいことを、まとめました。ここにない事柄は、お電話でお尋ねください。"
      />

      <section className="container-page py-16 md:py-24">
        <nav aria-label="質問の分類" className="flex flex-wrap gap-3">
          {FAQ_GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="light-pass inline-flex items-center border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-brand hover:text-brand"
            >
              {g.name}
            </a>
          ))}
        </nav>

        <div className="mt-16 space-y-20">
          {FAQ_GROUPS.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-28">
              <SectionTitle title={g.name} en={`${faqInGroup(g.name).length} QUESTIONS`} />
              <dl className="border-t border-border">
                {faqInGroup(g.name).map((f, i) => (
                  <div key={f.q} className="border-b border-border py-8">
                    <Reveal delay={i * 50}>
                      <dt className="flex gap-4 text-[17px] leading-9 text-primary">
                        <span aria-hidden className="font-serif text-brand">
                          Q
                        </span>
                        <span>{f.q}</span>
                      </dt>
                      <dd className="mt-4 flex gap-4 text-[15px] leading-9 text-muted-foreground">
                        <span aria-hidden className="font-serif text-muted-foreground/60">
                          A
                        </span>
                        <span>{f.a}</span>
                      </dd>
                    </Reveal>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
          <div>
            <p className="text-[11px] tracking-[0.32em] text-brand">CONTACT</p>
            <h2 className="mt-4 text-2xl">ここにない事柄は、お電話でお尋ねください。</h2>
            <p className="mt-5 max-w-xl text-sm leading-8 text-muted-foreground">
              法律相談のご予約は、相談予約専用のお電話で承っています。なお、電話・メールのみでの法律相談は、顧問先を除きお受けしておりません。
            </p>
          </div>
          <div className="border border-border bg-background p-8">
            <p className="text-xs tracking-[0.2em] text-muted-foreground">相談予約専用</p>
            <a
              href={FIRM.telReserveHref}
              className="mt-3 block font-serif text-3xl tracking-wider text-primary"
            >
              {FIRM.telReserve}
            </a>
            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              {FIRM.hours}
              <br />
              {FIRM.hoursNote}
            </p>
            <Link
              to="/flow"
              className="mt-6 inline-block text-sm text-primary underline underline-offset-8"
            >
              相談までの流れを見る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
