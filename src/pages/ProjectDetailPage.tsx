import { Link, useParams } from 'react-router-dom';
import { BeforeAfter } from '../components/BeforeAfter';
import { Gallery } from '../components/Gallery';
import { ParallaxImage } from '../components/ParallaxImage';
import { buttonClass } from '../components/styles';
import { CATEGORY_LABELS, projects } from '../content/projects';
import { findProject, getAdjacentProjects } from '../lib/projects';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { NotFoundPage } from './NotFoundPage';

/** Mapa ilustrativo, sem coordenadas reais. Indica apenas a ideia de localização. */
function LocationSketch({ label }: { label: string }) {
  return (
    <figure>
      <svg viewBox="0 0 400 240" role="img" aria-label={`Mapa ilustrativo: ${label}`} className="w-full bg-paper-deep">
        <g stroke="#181815" strokeOpacity="0.12" strokeWidth="1">
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`v${i}`} x1={(i + 1) * 50} y1="0" x2={(i + 1) * 50} y2="240" />
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={(i + 1) * 48} x2="400" y2={(i + 1) * 48} />
          ))}
        </g>
        <path d="M0 170 Q120 140 220 180 T400 150" fill="none" stroke="#4B4F36" strokeOpacity="0.4" strokeWidth="6" />
        <circle cx="200" cy="120" r="9" fill="#4B4F36" />
        <circle cx="200" cy="120" r="22" fill="none" stroke="#4B4F36" strokeOpacity="0.4" />
      </svg>
      <figcaption className="mt-3 text-sm text-stone">Mapa ilustrativo, sem coordenadas reais.</figcaption>
    </figure>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = findProject(projects, slug);

  useDocumentMeta({
    title: project ? `${project.title} — ATELIER 01` : 'Projeto não encontrado — ATELIER 01',
    description: project?.summary ?? 'Projeto não encontrado.',
  });

  if (!project) return <NotFoundPage />;

  const { previous, next } = getAdjacentProjects(projects, project.slug);
  const showNavigation = previous && next && previous.slug !== project.slug;

  return (
    <article>
      <header className="mx-auto max-w-[1440px] px-6 pb-16 pt-40 md:px-10">
        <Link to="/projetos" className="text-sm text-stone underline-offset-4 hover:text-ink hover:underline">
          Todos os projetos
        </Link>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <h1 className="font-display text-[clamp(3.5rem,9vw,8.5rem)] font-light leading-[0.92] md:col-span-9">{project.title}</h1>
          <p className="text-lg text-stone md:col-span-3 md:self-end">{project.summary}</p>
        </div>
        <dl className="mt-14 grid grid-cols-2 gap-y-8 border-t border-ink/15 pt-8 md:grid-cols-4">
          <div><dt className="text-sm text-stone">Categoria</dt><dd className="mt-1 text-lg">{CATEGORY_LABELS[project.category]}</dd></div>
          <div><dt className="text-sm text-stone">Localização</dt><dd className="mt-1 text-lg">{project.location}</dd></div>
          <div><dt className="text-sm text-stone">Ano</dt><dd className="mt-1 text-lg">{project.year}</dd></div>
          <div><dt className="text-sm text-stone">Área</dt><dd className="mt-1 text-lg">{project.area}</dd></div>
        </dl>
      </header>

      <div className="mx-auto mb-24 max-w-[1440px] px-6 md:px-10">
        <ParallaxImage src={project.cover.src} alt={project.cover.alt} className="aspect-[16/9] w-full" />
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 pb-32 md:grid-cols-12 md:px-10">
        <section aria-labelledby="conceito" className="md:col-span-6">
          <h2 id="conceito" className="font-display text-4xl font-light">Conceito</h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-stone">{project.concept}</p>
        </section>
        <section aria-labelledby="abordagem" className="md:col-span-5 md:col-start-8">
          <h2 id="abordagem" className="font-display text-4xl font-light">Abordagem</h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-stone">{project.approach}</p>
          <h3 className="mt-12 text-sm font-semibold">Materiais</h3>
          <ul className="mt-4 flex flex-col gap-2 text-lg">
            {project.materials.map((material) => (
              <li key={material} className="border-b border-ink/10 pb-2">{material}</li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="galeria" className="mx-auto max-w-[1440px] px-6 pb-32 md:px-10">
        <h2 id="galeria" className="sr-only">Galeria</h2>
        <Gallery images={project.gallery} />
      </section>

      {project.beforeAfter && (
        <section aria-labelledby="antes-depois" className="mx-auto max-w-[1440px] px-6 pb-32 md:px-10">
          <h2 id="antes-depois" className="mb-12 font-display text-5xl font-light">Antes e depois</h2>
          <div className="md:mx-auto md:max-w-5xl">
            <BeforeAfter {...project.beforeAfter} />
          </div>
        </section>
      )}

      <section aria-labelledby="local" className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-32 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <h2 id="local" className="font-display text-4xl font-light">Localização</h2>
          <p className="mt-6 text-lg text-stone">{project.location}</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <LocationSketch label={project.location} />
        </div>
      </section>

      {showNavigation && (
        <nav aria-label="Outros projetos" className="border-t border-ink/15">
          <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
            <Link to={`/projetos/${previous.slug}`} className="group px-6 py-16 md:px-10">
              <span className="text-sm text-stone">Projeto anterior</span>
              <span className="mt-3 block font-display text-4xl font-light transition-transform duration-700 ease-atelier group-hover:-translate-x-2">
                {previous.title}
              </span>
            </Link>
            <Link to={`/projetos/${next.slug}`} className="group border-t border-ink/15 px-6 py-16 text-left md:border-l md:border-t-0 md:px-10 md:text-right">
              <span className="text-sm text-stone">Próximo projeto</span>
              <span className="mt-3 block font-display text-4xl font-light transition-transform duration-700 ease-atelier group-hover:translate-x-2">
                {next.title}
              </span>
            </Link>
          </div>
        </nav>
      )}

      <div className="mx-auto max-w-[1440px] px-6 pb-32 md:px-10">
        <Link to="/contato" className={buttonClass}>Quero um projeto assim</Link>
      </div>
    </article>
  );
}
