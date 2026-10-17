'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'span';
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

/** Encabezado de sección: etiqueta mono arriba, título grande, bajada opcional. */
export function SectionHead({
  kicker,
  title,
  standfirst,
  className = '',
}: {
  kicker: string;
  title: ReactNode;
  standfirst?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal>
        <span className="mono">{kicker}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="h-section mt-5 text-[clamp(2.2rem,5vw,3.6rem)]">{title}</h2>
      </Reveal>
      {standfirst ? (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[58ch] text-[1.05rem] leading-[1.65] text-muted">{standfirst}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
