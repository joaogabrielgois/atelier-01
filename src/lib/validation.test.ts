import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, type ContactValues } from './validation';

const valid: ContactValues = {
  name: 'Ana Souza',
  email: 'ana@exemplo.com.br',
  phone: '(11) 98765-4321',
  projectType: 'Residencial',
  message: 'Queremos reformar a sala e a cozinha de um apartamento antigo.',
  consent: true,
};

describe('validateContact', () => {
  it('aceita um formulário completo e correto', () => {
    assert.deepEqual(validateContact(valid), {});
  });

  it('exige nome com pelo menos três caracteres', () => {
    assert.ok(validateContact({ ...valid, name: '  Al ' }).name);
    assert.equal(validateContact({ ...valid, name: 'Ana' }).name, undefined);
  });

  it('rejeita e-mails malformados', () => {
    for (const email of ['ana', 'ana@', 'ana@dominio', 'ana @x.com', '']) {
      assert.ok(validateContact({ ...valid, email }).email, email);
    }
  });

  it('telefone é opcional, mas quando preenchido precisa ter DDD', () => {
    assert.equal(validateContact({ ...valid, phone: '' }).phone, undefined);
    assert.ok(validateContact({ ...valid, phone: '12345' }).phone);
    assert.equal(validateContact({ ...valid, phone: '+55 11 98765-4321' }).phone, undefined);
  });

  it('exige um tipo de projeto da lista', () => {
    assert.ok(validateContact({ ...valid, projectType: '' }).projectType);
    assert.ok(validateContact({ ...valid, projectType: 'Qualquer coisa' }).projectType);
  });

  it('limita a mensagem entre 20 e 2000 caracteres', () => {
    assert.ok(validateContact({ ...valid, message: 'curta' }).message);
    assert.ok(validateContact({ ...valid, message: 'x'.repeat(2001) }).message);
    assert.equal(validateContact({ ...valid, message: 'x'.repeat(2000) }).message, undefined);
  });

  it('exige o consentimento para tratamento dos dados', () => {
    assert.ok(validateContact({ ...valid, consent: false }).consent);
  });

  it('retorna todos os erros de uma vez', () => {
    const errors = validateContact({ name: '', email: '', phone: '', projectType: '', message: '', consent: false });
    assert.deepEqual(Object.keys(errors).sort(), ['consent', 'email', 'message', 'name', 'projectType']);
  });
});
