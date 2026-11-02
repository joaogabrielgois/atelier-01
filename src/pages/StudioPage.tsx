import { useRef } from 'react';
import { methodology, philosophy, team } from '../content/studio';
import { useDocumentMeta } from '../lib/useDocumentMeta';

export function StudioPage() {
  useDocumentMeta({
    title: 'Estúdio — ATELIER 01',
    description: 'Filosofia, equipe e metodologia do ATELIER 01, escritório de arquitetura e design de interiores.',
  });
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="mx-auto max-w-[1440px] px-6 pb-40 pt-40 md:px-10">
      <header className="grid gap-10 md:grid-cols-12">
        <h1 className="font-display text-[clamp(3.5rem,9vw,8rem)] font-light leading-[0.95] md:col-span-8">Estúdio</h1>
      </header>

      <section aria-labelledby="filosofia" className="mt-24 grid gap-12 md:grid-cols-12">
        <h2 id="filosofia" data-reveal className="font-display text-4xl font-light md:col-span-4">Filosofia</h2>
        <div className="space-y-8 text-xl leading-relaxed text-stone md:col-span-7 md:col-start-6">
          {philosophy.map((paragraph) => (
            <p key={paragraph} data-reveal>{paragraph}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="metodologia" className="mt-40">
        <h2 id="metodologia" data-reveal className="mb-16 font-display text-4xl font-light">Metodologia</h2>
        <ol className="grid gap-x-8 gap-y-16 md:grid-cols-4">
          {methodology.map((step, index) => (
            <li key={step.title} data-reveal className="border-t border-ink/20 pt-6">
              <p className="text-sm text-stone">Etapa {index + 1}</p>
              <h3 className="mt-3 font-display text-3xl font-light">{step.title}</h3>
              <p className="mt-4 text-stone">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="equipe" className="mt-40">
        <h2 id="equipe" data-reveal className="mb-16 font-display text-4xl font-light">Equipe</h2>
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {team.map((member) => (
            <li key={member.name} data-reveal className="border-b border-ink/15 pb-6">
              <p className="font-display text-3xl font-light">{member.name}</p>
              <p className="mt-2 text-stone">{member.role}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-stone">Equipe fictícia, apresentada apenas como modelo.</p>
      </section>
    </div>
  );
}
