'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SCOPE_ALL } from '@/lib/access-scope';
import type { Access } from '@/lib/accesses';

const fieldClass =
  'mt-2 w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 font-sans text-[0.95rem] normal-case tracking-normal text-text outline-none transition focus:border-text';

export function AccessesPanel({
  accesses,
  categories,
}: {
  accesses: Access[];
  categories: string[];
}) {
  const router = useRouter();
  const [label, setLabel] = useState('');
  const [scope, setScope] = useState(SCOPE_ALL);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const origin = typeof window === 'undefined' ? '' : window.location.origin;

  const create = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const response = await fetch('/api/accesos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label, scope }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error ?? 'No se pudo generar el acceso.');
      setLabel('');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado.');
    } finally {
      setBusy(false);
    }
  };

  const copy = async (access: Access) => {
    try {
      await navigator.clipboard.writeText(`${origin}/videos/${access.id}`);
      setCopiedId(access.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  const mutate = async (id: string, method: 'PATCH' | 'DELETE') => {
    setBusy(true);
    try {
      await fetch(`/api/accesos/${id}`, { method });
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <h2 className="h-section border-b border-line pb-4 text-[1.7rem]">
        Accesos <span className="text-accent">({accesses.filter((a) => !a.revokedAt).length})</span>
      </h2>
      <p className="mt-4 max-w-[60ch] text-[0.95rem] leading-[1.65] text-muted">
        Generá un link por persona. Cada uno es independiente: podés anular el de alguien sin
        afectar a las demás, y elegir qué categoría de videos ve.
      </p>

      <form onSubmit={create} className="card mt-6 grid gap-4 p-6 sm:grid-cols-[1.4fr_1fr_auto]">
        <label className="mono">
          Para quién
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Carla M."
            required
            className={fieldClass}
          />
        </label>

        <label className="mono">
          Qué puede ver
          <select value={scope} onChange={(e) => setScope(e.target.value)} className={fieldClass}>
            <option value={SCOPE_ALL}>Todos los videos</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={busy} className="btn btn-primary self-end">
          Generar link
        </button>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl bg-surface-2 px-3.5 py-2.5 text-[0.88rem] text-accent">
          {error}
        </p>
      ) : null}

      {accesses.length === 0 ? (
        <p className="mt-6 text-[0.92rem] text-muted">Todavía no generaste ningún acceso.</p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {accesses.map((access) => (
            <li
              key={access.id}
              className={`card flex flex-wrap items-center gap-4 p-4 ${
                access.revokedAt ? 'opacity-50' : ''
              }`}
            >
              <div className="min-w-[12rem] flex-1">
                <p className="text-[1.02rem] font-medium tracking-[-0.01em]">
                  {access.label}
                  {access.revokedAt ? <span className="mono ml-2">anulado</span> : null}
                </p>
                <p className="mono mt-1">
                  {access.scope === SCOPE_ALL ? 'todos los videos' : access.scope} ·{' '}
                  {access.createdAt.slice(0, 10)}
                </p>
                <p className="mt-1 truncate font-mono text-[0.78rem] text-muted">
                  {origin}/videos/{access.id}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {access.revokedAt ? null : (
                  <>
                    <button
                      type="button"
                      onClick={() => copy(access)}
                      className="btn btn-ghost px-4 py-1.5 text-[0.82rem]"
                    >
                      {copiedId === access.id ? '¡Copiado!' : 'Copiar link'}
                    </button>
                    <button
                      type="button"
                      onClick={() => mutate(access.id, 'PATCH')}
                      disabled={busy}
                      className="px-2 text-[0.82rem] text-muted transition hover:text-accent"
                    >
                      Anular
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => mutate(access.id, 'DELETE')}
                  disabled={busy}
                  className="px-2 text-[0.82rem] text-muted transition hover:text-accent"
                >
                  Borrar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
