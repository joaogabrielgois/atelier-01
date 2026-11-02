import { useEffect } from 'react';

/** Define título e descrição da página atual, para SEO e para leitores de tela. */
export function useDocumentMeta({ title, description }: { title: string; description: string }): void {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}
