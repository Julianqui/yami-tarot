/* eslint-disable @next/next/no-img-element */
import { ArcanaCard } from './arcana-card';
import { Reveal } from './reveal';

const facts = ['Sesiones por videollamada', 'Video privado en 48 h', 'Mercado Pago o PayPal'];

export function Hero({ portrait }: { portrait: string | null }) {
  return (
    <section id="inicio" className="relative min-h-svh overflow-hidden">
      {/* Halos de color: tiñen el fondo sin moverse ni brillar de más. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aura -left-32 -top-40 h-[32rem] w-[32rem] bg-amethyst/40" />
        <div className="aura -right-24 top-10 h-[26rem] w-[26rem] bg-teal/25" />
        <div className="aura left-1/3 top-[28rem] h-[22rem] w-[22rem] bg-rose/20" />
      </div>

      <div className="relative mx-auto flex min-h-svh w-[min(1200px,92vw)] flex-col justify-center pb-24 pt-14 sm:pb-32 sm:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <span className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                Agenda abierta · consultas online
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="h-display mt-7 text-[clamp(2.7rem,5.6vw,4.6rem)]">
                Lecturas de tarot,{' '}
                <br className="hidden sm:block" />
                <span className="gilded">con turno y a tiempo.</span>
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
                <a href="#cartas" className="btn btn-ghost">
                  Ver las cartas
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
            {/* Abanico de cartas: cada una se endereza al pasar el mouse. */}
            <div className="relative mx-auto h-[23rem] w-[min(30rem,86vw)] sm:h-[30rem]">
              <div className="absolute left-1/2 top-[8%] w-[38%] -translate-x-[128%] -rotate-[15deg] transition-transform duration-500 hover:-translate-y-3 hover:rotate-[-8deg]">
                <ArcanaCard arcana="luna" />
              </div>
              <div className="absolute left-1/2 top-0 z-10 w-[40%] -translate-x-1/2 transition-transform duration-500 hover:-translate-y-4">
                <ArcanaCard arcana="estrella" />
              </div>
              <div className="absolute left-1/2 top-[8%] w-[38%] translate-x-[28%] rotate-[15deg] transition-transform duration-500 hover:-translate-y-3 hover:rotate-[8deg]">
                <ArcanaCard arcana="sol" />
              </div>

              {portrait ? (
                <img
                  src={portrait}
                  alt="Yami"
                  className="absolute bottom-0 left-1/2 w-[58%] -translate-x-1/2 rounded-[1.25rem] border border-white/10 object-cover"
                />
              ) : null}
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
