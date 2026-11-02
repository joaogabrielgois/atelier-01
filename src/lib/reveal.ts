import { gsap, ScrollTrigger } from './gsap';

/** Revela elementos marcados com data-reveal ao entrarem na tela. Não faz nada com movimento reduzido. */
export function revealOnScroll(root: Element, reduce: boolean): void {
  if (reduce) return;
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 36,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
    });
  });
}

export { ScrollTrigger };
