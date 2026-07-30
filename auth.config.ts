import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const PROTECTED_PREFIXES = ["/checkout", "/account", "/orders"];
const ADMIN_PREFIX = "/admin";

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
    // Role lives on the token (set by auth.ts's jwt callback at sign-in,
    // Node-only), not fetched from the DB here — this callback just copies
    // it onto the session so it's edge-safe for middleware to read.
    session({ session, token }) {
      if (session.user && typeof token.role === "string") {
        session.user.role = token.role;
      }
      return session;
    },
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      if (path.startsWith(ADMIN_PREFIX)) {
        return auth?.user?.role === "ADMIN";
      }
      const isProtected = PROTECTED_PREFIXES.some((p) => path.startsWith(p));
      return isProtected ? !!auth?.user : true;
    },
  },
} satisfies NextAuthConfig;
