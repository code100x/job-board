// server.ts
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.string().min(1), // Ensure this is set in your .env
    // Add other required server environment variables here
  },
  runtimeEnv: {
    DATABASE_URL: 'postgres://aditya:adicode@localhost:5432/jobDB',
    // Add other runtime environment variables here
  },
});
