import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { del, list, put } from '@vercel/blob';

export type VideoSource = 'file' | 'youtube' | 'vimeo' | 'url';

export type Video = {
  id: string;
  title: string;
  description: string;
  /** Etiqueta libre: "Tirada semanal", "Signos", "Rituales"... */
  category: string;
  source: VideoSource;
  /** URL del embed (youtube/vimeo), del blob subido o ruta local (/uploads/x.mp4). */
  src: string;
  /** Miniatura. Para YouTube se resuelve sola. */
  poster?: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'videos.json');
export const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

/** Ruta del índice dentro del store de Blob. */
const BLOB_INDEX = 'videoteca/videos.json';

/**
 * En Vercel el disco es de solo lectura, así que la videoteca vive en Blob.
 * En local, sin token, seguimos usando el sistema de archivos.
 */
export function usingBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf8');
  }
}

async function readIndex(): Promise<Video[]> {
  if (usingBlob()) {
    try {
      const { blobs } = await list({ prefix: BLOB_INDEX, limit: 1 });
      const index = blobs.find((b) => b.pathname === BLOB_INDEX);
      if (!index) return [];
      // El CDN cachea por URL: le agregamos un parámetro para leer siempre lo último.
      const response = await fetch(`${index.url}?t=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) return [];
      const parsed = (await response.json()) as Video[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  await ensureStore();
  try {
    const parsed = JSON.parse(await fs.readFile(DATA_FILE, 'utf8')) as Video[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeIndex(videos: Video[]) {
  if (usingBlob()) {
    await put(BLOB_INDEX, JSON.stringify(videos, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      cacheControlMaxAge: 0,
    });
    return;
  }
  await ensureStore();
  await fs.writeFile(DATA_FILE, JSON.stringify(videos, null, 2), 'utf8');
}

export async function listVideos(): Promise<Video[]> {
  const videos = await readIndex();
  return videos.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addVideo(video: Omit<Video, 'id' | 'createdAt'>): Promise<Video> {
  const videos = await listVideos();
  const created: Video = {
    ...video,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  await writeIndex([created, ...videos]);
  return created;
}

export async function deleteVideo(id: string): Promise<boolean> {
  const videos = await listVideos();
  const target = videos.find((v) => v.id === id);
  if (!target) return false;
  await writeIndex(videos.filter((v) => v.id !== id));

  // Borramos también los archivos que habíamos guardado nosotros.
  const ownUploads = [target.source === 'file' ? target.src : null, target.poster].filter(
    (value): value is string => Boolean(value),
  );

  for (const location of ownUploads) {
    if (location.startsWith('/uploads/')) {
      await fs.unlink(path.join(UPLOAD_DIR, path.basename(location))).catch(() => {});
    } else if (usingBlob() && location.includes('.blob.vercel-storage.com/')) {
      await del(location).catch(() => {});
    }
  }
  return true;
}

/** Convierte un link pegado por Yami en datos de embed listos para reproducir. */
export function resolveExternal(url: string): Pick<Video, 'source' | 'src' | 'poster'> | null {
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null;

  const host = parsed.hostname.replace(/^www\./, '');

  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
    const id =
      parsed.searchParams.get('v') ??
      (parsed.pathname.startsWith('/shorts/') ? parsed.pathname.split('/')[2] : null) ??
      (parsed.pathname.startsWith('/embed/') ? parsed.pathname.split('/')[2] : null);
    if (!id) return null;
    return {
      source: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`,
      poster: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }

  if (host === 'youtu.be') {
    const id = parsed.pathname.slice(1);
    if (!id) return null;
    return {
      source: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`,
      poster: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = parsed.pathname.split('/').filter(Boolean).pop();
    if (!id || !/^\d+$/.test(id)) return null;
    return { source: 'vimeo', src: `https://player.vimeo.com/video/${id}` };
  }

  if (/\.(mp4|webm|mov|m4v)$/i.test(parsed.pathname)) {
    return { source: 'url', src: parsed.toString() };
  }

  return null;
}
