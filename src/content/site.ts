/**
 * Dados gerais do site. Edite aqui para transformar o template em um site real.
 * Valores sensíveis e específicos de cada ambiente ficam em variáveis VITE_* (ver .env.example).
 */
import { readEnv } from '../lib/env';

export const site = {
  name: 'ATELIER 01',
  legalName: 'ATELIER 01 Arquitetura e Interiores Ltda.',
  descriptor: 'Arquitetura e design de interiores',
  description:
    'Escritório de arquitetura e design de interiores. Projetos residenciais, comerciais e de interiores, com acompanhamento de obra do primeiro esboço à entrega.',
  url: readEnv(import.meta.env.VITE_SITE_URL, 'https://www.exemplo.com.br'),
  email: readEnv(import.meta.env.VITE_CONTACT_EMAIL, 'contato@exemplo.com.br'),
  phone: '+55 (11) 0000-0000',
  phoneHref: '+551100000000',
  address: 'Rua Exemplo, 123 — Jardim Demonstrativo, São Paulo, SP',
  hours: 'Segunda a sexta, das 9h às 18h',
  contactEndpoint: readEnv(import.meta.env.VITE_CONTACT_ENDPOINT),
  whatsappNumber: readEnv(import.meta.env.VITE_WHATSAPP_NUMBER).replace(/\D/g, ''),
  whatsappMessage: 'Olá! Gostaria de conversar sobre um projeto com o ATELIER 01.',
  demoNotice:
    'Projetos, equipe, endereço e contatos deste site são fictícios e servem como modelo para um escritório real.',
} as const;
