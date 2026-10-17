'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Reveal, SectionHead } from './reveal';

const faqs = [
  {
    q: '¿Cómo reservo y cómo pago?',
    a: 'Agregás el servicio al carrito y pagás con Mercado Pago: tarjeta de crédito o débito, dinero en cuenta, transferencia o efectivo en Rapipago y Pago Fácil. El comprobante te llega por mail.',
  },
  {
    q: '¿Cuándo coordinamos día y hora?',
    a: 'Apenas se acredita el pago, Yami te escribe por WhatsApp (o al mail que dejaste) con los horarios disponibles. Las sesiones en vivo son por videollamada.',
  },
  {
    q: '¿Qué pasa si no puedo asistir?',
    a: 'Podés reprogramar avisando con 24 horas de anticipación, sin costo. Avisando después, se reprograma una sola vez.',
  },
  {
    q: '¿Sirve si nunca me tiré las cartas?',
    a: 'Sí. Antes de empezar te explica qué van a hacer y podés preguntar lo que quieras durante la sesión.',
  },
  {
    q: '¿Reemplaza terapia o indicación médica?',
    a: 'No. Es un espacio de acompañamiento. Si hay algo que necesita atención profesional, Yami te lo dice y te sugiere buscarla.',
  },
  {
    q: '¿Puedo regalar una lectura?',
    a: 'Sí. Comprás el servicio y le pasás el nombre de la persona: recibe un certificado digital con un código para usarlo cuando quiera.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas" className="mx-auto w-[min(1200px,92vw)] scroll-mt-24 py-20 sm:py-28">
      <SectionHead kicker="Preguntas" title="Antes de reservar" />

      <ul className="mt-12 grid gap-3">
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return (
            <Reveal as="li" key={faq.q} delay={Math.min(index, 4) * 0.04}>
              <div className={`card overflow-hidden ${isOpen ? 'border-text/30' : ''}`}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="text-[1.08rem] font-medium tracking-[-0.01em]">{faq.q}</span>
                  <span
                    className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line transition ${
                      isOpen ? 'bg-text' : ''
                    }`}
                  >
                    <span className={`h-px w-3 ${isOpen ? 'bg-night' : 'bg-text'}`} />
                    <span
                      className={`absolute h-3 w-px transition ${isOpen ? 'scale-y-0 bg-night' : 'bg-text'}`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[70ch] px-6 pb-6 text-[0.97rem] leading-[1.65] text-muted">
                        {faq.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <p className="note mt-6">
        Revisá que las políticas (reprogramación, regalo, tiempos) sean las que Yami realmente
        maneja antes de publicar.
      </p>
    </section>
  );
}
