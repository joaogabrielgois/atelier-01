import { useLayoutEffect, type DependencyList, type RefObject } from 'react';
import { gsap } from './gsap';
import { prefersReducedMotion } from './motion';

/**
 * Executa animações GSAP dentro de um escopo e as desfaz ao desmontar ou trocar dependências.
 * O callback recebe o elemento do escopo e se a preferência de movimento reduzido está ativa.
 */
export function useGsap<T extends Element>(
  scope: RefObject<T | null>,
  build: (root: T, reduce: boolean) => void,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const ctx = gsap.context(() => build(root, prefersReducedMotion()), root);
    return () => ctx.revert();
    // Dependências são controladas pelo chamador.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
