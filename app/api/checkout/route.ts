import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { CURRENCY, findProduct } from '@/lib/products';

export const runtime = 'nodejs';

type IncomingLine = { id?: unknown; quantity?: unknown };

/** Base pública del sitio: la de .env si está, si no la del request. */
function resolveBaseUrl(request: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  const origin = request.headers.get('origin');
  if (origin) return origin.replace(/\/$/, '');
  const host = request.headers.get('host') ?? 'localhost:3000';
  const proto = host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https';
  return `${proto}://${host}`;
}

export async function POST(request: Request) {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      {
        error:
          'Falta MP_ACCESS_TOKEN. Copiá el access token de la cuenta de Mercado Pago de Yami en .env.local.',
      },
      { status: 500 },
    );
  }

  let body: { items?: IncomingLine[]; payer?: { name?: string; email?: string } };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido.' }, { status: 400 });
  }

  const incoming = Array.isArray(body.items) ? body.items : [];
  if (incoming.length === 0) {
    return NextResponse.json({ error: 'El carrito está vacío.' }, { status: 400 });
  }

  // Los precios SIEMPRE salen del catálogo del servidor, nunca del cliente.
  const items = [];
  for (const line of incoming) {
    const product = typeof line.id === 'string' ? findProduct(line.id) : undefined;
    if (!product) {
      return NextResponse.json({ error: `Servicio inexistente: ${String(line.id)}` }, { status: 400 });
    }
    const quantity = Math.min(Math.max(Math.trunc(Number(line.quantity) || 1), 1), 20);
    items.push({
      id: product.id,
      title: `Yami Tarot · ${product.name}`,
      description: product.tagline,
      category_id: 'services',
      quantity,
      currency_id: CURRENCY,
      unit_price: product.price,
    });
  }

  const baseUrl = resolveBaseUrl(request);
  const isPublicHttps = baseUrl.startsWith('https://');
  const externalReference = `yami-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const client = new MercadoPagoConfig({ accessToken });

  try {
    const preference = await new Preference(client).create({
      body: {
        items,
        payer: body.payer?.email
          ? { name: body.payer.name ?? undefined, email: body.payer.email }
          : undefined,
        back_urls: {
          success: `${baseUrl}/pago/exito`,
          pending: `${baseUrl}/pago/pendiente`,
          failure: `${baseUrl}/pago/error`,
        },
        // Mercado Pago rechaza auto_return y notification_url sobre http/localhost.
        ...(isPublicHttps
          ? {
              auto_return: 'approved',
              notification_url: `${baseUrl}/api/mercadopago/webhook`,
            }
          : {}),
        statement_descriptor: 'YAMITAROT',
        external_reference: externalReference,
        metadata: { origen: 'landing', referencia: externalReference },
      },
      requestOptions: { idempotencyKey: externalReference },
    });

    const useSandbox = accessToken.startsWith('TEST-');
    const url = useSandbox
      ? (preference.sandbox_init_point ?? preference.init_point)
      : (preference.init_point ?? preference.sandbox_init_point);

    if (!url) {
      return NextResponse.json(
        { error: 'Mercado Pago no devolvió un link de pago.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ url, preferenceId: preference.id, externalReference });
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : 'Error desconocido al crear la preferencia.';
    console.error('[checkout] Mercado Pago falló:', error);
    return NextResponse.json({ error: `Mercado Pago: ${detail}` }, { status: 502 });
  }
}
