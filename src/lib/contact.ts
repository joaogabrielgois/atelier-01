import type { ContactValues } from './validation';

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: 'not-configured' | 'server' | 'network'; status?: number };

/**
 * Envia o formulário para o endpoint configurado (POST JSON).
 * Sem endpoint, retorna "not-configured" e a interface oferece o envio por e-mail.
 */
export async function submitContact(
  endpoint: string,
  values: ContactValues,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (!endpoint) {
    return { ok: false, reason: 'not-configured' };
  }

  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...values,
        origem: 'site',
        enviadoEm: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return { ok: false, reason: 'server', status: response.status };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: 'network' };
  }
}

/** Monta um link mailto com os dados do formulário, como alternativa ao envio direto. */
export function buildMailto(email: string, values: ContactValues): string {
  const body = [
    `Nome: ${values.name}`,
    `E-mail: ${values.email}`,
    `Telefone: ${values.phone || 'não informado'}`,
    `Tipo de projeto: ${values.projectType}`,
    '',
    values.message,
  ].join('\n');

  return `mailto:${email}?subject=${encodeURIComponent('Novo contato pelo site')}&body=${encodeURIComponent(body)}`;
}
