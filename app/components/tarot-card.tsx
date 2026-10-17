type Arcana = 'luna' | 'estrella' | 'sol';

const plates: Record<Arcana, string> = {
  luna: 'La Luna',
  estrella: 'La Estrella',
  sol: 'El Sol',
};

/** Ilustración mínima, trazo fino, dentro de una superficie redondeada. */
export function TarotPlate({ arcana, className = '' }: { arcana: Arcana; className?: string }) {
  return (
    <figure className={`card card-hover overflow-hidden ${className}`}>
      <div className="aspect-[3/4] bg-surface-2/60 p-5 text-text">
        <svg viewBox="0 0 120 160" className="h-full w-full" role="img" aria-label={plates[arcana]}>
          <g stroke="currentColor" fill="none" strokeWidth="1" strokeLinecap="round">
            {arcana === 'luna' ? (
              <>
                <path d="M72 46a32 32 0 1 0 0 60 38 38 0 0 1 0-60z" />
                <circle cx="60" cy="76" r="44" strokeOpacity="0.18" />
              </>
            ) : null}
            {arcana === 'estrella' ? (
              <>
                <path d="M60 36l6 28 28 6-28 6-6 28-6-28-28-6 28-6z" />
                <circle cx="60" cy="76" r="44" strokeOpacity="0.18" />
              </>
            ) : null}
            {arcana === 'sol' ? (
              <>
                <circle cx="60" cy="76" r="22" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * Math.PI * 2) / 12;
                  const round = (n: number) => n.toFixed(2);
                  return (
                    <line
                      key={i}
                      x1={round(60 + Math.cos(angle) * 30)}
                      y1={round(76 + Math.sin(angle) * 30)}
                      x2={round(60 + Math.cos(angle) * 40)}
                      y2={round(76 + Math.sin(angle) * 40)}
                      strokeOpacity="0.55"
                    />
                  );
                })}
              </>
            ) : null}
          </g>
        </svg>
      </div>
      <figcaption className="mono border-t border-line px-4 py-3">{plates[arcana]}</figcaption>
    </figure>
  );
}
