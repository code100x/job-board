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
        //Change it with your cdn access domain here
        hostname: 'job-board.b-cdn.net',
      },
    ],
  },
};

module.exports = nextConfig;
