'use client';

import { useState } from 'react';

/** Link privado de la videoteca, listo para copiar y pegar en un mail. */
export function PrivateLink({ slug }: { slug?: string }) {
  const [copied, setCopied] = useState(false);

  if (!slug) {
    return (
      <div className="slot mt-8 p-6 pt-12" data-note="Falta configurar">
        <p className="note">
          Definí <code>VIDEOS_SLUG</code> en las variables de entorno para habilitar la página
          privada de videos.
        </p>
      </div>
    );
  }

  const url =
    typeof window === 'undefined' ? `/videos/${slug}` : `${window.location.origin}/videos/${slug}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="card mt-8 flex flex-wrap items-center justify-between gap-4 p-5">
      <div className="min-w-0">
        <p className="mono text-teal">Link privado para mandar por mail</p>
        <p className="mt-2 truncate font-mono text-[0.9rem]">{url}</p>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={copy} className="btn btn-ghost py-2 text-[0.85rem]">
          {copied ? '¡Copiado!' : 'Copiar'}
        </button>
        <a
          href={`/videos/${slug}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary py-2 text-[0.85rem]"
        >
          Abrir
        </a>
      </div>
    </div>
  );
}
