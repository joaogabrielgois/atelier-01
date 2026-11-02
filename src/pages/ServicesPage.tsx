import { Link } from 'react-router-dom';
import { services } from '../content/services';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { buttonClass } from '../components/styles';

// Tipo de projeto pré-selecionado no formulário ao pedir uma conversa sobre cada serviço.
const contactTypeBySlug: Record<string, string> = {
  arquitetura: 'Residencial',
  interiores: 'Interiores',
  consultoria: 'Consultoria',
  acompanhamento: 'Acompanhamento de obra',
};

export function ServicesPage() {
  useDocumentMeta({
    title: 'Serviços — ATELIER 01',
    description: 'Arquitetura, design de interiores, consultoria e acompanhamento de obra.',
  });

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-40 pt-40 md:px-10">
      <h1 className="font-display text-[clamp(3.5rem,9vw,8rem)] font-light leading-[0.95]">Serviços</h1>
      <p className="mt-10 max-w-xl text-xl text-stone">
        Atuamos do primeiro estudo à entrega técnica. Cada serviço pode ser contratado isoladamente ou em conjunto.
      </p>

      <div className="mt-32 space-y-40">
        {services.map((service, index) => (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`servico-${service.slug}`}
            className="scroll-mt-32 grid gap-12 border-t border-ink/15 pt-12 md:grid-cols-12"
          >
            <div className={index % 2 === 0 ? 'md:col-span-5' : 'md:col-span-5 md:col-start-8 md:order-2'}>
              <h2 id={`servico-${service.slug}`} data-reveal className="font-display text-5xl font-light md:text-6xl">
                {service.title}
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-stone">{service.summary}</p>
            </div>
            <div className={index % 2 === 0 ? 'md:col-span-6 md:col-start-7' : 'md:col-span-6 md:order-1'}>
              <h3 className="text-sm font-semibold">O que está incluído</h3>
              <ul className="mt-6 flex flex-col gap-4 text-lg">
                {service.included.map((item) => (
                  <li key={item} className="border-b border-ink/10 pb-4">{item}</li>
                ))}
              </ul>
              <Link to={`/contato?tipo=${encodeURIComponent(contactTypeBySlug[service.slug])}`} className={`${buttonClass} mt-10`}>
                Solicitar conversa sobre {service.title.toLowerCase()}
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
