import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppUrl } from './whatsapp';

describe('buildWhatsAppUrl', () => {
  it('monta o link wa.me com somente dígitos e mensagem codificada', () => {
    const url = buildWhatsAppUrl('+55 (11) 99999-0000', 'Olá, tudo bem?');
    assert.equal(url, 'https://wa.me/5511999990000?text=Ol%C3%A1%2C%20tudo%20bem%3F');
  });

  it('retorna null quando o número não está configurado ou é curto demais', () => {
    assert.equal(buildWhatsAppUrl('', 'oi'), null);
    assert.equal(buildWhatsAppUrl('123', 'oi'), null);
  });
});
