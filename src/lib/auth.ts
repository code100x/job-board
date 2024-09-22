import {
  AUTH_TOKEN_EXPIRATION_TIME,
  PASSWORD_HASH_SALT_ROUNDS,
} from '@/config/auth.config';
import prisma from '@/config/prisma.config';
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function validateUser(
  email: string,
  password: string
): Promise<
  | { data: null }
  | {
      data: {
        user: {
          id: string;
          name: string;
          password: string;
          email: string;
        };
        courses: Array<{
          id: number;
          appxCourseId: string;
          description: string;
          imageUrl: string;
          title: string;
        }>;
      };
    }
> {
  // TODO: Implement this for local testing
  // if (process.env.LOCAL_PROVIDER) {
  //   if (password === '123456') {
  //     return {
  //       data: {
  //         user: {
  //           id: '1',
  //           name: 'Random',
  //           password: null,
  //           email: 'test@gmail.com',
  //         },
  //         courses: [
  //           {
  //             id: 1,
  //             appxCourseId: '1',
  //             title: 'test course 1',
  //             imageUrl: 'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test1.png',
  //             description: 'test course 1',
  //           },
  //         ],
  //       },
  //     };
  //   }
  //   return { data: null };
  // }
  const url = 'https://app.100xdevs.com/api/admin/externalLogin';
  const headers = {
    'Auth-Key': process.env.JOB_BOARD_AUTH_SECRET || '',
  };
  const body = new URLSearchParams();
  body.append('email', email);
  body.append('password', password);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error validating user:', error);
  }
  return {
    data: null,
  };
}

export const options = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials: any) {
        try {
          // TODO: Implement this for local testing
          // if (process.env.LOCAL_PROVIDER) {
          //   return {
          //     id: '1',
          //     name: 'test',
          //     email: 'test@gmail.com',
          //     token: await generateJWT({
          //       id: '1',
          //     }),
          //   };
          // }

          const hashedPassword = await bcrypt.hash(
            credentials.password,
            PASSWORD_HASH_SALT_ROUNDS
          );
          const userInDb = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              name: true,
              password: true,
              isVerified: true,
              role: true,
            },
          });

          if (
            userInDb &&
            userInDb.password &&
            (await bcrypt.compare(credentials.password, userInDb.password))
          ) {
            return {
              id: userInDb.id,
              name: userInDb.name,
              email: credentials.email,
              isVerified: userInDb.isVerified,
              role: userInDb.role,
            };
          }
          // If not in db
          const userCMSData = await validateUser(
            credentials.email,
            credentials.password
          );
          if (userCMSData.data) {
            try {
              const userData = await prisma.user.create({
                data: {
                  email: userCMSData.data.user.email,
                  password: hashedPassword,
                  name: userCMSData.data.user.name,
                  isVerified: true,
                  role: 'USER',
                  course: {
                    create: userCMSData.data.courses.map((course) => ({
                      appxCourseId: course.appxCourseId,
                      description: course.description,
                      imageUrl: course.imageUrl,
                      title: course.title,
                    })),
                  },
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
                id: userData.id,
                name: userData.name,
                email: userData.email,
                isVerified: userData.isVerified,
                role: userData.role,
              };
            } catch (error) {
              console.error('Error creating user:', error);
            }
          }
        } catch (error) {
          console.error(error);
        }
        return null;
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
