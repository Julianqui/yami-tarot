import { StatusShell } from '../status-shell';

export const metadata = { title: 'Pago rechazado · Yami Tarot' };

type Params = Promise<Record<string, string | string[] | undefined>>;

const single = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function PagoErrorPage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;

  return (
    <StatusShell
      kicker="No se pudo cobrar"
      title="El pago quedó rechazado"
      description="No se descontó nada de tu cuenta. Podés volver al carrito y probar con otro medio de pago, o escribirle a Yami para que te mande un link directo."
      details={{
        Estado: single(params.status) ?? single(params.collection_status),
        Motivo: single(params.status_detail),
      }}
    />
  );
}
