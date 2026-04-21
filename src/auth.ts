import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './db';
// import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  // plugins: [nextCookies()],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  basePath: 'api/auth',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  trustedOrigins: ['http://localhost:3001', 'http://localhost:3000'],
  cookiePrefix: 'better-auth',
  advanced: {
    cookiePrefix: 'better-auth', //prefix for auth cookies to avoid conflicts with other auth systems
  },
  hooks: {},
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: false,
  },
});
