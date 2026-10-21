import Link from 'next/link';
import { money } from '@/lib/format';
import { activePromo, products } from '@/lib/products';
import { PromoBadge } from './promo-badge';
import { Reveal, SectionHead } from './reveal';

/** Un color por servicio, para que la grilla no sea una pared gris. */
const tints = ['#8b6dff', '#35c2b1', '#e8b765', '#ef7a9b', '#6d8bff', '#c98bff'];

export function Services() {
  return (
    <section id="servicios" className="mx-auto w-[min(1200px,92vw)] scroll-mt-24 py-20 sm:py-28">
      <SectionHead
        kicker="Servicios"
        title="Qué se puede reservar"
        standfirst="Elegís el servicio, pagás por Mercado Pago o PayPal y le mandás el comprobante por WhatsApp. Después coordinan día y hora."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => {
          const promo = activePromo(product);
          return (
          <Reveal key={product.id} delay={Math.min(index, 5) * 0.05} className="h-full">
            <article className="card card-hover relative flex h-full flex-col overflow-hidden p-6">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full opacity-40 blur-3xl"
                style={{ background: tints[index % tints.length] }}
              />
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${tints[index % tints.length]}, transparent)`,
                }}
              />
              <div className="relative flex items-start justify-between gap-4">
                <h3 className="h-section text-[1.6rem]">{product.name}</h3>
                {product.featured ? (
                  <span
                    className="mono rounded-full px-2.5 py-1 text-night"
                    style={{ background: tints[index % tints.length] }}
                  >
                    Más elegida
                  </span>
                ) : null}
              </div>

              <p className="mono relative mt-3" style={{ color: tints[index % tints.length] }}>
                {product.meta}
              </p>

              <p className="relative mt-4 text-[0.97rem] leading-[1.6] text-muted">
                {product.description}
              </p>

              <ul className="relative mt-5 flex flex-wrap gap-2">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="chip text-[0.76rem]">
                    {highlight}
                  </li>
                ))}
              </ul>

              {product.detailUrl ? (
                <Link
                  href={product.detailUrl}
                  className="relative mt-4 inline-block text-[0.85rem] text-muted underline decoration-muted/40 underline-offset-4 transition hover:text-text"
                >
                  Ver el programa completo
                </Link>
              ) : null}

              <div className="relative mt-auto flex flex-wrap items-end justify-between gap-4 pt-7">
                {promo ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-[1.05rem] text-muted line-through">
                      {money(product.price)}
                    </span>
                    <PromoBadge price={promo.price} note={promo.note} />
                  </div>
                ) : (
                  <span className="h-section gilded text-[1.9rem]">{money(product.price)}</span>
                )}
                <Link href={`/comprar/${product.id}`} className="btn btn-primary">
                  Comprar
                </Link>
              </div>
            </article>
          </Reveal>
          );
        })}
      </div>

    </section>
  );
}
