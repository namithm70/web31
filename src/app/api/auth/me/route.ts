import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { jwtVerify } from 'jose';

export async function GET(req: NextRequest) {
  try {
    // 1) Try NextAuth JWT/session first
    const nextAuthToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
    if (nextAuthToken) {
      return NextResponse.json({
        source: 'nextauth',
        email: (nextAuthToken as any).email || null,
        name: (nextAuthToken as any).name || null,
        signedInAt: (nextAuthToken as any).iat ? new Date((nextAuthToken as any).iat * 1000).toISOString() : null,
      });
    }

    // 2) Fallback to our custom JWT cookie "auth"
    const customToken = req.cookies.get('auth')?.value;
    if (customToken) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');
        const { payload } = await jwtVerify(customToken, secret);
        return NextResponse.json({
          source: 'custom',
          email: (payload as any).email || null,
          name: (payload as any).name || null,
          signedInAt: (payload as any).iat ? new Date((payload as any).iat * 1000).toISOString() : null,
        });
      } catch {}
    }

    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


