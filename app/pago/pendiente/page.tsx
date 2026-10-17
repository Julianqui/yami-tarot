import { StatusShell } from '../status-shell';

export const metadata = { title: 'Pago pendiente · Yami Tarot' };

type Params = Promise<Record<string, string | string[] | undefined>>;

const single = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function PagoPendientePage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;

  return (
    <StatusShell
      kicker="Pago en proceso"
      title="Falta que se acredite"
      description="Si pagaste en efectivo o por transferencia, Mercado Pago puede tardar unas horas (hasta dos días hábiles en Rapipago o Pago Fácil). Cuando se acredite, Yami te avisa y coordinan el turno."
      details={{
        'N° de pago': single(params.payment_id) ?? single(params.collection_id),
        Estado: single(params.status) ?? single(params.collection_status),
      }}
    />
  );
}
