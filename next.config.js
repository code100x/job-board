import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';

if (process.env.NODE_ENV === 'production') {
  const jiti = createJiti(fileURLToPath(import.meta.url));
  jiti('./src/env/client');
  jiti('./src/env/server');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

export default nextConfig; // ES module export
