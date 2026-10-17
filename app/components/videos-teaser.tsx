import Link from 'next/link';
import { SectionHead } from './reveal';

/** La videoteca es privada: en la landing solo se explica cómo se accede. */
export function VideosTeaser() {
  const steps = [
    'Elegís el servicio o el curso y transferís.',
    'Le mandás el comprobante a Yami por WhatsApp.',
    'Te llega por mail el link privado con los videos.',
  ];

  return (
    <section id="videos" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aura left-1/4 top-10 h-[24rem] w-[24rem] bg-teal/20" />
      </div>

      <div className="relative mx-auto w-[min(1200px,92vw)]">
        <SectionHead
          kicker="Videoteca"
          title="Los videos son privados"
          standfirst="Las tiradas grabadas, las clases del curso y los rituales no están publicados: Yami manda el acceso por mail a quienes compraron."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step} className="card p-6">
              <span className="gilded text-[1.8rem] font-medium tracking-[-0.03em]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mt-3 text-[0.95rem] leading-[1.6] text-muted">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/#servicios" className="btn btn-primary">
            Ver servicios
          </Link>
          <Link href="/curso" className="btn btn-ghost">
            Curso de Tarot
          </Link>
        </div>
      </div>
    </section>
  );
}
