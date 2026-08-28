import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand, SectionTitle } from "@/components/site/PageHero";
import { FrameImg } from "@/components/site/Decor";
import { Reveal } from "@/components/site/Reveal";
import { PERSONAL, CORPORATE, type Practice } from "@/lib/practices";
import { FIRM, pageTitle } from "@/lib/firm";
import { seoMeta } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const Route = createFileRoute("/practice")({
  head: () =>
    seoMeta({
      title: pageTitle("取扱業務"),
      description: `交通事故、相続、離婚、借金問題、投資・消費者被害、企業法務。${FIRM.name}の取扱分野をご案内します。`,
      path: "/practice",
    }),
  component: Practice,
});

function AreaCard({ p, i }: { p: Practice; i: number }) {
  return (
    <li id={p.id} className="light-pass scroll-mt-28 overflow-hidden border border-border bg-card">
      <Reveal delay={(i % 2) * 80}>
        <FrameImg
          src={IMG.practices[p.id]}
          alt=""
          className="aspect-[16/9]"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <div className="p-8 md:p-10">
          <p className="font-serif text-[11px] tracking-[0.28em] text-brand">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-xl">{p.title}</h3>
          <p className="mt-4 text-sm leading-8 text-muted-foreground">{p.lead}</p>
          <ul className="mt-6 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {p.items.map((item) => (
              <li key={item} className="border-l border-brand/40 pl-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </li>
  );
}

function Practice() {
  return (
    <>
      <PageHero
        title="取扱業務"
        en="PRACTICE AREAS"
        image={IMG.practices.komon}
        imageAlt="会議室"
        lead="個人の方、企業の方、いずれのご相談にも対応しています。該当がはっきりしない場合も、まずはお問い合わせください。"
      />

      <section className="container-page py-20 md:py-28">
        <SectionTitle title="個人の方" en="INDIVIDUALS" />
        <ul className="grid gap-6 md:grid-cols-2">
          {PERSONAL.map((p, i) => (
            <AreaCard key={p.id} p={p} i={i} />
          ))}
        </ul>
      </section>

      <section className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <SectionTitle title="企業の方" en="COMPANIES" />
          <ul className="grid gap-6 md:grid-cols-2">
            {CORPORATE.map((p, i) => (
              <AreaCard key={p.id} p={p} i={i} />
            ))}
          </ul>
          <p className="mt-10 text-xs leading-7 text-muted-foreground">
            ※ 刑事事件は、原則としてご紹介のある方のみ受任しております。
            <br />※ 事案の内容や件数の都合により、ご依頼をお断りすることがあります。
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
