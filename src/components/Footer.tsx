import { Link } from 'react-router-dom';
import { site } from '../content/site';

export function Footer() {
  return (
    <footer className="border-t border-ink/15">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-20 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="font-display text-4xl font-light tracking-[0.2em]">ATELIER 01</p>
          <p className="mt-5 max-w-sm text-stone">{site.description}</p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3 md:col-start-7">
          <p className="text-sm font-semibold">Navegação</p>
          <ul className="mt-5 flex flex-col gap-3 text-stone">
            <li><Link to="/projetos" className="hover:text-ink">Projetos</Link></li>
            <li><Link to="/estudio" className="hover:text-ink">Estúdio</Link></li>
            <li><Link to="/servicos" className="hover:text-ink">Serviços</Link></li>
            <li><Link to="/contato" className="hover:text-ink">Contato</Link></li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-sm font-semibold">Contato</p>
          <ul className="mt-5 flex flex-col gap-3 text-stone">
            <li>{site.address}</li>
            <li><a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a></li>
            <li><a href={`tel:${site.phoneHref}`} className="hover:text-ink">{site.phone}</a></li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] px-6 pb-10 text-xs text-stone md:px-10">
        © {new Date().getFullYear()} {site.legalName}. {site.demoNotice}
      </p>
    </footer>
  );
}
