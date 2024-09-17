import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/User';

export async function POST(req) {
  const { userId, profilePicture, name } = await req.json();

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI);

  // Update or create user
  await User.findOneAndUpdate(
    { clerkUserId: userId },
    { profilePicture, name },
    { upsert: true, new: true }
  );

  return NextResponse.json({ status: 'User updated' });
}