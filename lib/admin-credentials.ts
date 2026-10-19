import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getText, putText, usingR2 } from './r2';

const KEY = 'config/admin.json';
const LOCAL = path.join(process.cwd(), 'data', 'admin.json');

type Credential = {
  salt: string;
  hash: string;
  updatedAt: string;
};

/**
 * La contraseña guardada nunca es texto plano: se guarda el resultado de
 * scrypt, que es irreversible. Solo se puede verificar, no recuperar.
 */
function derive(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

/**
 * El archivo guardado va cifrado con una clave derivada de ADMIN_SECRET, que
 * vive en las variables de entorno y nunca sale del servidor. Por eso puede
 * quedar incluso en un bucket público: sin esa clave es ilegible.
 */
function cipherKey(): Buffer | null {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;
  return crypto.scryptSync(secret, 'yami-tarot-admin', 32);
}

export function canStoreCredentials(): boolean {
  return cipherKey() !== null;
}

function encrypt(plain: string): string {
  const key = cipherKey();
  if (!key) throw new Error('Falta ADMIN_SECRET.');
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const body = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString('base64'), tag.toString('base64'), body.toString('base64')].join('.');
}

function decrypt(payload: string): string | null {
  const key = cipherKey();
  if (!key) return null;
  const [iv, tag, body] = payload.split('.');
  if (!iv || !tag || !body) return null;
  try {
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'base64'));
    decipher.setAuthTag(Buffer.from(tag, 'base64'));
    return Buffer.concat([
      decipher.update(Buffer.from(body, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  } catch {
    return null;
  }
}

async function read(): Promise<Credential | null> {
  try {
    const raw = usingR2() ? await getText(KEY) : await fs.readFile(LOCAL, 'utf8');
    if (!raw) return null;
    const plain = decrypt(raw.trim());
    if (!plain) return null;
    const parsed = JSON.parse(plain) as Credential;
    return parsed?.salt && parsed?.hash ? parsed : null;
  } catch {
    return null;
  }
}

async function write(credential: Credential): Promise<void> {
  const body = encrypt(JSON.stringify(credential));
  if (usingR2()) {
    await putText(KEY, body, 'text/plain');
    return;
  }
  await fs.mkdir(path.dirname(LOCAL), { recursive: true });
  await fs.writeFile(LOCAL, body, 'utf8');
}

function matchesEnv(candidate: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(password);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Valida contra la contraseña guardada; si no hay ninguna, contra la del entorno. */
export async function verifyPassword(candidate: string): Promise<boolean> {
  const stored = await read();
  if (!stored) return matchesEnv(candidate);

  const attempt = Buffer.from(derive(candidate, stored.salt), 'hex');
  const expected = Buffer.from(stored.hash, 'hex');
  return attempt.length === expected.length && crypto.timingSafeEqual(attempt, expected);
}

export async function savePassword(next: string): Promise<void> {
  if (!canStoreCredentials()) {
    throw new Error('Falta ADMIN_SECRET para poder guardar la contraseña.');
  }
  const salt = crypto.randomBytes(16).toString('hex');
  await write({ salt, hash: derive(next, salt), updatedAt: new Date().toISOString() });
}

/**
 * Huella de la contraseña vigente. La cookie de sesión se firma con esto, así
 * que al cambiarla se caen todas las sesiones abiertas.
 */
export async function passwordFingerprint(): Promise<string | null> {
  const stored = await read();
  if (stored) return stored.hash;
  return process.env.ADMIN_PASSWORD ?? null;
}

export async function hasStoredPassword(): Promise<boolean> {
  return (await read()) !== null;
}
