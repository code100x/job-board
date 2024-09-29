// // server-env.ts
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url(),
    CDN_API_KEY: z.string().min(1),
    CDN_BASE_UPLOAD_URL: z.string().url(),
    CDN_BASE_ACCESS_URL: z.string().url(),
    BASE_URL: z.string().url(),
    EMAIL_USER: z.string().min(1),
    EMAIL_PASSWORD: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    CDN_API_KEY: process.env.CDN_API_KEY,
    CDN_BASE_UPLOAD_URL: process.env.CDN_BASE_UPLOAD_URL,
    CDN_BASE_ACCESS_URL: process.env.CDN_BASE_ACCESS_URL,
    BASE_URL: process.env.BASE_URL,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
});  
