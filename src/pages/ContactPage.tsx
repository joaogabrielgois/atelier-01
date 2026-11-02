import { ContactForm } from '../components/ContactForm';
import { site } from '../content/site';
import { buildWhatsAppUrl } from '../lib/whatsapp';
import { useDocumentMeta } from '../lib/useDocumentMeta';

export function ContactPage() {
  useDocumentMeta({
    title: 'Contato — ATELIER 01',
    description: 'Entre em contato com o ATELIER 01 para conversar sobre o seu projeto.',
  });
  const whatsapp = buildWhatsAppUrl(site.whatsappNumber, site.whatsappMessage);

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-40 pt-40 md:px-10">
      <div className="grid gap-20 md:grid-cols-12">
        <aside className="md:col-span-4">
          <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] font-light leading-[0.95]">Conte-nos sobre o seu espaço.</h1>
          <dl className="mt-16 space-y-8 text-lg">
            <div><dt className="text-sm text-stone">Endereço</dt><dd className="mt-1">{site.address}</dd></div>
            <div><dt className="text-sm text-stone">E-mail</dt><dd className="mt-1"><a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a></dd></div>
            <div><dt className="text-sm text-stone">Telefone</dt><dd className="mt-1"><a href={`tel:${site.phoneHref}`} className="underline underline-offset-4">{site.phone}</a></dd></div>
            <div><dt className="text-sm text-stone">Atendimento</dt><dd className="mt-1">{site.hours}</dd></div>
          </dl>
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-12 inline-block border-b border-olive pb-1 text-olive">
              Conversar pelo WhatsApp <span className="sr-only">(abre em nova aba)</span>
            </a>
          )}
        </aside>
        <div className="md:col-span-7 md:col-start-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
