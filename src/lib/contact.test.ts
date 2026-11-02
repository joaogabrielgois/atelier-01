import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildMailto, submitContact } from './contact';
import type { ContactValues } from './validation';

const values: ContactValues = {
  name: 'Ana Souza',
  email: 'ana@exemplo.com.br',
  phone: '',
  projectType: 'Consultoria',
  message: 'Gostaria de uma avaliação técnica do apartamento antes da compra.',
  consent: true,
};

const fakeFetch = (impl: () => Promise<unknown>) => ((..._args: unknown[]) => impl()) as unknown as typeof fetch;

describe('submitContact', () => {
  it('sem endpoint configurado não chama a rede e informa "not-configured"', async () => {
    let called = false;
    const result = await submitContact('', values, fakeFetch(async () => ((called = true), {})));
    assert.deepEqual(result, { ok: false, reason: 'not-configured' });
    assert.equal(called, false);
  });

  it('envia POST em JSON com origem e data de envio', async () => {
    let captured: { url: string; init: RequestInit } | undefined;
    const result = await submitContact(
      'https://forms.exemplo.com/abc',
      values,
      ((url: string, init: RequestInit) => {
        captured = { url, init };
        return Promise.resolve(new Response(null, { status: 200 }));
      }) as unknown as typeof fetch,
    );

    assert.deepEqual(result, { ok: true });
    assert.equal(captured?.url, 'https://forms.exemplo.com/abc');
    assert.equal(captured?.init.method, 'POST');
    const body = JSON.parse(String(captured?.init.body));
    assert.equal(body.email, values.email);
    assert.equal(body.origem, 'site');
    assert.ok(!Number.isNaN(Date.parse(body.enviadoEm)));
  });

  it('resposta de erro do servidor é reportada com o status', async () => {
    const result = await submitContact(
      'https://x.test',
      values,
      fakeFetch(async () => new Response(null, { status: 422 })),
    );
    assert.deepEqual(result, { ok: false, reason: 'server', status: 422 });
  });

  it('falha de rede é capturada e reportada', async () => {
    const result = await submitContact(
      'https://x.test',
      values,
      fakeFetch(async () => {
        throw new TypeError('Failed to fetch');
      }),
    );
    assert.deepEqual(result, { ok: false, reason: 'network' });
  });
});

describe('buildMailto', () => {
  it('monta o link com destinatário, assunto e corpo codificados', () => {
    const link = buildMailto('contato@exemplo.com.br', values);
    assert.ok(link.startsWith('mailto:contato@exemplo.com.br?subject='));
    const url = new URL(link);
    assert.equal(url.searchParams.get('subject'), 'Novo contato pelo site');
    assert.match(url.searchParams.get('body') ?? '', /Nome: Ana Souza/);
    assert.match(url.searchParams.get('body') ?? '', /Telefone: não informado/);
  });
});
