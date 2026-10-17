'use client';

import { useState } from 'react';

/** Alias de Mercado Pago con botón para copiarlo de un toque. */
export function CopyAlias({ alias }: { alias: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(alias);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full sm:w-auto">
      <p className="mono">Alias de Mercado Pago</p>
      <button
        type="button"
        onClick={copy}
        className="card card-hover mt-2 flex w-full items-center justify-between gap-4 px-5 py-4 sm:w-auto"
      >
        <span className="font-mono text-[1.05rem] tracking-[0.02em]">{alias}</span>
        <span className="mono text-teal">{copied ? '¡Copiado!' : 'Copiar'}</span>
      </button>
    </div>
  );
}
