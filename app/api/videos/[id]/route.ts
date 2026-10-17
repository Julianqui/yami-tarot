import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { deleteVideo } from '@/lib/videos';

export const runtime = 'nodejs';

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }
  const { id } = await params;
  const removed = await deleteVideo(id);
  if (!removed) {
    return NextResponse.json({ error: 'Ese video no existe.' }, { status: 404 });
  }
  return NextResponse.json({ deleted: true });
}
