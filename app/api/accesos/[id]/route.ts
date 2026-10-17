import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { deleteAccess, revokeAccess } from '@/lib/accesses';

export const runtime = 'nodejs';

/** PATCH anula el acceso (el link deja de servir). DELETE lo borra del listado. */
export async function PATCH(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }
  const { id } = await params;
  const revoked = await revokeAccess(id);
  if (!revoked) return NextResponse.json({ error: 'No existe ese acceso.' }, { status: 404 });
  return NextResponse.json({ revoked: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }
  const { id } = await params;
  const deleted = await deleteAccess(id);
  if (!deleted) return NextResponse.json({ error: 'No existe ese acceso.' }, { status: 404 });
  return NextResponse.json({ deleted: true });
}
