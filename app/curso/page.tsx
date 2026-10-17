import Link from 'next/link';
import { money } from '@/lib/format';
import { findProduct } from '@/lib/products';
import { ArcanaCard } from '../components/arcana-card';
import { Reveal } from '../components/reveal';

export const metadata = {
  title: 'Curso de Tarot · Yami Tarot',
  description:
    'Curso de tarot desde cero con Yami: los 78 arcanos, cómo armar una tirada y cómo interpretarla.',
};

const modules = [
  {
    title: 'Los 22 arcanos mayores',
    body: 'Carta por carta: qué muestran, qué piden y qué cambia cuando salen invertidas.',
  },
  {
    title: 'Los 56 arcanos menores',
    body: 'Los cuatro palos —oros, copas, espadas y bastos—, las figuras y cómo leer el mazo completo.',
  },
  {
    title: 'Armar una tirada',
    body: 'De la tirada de tres cartas a la cruz celta. Cuándo conviene cada una y cómo elegir la pregunta.',
  },
  {
    title: 'Interpretar sin miedo',
    body: 'Cómo leer el conjunto en vez de carta por carta, y cómo decir lo difícil sin asustar a nadie.',
  },
  {
    title: 'Leer para otras personas',
    body: 'El encuadre de una consulta: qué preguntar, qué no prometer y cómo cerrar la sesión.',
  },
];

export default function CursoPage() {
  const course = findProduct('curso-tarot');

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aura -left-28 -top-32 h-[30rem] w-[30rem] bg-amethyst/35" />
        <div className="aura right-0 top-60 h-[24rem] w-[24rem] bg-accent/20" />
      </div>

      <div className="relative mx-auto w-[min(1200px,92vw)] py-16 sm:py-24">
        <Link href="/" className="mono link-underline">
          ← Volver al inicio
        </Link>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              Inscripción abierta
            </span>
            <h1 className="h-display mt-6 text-[clamp(2.6rem,7vw,4.6rem)]">
              Curso de Tarot,{' '}
              <span className="gilded">desde cero.</span>
            </h1>
            <p className="mt-6 max-w-[48ch] text-[1.08rem] leading-[1.65] text-muted">
              Aprendé a leer tus propias cartas: los 78 arcanos —los 22 mayores y los 56
              menores—, cómo armar una tirada y cómo interpretarla sin quedarte con la parte fea.
              Clases grabadas, a tu ritmo, con material para descargar.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/comprar/curso-tarot" className="btn btn-primary">
                Comprar el curso
              </Link>
              {course ? (
                <span className="h-section gilded text-[1.9rem]">{money(course.price)}</span>
              ) : null}
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {['78 arcanos', 'Online', 'Clases grabadas', 'Material descargable'].map(
                (item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-3 gap-4">
              <ArcanaCard arcana="mago" />
              <ArcanaCard arcana="sacerdotisa" />
              <ArcanaCard arcana="rueda" />
            </div>
          </Reveal>
        </div>

        <section className="mt-20">
          <span className="mono">Programa</span>
          <h2 className="h-section mt-4 text-[clamp(1.9rem,4.5vw,2.8rem)]">Qué vas a ver</h2>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2">
            {modules.map((module, index) => (
              <Reveal as="li" key={module.title} delay={index * 0.06}>
                <div className="card card-hover h-full p-6">
                  <span className="gilded text-[1.8rem] font-medium tracking-[-0.03em]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-[1.1rem] font-medium tracking-[-0.01em]">
                    {module.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.6] text-muted">{module.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="slot mt-6 p-6 pt-12" data-note="Detalles del curso — confirmar con Yami">
            <p className="note">
              Falta definir: cuántas clases son, cuánto dura cada una, si hay encuentros en vivo o
              es todo grabado, y si entrega certificado.
            </p>
          </div>
        </section>

        <div className="card mt-16 flex flex-wrap items-center justify-between gap-6 p-8">
          <div>
            <h2 className="h-section text-[1.6rem]">¿Te sumás?</h2>
            <p className="mt-2 max-w-[42ch] text-[0.95rem] leading-[1.6] text-muted">
              Transferís, le mandás el comprobante por WhatsApp y Yami te envía los accesos por
              mail.
            </p>
          </div>
          <Link href="/comprar/curso-tarot" className="btn btn-primary">
            Comprar el curso
          </Link>
        </div>
      </div>
    </div>
  );
}
