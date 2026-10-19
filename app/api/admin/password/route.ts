import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, isAdmin, sessionToken } from '@/lib/auth';
import { canStoreCredentials, savePassword, verifyPassword } from '@/lib/admin-credentials';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }
  if (!canStoreCredentials()) {
    return NextResponse.json(
      { error: 'Falta ADMIN_SECRET para cifrar la contraseña guardada.' },
      { status: 503 },
    );
  }

  let body: { current?: string; next?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido.' }, { status: 400 });
  }

  const current = String(body.current ?? '');
  const next = String(body.next ?? '');

  if (!(await verifyPassword(current))) {
    return NextResponse.json({ error: 'La contraseña actual no es correcta.' }, { status: 401 });
  }
  if (next.length < 8) {
    return NextResponse.json(
      { error: 'La nueva contraseña tiene que tener al menos 8 caracteres.' },
      { status: 400 },
    );
  }
  if (next === current) {
    return NextResponse.json({ error: 'La nueva tiene que ser distinta.' }, { status: 400 });
  }

  await savePassword(next);

  // Renovamos la cookie con la huella nueva: las demás sesiones quedan caídas.
  const token = await sessionToken();
  const response = NextResponse.json({ ok: true });
  if (token) {
    response.cookies.set({
      name: ADMIN_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 12,
    });
  }
  return response;
}
