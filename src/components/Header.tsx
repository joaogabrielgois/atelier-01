import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/projetos', label: 'Projetos' },
  { to: '/estudio', label: 'Estúdio' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/contato', label: 'Contato' },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-1 text-sm tracking-wide transition-colors duration-500 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:bg-olive after:transition-transform after:duration-700 ${
    isActive ? 'text-olive after:scale-x-100' : 'text-ink after:scale-x-0 hover:after:scale-x-100'
  }`;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="font-display text-xl tracking-[0.3em] text-ink" aria-label="ATELIER 01, página inicial">
          ATELIER 01
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={navClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="text-sm tracking-wide md:hidden"
          aria-expanded={open}
          aria-controls="menu-movel"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Fechar' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav id="menu-movel" aria-label="Principal, celular" className="fixed inset-x-0 bottom-0 top-20 bg-paper md:hidden">
          <ul className="flex flex-col gap-6 px-6 pt-10">
            <li>
              <NavLink to="/" end onClick={() => setOpen(false)} className="font-display text-5xl font-light">
                Início
              </NavLink>
            </li>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} onClick={() => setOpen(false)} className="font-display text-5xl font-light">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
