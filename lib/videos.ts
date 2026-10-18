import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { del } from '@vercel/blob';
import { createJsonStore, usingBlob } from './json-store';

export type VideoSource = 'file' | 'youtube' | 'vimeo' | 'url';

/** Un video para reproducir, o material descargable (PDF, imagen). */
export type ItemKind = 'video' | 'material';

export type Video = {
  id: string;
  /** Los items viejos no tienen el campo: se asumen videos. */
  kind?: ItemKind;
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

export const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

const store = createJsonStore<Video>('videoteca/index-', 'videos.json');

export { usingBlob };

export function isMaterial(item: Video): boolean {
  return item.kind === 'material';
}

export async function listVideos(): Promise<Video[]> {
  const videos = await store.read();
  return videos.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addVideo(video: Omit<Video, 'id' | 'createdAt'>): Promise<Video> {
  const videos = await listVideos();
  const created: Video = {
    ...video,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  await store.write([created, ...videos]);
  return created;
}

export async function deleteVideo(id: string): Promise<boolean> {
  const videos = await listVideos();
  const target = videos.find((v) => v.id === id);
  if (!target) return false;
  await store.write(videos.filter((v) => v.id !== id));

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
