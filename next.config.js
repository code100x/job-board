// next.config.js
import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';

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
        hostname: 'job-board.b-cdn.net',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'aakash2330.b-cdn.net',
      },
      {
        protocol: 'https',
        hostname: 'www.example.com',
      }
    ],
  },
};

export default nextConfig;
