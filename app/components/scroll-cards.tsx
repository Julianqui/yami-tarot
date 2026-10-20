'use client';

import { useEffect, useRef, useState } from 'react';
import { ArcanaCard } from './arcana-card';

function FlipCard({
  frontArcana,
  backArcana,
  angle,
  axis,
}: {
  frontArcana: 'sacerdotisa' | 'mago' | 'luna' | 'estrella' | 'sol' | 'rueda';
  backArcana: 'sacerdotisa' | 'mago' | 'luna' | 'estrella' | 'sol' | 'rueda';
  angle: number;
  axis: 'X' | 'Y';
}) {
  return (
    <div className="w-[min(14rem,42vw)]" style={{ perspective: '800px' }}>
      <div
        className="relative"
        style={{
          transform: `rotate${axis}(${angle}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s linear',
        }}
      >
        <div style={{ backfaceVisibility: 'hidden' }}>
          <ArcanaCard arcana={frontArcana} />
        </div>
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: `rotate${axis}(180deg)`,
          }}
        >
          <ArcanaCard arcana={backArcana} />
        </div>
      </div>
    </div>
  );
}

export function ScrollCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh;
      const end = -rect.height;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const flip = progress * 180;

  return (
    <div ref={ref} className="relative mx-auto w-[min(1200px,92vw)] py-16">
      <div className="flex items-center justify-center gap-8 sm:gap-16">
        <FlipCard frontArcana="sacerdotisa" backArcana="luna" angle={flip} axis="Y" />
        <FlipCard frontArcana="mago" backArcana="rueda" angle={flip} axis="X" />
      </div>
    </div>
  );
}
