import fs from 'node:fs/promises';
import path from 'node:path';

const PORTRAIT_CANDIDATES = ['yami.jpg', 'yami.jpeg', 'yami.png', 'yami.webp'];

/**
 * Si Yami deja una foto suya en /public (yami.jpg, .png, .webp),
 * la landing la usa y el hueco punteado desaparece solo.
 */
export async function portraitSrc(): Promise<string | null> {
  for (const file of PORTRAIT_CANDIDATES) {
    try {
      await fs.access(path.join(process.cwd(), 'public', file));
      return `/${file}`;
    } catch {
      // seguimos probando
    }
  }
  return null;
}
