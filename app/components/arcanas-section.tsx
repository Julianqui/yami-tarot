import { ArcanaCard, arcanas, type ArcanaKey } from './arcana-card';
import { Reveal, SectionHead } from './reveal';

const deck = Object.keys(arcanas) as ArcanaKey[];

export function ArcanasSection() {
  return (
    <section id="cartas" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aura -left-20 top-20 h-[26rem] w-[26rem] bg-amethyst/25" />
        <div className="aura right-0 bottom-0 h-[24rem] w-[24rem] bg-accent/15" />
      </div>

      <div className="relative mx-auto w-[min(1200px,92vw)]">
        <SectionHead
          kicker="El mazo"
          title="Las cartas que más aparecen"
          standfirst="Una lectura no es una sentencia: es mirar qué está sobre la mesa. Estas son algunas de las que más salen en consulta y qué suelen venir a decir."
        />

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
          {deck.map((key, index) => (
            <Reveal as="li" key={key} delay={Math.min(index, 5) * 0.06}>
              <ArcanaCard
                arcana={key}
                showLine
                className="transition-transform duration-500 hover:-translate-y-2"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
