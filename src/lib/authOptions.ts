import { AUTH_TOKEN_EXPIRATION_TIME } from '@/config/auth.config';
import prisma from '@/config/prisma.config';
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ErrorHandler } from './error';
import { SigninSchema } from './validators/auth.validator';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'signin',
      id: 'signin',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        const result = SigninSchema.safeParse(credentials);

        if (!result.success) {
          throw new ErrorHandler(
            'Input Validation failed',
            'VALIDATION_ERROR',
            {
              fieldErrors: result.error.flatten().fieldErrors,
            }
          );
        }

        const { email, password } = result.data;
        const user = await prisma.user.findUnique({
          where: {
            email: email,
            emailVerified: { not: null },
            blockedByAdmin: null,
          },
          select: {
            id: true,
            name: true,
            password: true,
            role: true,
            emailVerified: true,
          },
        });

        if (!user || !user.password)
          throw new ErrorHandler(
            'Email or password is incorrect',
            'AUTHENTICATION_FAILED'
          );

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new ErrorHandler(
            'Email or password is incorrect',
            'AUTHENTICATION_FAILED'
          );
        }

        return {
          id: user.id,
          name: user.name,
          email: email,
          isVerified: !!user.emailVerified,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn(signInProps) {
      let { user, account, profile } = signInProps;

      if (account?.provider === 'google' && profile) {
        const { id: oauthId, email, name, image: avatar } = user;

        let existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ email: email! }, { oauthId: oauthId! }],
          },
        });
        if (existingUser?.blockedByAdmin) return false;
        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              oauthId,
              oauthProvider: 'GOOGLE',
              email: email as string,
              name: name as string,
              avatar,
              isVerified: true,
              emailVerified: new Date(),
            },
          });
        }
      }

      return true;
    },

    async jwt(jwtProps) {
      const { token, user, trigger, session } = jwtProps;
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        const loggedInUser = await prisma.user.findFirst({
          where: {
            OR: [{ oauthId: { equals: user.id } }, { id: { equals: user.id } }],
            blockedByAdmin: null,
            emailVerified: { not: null },
          },
        });
        if (!loggedInUser) return null;
        token.id = loggedInUser.id;
        token.name = user.name;
        token.isVerified = user.isVerified;
        token.role = loggedInUser.role ? loggedInUser.role : user.role;
      }
      return token;
    },

    session({ session, token }) {
      if (token && session && session.user) {
        session.user.id = token.id;
        session.user.isVerified = token.isVerified;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: AUTH_TOKEN_EXPIRATION_TIME,
  },
  jwt: {
    maxAge: AUTH_TOKEN_EXPIRATION_TIME,
  },
  pages: {
    signIn: '/signin',
  },
} satisfies NextAuthOptions;
