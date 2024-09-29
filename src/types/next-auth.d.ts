import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    isVerified: boolean;
    role: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      name: string;
      isVerified: boolean;
      image?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    isVerified: boolean;
    role: string;
  }
}
