'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? 'No pudimos validar la contraseña.');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card max-w-md p-7">
      <h2 className="h-section text-[1.6rem]">Entrar al panel</h2>
      <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">
        Solo para Yami. La contraseña es la que definiste en{' '}
        <code className="font-mono text-accent">ADMIN_PASSWORD</code>.
      </p>

      <label className="mono mt-7 block">
        Contraseña
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-2 w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 font-sans text-[0.95rem] normal-case tracking-normal text-text outline-none transition focus:border-text"
        />
      </label>

      {error ? (
        <p className="mt-4 rounded-xl bg-surface-2 px-3.5 py-2.5 text-[0.85rem] text-accent">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading || password.length === 0}
        className="btn btn-primary mt-6 w-full"
      >
        {loading ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  );
}
