import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { projects, CATEGORY_LABELS } from '../content/projects';
import { filterProjects, findProject, getAdjacentProjects, parseFilter, FILTERS } from './projects';

describe('dados dos projetos', () => {
  it('têm slugs únicos e no formato de URL', () => {
    const slugs = projects.map((p) => p.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    for (const slug of slugs) assert.match(slug, /^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('usam somente categorias conhecidas', () => {
    for (const project of projects) assert.ok(project.category in CATEGORY_LABELS, project.slug);
  });

  it('têm capa e pelo menos uma imagem de galeria com texto alternativo', () => {
    for (const project of projects) {
      assert.ok(project.cover.alt.length > 10, `alt da capa: ${project.slug}`);
      assert.ok(project.gallery.length >= 1, `galeria: ${project.slug}`);
      for (const image of project.gallery) {
        assert.ok(image.src.startsWith('/media/projects/'), image.src);
        assert.ok(image.alt.length > 0, `alt vazio: ${project.slug}`);
      }
    }
  });

  it('o comparador antes/depois tem as duas imagens com alt', () => {
    const withComparison = projects.filter((p) => p.beforeAfter);
    assert.ok(withComparison.length >= 1);
    for (const project of withComparison) {
      assert.ok(project.beforeAfter!.before.alt && project.beforeAfter!.after.alt);
    }
  });
});

describe('parseFilter', () => {
  it('aceita categorias válidas', () => {
    assert.equal(parseFilter('comercial'), 'comercial');
    assert.equal(parseFilter('interiores'), 'interiores');
  });

  it('retorna "todos" para valores ausentes ou inválidos', () => {
    assert.equal(parseFilter(null), 'todos');
    assert.equal(parseFilter(undefined), 'todos');
    assert.equal(parseFilter('<script>'), 'todos');
    assert.equal(parseFilter(''), 'todos');
  });

  it('cobre todas as opções exibidas na barra de filtros', () => {
    assert.deepEqual([...FILTERS], ['todos', 'residencial', 'comercial', 'interiores']);
  });
});

describe('filterProjects', () => {
  it('"todos" devolve a coleção inteira, como cópia', () => {
    const result = filterProjects(projects, 'todos');
    assert.equal(result.length, projects.length);
    assert.notEqual(result, projects);
  });

  it('filtra cada categoria e nenhum projeto de outra categoria aparece', () => {
    for (const category of ['residencial', 'comercial', 'interiores'] as const) {
      const result = filterProjects(projects, category);
      assert.ok(result.length > 0, category);
      assert.ok(result.every((p) => p.category === category));
    }
  });

  it('a soma das categorias é igual ao total', () => {
    const total = ['residencial', 'comercial', 'interiores']
      .map((c) => filterProjects(projects, c as 'residencial').length)
      .reduce((a, b) => a + b, 0);
    assert.equal(total, projects.length);
  });
});

describe('findProject', () => {
  it('encontra pelo slug e retorna undefined quando não existe', () => {
    assert.equal(findProject(projects, 'loft-areia')?.title, 'Loft Areia');
    assert.equal(findProject(projects, 'nao-existe'), undefined);
    assert.equal(findProject(projects, undefined), undefined);
  });
});

describe('getAdjacentProjects', () => {
  it('navega em ordem circular: o anterior do primeiro é o último', () => {
    const first = projects[0].slug;
    const last = projects[projects.length - 1].slug;
    assert.equal(getAdjacentProjects(projects, first).previous?.slug, last);
    assert.equal(getAdjacentProjects(projects, last).next?.slug, first);
  });

  it('o próximo do projeto atual é o seguinte na coleção', () => {
    const { next, previous } = getAdjacentProjects(projects, projects[2].slug);
    assert.equal(next?.slug, projects[3].slug);
    assert.equal(previous?.slug, projects[1].slug);
  });

  it('slug desconhecido não produz navegação', () => {
    assert.deepEqual(getAdjacentProjects(projects, 'x'), { previous: undefined, next: undefined });
  });
});
