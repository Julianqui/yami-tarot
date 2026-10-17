import { SectionHead } from './reveal';

export function About() {
  return (
    <section id="sobre" className="mx-auto w-[min(1200px,92vw)] scroll-mt-24 py-20 sm:py-28">
      <SectionHead kicker="Sobre Yami" title="Quién lee las cartas" />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
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

        <div className="slot p-7 pt-12" data-note="Cómo es una sesión">
          <p className="text-[1.02rem] leading-[1.7] text-muted">
            Acá puede ir el paso a paso de una consulta contado por Yami: cómo arranca, qué se
            pregunta, cuánto dura y con qué te vas. Dos párrafos cortos funcionan mejor que uno
            largo.
          </p>
        </div>
      </div>
    </section>
  );
}
