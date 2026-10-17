'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cartCount, cartTotal, useCart } from '@/lib/cart-store';
import { money } from '@/lib/format';

export function CartDrawer() {
  const { lines, isOpen, close, setQuantity, remove, add } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = cartTotal(lines);
  const count = cartCount(lines);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const checkout = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lines.map((l) => ({ id: l.id, quantity: l.quantity })),
          payer: email ? { name: name || undefined, email } : undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.url) {
        throw new Error(data?.error ?? 'No pudimos abrir el checkout. Probá de nuevo.');
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado.');
      setLoading(false);
    }
  };

  const field =
    'mt-1.5 w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[0.95rem] outline-none transition focus:border-text';

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div className="fixed inset-0 z-[70] flex justify-end p-0 sm:p-3">
          <motion.button
            type="button"
            aria-label="Cerrar carrito"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
          />

          <motion.aside
            role="dialog"
            aria-label="Carrito"
            initial={{ x: '104%' }}
            animate={{ x: 0 }}
            exit={{ x: '104%' }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-full w-[min(27rem,100vw)] flex-col bg-night sm:rounded-[1.5rem] sm:border sm:border-line"
          >
            <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <div>
                <p className="text-[1.05rem] font-medium tracking-[-0.01em]">Carrito</p>
                <p className="mono mt-0.5">
                  {count === 0 ? 'vacío' : `${count} ${count === 1 ? 'ítem' : 'ítems'}`}
                </p>
              </div>
              <button type="button" onClick={close} className="btn btn-ghost px-4 py-1.5 text-[0.85rem]">
                Cerrar
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="py-10">
                  <p className="text-[0.98rem] leading-[1.7] text-muted">
                    Todavía no agregaste nada. Elegí un servicio y volvé acá para pagar con Mercado
                    Pago.
                  </p>
                  <button type="button" onClick={close} className="btn btn-ghost mt-6">
                    Ver servicios
                  </button>
                </div>
              ) : (
                <ul className="grid gap-3">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="card p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-[1rem] font-medium tracking-[-0.01em]">
                              {line.name}
                            </h3>
                            <p className="mono mt-1">{money(line.price)} c/u</p>
                          </div>
                          <span className="text-[1.05rem] font-medium">
                            {money(line.price * line.quantity)}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-line p-1">
                            <button
                              type="button"
                              onClick={() => setQuantity(line.id, line.quantity - 1)}
                              aria-label="Restar uno"
                              className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-surface-2"
                            >
                              <span className="h-px w-3 bg-text" />
                            </button>
                            <span className="w-6 text-center text-[0.9rem] tabular-nums">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => add(line.id)}
                              aria-label="Sumar uno"
                              className="relative grid h-7 w-7 place-items-center rounded-full transition hover:bg-surface-2"
                            >
                              <span className="h-px w-3 bg-text" />
                              <span className="absolute h-3 w-px bg-text" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(line.id)}
                            className="text-[0.82rem] text-muted transition hover:text-accent"
                          >
                            Quitar
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {lines.length > 0 ? (
              <footer className="border-t border-line px-5 py-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="mono">
                    Nombre
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className={`${field} font-sans normal-case tracking-normal text-text`}
                    />
                  </label>
                  <label className="mono">
                    Email
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      autoComplete="email"
                      className={`${field} font-sans normal-case tracking-normal text-text`}
                    />
                  </label>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="mono">Total</span>
                  <span className="h-section text-[1.7rem]">{money(total)}</span>
                </div>

                {error ? (
                  <p className="mt-3 rounded-xl bg-surface-2 px-3.5 py-2.5 text-[0.85rem] text-accent">
                    {error}
                  </p>
                ) : null}

                <button
                  type="button"
                  onClick={checkout}
                  disabled={loading}
                  className="btn btn-primary mt-4 w-full"
                >
                  {loading ? 'Abriendo Mercado Pago…' : 'Pagar con Mercado Pago'}
                </button>

                <p className="note mt-3 text-center">
                  El pago se procesa en Mercado Pago y va directo a la cuenta de Yami.
                </p>
              </footer>
            ) : null}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
