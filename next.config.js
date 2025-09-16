// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // necesario para styled-components v6 con SSR
  },
  // Configuración básica para Vercel
  trailingSlash: false,
  // Configuración de imágenes si las usas
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
