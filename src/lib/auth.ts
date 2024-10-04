import {
  AUTH_TOKEN_EXPIRATION_TIME,
  PASSWORD_HASH_SALT_ROUNDS,
} from '@/config/auth.config';
import prisma from '@/config/prisma.config';
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ErrorHandler } from './error';
import { SigninSchema, SignupSchema } from './validators/auth.validator';

export const options = {
  providers: [
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
          where: { email: email },
          select: {
            id: true,
            name: true,
            password: true,
            isVerified: true,
            role: true,
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
          isVerified: user.isVerified,
          role: user.role,
        };
      },
    }),
    CredentialsProvider({
      name: 'signup',
      id: 'signup',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        const result = SignupSchema.safeParse(credentials);

        if (!result.success) {
          throw new ErrorHandler(
            'Input Validation failed',
            'VALIDATION_ERROR',
            {
              fieldErrors: result.error.flatten().fieldErrors,
            }
          );
        }
        const { email, password, name } = result.data;
        const userExist = await prisma.user.findUnique({
          where: { email: email },
          select: { id: true, name: true, password: true },
        });

        if (userExist)
          throw new ErrorHandler(
            'User with this email already exist',
            'CONFLICT'
          );

        const hashedPassword = await bcrypt.hash(
          password,
          PASSWORD_HASH_SALT_ROUNDS
        );
        const user = await prisma.user.create({
          data: {
            email: email,
            password: hashedPassword,
            name: name,
          },
          select: {
            id: true,
            name: true,
            email: true,
            isVerified: true,
            role: true,
          },
        });
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.isVerified = user.isVerified;
        token.role = user.role;
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
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: AUTH_TOKEN_EXPIRATION_TIME,
  },
  jwt: {
    maxAge: AUTH_TOKEN_EXPIRATION_TIME,
  },
} satisfies NextAuthOptions;
