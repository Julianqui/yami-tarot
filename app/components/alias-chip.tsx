'use client';

import { useState } from 'react';

/** Alias de Mercado Pago, clickeable para copiarlo. */
export function AliasChip({ alias }: { alias: string }) {
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
    <button
      type="button"
      onClick={copy}
      className="chip mt-3 w-full justify-between hover:border-text/40"
      aria-label={`Copiar alias ${alias}`}
    >
      <span className="font-mono text-[0.82rem] text-text">{alias}</span>
      <span className="mono text-teal">{copied ? '¡copiado!' : 'copiar'}</span>
    </button>
  );
}
