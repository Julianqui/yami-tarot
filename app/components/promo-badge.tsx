import { money } from '@/lib/format';

const hasta = (until: Date) =>
  `Hasta el ${new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Argentina/Buenos_Aires',
  }).format(until)} h`;

/** Cartel rojo con el precio promocional. */
export function PromoBadge({
  price,
  until,
  size = 'sm',
}: {
  price: number;
  until: Date;
  size?: 'sm' | 'lg';
}) {
  return (
    <div
      className={`inline-flex flex-col items-start rounded-xl bg-promo text-white ${
        size === 'lg' ? 'px-5 py-3' : 'px-3.5 py-2'
      }`}
    >
      <span
        className={`font-medium leading-none tracking-[-0.02em] ${
          size === 'lg' ? 'text-[1.6rem]' : 'text-[1.05rem]'
        }`}
      >
        {money(price)}
      </span>
      <span className="mt-1 text-[0.68rem] leading-tight text-white/85">{hasta(until)}</span>
    </div>
  );
}
