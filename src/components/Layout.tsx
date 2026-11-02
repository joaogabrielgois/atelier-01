import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { useGsap } from '../lib/useGsap';
import { revealOnScroll } from '../lib/reveal';

export function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // A cada troca de página: volta ao topo e move o foco para o conteúdo, para leitores de tela.
  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  useGsap(mainRef, (root, reduce) => revealOnScroll(root, reduce), [pathname]);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" ref={mainRef} tabIndex={-1} className="min-h-screen outline-none">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
