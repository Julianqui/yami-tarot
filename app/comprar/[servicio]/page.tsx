import Link from 'next/link';
import { notFound } from 'next/navigation';
import { money } from '@/lib/format';
import { findProduct, products } from '@/lib/products';
import { paypalLink, site, whatsappLink } from '@/lib/site';
import { CopyAlias } from './copy-alias';

export function generateStaticParams() {
  return products.map((product) => ({ servicio: product.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ servicio: string }> }) {
  const { servicio } = await params;
  const product = findProduct(servicio);
  return {
    title: product ? `Comprar ${product.name} · Yami Tarot` : 'Comprar · Yami Tarot',
  };
}

export default async function ComprarPage({ params }: { params: Promise<{ servicio: string }> }) {
  const { servicio } = await params;
  const product = findProduct(servicio);
  if (!product) notFound();

  const steps = [
    {
      title: 'Pagá el importe',
      body: `Mandá ${money(product.price)} al alias de Mercado Pago de Yami, desde cualquier banco o billetera. Si estás fuera de Argentina, podés usar PayPal.`,
    },
    {
      title: 'Mandale el comprobante',
      body: 'Escribile por WhatsApp con la captura de la transferencia y decile qué servicio compraste.',
    },
    {
      title: 'Coordinan y listo',
      body: 'Yami te confirma, acuerdan día y horario, y te manda por mail el acceso a los videos cuando corresponde.',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aura -left-24 -top-28 h-[26rem] w-[26rem] bg-amethyst/30" />
        <div className="aura -right-20 top-40 h-[22rem] w-[22rem] bg-teal/20" />
      </div>

      <div className="relative mx-auto w-[min(900px,92vw)] py-16 sm:py-24">
        <Link href="/#servicios" className="mono link-underline">
          ← Volver a servicios
        </Link>

        <div className="card mt-8 overflow-hidden p-7 sm:p-10">
          <span className="mono text-teal">{product.meta}</span>
          <h1 className="h-display mt-4 text-[clamp(2.2rem,6vw,3.4rem)]">{product.name}</h1>
          <p className="mt-4 max-w-[52ch] text-[1.02rem] leading-[1.7] text-muted">
            {product.description}
          </p>

          <div className="mt-8 border-t border-line pt-8">
            <p className="mono">Total</p>
            <p className="h-display gilded mt-2 text-[clamp(2.4rem,7vw,3.6rem)]">
              {money(product.price)}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <CopyAlias alias={site.alias} />

              <div>
                <p className="mono">Desde el exterior</p>
                <a
                  href={paypalLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="card card-hover mt-2 flex items-center justify-between gap-4 px-5 py-4"
                >
                  <span className="font-mono text-[1.05rem] tracking-[0.02em]">
                    PayPal · @{site.paypal}
                  </span>
                  <span className="mono text-teal">Abrir</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="card p-6">
              <span className="gilded text-[1.8rem] font-medium tracking-[-0.03em]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-3 text-[1.05rem] font-medium tracking-[-0.01em]">{step.title}</h2>
              <p className="mt-2 text-[0.92rem] leading-[1.6] text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={whatsappLink(
              `Hola Yami! Pagué ${product.name} (${money(product.price)}). Te paso el comprobante.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Enviar comprobante por WhatsApp
          </a>
          {product.detailUrl ? (
            <Link href={product.detailUrl} className="btn btn-ghost">
              Ver el detalle
            </Link>
          ) : null}
        </div>

        <p className="note mt-8 max-w-[62ch]">
          El pago se hace directo a la cuenta de Yami, por Mercado Pago o PayPal: este sitio no
          procesa pagos ni guarda tus datos. Si preferís otro medio, escribile por WhatsApp al{' '}
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="link-underline">
            +{site.whatsapp}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
