import { useId } from "react";

export function LogoMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0.15" y1="1" x2="0.85" y2="0">
          <stop offset="0" stopColor="#001a4d" />
          <stop offset="0.45" stopColor="#0d3d8c" />
          <stop offset="1" stopColor="#2b6bc4" />
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="10"
        width="44"
        height="44"
        rx="1"
        transform="rotate(45 32 32)"
        fill={`url(#${id})`}
      />
      <g fill="#fff" opacity="0.95">
        <rect x="22.2" y="28" width="3.4" height="12" rx="0.4" />
        <rect x="27.2" y="22" width="3.4" height="18" rx="0.4" />
        <rect x="32.4" y="18" width="3.4" height="22" rx="0.4" />
        <rect x="37.4" y="24" width="3.4" height="16" rx="0.4" />
      </g>
    </svg>
  );
}
