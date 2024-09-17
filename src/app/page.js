'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useUser, RedirectToSignIn } from '@clerk/nextjs';

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    fetch('/api/socket');
  }, []);

  if (!isLoaded) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="bg-[url('/background.jpg')] min-h-screen bg-cover bg-center flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to ChatApp</h1>
        <p className="text-2xl mb-8">Connect with your friends and family instantly.</p>
        {isSignedIn ? (
          <Link href="/chat" className="font-bold px-6 py-3 rounded-lg bg-rose-500">
            Get Started
          </Link>
        ) : (
          <RedirectToSignIn>
            <button className="font-bold px-6 py-3 rounded-lg bg-gray-500">
              Sign In to Chat
            </button>
          </RedirectToSignIn>
        )}
      </div>
    </div>
  );
}