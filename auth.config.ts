import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const PROTECTED_PREFIXES = ["/checkout", "/account", "/orders"];

// Edge-safe config used by both middleware.ts (Edge runtime) and auth.ts
// (Node runtime). Must stay free of Prisma/bcryptjs — Next.js 14 middleware
// runs on Edge by default and neither can run there. The Credentials
// provider (which needs both) is added only in auth.ts, not here.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isProtected = PROTECTED_PREFIXES.some((p) =>
        request.nextUrl.pathname.startsWith(p)
      );
      return isProtected ? !!auth?.user : true;
    },
  },
} satisfies NextAuthConfig;
