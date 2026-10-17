import { ClearCart } from '../clear-cart';
import { StatusShell } from '../status-shell';

export const metadata = { title: 'Pago aprobado · Yami Tarot' };

type Params = Promise<Record<string, string | string[] | undefined>>;

const single = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function PagoExitoPage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;

  return (
    <>
      <ClearCart />
      <StatusShell
        kicker="Pago aprobado"
        title="Listo, tu lectura está reservada"
        description="Te llega el comprobante de Mercado Pago por mail. Escribile a Yami por WhatsApp para elegir día y horario."
        details={{
          'N° de pago': single(params.payment_id) ?? single(params.collection_id),
          Estado: single(params.status) ?? single(params.collection_status),
          Referencia: single(params.external_reference),
        }}
      />
    </>
  );
}
