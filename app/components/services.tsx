'use client';

import { money } from '@/lib/format';
import { products } from '@/lib/products';
import { useCart } from '@/lib/cart-store';
import { Reveal, SectionHead } from './reveal';

export function Services() {
  const add = useCart((s) => s.add);

  return (
    <section id="servicios" className="mx-auto w-[min(1200px,92vw)] scroll-mt-24 py-20 sm:py-28">
      <SectionHead
        kicker="Servicios"
        title="Qué se puede reservar"
        standfirst="Sumás lo que necesitás al carrito y pagás con Mercado Pago: tarjeta, débito, dinero en cuenta o efectivo. Después coordinan día y hora."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.id} delay={Math.min(index, 5) * 0.05} className="h-full">
            <article className="card card-hover flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="h-section text-[1.6rem]">{product.name}</h3>
                {product.featured ? (
                  <span className="mono rounded-full bg-surface-2 px-2.5 py-1 text-text">
                    Más elegida
                  </span>
                ) : null}
              </div>

              <p className="mono mt-3">{product.meta}</p>

              <p className="mt-4 text-[0.97rem] leading-[1.6] text-muted">{product.description}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="chip text-[0.76rem]">
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                <span className="h-section text-[1.9rem]">{money(product.price)}</span>
                <button type="button" onClick={() => add(product.id)} className="btn btn-primary">
                  Agregar
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="note mt-8">
        Precios y descripciones de ejemplo: se editan en <code>lib/products.ts</code>. ¿No sabés
        cuál te sirve?{' '}
        <a href="#contacto" className="link-underline text-text">
          Escribile a Yami
        </a>
        .
      </p>
    </section>
  );
}
