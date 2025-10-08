// auth.ts

import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';         // <-- ADDED THIS IMPORT
import UserModel from '@/models/User';            // <-- ADDED THIS IMPORT
import bcrypt from 'bcryptjs';                    // <-- ADDED THIS IMPORT

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          console.log("\n--- Authorize function started ---");
          console.log("Credentials received on backend:", credentials);

          const user = await UserModel.findOne({ email: credentials.email }).select('+password');
          
          if (!user) {
            console.log("User not found in database.");
            return null;
          }

          console.log("User found in database.");
          console.log("Password from login form:", credentials.password);
          console.log("Hashed password from database:", user.password);

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log("Does the password match?", isPasswordCorrect);

          if (isPasswordCorrect) {
            console.log("Password is correct. Returning user.");
            return { id: user._id.toString(), email: user.email }; 
          } else {
            console.log("Password is NOT correct. Returning null.");
            return null;
          }
        } catch (err) {
          console.error("Error in authorize function:", err);
          return null;
        }
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