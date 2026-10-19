'use client';

import { useState } from 'react';

const field =
  'mt-2 w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 font-sans text-[0.95rem] normal-case tracking-normal text-text outline-none transition focus:border-text';

export function ChangePassword({
  enabled,
  standalone = false,
}: {
  enabled: boolean;
  standalone?: boolean;
}) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [repeat, setRepeat] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (next !== repeat) {
      setMessage({ kind: 'error', text: 'Las dos contraseñas nuevas no coinciden.' });
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current, next }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error ?? 'No se pudo cambiar.');
      setMessage({ kind: 'ok', text: 'Contraseña cambiada. Usá la nueva la próxima vez.' });
      setCurrent('');
      setNext('');
      setRepeat('');
    } catch (error) {
      setMessage({
        kind: 'error',
        text: error instanceof Error ? error.message : 'Error inesperado.',
      });
    } finally {
      setBusy(false);
    }
  };

  if (!enabled) {
    return (
      <section>
        {standalone ? null : (
          <h2 className="h-section border-b border-line pb-4 text-[1.7rem]">Contraseña</h2>
        )}
        <div className="slot mt-6 p-6 pt-12" data-note="Falta configurar">
          <p className="note">
            Definí <code>ADMIN_SECRET</code> en las variables de entorno: con esa clave se cifra la
            contraseña guardada.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      {standalone ? null : (
        <h2 className="h-section border-b border-line pb-4 text-[1.7rem]">Contraseña</h2>
      )}
      <p className={`max-w-[60ch] text-[0.95rem] leading-[1.65] text-muted ${standalone ? '' : 'mt-4'}`}>
        Al cambiarla se cierran las sesiones abiertas en otros dispositivos. Esta queda activa.
      </p>

      <form onSubmit={submit} className="card mt-6 grid gap-4 p-6 sm:grid-cols-3">
        <label className="mono">
          Contraseña actual
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
            className={field}
          />
        </label>
        <label className="mono">
          Nueva
          <input
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
            minLength={8}
            className={field}
          />
        </label>
        <label className="mono">
          Repetir la nueva
          <input
            type="password"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
            required
            minLength={8}
            className={field}
          />
        </label>

        <div className="sm:col-span-3">
          {message ? (
            <p
              className={`mb-4 rounded-xl bg-surface-2 px-3.5 py-2.5 text-[0.88rem] ${
                message.kind === 'ok' ? 'text-teal' : 'text-accent'
              }`}
            >
              {message.text}
            </p>
          ) : null}
          <button type="submit" disabled={busy} className="btn btn-primary">
            {busy ? 'Guardando…' : 'Cambiar contraseña'}
          </button>
        </div>
      </form>
    </section>
  );
}
