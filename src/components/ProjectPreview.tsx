import type { Project } from '../content/projects';

interface ProjectPreviewProps {
  project: Project;
  x: number;
  y: number;
}

/** Prévia flutuante que acompanha o cursor. Usada apenas em telas com ponteiro preciso. */
export function ProjectPreview({ project, x, y }: ProjectPreviewProps) {
  const left = Math.min(x + 28, window.innerWidth - 340);
  const top = Math.max(96, Math.min(y - 140, window.innerHeight - 300));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-30 w-72 bg-paper shadow-lg"
      style={{ left, top }}
    >
      <img src={project.cover.src} alt="" className="aspect-[4/3] w-full object-cover" />
      <p className="px-4 py-3 font-display text-xl font-light">{project.title}</p>
    </div>
  );
}
