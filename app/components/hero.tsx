/* eslint-disable @next/next/no-img-element */
import { Reveal } from './reveal';

const facts = ['Sesiones por videollamada', 'Video privado en 48 h', 'Pago con Mercado Pago'];

export function Hero({ portrait }: { portrait: string | null }) {
  return (
    <section id="inicio" className="mx-auto w-[min(1200px,92vw)] pb-24 pt-14 sm:pb-32 sm:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Agenda abierta · consultas online
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="h-display mt-7 text-[clamp(3rem,7.5vw,5.6rem)]">
              Lecturas de tarot,{' '}
              <br className="hidden sm:block" />
              con turno y a tiempo.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[46ch] text-[1.1rem] leading-[1.65] text-muted">
              Sesiones en vivo con Yami, tiradas grabadas en video y rituales de luna nueva.
              Elegís el servicio, pagás online y coordinan el día por WhatsApp.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#servicios" className="btn btn-primary">
                Ver servicios
              </a>
              <a href="#videos" className="btn btn-ghost">
                Ver videos
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {facts.map((fact) => (
                <li key={fact} className="chip">
                  {fact}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {portrait ? (
            <img
              src={portrait}
              alt="Yami"
              className="aspect-[4/5] w-full rounded-[1.75rem] object-cover"
            />
          ) : (
            <div
              className="slot flex aspect-[4/5] w-full items-center justify-center p-8"
              data-note="Foto de Yami"
            >
              <p className="note max-w-[26ch] text-center">
                Dejá una foto en <code>/public/yami.jpg</code> y reemplaza este bloque
                automáticamente.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
