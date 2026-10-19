import fs from 'node:fs/promises';
import path from 'node:path';
import { del, list, put } from '@vercel/blob';
import { getText, putText, usingR2 } from './r2';

/**
 * Guarda un JSON chico (índice de videos, accesos) en Vercel Blob cuando hay
 * token, o en un archivo local cuando se trabaja en la compu.
 *
 * Cada escritura crea un archivo nuevo y borra los anteriores: sobreescribir
 * la misma ruta dejaba el JSON cacheado en el CDN y los cambios tardaban en
 * verse.
 */
export function usingBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function createJsonStore<T>(blobPrefix: string, localFile: string) {
  const localPath = path.join(process.cwd(), 'data', localFile);

  async function listBlobs() {
    const { blobs } = await list({ prefix: blobPrefix });
    return blobs.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    );
  }

  async function read(): Promise<T[]> {
    // R2 permite leer y sobreescribir la misma clave sin quedar cacheado,
    // así que el índice es un solo archivo en vez de uno nuevo por cambio.
    if (usingR2()) {
      const raw = await getText(`${blobPrefix}index.json`);
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw) as T[];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    if (usingBlob()) {
      try {
        const [newest] = await listBlobs();
        if (!newest) return [];
        const response = await fetch(newest.url, { cache: 'no-store' });
        if (!response.ok) return [];
        const parsed = (await response.json()) as T[];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    try {
      const parsed = JSON.parse(await fs.readFile(localPath, 'utf8')) as T[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  async function write(items: T[]): Promise<void> {
    if (usingR2()) {
      await putText(`${blobPrefix}index.json`, JSON.stringify(items, null, 2));
      return;
    }

    if (usingBlob()) {
      const previous = await listBlobs();
      const fresh = await put(`${blobPrefix}${Date.now()}.json`, JSON.stringify(items, null, 2), {
        access: 'public',
        addRandomSuffix: true,
        contentType: 'application/json',
        cacheControlMaxAge: 0,
      });
      const stale = previous.filter((blob) => blob.url !== fresh.url).map((blob) => blob.url);
      if (stale.length > 0) await del(stale).catch(() => {});
      return;
    }

    await fs.mkdir(path.dirname(localPath), { recursive: true });
    await fs.writeFile(localPath, JSON.stringify(items, null, 2), 'utf8');
  }

  return { read, write };
}
