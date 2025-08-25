import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Schema, models, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = models.User || model('User', UserSchema);

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');
    const token = await new SignJWT({ sub: user._id.toString(), email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    const res = NextResponse.json({ id: user._id.toString(), email: user.email, name: user.name });
    res.cookies.set('auth', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
