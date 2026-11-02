#!/usr/bin/env node
/**
 * Gera ilustrações arquitetônicas em SVG para os projetos demonstrativos.
 *
 * São placeholders originais, sem direitos de terceiros. Para um site real, substitua
 * cada arquivo por fotografia licenciada, mantendo o mesmo nome e proporção (4:3 ou 16:10).
 * Execute com: npm run assets
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'media', 'projects');
const W = 1600;
const H = 1000;

const PALETTES = {
  olive: { skyTop: '#ECEAE1', skyBottom: '#D3CDB5', light: '#D6D1BA', shade: '#8D8A6C', ground: '#6A6E4F', accent: '#C9B9A0', ink: '#2B2C22' },
  sand: { skyTop: '#F4EFE5', skyBottom: '#E2D3BD', light: '#E8DCC8', shade: '#A8937A', ground: '#C4B194', accent: '#8C7B62', ink: '#33291F' },
  stone: { skyTop: '#EFEFEC', skyBottom: '#D6D6D0', light: '#DCDBD4', shade: '#7F7E78', ground: '#9A998F', accent: '#B8B5A8', ink: '#1E1E1C' },
  greyed: { skyTop: '#DEDEDC', skyBottom: '#C6C6C3', light: '#C2C2BE', shade: '#7A7A77', ground: '#949490', accent: '#A8A8A4', ink: '#3A3A38' },
};

/** Gerador pseudoaleatório determinístico (Park–Miller), para saídas reproduzíveis. */
function random(seed) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

const n = (value) => value.toFixed(1);

function wrap(body, p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.skyTop}"/><stop offset="1" stop-color="${p.skyBottom}"/></linearGradient>
<linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.ground}"/><stop offset="1" stop-color="${p.shade}"/></linearGradient>
<linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.55"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="${p.skyBottom}"/></linearGradient>
</defs>
${body}
</svg>
`;
}

function exterior(p, seed, messy) {
  const r = random(seed);
  const hz = H * 0.7;
  const bw = W * (0.34 + r() * 0.12);
  const bh = H * (0.3 + r() * 0.12);
  const bx = W * (0.16 + r() * 0.18);
  const by = hz - bh;
  const d = W * 0.06;
  const pavH = bh * 0.48;
  const parts = [
    `<rect width="${W}" height="${H}" fill="url(#sky)"/>`,
    `<circle cx="${n(W * 0.8)}" cy="${n(H * 0.2)}" r="${n(W * 0.11)}" fill="#ffffff" opacity="0.35"/>`,
    `<rect y="${n(hz)}" width="${W}" height="${n(H - hz)}" fill="url(#ground)"/>`,
    `<polygon points="${n(bx)},${n(hz)} ${n(bx + bw)},${n(hz)} ${n(bx + bw + W * 0.26)},${n(hz + H * 0.06)} ${n(bx + W * 0.1)},${n(hz + H * 0.06)}" fill="${p.ink}" opacity="0.12"/>`,
    `<rect x="${n(bx - W * 0.2)}" y="${n(hz - pavH)}" width="${n(W * 0.17)}" height="${n(pavH)}" fill="${p.light}"/>`,
    `<polygon points="${n(bx - W * 0.03)},${n(hz - pavH)} ${n(bx - W * 0.03 + d * 0.5)},${n(hz - pavH - d * 0.4)} ${n(bx - W * 0.03 + d * 0.5)},${n(hz - d * 0.4)} ${n(bx - W * 0.03)},${n(hz)}" fill="${p.shade}"/>`,
    `<rect x="${n(bx)}" y="${n(by)}" width="${n(bw)}" height="${n(bh)}" fill="${p.light}"/>`,
    `<polygon points="${n(bx + bw)},${n(by)} ${n(bx + bw + d)},${n(by - d * 0.6)} ${n(bx + bw + d)},${n(hz - d * 0.6)} ${n(bx + bw)},${n(hz)}" fill="${p.shade}"/>`,
    `<polygon points="${n(bx)},${n(by)} ${n(bx + d)},${n(by - d * 0.6)} ${n(bx + bw + d)},${n(by - d * 0.6)} ${n(bx + bw)},${n(by)}" fill="${p.ink}" opacity="0.14"/>`,
  ];
  for (let i = 0; i < 3; i++) {
    const y = by + bh * (0.2 + i * 0.25);
    parts.push(`<rect x="${n(bx + bw * 0.08)}" y="${n(y)}" width="${n(bw * 0.84)}" height="${n(bh * 0.08)}" fill="${p.ink}" opacity="0.28"/>`);
  }
  parts.push(`<polygon points="${n(W * 0.56)},0 ${n(W * 0.7)},0 ${n(W * 0.3)},${H} ${n(W * 0.1)},${H}" fill="url(#beam)"/>`);
  if (messy) {
    parts.push(`<rect width="${W}" height="${H}" fill="#6b6b68" opacity="0.2"/>`);
    for (let k = 0; k < 9; k++) {
      const x = W * (0.05 + r() * 0.9);
      const y = H * (0.74 + r() * 0.22);
      parts.push(`<rect x="${n(x)}" y="${n(y)}" width="${n(W * 0.05)}" height="${n(H * 0.02)}" fill="${p.ink}" opacity="0.4"/>`);
    }
  }
  return wrap(parts.join('\n'), p);
}

function interior(p, seed, messy) {
  const r = random(seed);
  const floorY = H * 0.72;
  const wx = W * (0.52 + r() * 0.12);
  const ww = W * 0.26;
  const wy = H * 0.14;
  const wh = H * 0.44;
  const parts = [
    `<rect width="${W}" height="${n(floorY)}" fill="url(#sky)"/>`,
    `<rect y="${n(floorY)}" width="${W}" height="${n(H - floorY)}" fill="url(#ground)"/>`,
    `<rect x="${n(wx)}" y="${n(wy)}" width="${n(ww)}" height="${n(wh)}" fill="url(#glass)"/>`,
    `<line x1="${n(wx + ww / 2)}" y1="${n(wy)}" x2="${n(wx + ww / 2)}" y2="${n(wy + wh)}" stroke="${p.ink}" stroke-opacity="0.25" stroke-width="3"/>`,
    `<line x1="${n(wx)}" y1="${n(wy + wh * 0.45)}" x2="${n(wx + ww)}" y2="${n(wy + wh * 0.45)}" stroke="${p.ink}" stroke-opacity="0.25" stroke-width="3"/>`,
    `<polygon points="${n(wx)},${n(wy + wh)} ${n(wx + ww)},${n(wy + wh)} ${n(wx + ww + W * 0.12)},${H} ${n(wx - W * 0.05)},${H}" fill="#ffffff" opacity="0.18"/>`,
    `<polygon points="${n(W * 0.12)},${n(H * 0.9)} ${n(W * 0.78)},${n(H * 0.9)} ${n(W * 0.86)},${n(H * 0.98)} ${n(W * 0.04)},${n(H * 0.98)}" fill="${p.accent}" opacity="0.55"/>`,
    `<rect x="${n(W * 0.16)}" y="${n(floorY - H * 0.2)}" width="${n(W * 0.38)}" height="${n(H * 0.12)}" rx="${n(H * 0.03)}" fill="${p.shade}"/>`,
    `<rect x="${n(W * 0.16)}" y="${n(floorY - H * 0.1)}" width="${n(W * 0.38)}" height="${n(H * 0.1)}" rx="${n(H * 0.03)}" fill="${p.accent}"/>`,
    `<ellipse cx="${n(W * 0.66)}" cy="${n(floorY + H * 0.1)}" rx="${n(W * 0.09)}" ry="${n(H * 0.025)}" fill="${p.ink}" opacity="0.35"/>`,
    `<line x1="${n(W * 0.4)}" y1="0" x2="${n(W * 0.4)}" y2="${n(H * 0.2)}" stroke="${p.ink}" stroke-opacity="0.5" stroke-width="2"/>`,
    `<circle cx="${n(W * 0.4)}" cy="${n(H * 0.22)}" r="${n(H * 0.035)}" fill="${p.light}" stroke="${p.ink}" stroke-opacity="0.3"/>`,
    `<rect x="${n(W * 0.07)}" y="${n(H * 0.2)}" width="${n(W * 0.14)}" height="${n(H * 0.22)}" fill="${p.shade}" opacity="0.5"/>`,
  ];
  if (messy) {
    parts.push(`<rect width="${W}" height="${H}" fill="#6b6b68" opacity="0.22"/>`);
    parts.push(`<rect x="${n(W * 0.66)}" y="${n(H * 0.6)}" width="${n(W * 0.12)}" height="${n(H * 0.12)}" fill="#7d6d55"/>`);
    parts.push(`<rect x="${n(W * 0.8)}" y="${n(H * 0.66)}" width="${n(W * 0.1)}" height="${n(H * 0.1)}" fill="#8c7b62"/>`);
    for (let k = 0; k < 6; k++) {
      const y = H * (0.2 + r() * 0.5);
      parts.push(`<line x1="${n(W * 0.02)}" y1="${n(y)}" x2="${n(W * 0.3)}" y2="${n(y + H * 0.05)}" stroke="#2b2b28" stroke-opacity="0.35" stroke-width="4"/>`);
    }
  }
  return wrap(parts.join('\n'), p);
}

const PROJECTS = [
  { slug: 'casa-dunas', palette: 'olive', cover: 'exterior', gallery: ['interior', 'exterior', 'interior'], seed: 11 },
  { slug: 'pavilhao-oliveira', palette: 'sand', cover: 'exterior', gallery: ['exterior', 'interior', 'exterior'], seed: 23 },
  { slug: 'edificio-linha', palette: 'stone', cover: 'exterior', gallery: ['exterior', 'exterior', 'interior'], seed: 37 },
  { slug: 'galeria-pedra', palette: 'stone', cover: 'interior', gallery: ['exterior', 'interior', 'interior'], seed: 41 },
  { slug: 'apartamento-sete', palette: 'sand', cover: 'interior', gallery: ['interior', 'interior', 'exterior'], seed: 53 },
  { slug: 'loft-areia', palette: 'olive', cover: 'interior', gallery: ['interior', 'exterior', 'interior'], seed: 67, beforeAfter: true },
];

const render = (kind, palette, seed, messy = false) =>
  kind === 'exterior' ? exterior(palette, seed, messy) : interior(palette, seed, messy);

let written = 0;
for (const project of PROJECTS) {
  const dir = join(outDir, project.slug);
  mkdirSync(dir, { recursive: true });
  const palette = PALETTES[project.palette];
  const files = { 'cover.svg': render(project.cover, palette, project.seed) };
  project.gallery.forEach((kind, i) => {
    files[`gallery-${i + 1}.svg`] = render(kind, palette, project.seed + (i + 1) * 7);
  });
  if (project.beforeAfter) {
    files['before.svg'] = render('interior', PALETTES.greyed, project.seed, true);
    files['after.svg'] = render('interior', palette, project.seed);
  }
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(join(dir, name), content, 'utf8');
    written++;
  }
}
console.log(`Ilustrações geradas: ${written} arquivos em public/media/projects/`);
