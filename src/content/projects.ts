/**
 * Coleção de projetos demonstrativos. Cada projeto alimenta a listagem, a página de detalhe,
 * a navegação entre projetos e o comparador antes/depois (quando existir).
 * Para adicionar um projeto: inclua um objeto aqui e a pasta de imagens em public/media/projects/<slug>/.
 */

export type ProjectCategory = 'residencial' | 'comercial' | 'interiores';

export interface ProjectImage {
  readonly src: string;
  readonly alt: string;
}

export interface BeforeAfterComparison {
  readonly before: ProjectImage;
  readonly after: ProjectImage;
  readonly caption: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly location: string;
  readonly year: number;
  readonly area: string;
  readonly summary: string;
  readonly concept: string;
  readonly approach: string;
  readonly materials: readonly string[];
  readonly cover: ProjectImage;
  readonly gallery: readonly ProjectImage[];
  readonly beforeAfter?: BeforeAfterComparison;
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  residencial: 'Residencial',
  comercial: 'Comercial',
  interiores: 'Interiores',
};

const media = (slug: string, file: string, alt: string): ProjectImage => ({
  src: `/media/projects/${slug}/${file}`,
  alt,
});

export const projects: readonly Project[] = [
  {
    slug: 'casa-dunas',
    title: 'Casa das Dunas',
    category: 'residencial',
    location: 'Litoral Norte (localização demonstrativa)',
    year: 2025,
    area: '480 m²',
    summary: 'Dois volumes baixos ligados por um pátio coberto, abertos para a paisagem sem perder a privacidade.',
    concept:
      'A casa se organiza em dois volumes paralelos separados por um pátio. A circulação atravessa o pátio, e cada cômodo recebe luz de um lado só, o que mantém a fachada sóbria e o interior generoso.',
    approach:
      'O estudo de insolação e dos ventos dominantes definiu a orientação. As aberturas do poente foram dimensionadas para sombrear sem fechar a vista do mar.',
    materials: ['Concreto aparente', 'Madeira de demolição', 'Pedra local', 'Vidro de controle solar'],
    cover: media('casa-dunas', 'cover-conceitual.jpg', 'Imagem conceitual de uma casa de concreto e pedra aberta para um jardim tropical'),
    gallery: [
      media('casa-dunas', 'gallery-1.jpg', 'Sala de estar com parede de vidro voltada para o pátio'),
      media('casa-dunas', 'gallery-2.jpg', 'Vista externa do pátio coberto e da circulação entre os volumes'),
      media('casa-dunas', 'gallery-3.jpg', 'Cozinha integrada, com marcenaria em madeira reaproveitada'),
    ],
  },
  {
    slug: 'pavilhao-oliveira',
    title: 'Pavilhão Oliveira',
    category: 'residencial',
    location: 'Serra Gaúcha (localização demonstrativa)',
    year: 2024,
    area: '320 m²',
    summary: 'Ateliê e moradia que acompanham a inclinação do terreno e deixam o térreo livre para o jardim.',
    concept:
      'O volume principal segue a curva do terreno e se apoia em três pilares. O térreo fica livre para o jardim e para a garagem, e o piso superior se abre sobre a encosta.',
    approach:
      'A cobertura tem caimento voltado à captação de água da chuva. As esquadrias são de correr, para permitir ventilação cruzada em todos os ambientes.',
    materials: ['Aço corten', 'Tijolo aparente', 'Madeira de cumaru', 'Pedra basalto'],
    cover: media('pavilhao-oliveira', 'cover.jpg', 'Pavilhão de aço corten apoiado em pilares sobre o terreno inclinado'),
    gallery: [
      media('pavilhao-oliveira', 'gallery-1.jpg', 'Ateliê com pé-direito duplo e iluminação zenital'),
      media('pavilhao-oliveira', 'gallery-2.jpg', 'Térreo livre com jardim e acesso à garagem'),
      media('pavilhao-oliveira', 'gallery-3.jpg', 'Detalhe da fachada em tijolo aparente ao entardecer'),
    ],
  },
  {
    slug: 'edificio-linha',
    title: 'Edifício Linha',
    category: 'comercial',
    location: 'Centro (localização demonstrativa)',
    year: 2025,
    area: '2.400 m²',
    summary: 'Escritórios com fachada de lâminas que filtram a luz sem fechar a vista.',
    concept:
      'Lâminas horizontais de alumínio marcam um ritmo contínuo na fachada. Atrás delas, os andares são livres de pilares internos.',
    approach:
      'A planta é aberta, com núcleos de serviço concentrados. Foi pensada para que cerca de 40% dos postos possam ser reconfigurados a cada ano.',
    materials: ['Alumínio anodizado', 'Vidro laminado', 'Granito cinza', 'Forro de lã mineral'],
    cover: media('edificio-linha', 'cover.jpg', 'Fachada comercial em lâminas horizontais de alumínio'),
    gallery: [
      media('edificio-linha', 'gallery-1.jpg', 'Pavimento de escritórios com planta livre'),
      media('edificio-linha', 'gallery-2.jpg', 'Vista da rua pela fachada de lâminas'),
      media('edificio-linha', 'gallery-3.jpg', 'Hall de entrada com granito e iluminação indireta'),
    ],
  },
  {
    slug: 'galeria-pedra',
    title: 'Galeria Pedra',
    category: 'comercial',
    location: 'Bairro histórico (localização demonstrativa)',
    year: 2024,
    area: '610 m²',
    summary: 'Showroom de pedra e luz para a exposição de peças de design.',
    concept:
      'O espaço é uma sequência de salas de pé-direito alto, com paredes de pedra. A iluminação indireta destaca cada peça sem competir com ela.',
    approach:
      'O percurso não tem corredores. Pontos de parada foram previstos para a leitura de cada coleção, e o visitante pode voltar sem perder o caminho.',
    materials: ['Pedra mineira', 'Estuque de cal', 'Carvalho escovado', 'Trilhos de luz LED'],
    cover: media('galeria-pedra', 'cover.jpg', 'Sala de exposição com paredes de pedra e luz indireta'),
    gallery: [
      media('galeria-pedra', 'gallery-1.jpg', 'Entrada da galeria com fachada histórica restaurada'),
      media('galeria-pedra', 'gallery-2.jpg', 'Sala de coleção com peças em pedestais de carvalho'),
      media('galeria-pedra', 'gallery-3.jpg', 'Ponto de parada com banco e leitura sobre o percurso'),
    ],
  },
  {
    slug: 'apartamento-sete',
    title: 'Apartamento Sete',
    category: 'interiores',
    location: 'Centro antigo (localização demonstrativa)',
    year: 2025,
    area: '142 m²',
    summary: 'Reforma de um apartamento dos anos 1950 que recupera o pé-direito e a luz original.',
    concept:
      'A intervenção remove as paredes que cortavam a sala e devolve às janelas altas o protagonismo, com um único eixo de circulação.',
    approach:
      'A marcenaria sob medida ocupa as laterais e deixa o centro livre. A paleta de areia e cinza respeita os pisos hidráulicos preservados.',
    materials: ['Taco original restaurado', 'Marcenaria em freijó', 'Linho', 'Mármore travertino'],
    cover: media('apartamento-sete', 'cover.jpg', 'Sala reformada com janelas altas e marcenaria lateral'),
    gallery: [
      media('apartamento-sete', 'gallery-1.jpg', 'Sala com piso de taco restaurado e poltronas de linho'),
      media('apartamento-sete', 'gallery-2.jpg', 'Quarto com iluminação de cabeceira embutida'),
      media('apartamento-sete', 'gallery-3.jpg', 'Vista da varanda a partir da janela alta'),
    ],
  },
  {
    slug: 'loft-areia',
    title: 'Loft Areia',
    category: 'interiores',
    location: 'Zona portuária (localização demonstrativa)',
    year: 2026,
    area: '210 m²',
    summary: 'Um galpão convertido em loft. Este caso demonstrativo mostra o antes e o depois.',
    concept:
      'A estrutura metálica existente fica à vista. Os novos elementos são de tons areia e madeira clara, para que o espaço pareça ter sido sempre habitado.',
    approach:
      'As imagens conceituais apresentam o galpão e a proposta de transformação em loft.',
    materials: ['Estrutura metálica original', 'Reboco de cal', 'Madeira clara', 'Pintura mineral'],
    cover: media('loft-areia', 'cover.jpg', 'Loft com estrutura metálica à vista e tons de areia'),
    gallery: [
      media('loft-areia', 'gallery-1.jpg', 'Área de estar sob a estrutura metálica original'),
      media('loft-areia', 'gallery-2.jpg', 'Janelas do galpão com cortinas de linho'),
      media('loft-areia', 'gallery-3.jpg', 'Cozinha com bancada de madeira clara'),
    ],
    beforeAfter: {
      before: media('loft-areia', 'before.jpg', 'Galpão antes da reforma, com piso de concreto desgastado e paredes sem acabamento'),
      after: media('loft-areia', 'after.jpg', 'Loft depois da reforma, com estrutura metálica à vista e tons de areia'),
      caption: 'Arraste o controle para explorar as imagens conceituais do antes e do depois.',
    },
  },
];
