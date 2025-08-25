import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectToDatabase();
    const state = mongoose.connection.readyState; // 1 = connected
    return NextResponse.json({ ok: state === 1, state });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
