import { useCallback, useEffect, useState } from 'react';
import type { ProjectImage } from '../content/projects';

/** Galeria com visualizador em tela cheia. Setas, Escape e botões controlam a navegação. */
export function Gallery({ images }: { images: readonly ProjectImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const move = useCallback(
    (step: number) => setIndex((current) => (current === null ? null : (current + step + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close, move]);

  const [first, ...rest] = images;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-12">
        {first && (
          <button
            type="button"
            onClick={() => setIndex(0)}
            className="group md:col-span-12"
            aria-label={`Ampliar imagem: ${first.alt}`}
          >
            <img src={first.src} alt="" className="aspect-[16/9] w-full object-cover transition-opacity duration-700 group-hover:opacity-90" />
          </button>
        )}
        {rest.map((image, offset) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(offset + 1)}
            className={`group ${offset === 0 ? 'md:col-span-7' : 'md:col-span-5 md:mt-32'}`}
            aria-label={`Ampliar imagem: ${image.alt}`}
          >
            <img
              src={image.src}
              alt=""
              loading="lazy"
              decoding="async"
              className={`w-full object-cover transition-opacity duration-700 group-hover:opacity-90 ${
                offset === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]'
              }`}
            />
          </button>
        ))}
      </div>

      {isOpen && index !== null && (
        <div role="dialog" aria-modal="true" aria-label="Galeria de imagens" className="fixed inset-0 z-50 flex flex-col bg-ink/95 text-paper">
          <div className="flex items-center justify-between px-6 py-5 md:px-10">
            <p className="text-sm">
              {index + 1} / {images.length}
            </p>
            <button type="button" onClick={close} autoFocus className="text-sm underline-offset-4 hover:underline">
              Fechar
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-6 md:px-24">
            <img
              key={images[index].src}
              src={images[index].src}
              alt={images[index].alt}
              className="animate-atelier-fade max-h-[75vh] w-auto max-w-full object-contain"
            />
          </div>
          <div className="flex justify-between px-6 py-6 md:px-10">
            <button type="button" onClick={() => move(-1)} className="text-sm hover:underline">
              Anterior
            </button>
            <button type="button" onClick={() => move(1)} className="text-sm hover:underline">
              Próxima
            </button>
          </div>
        </div>
      )}
    </>
  );
}

