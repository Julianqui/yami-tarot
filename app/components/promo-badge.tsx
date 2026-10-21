import { money } from '@/lib/format';

/** Cartel rojo con el precio promocional. */
export function PromoBadge({
  price,
  note,
  size = 'sm',
}: {
  price: number;
  note?: string;
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
      {note ? (
        <span className="mt-1 text-[0.68rem] leading-tight text-white/85">{note}</span>
      ) : null}
    </div>
  );
}
