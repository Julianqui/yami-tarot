'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cartCount, useCart } from '@/lib/cart-store';

const links = [
  { href: '#sobre', label: 'Sobre Yami' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#videos', label: 'Videos' },
  { href: '#preguntas', label: 'Preguntas' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lines = useCart((s) => s.lines);
  const openCart = useCart((s) => s.open);
  const count = cartCount(lines);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-night/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-[min(1200px,92vw)] items-center justify-between gap-6">
        <a href="#inicio" className="text-[1.05rem] font-medium tracking-[-0.02em]">
          Yami Tarot
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[0.9rem] text-muted transition hover:bg-surface-2 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={openCart} className="btn btn-ghost py-2 text-[0.88rem]">
            Carrito
            <span
              className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[0.7rem] ${
                count > 0 ? 'bg-text text-night' : 'bg-surface-2 text-muted'
              }`}
            >
              {count}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Menú"
            className="btn btn-ghost px-3 py-2 md:hidden"
          >
            <span className="flex h-3.5 w-4 flex-col justify-between">
              <span
                className={`h-px w-full bg-text transition ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`}
              />
              <span className={`h-px w-full bg-text transition ${menuOpen ? 'opacity-0' : ''}`} />
              <span
                className={`h-px w-full bg-text transition ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-night md:hidden"
          >
            <ul className="mx-auto w-[min(1200px,92vw)] py-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 text-[1.05rem] transition hover:bg-surface-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
