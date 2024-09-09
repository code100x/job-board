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
        //Add aws s3 bucket hostname
        hostname: 'myaws-dev-storage.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
