// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // necesario para styled-components v6 con SSR
  },
};
module.exports = nextConfig;
