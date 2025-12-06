import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // en qué rutas corre el Proxy
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
