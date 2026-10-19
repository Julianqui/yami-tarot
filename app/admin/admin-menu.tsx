'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/** Avatar con menú: cambiar contraseña y salir. */
export function AdminMenu({ initial = 'Y' }: { initial?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    setOpen(false);
    router.refresh();
  };

  return (
    <div ref={container} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menú de la cuenta"
        className="grid h-11 w-11 place-items-center rounded-full border border-line bg-[linear-gradient(140deg,#8b6dff,#e8b765)] text-[1rem] font-medium text-night transition hover:brightness-110"
      >
        {initial}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="card absolute right-0 z-50 mt-2 w-56 overflow-hidden p-1.5"
          >
            <Link
              href="/admin/contrasena"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3.5 py-2.5 text-[0.92rem] transition hover:bg-surface-2"
            >
              Cambiar contraseña
            </Link>
            <Link
              href="/"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3.5 py-2.5 text-[0.92rem] transition hover:bg-surface-2"
            >
              Ver el sitio
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={logout}
              className="mt-1 block w-full rounded-xl border-t border-line px-3.5 py-2.5 text-left text-[0.92rem] text-muted transition hover:bg-surface-2 hover:text-accent"
            >
              Salir
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
