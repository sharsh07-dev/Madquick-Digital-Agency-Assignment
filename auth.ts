// auth.ts -- TEMPORARY DEBUGGING VERSION
import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        // Temporarily bypass the database and hardcode a user
        console.log("Attempting to authorize with:", credentials);
        if (credentials.email === "test@example.com" && credentials.password === "password") {
          console.log("Hardcoded user authorized!");
          return { id: "1", name: "Test User", email: "test@example.com" };
        }
        // If credentials don't match, return null
        console.log("Authorization failed.");
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);