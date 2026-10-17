import { instagramLink, site, whatsappLink } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer id="contacto" className="scroll-mt-24 px-[4vw] pb-10 pt-10">
      <div className="card mx-auto w-[min(1200px,92vw)] px-7 py-14 sm:px-14 sm:py-20">
        <span className="mono">Reservas</span>
        <h2 className="h-display mt-6 text-[clamp(2.3rem,6vw,4.2rem)]">
          Las cartas ya están{' '}
          <br className="hidden sm:block" />
          sobre la mesa.
        </h2>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#servicios" className="btn btn-primary">
            Ver servicios
          </a>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-ghost">
            Escribir por WhatsApp
          </a>
        </div>

        <dl className="mt-14 grid gap-6 border-t border-line pt-10 sm:grid-cols-3">
          {[
            ['WhatsApp', `+${site.whatsapp}`, whatsappLink()],
            ['Instagram', `@${site.instagram}`, instagramLink()],
            ['Mail', site.email, `mailto:${site.email}`],
          ].map(([label, value, href]) => (
            <div key={label}>
              <dt className="mono">{label}</dt>
              <dd className="mt-2">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-[1.02rem]"
                >
                  {value}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <p className="note mt-8">
          Datos de contacto de ejemplo: se editan en <code>lib/site.ts</code>.
        </p>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[0.78rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Las lecturas son un espacio de
            acompañamiento y no reemplazan atención profesional.
          </p>
          <a href="/admin" className="transition hover:text-text">
            Panel
          </a>
        </div>
      </div>
    </footer>
  );
}
