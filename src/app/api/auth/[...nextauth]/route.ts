import { options } from '@/lib/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(options);

export { handler as GET, handler as POST };
