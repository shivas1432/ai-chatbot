import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'USER' | 'ADMIN' | 'GUEST';
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: 'USER' | 'ADMIN' | 'GUEST';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'USER' | 'ADMIN' | 'GUEST';
  }
}