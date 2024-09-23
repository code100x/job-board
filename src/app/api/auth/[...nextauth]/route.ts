import { options } from '@/lib/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(options);

export { handler as POST, handler as GET };
