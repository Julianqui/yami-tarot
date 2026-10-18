import type { Video } from '@/lib/videos';

/** Material descargable: PDFs y apuntes que acompañan a los videos. */
export function MaterialsList({ items }: { items: Video[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-16">
      <span className="mono">Material</span>
      <h2 className="h-section mt-4 text-[clamp(1.6rem,4vw,2.2rem)]">Para descargar</h2>

      <ul className="mt-8 grid gap-3">
        {items.map((item) => (
          <li key={item.id} className="card flex flex-wrap items-center gap-4 p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 font-mono text-[0.7rem] text-accent">
              {item.src.toLowerCase().endsWith('.pdf') ? 'PDF' : 'IMG'}
            </span>

            <div className="min-w-[10rem] flex-1">
              <p className="text-[1.02rem] font-medium tracking-[-0.01em]">{item.title}</p>
              {item.description ? (
                <p className="mt-1 text-[0.9rem] leading-[1.55] text-muted">{item.description}</p>
              ) : null}
            </div>

            <div className="flex gap-2">
              <a
                href={item.src}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost px-4 py-1.5 text-[0.82rem]"
              >
                Ver
              </a>
              <a
                href={`${item.src}${item.src.includes('?') ? '&' : '?'}download=1`}
                className="btn btn-primary px-4 py-1.5 text-[0.82rem]"
              >
                Descargar
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
