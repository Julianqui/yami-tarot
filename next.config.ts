import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // cacheComponents queda apagado: la landing lee la videoteca del disco en cada
  // request (force-dynamic) y ese modo no es compatible con esa config.
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
  },
  turbopack: {
    // Raíz explícita: evita que Turbopack mire lockfiles de carpetas de arriba.
    root: import.meta.dirname,
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
