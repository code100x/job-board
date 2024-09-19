/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production';

const withPWA = async () => {
  const nextPWA = (await import('next-pwa')).default;

  return nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: !prod,
  });
};


const getNextConfig = async () => {
  const nextPWAConfig = await withPWA();
  return nextPWAConfig({
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
          //Change it with your cdn access domain here
          hostname: 'job-board.b-cdn.net',
        },
      ],
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
          ],
        },
        {
          source: '/sw.js',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/javascript; charset=utf-8',
            },
            {
              key: 'Cache-Control',
              value: 'no-cache, no-store, must-revalidate',
            },
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self'",
            },
          ],
        },
      ];
    },
  });
};


export default await getNextConfig();
