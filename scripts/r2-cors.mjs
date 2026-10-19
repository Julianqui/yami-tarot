import fs from 'node:fs';
import { GetBucketCorsCommand, S3Client } from '@aws-sdk/client-s3';
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
try {
  const out = await s3.send(new GetBucketCorsCommand({ Bucket: process.env.R2_BUCKET }));
  console.log('CORS configurado:', JSON.stringify(out.CORSRules, null, 2));
} catch (e) {
  console.log('CORS: NO configurado →', e.name);
}
