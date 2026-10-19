import fs from 'node:fs';
import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
for (const line of fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
}
const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});
const out = await s3.send(new ListObjectsV2Command({ Bucket: process.env.R2_BUCKET }));
console.log('objetos en el bucket:', out.KeyCount ?? 0);
for (const o of out.Contents ?? []) console.log(' -', o.Key, (o.Size / 1024 / 1024).toFixed(1), 'MB');
