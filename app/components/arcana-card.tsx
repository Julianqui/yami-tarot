export type ArcanaKey = 'luna' | 'estrella' | 'sol' | 'sacerdotisa' | 'rueda' | 'mago';

type Arcana = {
  roman: string;
  name: string;
  /** Frase corta que acompaña la carta en la galería. */
  line: string;
  from: string;
  to: string;
  ink: string;
};

export const arcanas: Record<ArcanaKey, Arcana> = {
  luna: {
    roman: 'XVIII',
    name: 'La Luna',
    line: 'Lo que todavía no se ve con claridad',
    from: '#2b2a6b',
    to: '#0d0b23',
    ink: '#cfd6ff',
  },
  estrella: {
    roman: 'XVII',
    name: 'La Estrella',
    line: 'La calma después de la sacudida',
    from: '#12564f',
    to: '#07131d',
    ink: '#7ff0dc',
  },
  sol: {
    roman: 'XIX',
    name: 'El Sol',
    line: 'Lo bueno que ya está pasando',
    from: '#7a4414',
    to: '#1a0e09',
    ink: '#ffc978',
  },
  sacerdotisa: {
    roman: 'II',
    name: 'La Sacerdotisa',
    line: 'Lo que sabés y no te animás a decir',
    from: '#3b2273',
    to: '#120a23',
    ink: '#d7bcff',
  },
  rueda: {
    roman: 'X',
    name: 'La Rueda',
    line: 'El ciclo que vuelve a girar',
    from: '#5c3a12',
    to: '#140f1f',
    ink: '#f0cf8a',
  },
  mago: {
    roman: 'I',
    name: 'El Mago',
    line: 'Tenés con qué empezar',
    from: '#6b1f44',
    to: '#160a17',
    ink: '#ffb3cd',
  },
};

/** Ilustración de cada arcano, dibujada en SVG con la paleta de la carta. */
function Glyph({ arcana, ink }: { arcana: ArcanaKey; ink: string }) {
  const common = { stroke: ink, fill: 'none', strokeWidth: 1.4, strokeLinecap: 'round' } as const;

  return (
    <svg viewBox="0 0 120 150" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id={`halo-${arcana}`}>
          <stop offset="0%" stopColor={ink} stopOpacity="0.45" />
          <stop offset="100%" stopColor={ink} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`fill-${arcana}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ink} />
          <stop offset="100%" stopColor={ink} stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="72" r="46" fill={`url(#halo-${arcana})`} />

      {arcana === 'luna' ? (
        <g {...common}>
          <path
            d="M72 42a32 32 0 1 0 0 60 38 38 0 0 1 0-60z"
            fill={`url(#fill-${arcana})`}
            stroke="none"
          />
          <circle cx="60" cy="72" r="42" strokeOpacity="0.3" strokeDasharray="1 8" />
          <path d="M26 118h68M36 130h48" strokeOpacity="0.5" />
        </g>
      ) : null}

      {arcana === 'estrella' ? (
        <g {...common}>
          <path
            d="M60 30l7 31 31 7-31 7-7 31-7-31-31-7 31-7z"
            fill={`url(#fill-${arcana})`}
            stroke="none"
          />
          <circle cx="60" cy="68" r="44" strokeOpacity="0.28" strokeDasharray="1 8" />
          <path d="M22 116c13-9 25-9 38 0s25 9 38 0" strokeOpacity="0.55" />
          <path d="M22 130c13-9 25-9 38 0s25 9 38 0" strokeOpacity="0.3" />
        </g>
      ) : null}

      {arcana === 'sol' ? (
        <g {...common}>
          <circle cx="60" cy="68" r="22" fill={`url(#fill-${arcana})`} stroke="none" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 16;
            const r = (n: number) => n.toFixed(2);
            return (
              <line
                key={i}
                x1={r(60 + Math.cos(angle) * 29)}
                y1={r(68 + Math.sin(angle) * 29)}
                x2={r(60 + Math.cos(angle) * (i % 2 === 0 ? 44 : 37))}
                y2={r(68 + Math.sin(angle) * (i % 2 === 0 ? 44 : 37))}
                strokeOpacity="0.75"
              />
            );
          })}
          <path d="M28 120h64" strokeOpacity="0.45" />
        </g>
      ) : null}

      {arcana === 'sacerdotisa' ? (
        <g {...common}>
          <path d="M34 36v76M86 36v76" strokeOpacity="0.5" />
          <path d="M60 36c12 0 20 9 20 22s-8 22-20 22-20-9-20-22 8-22 20-22z" strokeOpacity="0.8" />
          <path d="M48 44a16 16 0 0 0 24 0" fill={`url(#fill-${arcana})`} stroke="none" />
          <circle cx="60" cy="96" r="7" fill={`url(#fill-${arcana})`} stroke="none" />
          <path d="M30 122h60" strokeOpacity="0.4" />
        </g>
      ) : null}

      {arcana === 'rueda' ? (
        <g {...common}>
          <circle cx="60" cy="70" r="34" strokeOpacity="0.85" />
          <circle cx="60" cy="70" r="12" fill={`url(#fill-${arcana})`} stroke="none" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const r = (n: number) => n.toFixed(2);
            return (
              <line
                key={i}
                x1={r(60 + Math.cos(angle) * 12)}
                y1={r(70 + Math.sin(angle) * 12)}
                x2={r(60 + Math.cos(angle) * 34)}
                y2={r(70 + Math.sin(angle) * 34)}
                strokeOpacity="0.6"
              />
            );
          })}
          <circle cx="60" cy="70" r="44" strokeOpacity="0.25" strokeDasharray="2 7" />
        </g>
      ) : null}

      {arcana === 'mago' ? (
        <g {...common}>
          <path d="M40 72c0-8 6-13 12-13s12 5 12 13-6 13-12 13-12-5-12-13z" strokeOpacity="0.85" />
          <path d="M56 72c0-8 6-13 12-13s12 5 12 13-6 13-12 13-12-5-12-13z" strokeOpacity="0.85" />
          <path d="M60 28v22" strokeOpacity="0.7" />
          <circle cx="60" cy="24" r="5" fill={`url(#fill-${arcana})`} stroke="none" />
          <path d="M34 112h52M44 124h32" strokeOpacity="0.45" />
        </g>
      ) : null}
    </svg>
  );
}

export function ArcanaCard({
  arcana,
  className = '',
  showLine = false,
}: {
  arcana: ArcanaKey;
  className?: string;
  showLine?: boolean;
}) {
  const data = arcanas[arcana];

  return (
    <figure
      className={`group relative overflow-hidden rounded-[1.15rem] border border-white/10 transition duration-500 ${className}`}
      style={{
        background: `linear-gradient(160deg, ${data.from}, ${data.to} 72%)`,
        boxShadow: `0 28px 70px -40px ${data.from}`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(70% 45% at 50% 18%, ${data.ink}22, transparent 70%)`,
        }}
      />
      <div className="absolute inset-[7px] rounded-[0.85rem] border" style={{ borderColor: `${data.ink}26` }} />

      <div className="relative flex aspect-[2/3.1] flex-col p-4">
        <span
          className="text-center font-mono text-[0.6rem] tracking-[0.3em]"
          style={{ color: `${data.ink}cc` }}
        >
          {data.roman}
        </span>

        <div className="flex-1 py-2">
          <Glyph arcana={arcana} ink={data.ink} />
        </div>

        <figcaption className="text-center">
          <span className="block text-[0.78rem] font-medium tracking-[-0.01em] text-white/90">
            {data.name}
          </span>
          {showLine ? (
            <span className="mt-1 block text-[0.7rem] leading-snug" style={{ color: `${data.ink}aa` }}>
              {data.line}
            </span>
          ) : null}
        </figcaption>
      </div>
    </figure>
  );
}
