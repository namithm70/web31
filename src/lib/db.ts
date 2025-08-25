import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error('MONGODB_URI is not set');
}

declare global {
  var _mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } =
  global._mongoose || { conn: null, promise: null };

if (!global._mongoose) global._mongoose = cached;

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { bufferCommands: false }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
