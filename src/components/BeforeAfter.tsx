import { useRef, useState, type PointerEvent } from 'react';
import type { BeforeAfterComparison } from '../content/projects';

/** Comparador antes/depois. Funciona com ponteiro, toque e teclado (setas no controle). */
export function BeforeAfter({ before, after, caption }: BeforeAfterComparison) {
  const [value, setValue] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const positionFrom = (event: PointerEvent<HTMLDivElement>) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box || box.width === 0) return;
    const percent = ((event.clientX - box.left) / box.width) * 100;
    setValue(Math.min(100, Math.max(0, percent)));
  };

  return (
    <figure>
      <div
        ref={frame}
        className="relative aspect-[16/10] touch-none select-none overflow-hidden bg-paper-deep"
        onPointerDown={(event) => {
          dragging.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          positionFrom(event);
        }}
        onPointerMove={(event) => {
          if (dragging.current) positionFrom(event);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <img src={after.src} alt={after.alt} draggable={false} className="absolute inset-0 h-full w-full object-cover" />
        <img
          src={before.src}
          alt={before.alt}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-px bg-paper" style={{ left: `${value}%` }} />
        <span className="absolute left-4 top-4 bg-paper/85 px-3 py-1 text-sm">Antes</span>
        <span className="absolute right-4 top-4 bg-paper/85 px-3 py-1 text-sm">Depois</span>
      </div>

      <label className="mt-5 block">
        <span className="sr-only">Posição do comparador entre antes e depois</span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className="w-full accent-olive"
        />
      </label>
      <figcaption className="mt-3 text-sm text-stone">{caption}</figcaption>
    </figure>
  );
}
