import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { buttonClass, primaryButtonClass } from '../components/styles';
import { projects } from '../content/projects';
import { services } from '../content/services';
import { gsap } from '../lib/gsap';
import { useGsap } from '../lib/useGsap';
import { useDocumentMeta } from '../lib/useDocumentMeta';

const hero = projects[0];
const featured = projects.slice(0, 3);
const manifesto =
  'Desenhamos espaços para quem sabe que o essencial se percebe aos poucos. Trabalhamos com luz natural, materiais que envelhecem com dignidade e implantações que respeitam o terreno. Cada projeto começa com uma escuta longa e termina numa obra acompanhada de perto.';
const sentences = manifesto.match(/[^.]+\.?/g)?.map((s) => s.trim()) ?? [manifesto];

export function HomePage() {
  useDocumentMeta({
    title: 'ATELIER 01 — Arquitetura e design de interiores',
    description: 'Espaços que pedem silêncio. Projetos residenciais, comerciais e de interiores, com acompanhamento de obra.',
  });

  const heroRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);

  // Abertura única da página: a imagem se acomoda e as linhas do título sobem.
  useGsap(
    heroRef,
    (root, reduce) => {
      if (reduce) return;
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .fromTo(root.querySelector('[data-hero-image]'), { scale: 1.12 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, 0)
        .from(root.querySelectorAll('[data-line]'), { yPercent: 110, duration: 1.4, stagger: 0.12 }, 0.3)
        .from(root.querySelectorAll('[data-sub]'), { opacity: 0, y: 16, duration: 1 }, 1.1);
    },
    [],
  );

  // Manifesto: cada frase se acende conforme a rolagem.
  useGsap(
    manifestoRef,
    (root, reduce) => {
      if (reduce) return;
      gsap.fromTo(
        root.querySelectorAll('[data-sentence]'),
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.5,
          scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom 60%', scrub: true },
        },
      );
    },
    [],
  );

  return (
    <>
      <section ref={heroRef} aria-labelledby="titulo-inicial" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-paper-deep">
        <img
          data-hero-image
          src={hero.cover.src}
          alt={hero.cover.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-paper/90 via-paper/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-6 pb-14 md:px-10 md:pb-20">
          <h1 id="titulo-inicial" className="font-display text-[clamp(3.2rem,10vw,9.5rem)] font-light leading-[0.92]">
            <span className="block overflow-hidden"><span data-line className="block">Espaços que</span></span>
            <span className="block overflow-hidden"><span data-line className="block pl-[12vw]">pedem silêncio.</span></span>
          </h1>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p data-sub className="max-w-md text-lg text-stone">
              Arquitetura e interiores para residências, escritórios e espaços comerciais.
            </p>
            <Link to="/projetos" className={buttonClass}>Ver projetos</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-40 md:px-10">
        <p ref={manifestoRef} className="max-w-[24ch] font-display text-[clamp(2rem,4.6vw,4.5rem)] font-light leading-[1.12]">
          {sentences.map((sentence) => (
            <span key={sentence} data-sentence className="inline">{sentence} </span>
          ))}
        </p>
      </section>

      <section aria-labelledby="destaques" className="mx-auto max-w-[1440px] px-6 pb-40 md:px-10">
        <div data-reveal className="mb-16 flex items-end justify-between gap-6">
          <h2 id="destaques" className="font-display text-5xl font-light md:text-6xl">Projetos em destaque</h2>
          <Link to="/projetos" className="hidden text-sm underline-offset-4 hover:underline md:inline">Todos os projetos</Link>
        </div>
        <div className="grid grid-cols-1 gap-y-20 md:grid-cols-12 md:gap-x-8">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              aspect={i === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]'}
              className={
                i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-4 md:col-start-9 md:mt-40' : 'md:col-span-8 md:mt-24'
              }
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="servicos-resumo" className="mx-auto max-w-[1440px] px-6 pb-40 md:px-10">
        <h2 id="servicos-resumo" data-reveal className="mb-12 font-display text-5xl font-light md:text-6xl">Como podemos ajudar</h2>
        <ul className="border-t border-ink/15">
          {services.map((service) => (
            <li key={service.slug} className="border-b border-ink/15">
              <Link
                to={`/servicos#${service.slug}`}
                className="group grid gap-4 py-8 md:grid-cols-12 md:items-baseline"
              >
                <span className="font-display text-3xl font-light md:col-span-4 md:text-4xl">{service.title}</span>
                <span className="text-stone md:col-span-7">{service.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="convite" className="bg-olive text-paper">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-32 md:flex-row md:items-end md:justify-between md:px-10">
          <h2 id="convite" data-reveal className="max-w-xl font-display text-5xl font-light leading-tight md:text-7xl">
            Vamos conversar sobre o seu espaço.
          </h2>
          <Link to="/contato" className={`${primaryButtonClass} bg-paper text-olive hover:bg-sand hover:text-ink`}>
            Entrar em contato
          </Link>
        </div>
      </section>
    </>
  );
}
