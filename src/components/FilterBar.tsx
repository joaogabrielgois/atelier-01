import { FILTERS, type CategoryFilter } from '../lib/projects';

const labels: Record<CategoryFilter, string> = {
  todos: 'Todos',
  residencial: 'Residencial',
  comercial: 'Comercial',
  interiores: 'Interiores',
};

interface FilterBarProps {
  value: CategoryFilter;
  counts: Record<CategoryFilter, number>;
  onChange: (value: CategoryFilter) => void;
}

export function FilterBar({ value, counts, onChange }: FilterBarProps) {
  return (
    <div role="group" aria-label="Filtrar projetos por categoria" className="flex flex-wrap gap-x-8 gap-y-3">
      {FILTERS.map((filter) => {
        const active = filter === value;
        return (
          <button
            key={filter}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(filter)}
            className={`border-b pb-1 text-base transition-colors duration-500 ${
              active ? 'border-olive text-olive' : 'border-transparent text-stone hover:text-ink'
            }`}
          >
            {labels[filter]}
            <span className="ml-2 text-sm opacity-70">{counts[filter]}</span>
          </button>
        );
      })}
    </div>
  );
}
