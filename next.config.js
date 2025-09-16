// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // necesario para styled-components v6 con SSR
  },
  experimental: {
    // Asegurar compatibilidad con Vercel
    esmExternals: 'loose',
  },
  // Configuración para Vercel
  output: 'standalone',
  // Asegurar que las rutas funcionen correctamente
  trailingSlash: false,
  // Configuración de imágenes si las usas
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
