import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { jwtVerify, JWTPayload } from 'jose';

type MeResponse = {
  source: 'nextauth' | 'custom';
  email: string | null;
  name: string | null;
  signedInAt: string | null;
};

export async function GET(req: NextRequest) {
  try {
    // 1) Try NextAuth JWT/session first
    const nextAuthToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
    if (nextAuthToken) {
      const email = typeof nextAuthToken.email === 'string' ? nextAuthToken.email : null;
      const name = typeof (nextAuthToken as { name?: unknown }).name === 'string' ? (nextAuthToken as { name?: string }).name! : null;
      const iatSec = typeof nextAuthToken.iat === 'number' ? nextAuthToken.iat : null;
      const body: MeResponse = {
        source: 'nextauth',
        email,
        name,
        signedInAt: iatSec ? new Date(iatSec * 1000).toISOString() : null,
      };
      return NextResponse.json(body);
    }

    // 2) Fallback to our custom JWT cookie "auth"
    const customToken = req.cookies.get('auth')?.value;
    if (customToken) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');
        const { payload } = await jwtVerify(customToken, secret);
        const pl = payload as JWTPayload & { email?: string; name?: string };
        const email = typeof pl.email === 'string' ? pl.email : null;
        const name = typeof pl.name === 'string' ? pl.name : null;
        const iatSec = typeof pl.iat === 'number' ? pl.iat : null;
        const body: MeResponse = {
          source: 'custom',
          email,
          name,
          signedInAt: iatSec ? new Date(iatSec * 1000).toISOString() : null,
        };
        return NextResponse.json(body);
      } catch {}
    }

    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


