import { site } from '@/lib/site';
import { AliasChip } from './alias-chip';
import { Reveal, SectionHead } from './reveal';

const steps = [
  { title: 'Elegís', text: 'Mirás los servicios y entrás al que necesitás.' },
  {
    title: 'Pagás',
    text: 'Transferís al alias de Mercado Pago de Yami, desde cualquier banco o billetera.',
    alias: true,
  },
  { title: 'Avisás', text: 'Le mandás el comprobante por WhatsApp y te confirma.' },
  { title: 'La sesión', text: 'En vivo por videollamada o grabada en video, según el servicio.' },
];

export function Process() {
  return (
    <section className="mx-auto w-[min(1200px,92vw)] py-20 sm:py-28">
      <SectionHead kicker="Cómo funciona" title="Cuatro pasos" />

      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 0.07}>
            <div className="card card-hover h-full p-6">
              <span className="gilded text-[2rem] font-medium tracking-[-0.03em]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="h-section mt-5 text-[1.45rem]">{step.title}</h3>
              <p className="mt-2 text-[0.94rem] leading-[1.6] text-muted">{step.text}</p>
              {step.alias ? <AliasChip alias={site.alias} /> : null}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
