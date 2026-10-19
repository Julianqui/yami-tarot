/**
 * Mueve los índices (videoteca y accesos) del bucket público al privado.
 *
 *   node scripts/mover-indices-a-privado.mjs            (simulación)
 *   node scripts/mover-indices-a-privado.mjs --aplicar
 *
 * Copia primero y borra del público solo si la copia salió bien.
 */
import fs from 'node:fs';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

for (const line of fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
}

const apply = process.argv.includes('--aplicar');
const publico = process.env.R2_BUCKET;
const privado = process.env.R2_PRIVATE_BUCKET;

if (!privado) {
  console.error('Falta R2_PRIVATE_BUCKET en .env.local.');
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const claves = ['videoteca/index-index.json', 'accesos/index-index.json'];

for (const Key of claves) {
  let cuerpo;
  try {
    const out = await s3.send(new GetObjectCommand({ Bucket: publico, Key }));
    cuerpo = await out.Body.transformToString();
  } catch {
    console.log(`  ${Key}: no existe en el público, nada que mover`);
    continue;
  }

  const items = JSON.parse(cuerpo);
  console.log(`  ${Key}: ${items.length} registros`);

  if (!apply) continue;

  await s3.send(
    new PutObjectCommand({
      Bucket: privado,
      Key,
      Body: cuerpo,
      ContentType: 'application/json',
      CacheControl: 'no-store',
    }),
  );

  // Verificamos la copia antes de borrar el original.
  const check = await s3.send(new GetObjectCommand({ Bucket: privado, Key }));
  const copiado = await check.Body.transformToString();
  if (copiado !== cuerpo) {
    console.error(`  ${Key}: la copia no coincide, no borro el original`);
    continue;
  }

  await s3.send(new DeleteObjectCommand({ Bucket: publico, Key }));
  console.log(`  ${Key}: copiado al privado y borrado del público`);
}

console.log(apply ? '\nListo.' : '\nSimulación: no se tocó nada.');
