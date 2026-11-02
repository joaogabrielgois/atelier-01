import { useMemo, useState, type PointerEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterBar } from '../components/FilterBar';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectPreview } from '../components/ProjectPreview';
import { projects, type Project } from '../content/projects';
import { filterProjects, FILTERS, parseFilter, type CategoryFilter } from '../lib/projects';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { buttonClass } from '../components/styles';

// Ritmo assimétrico: cada posição do grid tem uma largura e um recuo próprios.
const layout = ['md:col-span-7', 'md:col-span-5 md:mt-40', 'md:col-span-5', 'md:col-span-7 md:mt-24'];

export function ProjectsPage() {
  useDocumentMeta({
    title: 'Projetos — ATELIER 01',
    description: 'Coleção de projetos residenciais, comerciais e de interiores do ATELIER 01.',
  });

  const [params, setParams] = useSearchParams();
  const filter = parseFilter(params.get('categoria'));
  const list = useMemo(() => filterProjects(projects, filter), [filter]);
  const [preview, setPreview] = useState<{ project: Project; x: number; y: number } | null>(null);

  const counts = useMemo(() => {
    const result = {} as Record<CategoryFilter, number>;
    for (const option of FILTERS) result[option] = filterProjects(projects, option).length;
    return result;
  }, []);

  function changeFilter(next: CategoryFilter) {
    const updated = new URLSearchParams(params);
    if (next === 'todos') updated.delete('categoria');
    else updated.set('categoria', next);
    setParams(updated, { replace: true });
  }

  // Prévia contextual: só em telas com ponteiro preciso e largura de desktop.
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) return;
    const card = (event.target as Element).closest<HTMLElement>('[data-project-slug]');
    const project = list.find((item) => item.slug === card?.dataset.projectSlug);
    setPreview(project ? { project, x: event.clientX, y: event.clientY } : null);
  }

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-40 pt-40 md:px-10">
      <header className="mb-20 grid gap-10 md:grid-cols-12">
        <h1 className="font-display text-[clamp(3.5rem,9vw,8rem)] font-light leading-[0.95] md:col-span-8">Projetos</h1>
        <p className="text-lg text-stone md:col-span-4 md:self-end">
          Uma coleção de casas, escritórios e interiores. Cada um com seu tempo de escuta, estudo e obra.
        </p>
      </header>

      <div className="mb-16">
        <FilterBar value={filter} counts={counts} onChange={changeFilter} />
      </div>

      {list.length === 0 ? (
        <div className="py-24">
          <p className="text-lg text-stone">Nenhum projeto nesta categoria por enquanto.</p>
          <button type="button" onClick={() => changeFilter('todos')} className={`${buttonClass} mt-8`}>
            Ver todos os projetos
          </button>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 gap-y-24 md:grid-cols-12 md:gap-x-8"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setPreview(null)}
        >
          {list.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              className={layout[i % layout.length]}
              aspect={i % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]'}
            />
          ))}
        </div>
      )}

      {preview && <ProjectPreview project={preview.project} x={preview.x} y={preview.y} />}
      <p className="sr-only" aria-live="polite">
        {list.length} {list.length === 1 ? 'projeto exibido' : 'projetos exibidos'}
      </p>
    </section>
  );
}
