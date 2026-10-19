import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { passwordFingerprint, verifyPassword } from './admin-credentials';

export const ADMIN_COOKIE = 'yami_admin';

/** Token derivado de la contraseña vigente: nunca guardamos la contraseña. */
async function expectedToken(): Promise<string | null> {
  const fingerprint = await passwordFingerprint();
  if (!fingerprint) return null;
  const secret = process.env.ADMIN_SECRET ?? 'yami-tarot-dev-secret';
  return crypto.createHmac('sha256', secret).update(fingerprint).digest('hex');
}

export async function isValidPassword(candidate: string): Promise<boolean> {
  return verifyPassword(candidate);
}

export async function sessionToken(): Promise<string | null> {
  return expectedToken();
}

export async function isAdmin(): Promise<boolean> {
  const expected = await expectedToken();
  if (!expected) return false;
  const store = await cookies();
  const current = store.get(ADMIN_COOKIE)?.value;
  if (!current || current.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(current), Buffer.from(expected));
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}
