import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

export const runtime = 'nodejs';

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

/**
 * Valida la firma `x-signature` que manda Mercado Pago.
 * Si no configuraste MP_WEBHOOK_SECRET, se saltea (útil en desarrollo).
 */
function signatureIsValid(request: Request, dataId: string | null): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return true;

  const signature = request.headers.get('x-signature');
  const requestId = request.headers.get('x-request-id');
  if (!signature) return false;

  const parts = Object.fromEntries(
    signature.split(',').map((piece) => {
      const [key, value] = piece.split('=');
      return [key?.trim(), value?.trim()];
    }),
  ) as Record<string, string | undefined>;

  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return false;

  const manifest = `id:${dataId ?? ''};request-id:${requestId ?? ''};ts:${ts};`;
  const computed = crypto.createHmac('sha256', secret).update(manifest).digest('hex');
  return computed.length === v1.length && crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(v1));
}

async function appendOrder(entry: Record<string, unknown>) {
  await fs.mkdir(path.dirname(ORDERS_FILE), { recursive: true });
  let current: unknown[] = [];
  try {
    current = JSON.parse(await fs.readFile(ORDERS_FILE, 'utf8'));
  } catch {
    current = [];
  }
  if (!Array.isArray(current)) current = [];
  await fs.writeFile(ORDERS_FILE, JSON.stringify([entry, ...current].slice(0, 500), null, 2), 'utf8');
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  let payload: Record<string, unknown> = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const data = payload.data as { id?: string } | undefined;
  const dataId = data?.id ?? url.searchParams.get('data.id') ?? url.searchParams.get('id');
  const topic = (payload.type as string) ?? url.searchParams.get('topic') ?? '';

  if (!signatureIsValid(request, dataId ?? null)) {
    console.warn('[webhook] firma inválida');
    return NextResponse.json({ error: 'Firma inválida' }, { status: 401 });
  }

  // Siempre respondemos 200: si devolvemos error, Mercado Pago reintenta en loop.
  try {
    if (topic.includes('payment') && dataId && process.env.MP_ACCESS_TOKEN) {
      const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
      const payment = await new Payment(client).get({ id: dataId });
      await appendOrder({
        paymentId: payment.id,
        status: payment.status,
        statusDetail: payment.status_detail,
        amount: payment.transaction_amount,
        email: payment.payer?.email,
        externalReference: payment.external_reference,
        items: payment.additional_info?.items?.map((i) => i.title),
        receivedAt: new Date().toISOString(),
      });
      console.log(`[webhook] pago ${payment.id} → ${payment.status}`);
    }
  } catch (error) {
    console.error('[webhook] no se pudo procesar la notificación:', error);
  }

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
