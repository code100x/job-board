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
        hostname: '<bucket_url/hostname>', //example - youraws.s3.ap-south-2.amazonaws.com
      },
    ],
  },
};

module.exports = nextConfig;
