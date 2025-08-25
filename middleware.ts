import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PREFIXES = ['/_next', '/static', '/favicon.ico'];
const PUBLIC_ROUTES = ['/', '/auth/signin', '/auth/signup'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p)) || PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // allow sign-in/sign-up APIs
  if (pathname.startsWith('/api/auth')) return NextResponse.next();

  const token = req.cookies.get('auth')?.value;
  if (!token) {
    const url = new URL('/auth/signin', req.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (e) {
    const url = new URL('/auth/signin', req.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
