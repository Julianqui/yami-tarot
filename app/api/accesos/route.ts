import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { SCOPE_ALL, createAccess, listAccesses } from '@/lib/accesses';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }
  return NextResponse.json({ accesses: await listAccesses() });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  let body: { label?: string; scope?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido.' }, { status: 400 });
  }

  const label = String(body.label ?? '').trim();
  if (!label) {
    return NextResponse.json({ error: 'Poné el nombre de la persona.' }, { status: 400 });
  }

  const access = await createAccess(label, String(body.scope ?? SCOPE_ALL).trim() || SCOPE_ALL);
  return NextResponse.json({ access }, { status: 201 });
}
