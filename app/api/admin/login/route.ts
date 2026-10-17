import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminConfigured, isValidPassword, sessionToken } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: 'Definí ADMIN_PASSWORD en .env.local para habilitar el panel.' },
      { status: 503 },
    );
  }

  let password = '';
  try {
    const body = await request.json();
    password = String(body?.password ?? '');
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido.' }, { status: 400 });
  }

  if (!isValidPassword(password)) {
    return NextResponse.json({ error: 'Contraseña incorrecta.' }, { status: 401 });
  }

  const token = sessionToken();
  if (!token) {
    return NextResponse.json({ error: 'Panel no configurado.' }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({ name: ADMIN_COOKIE, value: '', path: '/', maxAge: 0 });
  return response;
}
