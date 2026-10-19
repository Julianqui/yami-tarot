import fs from 'node:fs';

const base = 'https://yami-tarot.vercel.app';
const pass = fs.readFileSync(`${process.env.HOME}/Desktop/yami-tarot/.env.local`, 'utf8')
  .split('\n').find((l) => l.startsWith('ADMIN_PASSWORD=')).split('=')[1].trim();

// 1. Login
const login = await fetch(`${base}/api/admin/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ password: pass }),
});
const cookie = login.headers.get('set-cookie')?.split(';')[0];
console.log('1) login:', login.status === 200 ? 'ok' : 'falla');

// 2. Pedir URL firmada
const sign = await fetch(`${base}/api/videos/sign`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', cookie },
  body: JSON.stringify({ filename: 'prueba.pdf', contentType: 'application/pdf' }),
});
const signed = await sign.json();
console.log('2) firma:', sign.status === 200 ? 'ok' : `falla → ${JSON.stringify(signed).slice(0, 120)}`);
if (sign.status !== 200) process.exit(1);
console.log('   destino:', signed.publicUrl.slice(0, 60) + '…');

// 3. Subir el archivo directo a Cloudflare
const body = Buffer.from('%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n');
const pre = await fetch(signed.uploadUrl, {
  method: 'OPTIONS',
  headers: {
    Origin: base,
    'Access-Control-Request-Method': 'PUT',
    'Access-Control-Request-Headers': 'content-type',
  },
});
console.log('   preflight CORS:', pre.status === 204 ? 'ok' : `falla ${pre.status}`);

const put = await fetch(signed.uploadUrl, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/pdf', Origin: base },
  body,
});
console.log('   allow-origin en la subida:', put.headers.get('access-control-allow-origin') ?? '(ninguno)');
console.log('3) subida a Cloudflare:', put.status === 200 ? 'ok' : `falla ${put.status}`);

// 4. Registrarlo en la videoteca
const reg = await fetch(`${base}/api/videos`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', cookie },
  body: JSON.stringify({ kind: 'material', title: 'Prueba de conexión', category: 'Curso', blobUrl: signed.publicUrl }),
});
const created = await reg.json();
console.log('4) alta en la videoteca:', reg.status === 201 ? 'ok' : `falla → ${JSON.stringify(created).slice(0, 120)}`);

// 5. Leerlo desde Cloudflare
const read = await fetch(signed.publicUrl);
console.log('5) se puede abrir desde Cloudflare:', read.status === 200 ? 'ok' : `falla ${read.status}`);

// 6. Limpiar
if (created?.video?.id) {
  const del = await fetch(`${base}/api/videos/${created.video.id}`, { method: 'DELETE', headers: { cookie } });
  console.log('6) limpieza:', del.status === 200 ? 'ok' : `falla ${del.status}`);
}
