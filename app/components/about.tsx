import { Reveal, SectionHead } from './reveal';
import { TarotPlate } from './tarot-card';

export function About() {
  return (
    <section id="sobre" className="mx-auto w-[min(1200px,92vw)] scroll-mt-24 py-20 sm:py-28">
      <SectionHead kicker="Sobre Yami" title="Quién lee las cartas" />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-5">
          <div className="slot p-7 pt-12" data-note="Bio — reemplazar">
            <p className="text-[1.02rem] leading-[1.7] text-muted">
              Acá va la bio escrita por Yami, en primera persona: cuándo empezó a leer, con qué
              mazo trabaja, qué formación tiene y cómo es una sesión con ella. Dos o tres párrafos
              alcanzan.
            </p>
            <p className="note mt-5">
              Conviene que diga también qué <em>no</em> hace (predecir muertes, diagnosticar,
              reemplazar terapia). Es lo que más tranquiliza a quien consulta por primera vez.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="slot p-6 pt-12" data-note="Formación">
              <p className="note">Cursos, maestras con las que estudió, años leyendo.</p>
            </div>
            <div className="slot p-6 pt-12" data-note="Mazo que usa">
              <p className="note">Marsella, Rider-Waite, un mazo heredado… lo que corresponda.</p>
            </div>
          </div>
        </div>

        <div>
          <Reveal>
            <div className="grid grid-cols-3 gap-4">
              <TarotPlate arcana="luna" />
              <TarotPlate arcana="estrella" />
              <TarotPlate arcana="sol" />
            </div>
          </Reveal>
          <p className="note mt-5">
            Ilustraciones hechas para el sitio. Si Yami prefiere, se reemplazan por fotos de su
            propio mazo.
          </p>
        </div>
      </div>
    </section>
  );
}
