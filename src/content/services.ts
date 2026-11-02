export interface Service {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly included: readonly string[];
}

export const services: readonly Service[] = [
  {
    slug: 'arquitetura',
    title: 'Arquitetura',
    summary:
      'Do estudo de viabilidade ao projeto executivo. Cuidamos da forma, da função e das aprovações necessárias para construir ou reformar.',
    included: [
      'Levantamento e diagnóstico do terreno ou do imóvel',
      'Estudo preliminar com alternativas de implantação',
      'Projeto legal e acompanhamento das aprovações',
      'Projeto executivo e memorial descritivo',
    ],
  },
  {
    slug: 'interiores',
    title: 'Design de interiores',
    summary:
      'Planta, materiais, mobiliário sob medida e iluminação. Cada ambiente é pensado para a rotina de quem vai usá-lo.',
    included: [
      'Estudo de layout e circulação',
      'Paleta de materiais e acabamentos',
      'Projeto de marcenaria e mobiliário sob medida',
      'Projeto luminotécnico e especificação de peças',
    ],
  },
  {
    slug: 'consultoria',
    title: 'Consultoria',
    summary:
      'Uma leitura especializada antes de decidir. Ajudamos a avaliar imóveis, revisar projetos de terceiros e definir diretrizes.',
    included: [
      'Avaliação técnica de imóveis e terrenos',
      'Revisão de projetos desenvolvidos por terceiros',
      'Diretrizes de projeto e de programa de necessidades',
      'Orientação na escolha de materiais e fornecedores',
    ],
  },
  {
    slug: 'acompanhamento',
    title: 'Acompanhamento de obra',
    summary:
      'Presença técnica durante a execução. Conferimos o que foi projetado, controlamos prazos e garantimos a qualidade da entrega.',
    included: [
      'Visitas técnicas periódicas com relatório',
      'Cronograma de obra e gestão de fornecedores',
      'Controle de qualidade e conferência de acabamentos',
      'Entrega técnica com documentação do projeto como construído',
    ],
  },
];
