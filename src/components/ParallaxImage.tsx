import { useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useGsap } from '../lib/useGsap';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

/** Imagem com deslocamento suave ao rolar a página. Com movimento reduzido, fica estática. */
export function ParallaxImage({ src, alt, className = '' }: ParallaxImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);

  useGsap(
    frame,
    (root, reduce) => {
      const target = image.current;
      if (reduce || !target) return;
      gsap.fromTo(
        target,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    },
    [src],
  );

  return (
    <div ref={frame} className={`relative overflow-hidden bg-paper-deep ${className}`}>
      <img
        ref={image}
        src={src}
        alt={alt}
        decoding="async"
        className="absolute inset-x-0 -top-[7%] h-[114%] w-full object-cover"
      />
    </div>
  );
}
