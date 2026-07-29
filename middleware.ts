import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// A separate, edge-safe NextAuth instance for middleware — deliberately NOT
// importing from ./auth.ts, which pulls in the Prisma pg adapter and
// bcryptjs (Node-only, can't run on Next.js 14's default Edge middleware
// runtime).
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/checkout/:path*", "/account/:path*", "/orders/:path*"],
};
