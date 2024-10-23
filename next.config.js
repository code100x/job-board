import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';
import withPWA from 'next-pwa';

if (process.env.SKIP_ENV_CHECK !== 'true') {
  const jiti = createJiti(fileURLToPath(import.meta.url));
  jiti('./src/env/client');
  jiti('./src/env/server');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'job-board.b-cdn.net', // Change this to your CDN domain
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        // Change this to your CDN domain
      },
      {
        protocol: 'https',
        hostname: 'aakash2330.b-cdn.net',
      },
      {
        protocol: 'https',
        hostname: 'www.example.com',
      },
    ],
  },
};

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  importScripts: ['/worker.js'],
  // disable: process.env.NODE_ENV === 'development',
  publicExcludes: ['!noprecache/**/*'],
  buildExcludes: [/middleware-manifest.json$/],
});

export default pwaConfig(nextConfig); // ES module export
