import { useEffect, useRef, useState } from "react";

const MIN_THUMB = 48;

function metrics() {
  const root = document.documentElement;
  const view = root.clientHeight;
  const total = root.scrollHeight;
  const max = total - view;
  if (max <= 1) return { top: 0, height: 0, show: false };
  const height = Math.max(MIN_THUMB, (view / total) * view);
  const top = (root.scrollTop / max) * (view - height);
  return { top, height, show: true };
}

export function SiteScrollbar() {
  const drag = useRef<{ y: number; scroll: number } | null>(null);
  const [thumb, setThumb] = useState({ top: 0, height: 0, show: false });

  useEffect(() => {
    const update = () => setThumb(metrics());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  if (!thumb.show) return null;

  return (
    <div className="site-scrollbar" aria-hidden>
      <button
        type="button"
        tabIndex={-1}
        className="site-scrollbar-thumb"
        style={{ top: thumb.top, height: thumb.height }}
        onPointerDown={(e) => {
          e.preventDefault();
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { y: e.clientY, scroll: document.documentElement.scrollTop };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const root = document.documentElement;
          const view = root.clientHeight;
          const max = root.scrollHeight - view;
          const height = Math.max(MIN_THUMB, (view / root.scrollHeight) * view);
          const range = view - height;
          if (range <= 0) return;
          const next = drag.current.scroll + ((e.clientY - drag.current.y) / range) * max;
          window.scrollTo(0, Math.max(0, Math.min(max, next)));
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      />
    </div>
  );
}
