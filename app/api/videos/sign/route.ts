import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { r2PublicUrl, signUpload, usingR2 } from '@/lib/r2';

export const runtime = 'nodejs';

const ALLOWED = new Set([
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-m4v',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'application/pdf',
]);

/**
 * Firma una subida directa a R2: el archivo va del navegador a Cloudflare sin
 * pasar por el servidor, igual que hacíamos con Blob.
 */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }
  if (!usingR2()) {
    return NextResponse.json({ error: 'R2 no está configurado.' }, { status: 503 });
  }

  let body: { filename?: string; contentType?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido.' }, { status: 400 });
  }

  const contentType = String(body.contentType ?? '');
  if (!ALLOWED.has(contentType)) {
    return NextResponse.json({ error: `Formato no permitido (${contentType}).` }, { status: 400 });
  }

  const original = String(body.filename ?? 'archivo');
  const ext = original.includes('.') ? original.split('.').pop()!.toLowerCase() : 'bin';
  const base = original
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);

  const key = `media/${base || 'archivo'}-${crypto.randomBytes(6).toString('hex')}.${ext}`;

  try {
    const uploadUrl = await signUpload(key, contentType);
    return NextResponse.json({ uploadUrl, publicUrl: r2PublicUrl(key), key });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudo firmar la subida.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
