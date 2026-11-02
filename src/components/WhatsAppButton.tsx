import { site } from '../content/site';
import { buildWhatsAppUrl } from '../lib/whatsapp';

export function WhatsAppButton() {
  const url = buildWhatsAppUrl(site.whatsappNumber, site.whatsappMessage);
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 bg-olive px-5 py-3 text-sm text-paper shadow-sm transition-colors duration-500 hover:bg-ink md:bottom-8 md:right-8"
    >
      Falar no WhatsApp
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}
