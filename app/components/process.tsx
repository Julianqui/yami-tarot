import { Reveal, SectionHead } from './reveal';

const steps = [
  { title: 'Elegís', text: 'Mirás los servicios y agregás al carrito el que necesitás.' },
  { title: 'Pagás', text: 'Checkout de Mercado Pago: tarjeta, débito, transferencia o efectivo.' },
  { title: 'Coordinan', text: 'Yami te escribe con los horarios disponibles y reservan el turno.' },
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
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
