export const PROJECT_TYPES = [
  'Residencial',
  'Comercial',
  'Interiores',
  'Consultoria',
  'Acompanhamento de obra',
  'Outro',
] as const;

export interface ContactValues {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  consent: boolean;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Valida o formulário de contato. Retorna somente os campos com erro. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (values.name.trim().length < 3) {
    errors.name = 'Informe seu nome completo.';
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Informe um e-mail válido.';
  }

  const phoneDigits = values.phone.replace(/\D/g, '');
  if (values.phone.trim() !== '' && (phoneDigits.length < 10 || phoneDigits.length > 13)) {
    errors.phone = 'Informe o telefone com DDD, ou deixe o campo em branco.';
  }

  if (!(PROJECT_TYPES as readonly string[]).includes(values.projectType)) {
    errors.projectType = 'Escolha o tipo de projeto.';
  }

  const messageLength = values.message.trim().length;
  if (messageLength < 20) {
    errors.message = 'Conte um pouco sobre o projeto (mínimo de 20 caracteres).';
  } else if (messageLength > 2000) {
    errors.message = 'A mensagem está muito longa (máximo de 2000 caracteres).';
  }

  if (!values.consent) {
    errors.consent = 'Autorize o uso dos seus dados para receber o retorno.';
  }

  return errors;
}
