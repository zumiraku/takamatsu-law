/** 顔写真の代わりに、ロゴのダイヤをモチーフにしたシルエット。温度感のある抽象グラフィック。 */
export function LawyerPortrait({ mark, name }: { mark: string; name: string }) {
  const gid = `portrait-${mark}`;
  return (
    <div className="relative flex size-24 shrink-0 items-center justify-center md:size-28">
      <svg viewBox="0 0 112 112" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0.15" y1="1" x2="0.85" y2="0">
            <stop offset="0" stopColor="#001a4d" />
            <stop offset="1" stopColor="#2b6bc4" />
          </linearGradient>
        </defs>
        <rect
          x="16"
          y="16"
          width="80"
          height="80"
          transform="rotate(45 56 56)"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="1.5"
        />
        <rect
          x="24"
          y="24"
          width="64"
          height="64"
          transform="rotate(45 56 56)"
          fill="oklch(0.965 0.01 250 / 0.7)"
        />
      </svg>
      <span className="relative z-10 font-serif text-3xl text-primary md:text-4xl" aria-hidden>
        {mark}
      </span>
      <span className="sr-only">{name}のシンボルマーク</span>
    </div>
  );
}
