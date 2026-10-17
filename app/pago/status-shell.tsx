import Link from 'next/link';
import { whatsappLink } from '@/lib/site';

export function StatusShell({
  kicker,
  title,
  description,
  details,
}: {
  kicker: string;
  title: string;
  description: string;
  details?: Record<string, string | undefined>;
}) {
  const entries = Object.entries(details ?? {}).filter(([, value]) => Boolean(value));

  return (
    <div className="mx-auto grid min-h-[100svh] w-[min(760px,92vw)] place-items-center py-16">
      <div className="card w-full p-8 sm:p-12">
        <span className="mono">{kicker}</span>
        <h1 className="h-display mt-5 text-[clamp(2rem,5.5vw,3.2rem)]">{title}</h1>
        <p className="mt-5 max-w-[54ch] text-[1.02rem] leading-[1.7] text-muted">{description}</p>

        {entries.length > 0 ? (
          <dl className="mt-8 grid gap-2 rounded-2xl bg-surface-2 p-5">
            {entries.map(([key, value]) => (
              <div key={key} className="flex items-center justify-between gap-6">
                <dt className="mono">{key}</dt>
                <dd className="font-mono text-[0.82rem]">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={whatsappLink('Hola Yami! Acabo de pagar mi lectura')}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Coordinar por WhatsApp
          </a>
          <Link href="/" className="btn btn-ghost">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
