import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * Cloudflare R2 hablado por la API de S3. Se activa solo si están las
 * variables; si no, el proyecto sigue usando Vercel Blob o el disco local.
 */
export function usingR2(): boolean {
  return Boolean(
    process.env.R2_BUCKET &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      (process.env.R2_ENDPOINT || process.env.R2_ACCOUNT_ID),
  );
}

/** Bucket público: solo archivos que se sirven al navegador (videos, PDFs). */
export function r2Bucket(): string {
  return process.env.R2_BUCKET ?? '';
}

/**
 * Bucket privado: índices, accesos y cualquier dato que no debe poder leerse
 * desde afuera. Si no está configurado, cae al público (y lo avisamos).
 */
export function r2DataBucket(): string {
  return process.env.R2_PRIVATE_BUCKET || r2Bucket();
}

export function usingPrivateBucket(): boolean {
  return Boolean(process.env.R2_PRIVATE_BUCKET);
}

/** Base pública desde donde se sirven los archivos (r2.dev o dominio propio). */
export function r2PublicBase(): string {
  return (process.env.R2_PUBLIC_BASE_URL ?? '').replace(/\/$/, '');
}

export function r2Client(): S3Client {
  const endpoint =
    process.env.R2_ENDPOINT ?? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

  return new S3Client({
    region: 'auto',
    endpoint,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
    },
  });
}

export function r2PublicUrl(key: string): string {
  return `${r2PublicBase()}/${key.split('/').map(encodeURIComponent).join('/')}`;
}

/** URL firmada para que el navegador suba el archivo directo a R2. */
export async function signUpload(key: string, contentType: string, expiresIn = 3600) {
  const command = new PutObjectCommand({
    Bucket: r2Bucket(),
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(r2Client(), command, { expiresIn });
}

export async function putText(key: string, body: string, contentType = 'application/json') {
  await r2Client().send(
    new PutObjectCommand({
      Bucket: r2DataBucket(),
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: 'no-store',
    }),
  );
}

export async function getText(key: string): Promise<string | null> {
  try {
    const result = await r2Client().send(
      new GetObjectCommand({ Bucket: r2DataBucket(), Key: key }),
    );
    return (await result.Body?.transformToString()) ?? null;
  } catch {
    return null;
  }
}

export async function deleteKey(key: string) {
  await r2Client()
    .send(new DeleteObjectCommand({ Bucket: r2Bucket(), Key: key }))
    .catch(() => {});
}

/** De una URL pública nuestra, saca la clave del objeto para poder borrarlo. */
export function keyFromUrl(url: string): string | null {
  const base = r2PublicBase();
  if (!base || !url.startsWith(base)) return null;
  return decodeURIComponent(url.slice(base.length + 1));
}
