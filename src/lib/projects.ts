import type { Project, ProjectCategory } from '../content/projects';

export type CategoryFilter = 'todos' | ProjectCategory;

export const FILTERS: readonly CategoryFilter[] = ['todos', 'residencial', 'comercial', 'interiores'];

/** Converte o valor do parâmetro de URL em um filtro válido. Valores desconhecidos viram "todos". */
export function parseFilter(value: string | null | undefined): CategoryFilter {
  return (FILTERS as readonly string[]).includes(value ?? '') ? (value as CategoryFilter) : 'todos';
}

export function filterProjects(list: readonly Project[], filter: CategoryFilter): Project[] {
  return filter === 'todos' ? [...list] : list.filter((project) => project.category === filter);
}

export function findProject(list: readonly Project[], slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return list.find((project) => project.slug === slug);
}

/** Projeto anterior e próximo na coleção, em ordem circular. */
export function getAdjacentProjects(
  list: readonly Project[],
  slug: string,
): { previous: Project | undefined; next: Project | undefined } {
  const index = list.findIndex((project) => project.slug === slug);
  if (index < 0 || list.length < 2) return { previous: undefined, next: undefined };
  const total = list.length;
  return {
    previous: list[(index - 1 + total) % total],
    next: list[(index + 1) % total],
  };
}
