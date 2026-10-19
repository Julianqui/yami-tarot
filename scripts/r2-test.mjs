import fs from 'node:fs';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

for (const line of fs.readFileSync(`${process.env.HOME}/Desktop/yami-tarot/.env.local`, 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});
const Bucket = process.env.R2_BUCKET;

try {
  await s3.send(new ListObjectsV2Command({ Bucket, MaxKeys: 1 }));
  console.log('LECTURA: ok');
} catch (e) {
  console.log('LECTURA: falla →', e.name, e.message.slice(0, 80));
}

try {
  await s3.send(new PutObjectCommand({ Bucket, Key: 'prueba/escritura.txt', Body: 'hola', ContentType: 'text/plain' }));
  console.log('ESCRITURA: ok');
  const r = await s3.send(new GetObjectCommand({ Bucket, Key: 'prueba/escritura.txt' }));
  console.log('RELECTURA:', await r.Body.transformToString());
  await s3.send(new DeleteObjectCommand({ Bucket, Key: 'prueba/escritura.txt' }));
  console.log('BORRADO: ok');
} catch (e) {
  console.log('ESCRITURA: falla →', e.name, '|', e.message.slice(0, 120));
}
