import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        // no está logueado, Proxy lo mandará al /login
        return false;
      } else if (isLoggedIn) {
        // ya logueado e intenta ir a / o /login -> mándalo al dashboard
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [], // se rellena en auth.ts, aquí lo dejamos vacío
} satisfies NextAuthConfig;
