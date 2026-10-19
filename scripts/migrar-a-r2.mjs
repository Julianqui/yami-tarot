/**
 * Copia los archivos y los índices de Vercel Blob a Cloudflare R2.
 *
 *   node scripts/migrar-a-r2.mjs            (simulación: no escribe nada)
 *   node scripts/migrar-a-r2.mjs --aplicar  (migra de verdad)
 *
 * No borra nada de Blob: si algo sale mal, el estado anterior sigue intacto.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import { list } from '@vercel/blob';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

for (const line of fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  // Vercel escribe los valores entre comillas: hay que sacarlas.
  if (match && !process.env[match[1]]) {
    process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
  }
}

const apply = process.argv.includes('--aplicar');
const bucket = process.env.R2_BUCKET;
const publicBase = (process.env.R2_PUBLIC_BASE_URL ?? '').replace(/\/$/, '');

if (!bucket || !publicBase || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
  console.error('Faltan variables de R2 en .env.local (R2_BUCKET, R2_PUBLIC_BASE_URL, claves).');
  process.exit(1);
}

const r2 = new S3Client({
  region: 'auto',
  endpoint:
    process.env.R2_ENDPOINT ?? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

/** Lee el índice más reciente de Blob para un prefijo dado. */
async function readIndex(prefix) {
  const { blobs } = await list({ prefix });
  const newest = blobs.sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
  )[0];
  if (!newest) return [];
  const response = await fetch(newest.url, { cache: 'no-store' });
  return response.ok ? await response.json() : [];
}

async function copyToR2(url, contentType) {
  const name = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? 'archivo');
  const ext = name.includes('.') ? name.split('.').pop() : 'bin';
  const base = name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
  const key = `media/${base || 'archivo'}-${crypto.randomBytes(4).toString('hex')}.${ext}`;

  if (!apply) return `${publicBase}/${key}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`No se pudo bajar ${url}`);
  const body = Buffer.from(await response.arrayBuffer());
  await r2.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType ?? response.headers.get('content-type') ?? undefined,
    }),
  );
  return `${publicBase}/${key}`;
}

const isBlobUrl = (value) => typeof value === 'string' && value.includes('.blob.vercel-storage.com/');

const videos = await readIndex('videoteca/index-');
const accesos = await readIndex('accesos/index-');
console.log(`Encontrados: ${videos.length} videos, ${accesos.length} accesos.`);

let copiados = 0;
for (const item of videos) {
  if (isBlobUrl(item.src)) {
    item.src = await copyToR2(item.src);
    copiados += 1;
    console.log(`  ${apply ? 'copiado' : 'copiaría'}: ${item.title}`);
  }
  if (isBlobUrl(item.poster)) {
    item.poster = await copyToR2(item.poster);
  }
}

if (apply) {
  const put = (key, data) =>
    r2.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: JSON.stringify(data, null, 2),
        ContentType: 'application/json',
        CacheControl: 'no-store',
      }),
    );
  await put('videoteca/index-index.json', videos);
  await put('accesos/index-index.json', accesos);
  console.log('Índices escritos en R2.');
} else {
  console.log('\nSimulación: no se escribió nada. Corré con --aplicar para migrar.');
}

console.log(`${apply ? 'Copiados' : 'A copiar'}: ${copiados} archivos.`);
