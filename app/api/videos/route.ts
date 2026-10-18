import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { UPLOAD_DIR, addVideo, listVideos, resolveExternal, usingBlob } from '@/lib/videos';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_MB = Number(process.env.MAX_UPLOAD_MB ?? 300);
const ALLOWED_EXT = new Set(['mp4', 'webm', 'mov', 'm4v']);
const ALLOWED_IMAGE_EXT = new Set(['jpg', 'jpeg', 'png', 'webp', 'avif']);
const ALLOWED_MATERIAL_EXT = new Set(['pdf', 'jpg', 'jpeg', 'png', 'webp']);

export async function GET() {
  const videos = await listVideos();
  return NextResponse.json({ videos });
}

async function storeFile(file: File, allowed: Set<string>, prefix: string) {
  const ext = (file.name.split('.').pop() ?? '').toLowerCase();
  if (!allowed.has(ext)) {
    throw new Error(`Formato no permitido (.${ext}). Usá: ${[...allowed].join(', ')}.`);
  }
  if (file.size > MAX_MB * 1024 * 1024) {
    throw new Error(
      `El archivo pesa ${(file.size / 1024 / 1024).toFixed(0)} MB y el máximo es ${MAX_MB} MB.`,
    );
  }
  const name = `${prefix}-${crypto.randomUUID()}.${ext}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}

/** Alta cuando el archivo ya se subió a Blob desde el navegador. */
async function createFromJson(request: Request) {
  const body = (await request.json()) as {
    kind?: 'video' | 'material';
    title?: string;
    description?: string;
    category?: string;
    url?: string;
    blobUrl?: string;
    posterUrl?: string;
  };

  const title = String(body.title ?? '').trim();
  const description = String(body.description ?? '').trim();
  const category = String(body.category ?? '').trim() || 'Tirada';
  const poster = body.posterUrl?.trim() || undefined;

  if (!title) {
    return NextResponse.json({ error: 'Ponele un título al video.' }, { status: 400 });
  }

  if (body.blobUrl) {
    const video = await addVideo({
      kind: body.kind === 'material' ? 'material' : 'video',
      title,
      description,
      category,
      source: 'file',
      src: body.blobUrl,
      poster,
    });
    return NextResponse.json({ video }, { status: 201 });
  }

  if (body.url) {
    const resolved = resolveExternal(body.url);
    if (!resolved) {
      return NextResponse.json(
        { error: 'Link no reconocido. Pegá un link de YouTube, Vimeo o un .mp4 directo.' },
        { status: 400 },
      );
    }
    const video = await addVideo({
      title,
      description,
      category,
      ...resolved,
      poster: poster ?? resolved.poster,
    });
    return NextResponse.json({ video }, { status: 201 });
  }

  return NextResponse.json({ error: 'Falta el video.' }, { status: 400 });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  if (request.headers.get('content-type')?.includes('application/json')) {
    try {
      return await createFromJson(request);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo guardar el video.';
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }

  // Camino local: el archivo viaja en el formulario y se guarda en disco.
  if (usingBlob()) {
    return NextResponse.json(
      { error: 'En producción los archivos se suben directo a Blob desde el navegador.' },
      { status: 400 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Se esperaba un formulario.' }, { status: 400 });
  }

  const title = String(form.get('title') ?? '').trim();
  const description = String(form.get('description') ?? '').trim();
  const category = String(form.get('category') ?? '').trim() || 'Tirada';
  const link = String(form.get('url') ?? '').trim();
  const kind = String(form.get('kind') ?? 'video') === 'material' ? 'material' : 'video';
  const file = form.get('file');
  const posterFile = form.get('poster');

  if (!title) {
    return NextResponse.json({ error: 'Ponele un título al video.' }, { status: 400 });
  }

  try {
    let poster: string | undefined;
    if (posterFile instanceof File && posterFile.size > 0) {
      poster = await storeFile(posterFile, ALLOWED_IMAGE_EXT, 'poster');
    }

    if (file instanceof File && file.size > 0) {
      const src = await storeFile(
        file,
        kind === 'material' ? ALLOWED_MATERIAL_EXT : ALLOWED_EXT,
        kind,
      );
      const video = await addVideo({
        kind,
        title,
        description,
        category,
        source: 'file',
        src,
        poster,
      });
      return NextResponse.json({ video }, { status: 201 });
    }

    if (link) {
      const resolved = resolveExternal(link);
      if (!resolved) {
        return NextResponse.json(
          { error: 'Link no reconocido. Pegá un link de YouTube, Vimeo o un .mp4 directo.' },
          { status: 400 },
        );
      }
      const video = await addVideo({
        title,
        description,
        category,
        ...resolved,
        poster: poster ?? resolved.poster,
      });
      return NextResponse.json({ video }, { status: 201 });
    }

    return NextResponse.json({ error: 'Subí un archivo de video o pegá un link.' }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudo guardar el video.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
