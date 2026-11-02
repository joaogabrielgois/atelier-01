/** Lê uma variável de ambiente opcional, com valor padrão quando vazia. */
export function readEnv(value: string | undefined, fallback = ''): string {
  const trimmed = (value ?? '').trim();
  return trimmed === '' ? fallback : trimmed;
}
