import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getToken } from 'next-auth/jwt';

const PUBLIC_PREFIXES = ['/_next', '/static', '/favicon.ico'];
const PUBLIC_ROUTES = ['/', '/auth/signin', '/auth/signup'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p)) || PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // allow NextAuth APIs and callbacks
  if (pathname.startsWith('/api/auth')) return NextResponse.next();

  // Accept either our custom JWT cookie or a NextAuth session
  const customToken = req.cookies.get('auth')?.value;
  const nextAuthToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });

  if (nextAuthToken) return NextResponse.next();

  if (customToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');
      await jwtVerify(customToken, secret);
      return NextResponse.next();
    } catch {}
  }

  const url = new URL('/auth/signin', req.url);
  url.searchParams.set('redirect', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
