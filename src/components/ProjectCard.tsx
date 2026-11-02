import { Link } from 'react-router-dom';
import { CATEGORY_LABELS, type Project } from '../content/projects';

interface ProjectCardProps {
  project: Project;
  className?: string;
  aspect?: string;
}

export function ProjectCard({ project, className = '', aspect = 'aspect-[4/5]' }: ProjectCardProps) {
  return (
    <Link
      to={`/projetos/${project.slug}`}
      data-project-slug={project.slug}
      className={`group block ${className}`}
    >
      <div className={`relative overflow-hidden bg-paper-deep ${aspect}`}>
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.6s] ease-atelier group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-6 border-b border-ink/15 pb-3">
        <h3 className="font-display text-3xl font-light">{project.title}</h3>
        <span className="shrink-0 text-sm text-stone">{project.year}</span>
      </div>
      <p className="mt-2 text-sm text-stone">{CATEGORY_LABELS[project.category]}</p>
    </Link>
  );
}
