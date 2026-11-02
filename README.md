# ATELIER 01

Site premium fictício para um escritório de arquitetura e design de interiores. Foi construído como
template editável: troque os textos, os projetos e as imagens em `src/content/` e as variáveis de
ambiente para adaptá-lo a um cliente real.

> Todos os projetos, a equipe, o endereço e os contatos são **fictícios**. O site não cita premiações
> nem depoimentos.

## Stack

- React 19 + Vite 7 + TypeScript (strict)
- Tailwind CSS 4 (via `@tailwindcss/vite`, sem arquivo de configuração)
- GSAP + ScrollTrigger para revelações, parallax e o manifesto da home
- React Router 7 (rotas do lado do cliente, com `vercel.json` para o fallback de SPA)
- Testes com `node:test` executados por `tsx`, sem dependências extras

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero em tela cheia, manifesto com revelação por rolagem, projetos em destaque, serviços |
| `/projetos` | Coleção com filtros (residencial, comercial, interiores), prévia flutuante no desktop |
| `/projetos/:slug` | Conceito, abordagem, materiais, galeria com visualizador, comparador antes/depois, localização demonstrativa e navegação entre projetos |
| `/estudio` | Filosofia, equipe fictícia e metodologia |
| `/servicos` | Arquitetura, design de interiores, consultoria e acompanhamento de obra |
| `/contato` | Formulário validado, WhatsApp configurável e informações de contato |

## Começando

Requisitos: Node.js 20.19 ou superior (recomendado 22).

```bash
npm install            # gera o package-lock.json; faça commit dele
cp .env.example .env.local
npm run dev            # http://localhost:5173
```

### Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run typecheck` | Verificação de tipos com TypeScript |
| `npm test` | Testes da lógica de filtros, validação, contato e WhatsApp |
| `npm run build` | Type-check e build de produção em `dist/` |
| `npm run preview` | Serve o build localmente |
| `npm run assets` | Regenera as ilustrações placeholder em `public/media/projects/` |
| `npm run check` | Tipos + testes + build (o mesmo que roda no CI) |

## Variáveis de ambiente

Veja `.env.example`. Todas são opcionais; o site funciona sem elas.

| Variável | Uso |
| --- | --- |
| `VITE_SITE_URL` | Domínio público, usado em metadados e no sitemap |
| `VITE_CONTACT_ENDPOINT` | Endpoint que recebe o formulário por `POST` em JSON (Formspree, Web3Forms, função serverless etc.). Sem ele, o formulário oferece envio pelo aplicativo de e-mail |
| `VITE_CONTACT_EMAIL` | E-mail exibido no site e usado no envio alternativo |
| `VITE_WHATSAPP_NUMBER` | Número com DDI e DDD, só dígitos (ex.: `5511999999999`). Sem ele, o botão de WhatsApp não aparece |

As variáveis `VITE_*` são públicas no navegador. Não coloque segredos nelas.

## Como transformar o template em um site real

1. **Dados gerais**: `src/content/site.ts` (nome, endereço, horário, avisos).
2. **Projetos**: `src/content/projects.ts`. Para adicionar um projeto, inclua um objeto e a pasta de
   imagens. Os campos `slug` e `category` (`residencial`, `comercial` ou `interiores`) controlam URL e filtros.
3. **Serviços e estúdio**: `src/content/services.ts` e `src/content/studio.ts`.
4. **Imagens**: substitua os SVGs de `public/media/projects/<slug>/` por fotografias licenciadas, com
   o mesmo nome de arquivo e proporção (capa e galeria em 4:3 ou 16:10; comparador antes/depois com
   o mesmo enquadramento). Atualize o texto alternativo (`alt`) em `projects.ts` para descrever a foto real.
5. **Domínio**: atualize `public/sitemap.xml` e `public/robots.txt`.
6. **Cores e tipografia**: tokens em `src/index.css` (bloco `@theme`).

### Sobre as imagens

As ilustrações incluídas são placeholders originais, geradas por `scripts/generate-placeholders.mjs`.
Elas não são fotografias. Para um site de portfólio real, use fotografias próprias ou de bancos com
licença comercial explícita (verifique os termos de uso de cada imagem antes de publicar).

## Acessibilidade e desempenho

- Link "Pular para o conteúdo", foco visível e foco movido para o `<main>` a cada troca de página.
- Navegação por teclado no menu, na galeria (setas e Escape) e no comparador antes/depois (controle de intervalo).
- Movimento reduzido: as animações GSAP são desativadas e as transições CSS são encurtadas.
- Formulário com rótulos, `aria-invalid`, mensagens de erro associadas e região de status anunciada.
- Imagens com carregamento preguiçoso, decodificação assíncrona e formato SVG nos placeholders.
- Cabeçalhos `Cache-Control` de longa duração para `/media/*` e cabeçalhos de segurança básicos em `vercel.json`.

## Publicar no GitHub

```bash
git init
git add .
git commit -m "ATELIER 01: versão inicial"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/atelier-01.git
git push -u origin main
```

O workflow `.github/workflows/ci.yml` roda `npm ci` e `npm run check` em cada push e pull request.
Por isso, o `package-lock.json` precisa estar commitado.

## Publicar na Vercel

1. Em vercel.com, escolha **Add New > Project** e importe o repositório do GitHub.
2. Framework: **Vite** (detectado automaticamente pelo `vercel.json`). Build: `npm run build`. Saída: `dist`.
3. Em **Settings > Environment Variables**, cadastre as variáveis `VITE_*` do `.env.example`.
4. Faça o deploy. Depois, aponte o domínio personalizado em **Settings > Domains** e atualize `VITE_SITE_URL`.

O `vercel.json` já reescreve as rotas para `index.html`, para que links diretos como `/projetos/loft-areia` funcionem.

## Testes

```bash
npm test
```

Cobrem: validação do formulário, envio com endpoint (sucesso, erro de servidor, falha de rede e ausência
de configuração), link `mailto`, link do WhatsApp, filtros por categoria, navegação circular entre projetos
e integridade dos dados dos projetos (slugs únicos, textos alternativos, caminhos de imagem).

Os componentes visuais não têm testes automatizados neste template. Para incluí-los, adicione
Vitest com Testing Library ou Playwright.

## Estrutura

```
src/
  content/      dados editáveis (site, projetos, serviços, estúdio)
  components/   cabeçalho, rodapé, galeria, comparador, formulário, cards
  lib/          lógica pura (filtros, validação, contato, WhatsApp) e utilitários GSAP
  pages/        uma página por rota
scripts/        gerador das ilustrações placeholder
public/         favicon, robots, sitemap e ilustrações
```
