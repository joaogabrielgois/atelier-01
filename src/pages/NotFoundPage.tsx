import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { buttonClass } from '../components/styles';

export function NotFoundPage() {
  useDocumentMeta({ title: 'Página não encontrada — ATELIER 01', description: 'Esta página não existe ou foi movida.' });
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col justify-center px-6 pt-32 md:px-10">
      <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-light leading-none">Página não encontrada</h1>
      <p className="mt-6 max-w-md text-lg text-stone">O endereço pode ter mudado. Volte à página inicial ou veja os projetos.</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link to="/" className={buttonClass}>Página inicial</Link>
        <Link to="/projetos" className={buttonClass}>Ver projetos</Link>
      </div>
    </section>
  );
}
