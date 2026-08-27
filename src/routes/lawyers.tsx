import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageHero, CtaBand } from "@/components/site/PageHero";
import { LawyerPortrait } from "@/components/site/LawyerPortrait";
import { IMG } from "@/lib/media";
import { lawyers } from "@/lib/lawyers";
import { FIRM, pageTitle } from "@/lib/firm";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/lawyers")({
  head: () =>
    seoMeta({
      title: pageTitle("弁護士紹介"),
      description: `${FIRM.name}の弁護士をご紹介します。代表弁護士 ${FIRM.representative}（${FIRM.bar}所属）。写真は掲載しておりません。`,
      path: "/lawyers",
    }),
  component: Lawyers,
});

function Lawyers() {
  return (
    <>
      <PageHero
        title="弁護士紹介"
        en="LAWYERS"
        image={IMG.consult}
        imageAlt="静かな相談室"
        lead="経歴と取扱分野を簡潔にまとめています。写真は掲載しておりません。"
      />

      <section className="container-page py-20 md:py-28">
        <ul className="space-y-16 md:space-y-24">
          {lawyers.map((l) => (
            <li key={l.id} className="border-t border-border pt-12">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
                <LawyerPortrait mark={l.mark} name={l.name} />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] tracking-[0.28em] text-brand">{l.role}</p>
                  <h2 className="mt-2 text-2xl md:text-3xl">
                    {l.name}
                    <span className="ml-3 text-xs tracking-widest text-muted-foreground">
                      {l.kana}
                    </span>
                  </h2>
                  <p className="mt-6 max-w-2xl text-sm leading-8 text-muted-foreground">
                    {l.message}
                  </p>

                  <div className="mt-10 grid gap-10 md:grid-cols-2">
                    <Field label="取扱分野">
                      <ul className="flex flex-wrap gap-2">
                        {l.fields.map((f) => (
                          <li
                            key={f}
                            className="border border-border px-3 py-1 text-xs text-muted-foreground"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    </Field>
                    <Field label="経歴">
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        {l.career.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </Field>
                    {l.positions.length > 0 && (
                      <Field label="役職等">
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          {l.positions.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </Field>
                    )}
                    {l.affiliations.length > 0 && (
                      <Field label="所属・資格">
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          {l.affiliations.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </Field>
                    )}
                  </div>

                  {l.cases.length > 0 && (
                    <div className="mt-10">
                      <h3 className="text-sm text-primary">関与した判例（掲載分）</h3>
                      <ul className="mt-4 space-y-5">
                        {l.cases.map((c) => (
                          <li key={c.court} className="border-l border-brand/40 pl-4">
                            <p className="text-xs tracking-wide text-muted-foreground">
                              {c.court} / {c.side}
                            </p>
                            <p className="mt-1 text-sm leading-7 text-foreground/80">{c.summary}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-sm text-primary">{label}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
