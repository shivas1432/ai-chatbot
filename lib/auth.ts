import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: 'guest',
      name: 'Guest Access',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Guest login attempt:', credentials);
        console.log('Expected username:', process.env.GUEST_USERNAME);
        console.log('Expected password:', process.env.GUEST_PASSWORD);
        
        if (
          credentials?.username === process.env.GUEST_USERNAME &&
          credentials?.password === process.env.GUEST_PASSWORD
        ) {
          console.log('Guest credentials valid');
          return {
            id: 'guest_user',
            name: 'Guest User',
            email: 'guest@aibuddy.com',
            role: 'GUEST',
          };
        }
        console.log('Guest credentials invalid');
        return null;
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || 'guest_user';
        session.user.role = (token.role as any) || 'USER';
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || 'USER';
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'database',
  },
  debug: true,
};