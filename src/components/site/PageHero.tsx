export function PageHero({
  title,
  en,
  lead,
}: {
  title: string;
  en: string;
  lead?: string;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page py-16 md:py-24">
        <p className="text-[11px] tracking-[0.35em] text-gold">{en}</p>
        <h1 className="mt-4 text-3xl md:text-4xl">{title}</h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-sm leading-9 text-muted-foreground md:text-base">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}

export function SectionTitle({ title, en }: { title: string; en: string }) {
  return (
    <div className="mb-10">
      <p className="text-[11px] tracking-[0.35em] text-gold">{en}</p>
      <h2 className="mt-3 text-2xl md:text-3xl">{title}</h2>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-page grid gap-8 py-16 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <h2 className="text-2xl md:text-3xl">まずは、お話をお聞かせください</h2>
          <p className="mt-4 text-sm leading-8 opacity-85">
            解決の道筋が見えないままお一人で悩まれる時間は、けっして短くありません。
            相談は事実の整理から始めます。お気持ちの整理がついていない段階でも構いません。
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-xs tracking-[0.25em] opacity-70">TEL（平日 9:00–18:00）</p>
          <p className="font-serif text-3xl tracking-wider">087-000-0000</p>
          <a
            href="/contact"
            className="inline-flex w-full items-center justify-center border border-primary-foreground/40 px-6 py-3 text-sm transition-colors hover:bg-primary-foreground hover:text-primary"
          >
            フォームで相談を予約する
          </a>
        </div>
      </div>
    </section>
  );
}
