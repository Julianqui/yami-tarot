import crypto from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'yami_admin';

/** Token derivado de la contraseña: nunca guardamos la contraseña en la cookie. */
function expectedToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  const secret = process.env.ADMIN_SECRET ?? 'yami-tarot-dev-secret';
  return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

export function isValidPassword(candidate: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(password);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function sessionToken(): string | null {
  return expectedToken();
}

export async function isAdmin(): Promise<boolean> {
  const expected = expectedToken();
  if (!expected) return false;
  const store = await cookies();
  const current = store.get(ADMIN_COOKIE)?.value;
  if (!current || current.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(current), Buffer.from(expected));
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}
