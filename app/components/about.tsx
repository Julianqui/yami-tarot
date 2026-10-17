import { SectionHead } from './reveal';

const blocks = [
  {
    kicker: 'Cómo es una sesión',
    body: 'Arrancamos charlando un rato para afinar la pregunta, porque la mitad del trabajo es saber qué querés saber. Después tiro las cartas y te voy contando lo que veo, sin tecnicismos. Podés interrumpir, repreguntar y pedirme que vuelva sobre una carta las veces que haga falta.',
  },
  {
    kicker: 'Con qué leo',
    body: 'Trabajo con el mazo completo: los 22 arcanos mayores y los 56 menores. Los menores son los que traen el detalle cotidiano —la conversación pendiente, la plata, el cansancio— y por eso no los dejo afuera.',
  },
  {
    kicker: 'Qué no hago',
    body: 'No predigo muertes ni enfermedades, no leo la carta natal y no doy diagnósticos. Si en una consulta aparece algo que necesita un profesional, te lo digo y te sugiero buscarlo. El tarot acompaña, no reemplaza.',
  },
];

export function About() {
  return (
    <section id="sobre" className="mx-auto w-[min(1200px,92vw)] scroll-mt-24 py-24 sm:py-36">
      <SectionHead kicker="Sobre Yami" title="Quién lee las cartas" />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-7 sm:p-9">
          <p className="text-[1.08rem] leading-[1.75]">
            Soy Yami. Leo tarot desde hace años, primero para amigas en la cocina de casa y hoy
            para gente de todo el país que me escribe por Instagram o WhatsApp.
          </p>
          <p className="mt-5 text-[1.02rem] leading-[1.75] text-muted">
            Mi forma de leer es bastante terrenal: las cartas no vienen a decirte qué va a pasar,
            vienen a mostrarte qué está pasando y qué opciones tenés adelante. Trato de que salgas
            de la sesión con algo concreto para hacer, no con un misterio nuevo encima.
          </p>
          <p className="mt-5 text-[1.02rem] leading-[1.75] text-muted">
            Las consultas son online: en vivo por videollamada, o grabadas en video privado si
            preferís verlas con tiempo. También doy un curso para quienes quieren aprender a leerse
            las cartas solas.
          </p>
        </div>

        <ul className="grid gap-4">
          {blocks.map((block) => (
            <li key={block.kicker} className="card p-6">
              <span className="mono text-teal">{block.kicker}</span>
              <p className="mt-3 text-[0.96rem] leading-[1.65] text-muted">{block.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
