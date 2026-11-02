/** Monta o link wa.me. Retorna null quando o número não está configurado, para ocultar o botão. */
export function buildWhatsAppUrl(number: string, message: string): string | null {
  const digits = number.replace(/\D/g, '');
  if (digits.length < 10) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
