// server-env.ts
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url(),
    POSTGRES_URL: z.string().url().optional(),
    POSTGRES_HOST: z.string().min(1).optional(),
    POSTGRES_USERNAME: z.string().min(1).optional(),
    POSTGRES_PASSWORD: z.string().min(1).optional(),
    AWS_S3_REGION: z.string().min(1),
    AWS_S3_ACCESS_KEY_ID: z.string().min(1),
    AWS_S3_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_S3_BUCKET_NAME: z.string().min(1),
    CDN_API_KEY: z.string().min(1),
    CDN_BASE_UPLOAD_URL: z.string().url(),
    CDN_BASE_ACCESS_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    POSTGRES_URL: process.env.POSTGRES_URL ?? '',
    POSTGRES_HOST: process.env.POSTGRES_HOST ?? '',
    POSTGRES_USERNAME: process.env.POSTGRES_USERNAME ?? '',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? '',
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    CDN_API_KEY: process.env.CDN_API_KEY,
    CDN_BASE_UPLOAD_URL: process.env.CDN_BASE_UPLOAD_URL,
    CDN_BASE_ACCESS_URL: process.env.CDN_BASE_ACCESS_URL,
  },
});
