import { fileURLToPath } from "node:url";
import createJiti from "jiti";
import dotenv from 'dotenv'; // Load .env file

dotenv.config(); // Load environment variables

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/env/client");
jiti("./src/env/server");

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
        protocol: "https",
        hostname: "mypulll.b-cdn.net", // Change this to your CDN domain
      },
    ],
  },
};

export default nextConfig;
