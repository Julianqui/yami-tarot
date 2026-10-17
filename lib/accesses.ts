import crypto from 'node:crypto';
import { createJsonStore } from './json-store';

export type Access = {
  /** Va en la URL: /videos/<id>. */
  id: string;
  /** Para quién se generó, para que Yami lo reconozca en la lista. */
  label: string;
  /** Categoría que puede ver, o "todo". */
  scope: string;
  createdAt: string;
  revokedAt?: string | null;
};

export const SCOPE_ALL = 'todo';

const store = createJsonStore<Access>('accesos/index-', 'accesses.json');

export async function listAccesses(): Promise<Access[]> {
  const accesses = await store.read();
  return accesses.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createAccess(label: string, scope: string): Promise<Access> {
  const accesses = await listAccesses();
  const access: Access = {
    id: crypto.randomBytes(7).toString('hex'),
    label,
    scope: scope || SCOPE_ALL,
    createdAt: new Date().toISOString(),
    revokedAt: null,
  };
  await store.write([access, ...accesses]);
  return access;
}

/** Anular no borra el registro: deja constancia de a quién se le dio y cuándo se cortó. */
export async function revokeAccess(id: string): Promise<boolean> {
  const accesses = await listAccesses();
  const target = accesses.find((a) => a.id === id);
  if (!target) return false;
  await store.write(
    accesses.map((a) => (a.id === id ? { ...a, revokedAt: new Date().toISOString() } : a)),
  );
  return true;
}

export async function deleteAccess(id: string): Promise<boolean> {
  const accesses = await listAccesses();
  if (!accesses.some((a) => a.id === id)) return false;
  await store.write(accesses.filter((a) => a.id !== id));
  return true;
}

export async function findActiveAccess(id: string): Promise<Access | null> {
  const accesses = await listAccesses();
  const access = accesses.find((a) => a.id === id);
  if (!access || access.revokedAt) return null;
  return access;
}
